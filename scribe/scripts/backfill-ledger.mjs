// Backfill the scribe ledger from past Claude Code session logs.
// Read-only: scans session logs and runs read-only git commands. Writes one
// JSON report to the output dir given as argv[2]. It never writes to repos or
// memory. Stdout shows only hashes, repo paths, file paths, and counts.
//
// Usage: node backfill-ledger.mjs <output-dir>

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import os from "node:os";
import { fileURLToPath } from "node:url";

const HOME = os.homedir().replace(/\\/g, "/");
const PROJECTS = `${HOME}/.claude/projects`;
const outDir = process.argv[2];
if (!outDir) { console.error("usage: node backfill-ledger.mjs <output-dir>"); process.exit(1); }

// This machine's memory folder comes from local.md in the skills folder.
const LOCAL_MD = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../local.md");
const memoryDir = fs.existsSync(LOCAL_MD) && fs.readFileSync(LOCAL_MD, "utf8").match(/^memory_dir:\s*(.+?)\s*$/m);
if (!memoryDir) { console.error("memory_dir not found. Copy local.example.md to local.md and fill it in (see SETUP.md)."); process.exit(1); }
const EMAILS_FILE = path.join(memoryDir[1].replace(/^~(?=$|[\\/])/, HOME), "user-git-emails.md");
const emailsExist = fs.existsSync(EMAILS_FILE);
if (!emailsExist) console.warn("user-git-emails.md not found in memory_dir, so no commit is treated as yours (see SETUP.md).");

const userEmails = new Set(
  ((emailsExist ? fs.readFileSync(EMAILS_FILE, "utf8") : "").match(/[\w.+-]+@[\w.-]+\.\w+/g) || []).map(e => e.toLowerCase())
);

// --- helpers ---------------------------------------------------------------

function listJsonl(dir) {
  const out = [];
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) out.push(...listJsonl(p));
    else if (ent.name.endsWith(".jsonl")) out.push(p);
  }
  return out;
}

const repoCache = new Map();
function repoRoot(start) {
  if (!start) return null;
  let dir = path.resolve(start);
  if (repoCache.has(dir)) return repoCache.get(dir);
  const seen = [];
  let found = null;
  while (true) {
    seen.push(dir);
    if (fs.existsSync(path.join(dir, ".git"))) { found = dir; break; }
    const up = path.dirname(dir);
    if (up === dir) break;
    dir = up;
  }
  for (const d of seen) repoCache.set(d, found);
  return found;
}

function git(repo, args) {
  try {
    return execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim();
  } catch { return null; }
}

function resultText(content) {
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map(c => (typeof c === "string" ? c : c.text || "")).join("\n");
  return "";
}

// Files whose contents may hold secrets: never fingerprint them.
const SECRET_FILE = /(^|[\\/])(\.env[^\\/]*|.*secret.*|.*\.pem|.*\.key|.*credentials.*)$/i;
const SECRET_LINE = /(password|passwd|secret|token|api[_-]?key|connectionstring)\s*[=:]/i;

// Pick up to 3 distinctive added lines to search git history with.
function fingerprints(text) {
  const lines = (text || "").split(/\r?\n/).map(l => l.trim())
    .filter(l => l.length >= 25 && l.length <= 200 && !SECRET_LINE.test(l) && /[A-Za-z]/.test(l));
  return [...new Set(lines)].slice(0, 3);
}

// --- pass 1: scan logs -------------------------------------------------------

const toolUses = new Map(); // id -> { name, input, ts, cwd }
const results = new Map();  // tool_use_id -> text
let logCount = 0;

for (const file of listJsonl(PROJECTS)) {
  logCount++;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    if (!line) continue;
    let o; try { o = JSON.parse(line); } catch { continue; }
    if (o.type !== "assistant" && o.type !== "user") continue;
    const content = o.message && Array.isArray(o.message.content) ? o.message.content : [];
    for (const it of content) {
      if (o.type === "assistant" && it.type === "tool_use")
        toolUses.set(it.id, { name: it.name, input: it.input || {}, ts: o.timestamp, cwd: o.cwd });
      else if (o.type === "user" && it.type === "tool_result")
        results.set(it.tool_use_id, resultText(it.content));
    }
  }
}

// --- pass 2: commits Claude made (exact) -----------------------------------

const COMMIT_CMD = /\bgit\b[^\n|;&]*\bcommit\b/;
const COMMIT_OUT = /\[([^\]\s]+)(?: \(root-commit\))? ([0-9a-f]{7,40})\]/g;
const claudeCommits = new Map(); // repo -> Map(fullHash -> {date})
const unresolved = [];

