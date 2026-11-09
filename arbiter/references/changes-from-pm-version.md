# Changes from the PM's original version

Original: `scoring.md` (the method) and `report.md` (a sample output), neither
published here, read on 2026-11-09. Arbiter was built on 2026-11-09 and
tuned through several rounds of simulated test runs.

Tags: **[PM]** = needs the PM's review because it changes how a score comes out.
**[user]** = a decision the user made. **[clarity]** = fills a gap without
changing the intent of the original.

If the PM updates `scoring.md`, compare it against this list before refreshing
the bundled copy.

## Kept as in `scoring.md`

- The scale (0 to 4), the formula (weight x rating / 4), and the 0-100 total.
- The eight default criteria and their weights.
- The profile adjustments for startup pitch and government hackathons.
- The red flags and their cap values (40, 60, 70) and the Demo and Sponsor tech
  zeroing rules, apart from the clarifications below.
- The proposal lens: nothing loses points for lacking a prototype, and a plan
  that cannot work with its data or time still loses points.
- "Ask which event and track, and whether the rubric is published" before scoring.

## Taken from `report.md`

- The requirements check, kept separate from the score.
- First, after-research and final ratings (arbiter shows first and final).
- The comparison with past winners.
- The AI-writing scan (not scored). Arbiter added definitions so counts can be
  repeated **[clarity]**.
- A limits section.

## Changed from the original

### Output and behavior
1. **Gaps, not fixes [user].** `scoring.md` ends with "the three fixes worth the
   most points" and `report.md` gave five ordered fixes ("pick one of the two products",
   "name the one loop to build first"). Arbiter names the missing anchor element
   and its point cost, and never proposes ideas, features, names, wording or
   choices, on any hackathon. This follows the user's rule that ideation is the
   team's job.
2. **Nothing written yet [user].** A one-line idea is not scored. Arbiter offers
   `riddlemaster` instead.
3. **Bundled copy [user].** The rules live in the skill folder with a copy date,
   and are refreshed from the repo only on request, after asking.
4. **Questions and disputes.** If a rating is disputed, the anchors decide and
   Arbiter says what evidence would move it. It re-scores on new evidence
   **[clarity]**.

### Scoring mechanics
5. **Order of operations [clarity].** Rate, apply rating-changing flags, sum,
   rescale if needed, then apply total caps to the rescaled total. The lowest cap
   wins. The original did not say.
6. **Rescaling [PM].** `scoring.md` has no rescaling. `report.md` rescaled one entry
   from 45/85 to 53 after dropping Sponsor tech. Arbiter allows it only when a
   criterion cannot be scored or the event does not score it, shows raw and
   rescaled totals, and never rescales a published rubric.
7. **Whole numbers and rounding [clarity].** Ratings are whole numbers. The
   headline total rounds half up, points show two decimals.
8. **Cap triggers [PM].**
   - 40 cap: only a confirmed hard-rule break. Open or unverified items do not
     trigger it.
   - 60 cap: only when no flow or feature is described anywhere. A feature list
     with no flow is a 1.
   - 70 cap: the original says "cannot name a specific user". Arbiter fires it
     only when no user or group is named, or the group has no identifiable
     referent ("students at our university"), and then rates Problem and user 1.
9. **"Source" defined [clarity].** A named document, dataset or study, or a
   self-run survey with a stated size. On a published rubric, the limit
   carries to the whole line holding the content.
10. **Gap ranking [clarity].** Points only a prototype can earn are excluded. A
    binding cap takes a slot, valued as the score without the cap minus the capped
    score. Gap points use rescaled values when rescaling applies. Ties break by
    weight, then criterion order.
11. **Unknowns [clarity].** Silence in the proposal is missing. Something nobody
    can confirm (track, format rules) is unverified, not rated down and not
    credited. "Open" means not yet due.
12. **Unknown event [clarity].** After asking once, use the default profile and
    drop Sponsor tech.
13. **Research blocked [clarity].** The final ratings copy the first and are
    labeled proposal-only.

### Anchors
14. **Problem and user [clarity].** Added a 1 for a group with no referent, "everyone"
    as a 0, and said a self-run survey is not first-hand evidence by itself.
15. **Impact and fit [PM].** "Scale for the Philippines" became "scale for the
    event's own region". For international events, use the population the
    proposal itself targets and require it to be quantified.
16. **Demo and execution [PM].** Added definitions of 1, 2 and 0. A 3 now needs a
    described flow, named inputs, a fallback and a build order. The original's 3
    named only inputs and a fallback. A 4 needs a prototype or recording that is
    attached or linkable. A statement that one exists is not proof.
17. **Sponsor tech [PM].** A 4 needs the proposal to name a platform-specific
    capability beyond the product category, or research to confirm one. Otherwise
    it holds at 3.
18. **Presentation [PM].** Added anchors for 2 and 3. Format items (lengths, video,
    repo history, AI disclosure) count only when the event requires them and a
    proposal can show them.

### Profiles
19. **Sponsor-prize profile [PM].** The original says to raise Sponsor tech to 25
    without saying what shrinks. Arbiter takes the 10 points pro rata from the
    other seven: 13, 13, 18, 25, 9, 9, 4, 9.
20. **IDOL mapping [PM].** Not in the original. Innovation maps to criterion 5,
    Functionality to Demo plus Scope, Impact to criterion 2 plus the sourced-number
    part of criterion 1, Technical Challenge to the "concrete specifics" part of
    Demo, and Presentation to criterion 8. Criteria with no IDOL line carry no
    points and do not trigger rescaling. A line fed by two criteria gets one
    rating, using the lower part.

### Winner comparison
21. **By pattern only [user].** Never list a winner's features as things the
    proposal lacks. "No close winner" is allowed, with the checklist used alone,
    and it may mean thin data rather than novelty.
22. **Philippine section [clarity].** The Philippine-specific judging findings apply
    only to Philippine events.
23. **Past IDOL winners.** Kept as one-line pattern summaries, not feature lists.

### Other
24. **Fallbacks.** If a fallback seems to bypass a stated guardrail, note it under
    Limits. Lower Trust only if the proposal contradicts itself.
25. **Precedence.** `SKILL.md`, then `scoring-rules.md`, then `winner-patterns.md`,
    then the sample report.

## Open for the PM to decide

Items 6, 8, 15, 16, 17, 18, 19 and 20 are the ones that can change a score.
The report notes whenever one of them mattered. Tag them as approved here once
the PM confirms them, or undo them in `scoring-rules.md`.

Also unresolved from the original: `scoring.md` says a plan tops out at 3 on Demo
and execution, while `report.md` said a plan naming its first loop and target
accuracy would earn a 4. Arbiter follows `scoring.md`.
