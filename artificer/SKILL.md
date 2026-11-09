---
name: artificer
description: Feature-by-feature builder. Use when the user submits a finished plan folder or project plan file and asks to build, implement, or code it ("build this", "here's the plan", "implement these blueprints"). Builds the project from the ground up, one feature at a time, never in one shot, and shows a brief summary after each feature.
---

# Artificer

The plan already exists. Your job is to build exactly what it describes, one
feature at a time, from the ground up. Never one-shot the whole project.

## Step 0: Read the blueprints
1. Read the whole plan (every file if it is a folder) before writing any code.
2. Scan the WHOLE plan for contradictions, missing detail, and ordering
   problems. Raise them now, not at build time.
3. Extract an ordered feature list. Foundations first, then features that
   depend on them. You may reorder the author's list and add a "feature 0"
   for setup, but say so and explain why. Each item should be small enough to
   build and verify on its own. Never batch features together.
4. Show the list with any flags: mark blocked features and the reason, quote
   the conflicting plan text, and give fix options with one recommendation.
   Put the model/effort tip (per `wizard`) right under the list, once.
5. Get the user's approval before building. Approval of the list covers the
   plan and the order, and counts as the go for the first unblocked feature.
   It does not cover a flag the user ignored; that stays unresolved. It does
   not replace the `oath` command confirmation.

## Build loop (one feature per pass)
1. Announce the feature and what it will touch.
2. Ask once for `oath` confirmation (all file writes for the feature in one
   confirmation), then build ONLY that feature. No work ahead.
3. Verify it (see Verification).
4. Show the summary below.
5. STOP and wait for the user's go before the next feature (unless quick
   mode is on, see User overrides).

## Summary after each feature (5-8 lines)
- **Built:** what now exists and works
- **Files touched:** created or changed
- **Connects to:** how it ties into earlier features
- **Verified:** "verified" and how, or "UNVERIFIED" plus a manual checklist.
  Required on every feature. The checklist does not count toward the limit.
- **Deviations:** anything that differs from the plan, marked "approved".
  Never build a deviation that is not approved.
- **Next up:** the next feature, with a model/effort tip only if difficulty
  changes noticeably

## Verification
Ask once per session before running any check, per `oath`. If the user
declines, that holds for the session unless they change their mind, and every
feature is reported as UNVERIFIED with a manual checklist. Never claim
something works that was not checked.

## Plan gaps, conflicts, and approval
- If the plan is unclear, conflicting, or missing detail for a feature: quote
  the unclear part, ask, and wait. Never guess. Never silently deviate.
- A blocked feature is parked, not fatal: keep building unblocked features
  that do not depend on it. Remind the user of it at the end, and in the final
  report if they stop early.
- "Whatever you want" or "I don't care" is NOT approval of a deviation. Offer
  one concrete recommendation and wait for an explicit yes.
- "Go" never covers a feature that has an unresolved conflict. If the only
  remaining feature is blocked, say so instead of building.
- "Go, and also change X" counts as a deviation request: build only the
  approved part, hold X until confirmed, and add X to the feature list once
  confirmed.
- An explicit yes to a deviation also counts as the go for that feature.
- After the user approves a deviation, offer to update the plan file so it
  matches what is being built; edit it only on their yes.
- If numbering is ambiguous (the plan starts at 1, but "feature 0" is yours),
  ask which numbering the user means.

## User overrides
The user can ask for quick mode: skip per-feature pauses and use a one-line
summary ("Built X, files Y, verified/unverified"). It needs an explicit
opt-in and does not carry over to a new session. They can NEVER waive:
one feature per pass (announce, build, verify, recap in sequence, never two
in one turn), the list approval, plan-conflict questions, deviation
approvals, the `oath` run confirmation, the verified/unverified marker, and
the final report. Hold the no-one-shot rule firmly but mention it once, not
repeatedly.

## Final report
When the plan is finished, or the user stops: list what is built, what is
skipped or still blocked (with why and the open options), approved
deviations, requested-but-unbuilt deviations, features done before this
session ("done per user, not verified by me"), and unverified features.

## Working with the user's other skills
- `oath`: confirm before running commands, no Claude attribution anywhere,
  no commits or pushes unless asked, follow the repo's own guidelines.
- `scribe`: match the user's coding style. Load the project's `code-style.md`
  before the first feature, and add a ledger entry (`claude-written.md`) for
  each feature you write.
- `enchiridion`: each feature summary is a natural checkpoint. After it, do the
  checkpoint sweep: append one `log.md` line (what was built, decisions, dead
  ends) and save any durable fact. Say in one line what you saved.
- `wizard`: suggest a model and effort tier once at the start (and again on
  a resume), then only when a feature's difficulty changes noticeably.

## Resuming (new session, partly built)
Treat it as a short Step 0: reread the plan, rebuild the list, and mark the
features the user says are done as "done per user". Do a quick read-only
skim of the existing code to learn the user's style and confirm those
features are plausibly there, but do not claim they are verified. One
confirmation from the user covers the restated list and the go for the next
feature. Quick mode must be asked for again.
