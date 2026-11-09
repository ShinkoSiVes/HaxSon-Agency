# Link log and work log formats

Read this before writing a link entry or a log line. The short versions live in `enchiridion/SKILL.md`
sections 6 and 7.

## Keep a link log per project

The user should never have to resend a link.

- Every project folder has one `links.md` (type `reference`) with one `MEMORY.md` pointer line: `- [<Project> links](<kind>/<project>/links.md) — docs/repos/sites used, with what we did`.
- Each time the user shares a URL (doc, repo, sheet, site, design, artifact), add or update one entry right away:
  `- <label> — <url> — <what it is>. Did: <what we did with it> (YYYY-MM-DD)`
- When an existing link is used again, append the new work to its `Did:` part instead of adding a duplicate line.
- When the user refers to "the doc", "the repo", or similar, look in `links.md` before asking them for the link.
- Links that don't belong to a project go in the root `links.md`. Skip this when the user said not to keep a record.
- If the label or description is unknown, use the page title or domain as the label and write "unknown" for the description. Don't ask.
- Strip access-granting parameters from links (see `memory-safety.md`).

## Keep a work log per project, search it instead of transcripts

Each project folder has a `log.md` with one dated line per finished feature or work stretch. It is append-only.

`- YYYY-MM-DD — <what was built/changed> — decided: <key choices> — failed: <dead ends, if any>`

- Never load `log.md` at startup and never give it a `MEMORY.md` line. It is only for searching.
- When the user asks about past work ("what did we try for X?", "when did we add Y?"), grep `log.md`, the project folder and the `.remember/` slices for the keyword. Read only the matching lines. Ask the user only if nothing matches.
- Write the log line during the checkpoint sweep in section 5.