for (const [id, u] of toolUses) {
  if (u.name !== "Bash" && u.name !== "PowerShell") continue;
  const cmd = String(u.input.command || "");
  if (!COMMIT_CMD.test(cmd)) continue;
  const out = results.get(id) || "";
  const cdMatch = cmd.match(/git\s+-C\s+("([^"]+)"|'([^']+)'|(\S+))/);
  const repo = repoRoot((cdMatch && (cdMatch[2] || cdMatch[3] || cdMatch[4])) || u.cwd);
  for (const m of out.matchAll(COMMIT_OUT)) {
    const short = m[2];
    const full = repo && git(repo, ["rev-parse", "--verify", "--quiet", `${short}^{commit}`]);
    if (!full) { unresolved.push({ hash: short, date: u.ts, cwd: u.cwd }); continue; }
    if (!claudeCommits.has(repo)) claudeCommits.set(repo, new Map());
    claudeCommits.get(repo).set(full, { date: u.ts });
  }
}

// --- pass 3: Claude's edits committed by someone (content match) ------------

const EDIT_TOOLS = new Set(["Edit", "Write", "MultiEdit"]);
const candidates = new Map(); // repo -> Map(hash -> {files:Set, hits, author, date, subject})
let editCount = 0, skippedSecretFiles = 0;

for (const [, u] of toolUses) {
  if (!EDIT_TOOLS.has(u.name)) continue;
  const fp = u.input.file_path;
  if (!fp) continue;
  const repo = repoRoot(path.dirname(fp));
  if (!repo) continue;
  editCount++;
  if (SECRET_FILE.test(fp)) { skippedSecretFiles++; continue; }
  // Only lines Claude actually introduced: drop context lines that were
  // already in old_string, so teammates' original code isn't matched.
  const pairs = u.name === "Write" ? [{ o: "", n: u.input.content }]
    : u.name === "Edit" ? [{ o: u.input.old_string, n: u.input.new_string }]
    : (u.input.edits || []).map(e => ({ o: e.old_string, n: e.new_string }));
  const added = pairs.map(({ o, n }) => {
    const old = new Set(String(o || "").split(/\r?\n/).map(l => l.trim()));
    return String(n || "").split(/\r?\n/).filter(l => !old.has(l.trim())).join("\n");
  }).join("\n");
  const rel = path.relative(repo, fp).split(path.sep).join("/");
  // The commit must come after Claude wrote the line (full timestamp, committer date).
  const since = u.ts || null;
  for (const f of fingerprints(added)) {
    // A Write that overwrote an existing file may repeat old lines; skip lines
    // that already existed in history before the edit.
    if (u.name === "Write" && since) {
      const before = git(repo, ["log", "--all", "--format=%H", "-F", `-S${f}`, `--until=${since}`, "--", rel]);
      if (before) continue;
    }
    const args = ["log", "--all", "--format=%H%x09%ae%x09%cI%x09%s", "-F", `-S${f}`];
    if (since) args.push(`--since=${since}`);
    args.push("--", rel);
    const log = git(repo, args);
    if (!log) continue;
    // The oldest commit that added the line is the one that introduced it.
    const first = log.split("\n").filter(Boolean).pop();
    const [hash, author, date, subject] = first.split("\t");
    if (claudeCommits.get(repo)?.has(hash)) continue; // already known exactly
    if (!candidates.has(repo)) candidates.set(repo, new Map());
    const c = candidates.get(repo).get(hash) || { files: new Set(), hits: 0, author, date, subject };
    c.files.add(rel); c.hits++;
    candidates.get(repo).set(hash, c);
  }
}

// --- report ----------------------------------------------------------------

const report = { generated: new Date().toISOString(), logsScanned: logCount, editsInRepos: editCount, skippedSecretFiles, repos: {}, unresolved };
const repos = new Set([...claudeCommits.keys(), ...candidates.keys()]);
for (const repo of repos) {
  const exact = [...(claudeCommits.get(repo) || new Map())].map(([hash, v]) => ({ hash, date: v.date }));
  const review = [...(candidates.get(repo) || new Map())].map(([hash, c]) => ({
    hash, date: c.date, files: [...c.files], fingerprintHits: c.hits,
    authorIsUser: userEmails.has((c.author || "").toLowerCase()), subject: c.subject,
  }));
  report.repos[repo] = { claudeCommitsExact: exact, committedByOthersNeedsReview: review };
}

fs.mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "ledger-backfill.json");
fs.writeFileSync(outFile, JSON.stringify(report, null, 2));

console.log(`logs scanned: ${logCount}, Claude edits inside git repos: ${editCount}, secret-like files skipped: ${skippedSecretFiles}`);
for (const [repo, r] of Object.entries(report.repos)) {
  console.log(`\n${repo}`);
  console.log(`  exact Claude commits: ${r.claudeCommitsExact.length}`);
  for (const c of r.claudeCommitsExact) console.log(`    ${c.hash.slice(0, 10)}  ${String(c.date).slice(0, 10)}`);
  console.log(`  commits containing Claude-written lines (needs your review): ${r.committedByOthersNeedsReview.length}`);
  for (const c of r.committedByOthersNeedsReview)
    console.log(`    ${c.hash.slice(0, 10)}  ${String(c.date).slice(0, 10)}  ${c.authorIsUser ? "your email" : "other email"}  hits=${c.fingerprintHits}  ${c.files.join(", ")}`);
}
if (unresolved.length) console.log(`\nunresolved commit hashes (repo moved/deleted?): ${unresolved.length}`);
console.log(`\nfull report: ${outFile}`);
