#!/usr/bin/env node
// Scans everything that would be published for personal data. Run it before
// every commit. Exit code 1 means something was found.
//
// Usage:
//   node scripts/check-leaks.mjs             scan every file git would publish
//   node scripts/check-leaks.mjs <files...>  scan only these files
//
// Personal terms (your name, emails, teammates, private repo names) go in
// `.leak-denylist`, one per line. That file is git-ignored on purpose: listing
// those terms in a committed file would leak them. Findings show the entry's
// number, never its text.

import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SELF = "scripts/check-leaks.mjs";

const ALLOWED_NAMES = "you|your-name|name|username|user|example|<";
const RULES = [
  { name: "Windows home path", re: new RegExp(String.raw`[A-Za-z]:[\\/]+Users[\\/]+(?!(?:${ALLOWED_NAMES}))[^\\/\s\x60'"<>]+`, "g") },
  { name: "Unix home path", re: new RegExp(String.raw`(?:^|[\s\x60'"(])/(?:home|Users)/(?!(?:${ALLOWED_NAMES}))[\w.-]+`, "g") },
  { name: "Claude project folder name", re: /[A-Za-z]--Users-[\w-]+/g },
  { name: "email address", re: /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g, allow: /(@users\.noreply\.github\.com|@example\.(com|org)|^git@github\.com)$/i },
  { name: "GitHub token", re: /\b(?:gh[pousr]_[A-Za-z0-9]{20,}|github_pat_\w{20,})/g },
  { name: "API key", re: /\b(?:sk-[A-Za-z0-9_-]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[\w-]{10,})/g },
  { name: "private key", re: /-----BEGIN [A-Z ]*PRIVATE KEY-----/g },
];

function denylist() {
  const file = path.join(ROOT, ".leak-denylist");
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, "utf8").split(/\r?\n/).map(s => s.trim()).filter(s => s && !s.startsWith("#"))
    .map((term, i) => ({
      name: `denylist entry #${i + 1}`,
      re: new RegExp(`(?<![\\w-])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\w-])`, "gi"),
    }));
}

function filesToScan() {
  const args = process.argv.slice(2);
  if (args.length) return args.map(a => path.resolve(a));
  const out = execFileSync("git", ["ls-files", "--cached", "--others", "--exclude-standard"], { cwd: ROOT, encoding: "utf8" });
  return out.split(/\r?\n/).filter(Boolean).map(f => path.join(ROOT, f));
}

const personal = denylist();
if (!personal.length) console.warn("Warning: no .leak-denylist found, so personal terms are not being checked.");

let findings = 0, scanned = 0;
for (const file of filesToScan()) {
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) continue;
  const buf = fs.readFileSync(file);
  if (buf.includes(0)) continue;
  scanned++;
  const rel = path.relative(ROOT, file).replace(/\\/g, "/");
  const rules = rel === SELF ? personal : [...RULES, ...personal];
  buf.toString("utf8").split(/\r?\n/).forEach((line, i) => {
    for (const rule of rules) {
      for (const m of line.matchAll(rule.re)) {
        if (rule.allow && rule.allow.test(m[0])) continue;
        console.log(`${rel}:${i + 1}  ${rule.name}`);
        findings++;
      }
    }
  });
}

console.log(`Scanned ${scanned} file(s): ${findings} finding(s).`);
process.exit(findings ? 1 : 0);
