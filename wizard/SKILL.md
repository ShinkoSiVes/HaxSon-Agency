---
name: wizard
description: The user's standing rule for picking a model and effort level before feature work. Load right after enchiridion finishes the session-start questions, and whenever the user starts a new feature, fix, or build mid-session ("implement", "add", "build", "fix", "let's work on"). Asks which feature, suggests a tier (Opus/Sonnet/Haiku + effort), and reminds the user to type /model and /effort before any work starts.
---

# Model routing

Claude cannot change the session's model or effort level. Only the user can, by typing `/model` and `/effort`. This skill makes sure every feature starts on the right tier, and it always reminds the user to switch.

## When to skip

- The request is a question, explanation, or chat, not feature work.

"No record" sessions still use this skill. Model choice is unrelated to record keeping.

## Flow

1. **Ask which feature.** Once the enchiridion questions are answered, ask what feature the user is implementing, and let them explain it fully.
2. **Suggest a tier, in one question.** Use a multiple-choice question. Put the suggested tier first, marked "(Recommended)", and give a one-line reason based on the feature details.

   | Tier | Model | Effort | Fits |
   |---|---|---|---|
   | High | Opus 5.5 | `high` | architecture, tricky bugs, security, multi-file or cross-cutting changes |
   | Medium | Sonnet 5.5 | `medium` | normal features, moderate edits within a few files |
   | Low | Haiku 5.5 | `low` | typos, renames, copy edits, small config tweaks, quick lookups |

   The user can pick "Other" for any combination, including `xhigh` or `max` effort.
3. **Remind the user to switch.** Show the exact commands for the chosen tier, for example:

   ```
   /model sonnet
   /effort medium
   ```

   Tell the user to type them, then say go.
4. **Wait.** Do no work on the feature until the user confirms. Never start on a guessed or assumed tier.
5. **Repeat for every new feature.** Run steps 1–4 again whenever the user moves to a new feature in the same session. **Exception:** when building a finished plan with the `artificer` skill, treat the whole plan as one unit. Run steps 1–4 once at the start, then again only if a later feature is noticeably harder or easier than the tier already chosen.
