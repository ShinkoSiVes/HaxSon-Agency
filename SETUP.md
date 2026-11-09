# Setup

You can do this by hand, or tell your agent: "Follow SETUP.md in this repo."

**Agents:** do the steps in order. Ask before overwriting anything that already
exists. Steps marked optional depend on what the user wants, so ask.

## Requirements
- Claude Code. Skills live in `~/.claude/skills` (on Windows,
  `%USERPROFILE%\.claude\skills`).
- Node 18 or newer, only for `scribe`'s ledger script and the leak check for forks.
- GitHub CLI (`gh`), optional, only if you want `scribe` to check pull requests.

## 1. Install the skills

If the skills folder doesn't exist or is empty, clone this repo there. `~` works in
bash, zsh and PowerShell:

```
git clone <this repo's URL> ~/.claude/skills
```

In Windows cmd, use `%USERPROFILE%\.claude\skills` as the target instead.

If you already have skills there, clone somewhere else and copy in the folders you
want. Don't overwrite an existing skill with the same name without checking first.
The skills are these nine folders: `arbiter`, `artificer`, `crystal-lake`,
`enchiridion`, `excalibur`, `oath`, `riddlemaster`, `scribe`, `wizard`. If you use
`enchiridion`, `oath` or `scribe`, also copy `local.example.md` to the root of your
skills folder.

If you keep your own `oath`, note that other skills refer to its rules by name (no
attribution, confirm before executing, follow the repo's guidelines). Keep rules
with those meanings, or edit the references.

## 2. The Remember plugin (optional, for `enchiridion`)

`enchiridion` can also read session history from the `remember` plugin. To install
it, run `/plugin install remember@claude-plugins-official` in Claude Code. Without
it, `enchiridion` uses only the memory folder.

## 3. Create `local.md`

Copy `local.example.md` to `local.md` in the root of your skills folder, then fill
in:

- `memory_dir`: your Claude Code auto-memory folder, written as a full absolute path
  with no `~`. It's usually `~/.claude/projects/<project-slug>/memory`, expanded.
  Claude Code keeps one per starting folder, so choose the one for the folder you
  usually start Claude from. **Agents:** ask the user which folder that is; don't
  assume it's this session's. Create the folder if it doesn't exist.
- `remember_dir`: the full path of your `.remember` folder if you installed the
  Remember plugin, usually `~/.remember` expanded. If you didn't, delete this line.

`local.md` is git-ignored. Never commit it.

## 4. Your writing voice (optional, for `crystal-lake`)

Create `crystal-lake/references/voice.local.md` with notes on how you write: tone,
contractions, how paragraphs open, phrases you use, things you never do. It's
git-ignored. Without it, `crystal-lake` asks for a sample of your writing.

## 5. Your commit emails (optional, for `scribe`)

`scribe` tells your code from teammates' code by commit email. Create
`user-git-emails.md` in your `memory_dir` and list every email you commit with. Keep
it in the memory folder, not in this repo. Without it, `scribe` uses only
`git config user.email`, and the ledger script treats no commit as yours.

## 6. Load the memory rules at session start (optional, for `enchiridion`)

Add this to `~/.claude/settings.json` (on Windows,
`%USERPROFILE%\.claude\settings.json`). Merge it with any hooks you already have;
don't replace them. The command's quoting works in bash and PowerShell, not cmd.exe.

```json
{
  "hooks": {
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "echo '{\"hookSpecificOutput\":{\"hookEventName\":\"SessionStart\",\"additionalContext\":\"At the start of this session, before other work, load the enchiridion skill with the Skill tool and ask its session-start question. After the answer, load the wizard skill. Skip this only if the first message is clearly a quick one-off question.\"}}'",
            "timeout": 5
          }
        ]
      }
    ]
  }
}
```

## 7. Turn off Claude attribution (optional, for `oath`)

`oath` says never to credit Claude on GitHub. To enforce it, add this to the same
`settings.json`:

```json
{ "attribution": { "commit": "", "pr": "", "sessionUrl": false } }
```

## 8. Make them yours

- `oath`, `enchiridion` and `wizard` are one person's working rules. Read them and
  change what doesn't fit.
- `wizard`: match its tier table to the models in your `/model` menu.
- `excalibur`: lets Claude run a whole task without asking. Read its never-auto list
  before using it.
- `arbiter`: its rubric was built for hackathons, with some Philippine events in
  mind. Adjust `references/scoring-rules.md` for yours.
- `crystal-lake`: includes a Taglish voice and Taglish checks. Remove or replace
  them with the languages you write in.

## 9. Check that it worked

Start a new Claude Code session. Skills load at session start, so restart if one was
already open. Your skills should appear when you type `/`. With step 6 done, the
session should open by asking whether you're reopening a project, starting a new one,
or doing a short task.

## Publishing your own fork

Run `node scripts/check-leaks.mjs` before every commit. Put your own name, emails,
teammates and private repo names in a `.leak-denylist` file, one per line. It's
git-ignored, so those terms stay off GitHub.
