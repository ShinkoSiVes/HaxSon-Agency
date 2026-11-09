# Claude Code skills

A set of skills for [Claude Code](https://claude.com/claude-code) covering memory,
ground rules, ideation, building from a plan, and hackathon proposal scoring.

**To install, see [SETUP.md](SETUP.md).** You can hand that file to your agent.

## The skills

| Skill | What it does |
|---|---|
| `enchiridion` | Memory rules. Asks what kind of session this is, reads the memory index first instead of old transcripts, saves as you go, and keeps an archive of past projects you can restore or reuse. |
| `oath` | Ground rules for code and GitHub: no Claude attribution, confirm before running anything, follow the repo's guidelines, read narrowly. |
| `wizard` | Suggests a model and effort tier before feature work. |
| `scribe` | Makes new code match your own style, using git blame plus a ledger of the code Claude wrote. |
| `riddlemaster` | Questions your ideas instead of agreeing with them, and runs a Q&A drill for practicing judges' questions. Never suggests ideas itself. |
| `artificer` | Builds a finished plan one feature at a time, with a short summary after each. |
| `arbiter` | Scores a written hackathon proposal against competition weights, applies red-flag caps, and reports the gaps worth the most points. Never writes proposal text. |
| `crystal-lake` | Checks writing for AI-sounding patterns and rewrites it in your voice. Keeps every fact and never promises to pass a detector. |
| `excalibur` | `/excalibur` runs one task hands-off in one of three decision styles, within a list of things it always asks about first. |

## How they fit together

An idea goes through `riddlemaster`, a written proposal through `arbiter`, a plan
through `artificer`. `enchiridion` runs at session start and hands off to `wizard`.
`oath` and `scribe` apply whenever code is involved. You can install any subset. A
skill that points to one you left out just loses that step, so tell your agent to
skip it if it asks.

## Requirements

Claude Code. Node 18 or newer only for `scribe`'s ledger script and the leak check
used when publishing a fork. `scribe`, `oath` and
`enchiridion` read a `local.md` file with your own paths, created during setup.

## Not included

I also use a third-party frontend design skill called tasteskill, under the local
name `bard`. It's someone else's work, so it isn't redistributed here.

## Licence

[MIT](LICENSE).
