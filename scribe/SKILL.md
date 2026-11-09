---
name: scribe
description: Makes new code match the user's own coding style. Load before writing or changing code in any project repo. It also covers building or refreshing the user's style profile, and logging which code Claude wrote. Uses git blame (filters teammates) + a local ledger of Claude-written commits (filters Claude) + a one-time user check, then writes code in the user's style. Labels code as mine, Claude, or someone else, and flags edits to teammates' code.
---

# Code style match

The goal is that code written in this project reads as if the user wrote it.

Git cannot tell the user's code from Claude's, because Claude commits under the user's identity (see oath's no-attribution rule). So authorship comes from three sources together:

1. **git blame** keeps only lines committed under the user's email, which filters out teammates.
2. **The ledger** (`claude-written.md`) removes commits Claude wrote.
3. **A one-time check by the user** removes anything else that isn't theirs.

## Three authorship labels

Every committed line falls into exactly one of these:

| Label | Rule |
|---|---|
| **Mine** | committed under one of the user's emails, and not in the ledger, or listed in the ledger's "Mine (user override)" section (the user's word beats the logs) |
| **Claude** | its commit is in the ledger (`mixed` commits count as Claude, to be safe) |
| **Someone else** | committed under any email that isn't the user's |

- **The user's emails:** read them from `user-git-emails.md` at the root of the user's memory folder (`memory_dir` in `local.md`, in the skills folder), plus `git config user.email`. If `local.md` is missing, use the auto-memory folder named in your system prompt. If the emails file is missing, use only `git config user.email`. If the repo shows a new address that might be theirs (e.g. a GitHub `noreply` one), ask, then add it to that file. A missing email makes their own code show up as someone else's. **Never write the emails into this skill, `code-style.md`, or anything shared.** Skill files may be passed to other people, so refer to the memory file instead.
- **Squash merges:** a commit whose subject ends in `(#N)` is a GitHub squash merge. Its author is whoever merged it, not who wrote the code. Before labelling it, check the pull request's author with `gh pr view N --json author,commits` (read-only; if `gh` isn't available, ask the user who wrote it). Then label each line by the PR's original commits: ledger commits are Claude, the user's are Mine. Only the rest is Someone else.
- **Never identify teammates.** Don't name them, guess who they are, or save their names or emails anywhere. The label is just "someone else".
- **Uncommitted changes** have no git author. Treat them as the current session's work: Claude if Claude made them, otherwise ask.

**Flagging.** Before changing code, check the label of the lines you're about to touch. If any are **someone else's**, tell the user before editing, e.g. "Heads up: `Login.cs` lines 40–72 are someone else's code (not yours, not mine)." Then wait for their go-ahead. Also flag when explaining or reviewing code where the authorship matters. Mine and Claude code need no flag.

**Editing someone else's code** after the go-ahead: change only what was asked. Write the new lines in the user's style, but don't restyle the teammate's surrounding code.

## Files (per project, in `memory/<kind>/<project>/`, under `memory_dir`)

With no project folder (a short task, or `enchiridion` isn't installed), use `<memory_dir>/<repo-name>/`. Neither file gets a `MEMORY.md` line. They are loaded only by this skill, never at startup.

- `code-style.md`: the user's style profile, at most ~25 lines.
- `claude-written.md`: the ledger, local only. Never commit or push it anywhere.

## Before writing code

1. Load `code-style.md`. If it doesn't exist, build it first (below).
2. Write new code in the profile's style, and also match the conventions of the code around the change.
3. Order of precedence when they conflict:
   1. Enforced repo tooling (formatter, linter, CI checks) wins, because breaking it fails the build.
   2. The user's profile.
   3. The surrounding code.

   If the profile conflicts with written repo guidelines, quote the guideline and ask (oath's follow-the-repo rule).
4. Don't restyle existing code nobody asked you to touch, especially teammates' code.

## Building or refreshing the profile

The git commands here are read-only, so no approval is needed (oath's confirm-before-executing rule exempts them).

1. Get the user's git email: `git config user.email`.
2. Find candidate files with `git log --author=<email> --name-only`. Skip generated, vendored, lock, migration and minified files.
3. Run `git blame -w -M -C --line-porcelain <file>` (it ignores whitespace and moved or copied lines). Also add `--ignore-revs-file .git-blame-ignore-revs` if that file exists. Keep only lines by the user's email whose commit is **not** in the ledger and is not marked mixed.
4. Take a small sample: at most 5 files and about 300 lines, preferring recent, hand-written logic.
5. **First build only:** show the user the file and line ranges you plan to learn from, and let them remove anything they didn't write by hand. Later refreshes skip this step, since the ledger now covers Claude's code.
6. Write `code-style.md` with these headings, using a short example snippet only where words aren't enough:
   - Naming
   - Indentation and braces
   - Line length
   - Comments (how many, tone, language)
   - Error handling
   - Imports and file layout
   - Idioms and patterns
   - Things they never do

   Note the date and the source commits at the top.
7. Refresh the profile when the user asks. Also check, when loading the profile, whether it may be stale: count the user's commits since the profile date with `git log --author=<each email> --since=<profile date> --oneline`, and leave out ledger commits. If there are 10 or more, suggest a refresh. Don't refresh silently.

## Backfilling the ledger (past work)

Code Claude wrote before the ledger existed would otherwise count as **Mine**. To fix that, run (with the user's approval):

`node <skills folder>/scribe/scripts/backfill-ledger.mjs <scratchpad-dir>`

The skills folder is the one holding `local.md`.

It reads past session logs plus read-only git, and writes a report. It never edits repos or memory.

- **Exact Claude commits:** commits Claude ran itself, taken from the `git commit` output in the logs. Add these to the ledger as-is.
- **Needs review:** commits by someone else that contain lines Claude wrote. Show the user each hash, date, subject, and files, and let them mark each one `claude`, `mixed`, or `mine`. Never add these without a yes.
- **Limits:** session logs older than about 30 days are auto-deleted, so older work is missed. Ask the user about specific older PRs or commits.

## Keeping the ledger

Add an entry right away whenever Claude writes or changes code:

`- YYYY-MM-DD — <files> — <what> — commit: <hash | pending>`

- **Prefer exact hashes.** When Claude's changes are ready, offer to commit them (with approval, per oath's confirm-before-executing rule), and record the hash it produces.
- If the user commits Claude's changes themselves, the entry stays `pending`. Next time in the repo, match by **content**, not by date: find commits since that date that touch those files (`git log -p --since=<date> -- <files>`), and pick the one whose added lines contain the lines Claude wrote.
  - One clear match: record its hash.
  - If it also adds substantial lines Claude didn't write: mark it `mixed` and exclude it from style sampling.
  - Several candidates, or no clear match: ask the user. Never guess.
- Never save secrets here (enchiridion section 5).
- If the user said not to keep a record, skip the ledger, but still match the existing profile.
