# Scoring rules

Source: `scoring.md` (not published here), built by the team's project manager,
plus clarifications added on 2026-11-09 after test runs.
Copied on: 2026-11-09.

Items marked **[pending PM review]** go beyond the project manager's written
method and they haven't reviewed them yet. They fill gaps found in testing. Tell
the user when one of them affected a score.

Where this file differs from the original sample report, this file wins.

## Scale

Points for a criterion = weight x (rating / 4). Ratings are whole numbers.
Total is 0 to 100.

| Rating | Meaning |
|---|---|
| 0 | Missing, or contradicted by the proposal |
| 1 | Mentioned, but vague or generic |
| 2 | Present and plausible, no evidence |
| 3 | Specific and backed by evidence or a concrete plan |
| 4 | Matches what the winners did, with numbers, real inputs or proof |

A criterion's own anchor beats this general scale. Where an anchor leaves a
level undefined, use this scale. Silence in the proposal means missing.

## Default profile (build hackathon, 100 points)

| # | Criterion | Weight |
|---|---|---|
| 1 | Problem and user: one named user, one task they cannot do today, one number for the cost, first-hand contact with the problem | 15 |
| 2 | Impact and fit to the challenge: scale of the impact, answers the stated track, local context | 15 |
| 3 | Working demo and technical execution: the full loop runs on real inputs, fallbacks exist, concrete specifics (latency, accuracy, data sources) | 20 |
| 4 | Host or sponsor tech in the core: a platform-specific feature a sponsor judge can see in under a minute | 15 |
| 5 | Innovation and differentiation: why this and not the crowded generic version | 10 |
| 6 | Scope and feasibility: one or two flows done completely, the rest labeled roadmap, fits the time window | 10 |
| 7 | Trust, safety and last mile: guardrails for money, health, safety and data, and how the output reaches the person and changes what they do | 5 |
| 8 | Presentation and compliance: clear story, opens with the product, meets every format and deadline rule | 10 |

## Rating anchors

1. Problem and user: 0 is a whole sector ("climate change") or "everyone". 1 is a user group with no identifiable referent. 2 is a named user group. 3 adds the task and a number with a source. 4 adds first-hand evidence: interviews, a team member in the field, or real user data. A self-run survey counts as a source (so no unsourced flag) when its size is stated, but it is not first-hand evidence by itself.
2. Impact and fit: 2 is a believable benefit. 3 gives a quantified scale and maps to the event's track or SDGs. "Scale" is for the event's own region (the Philippines for Philippine events). For an international event, use the population the proposal itself targets and require it to be quantified. 4 shows that a specific institution or community could adopt it. **[pending PM review]** (region wording)
3. Demo and execution: rated on whether the plan is credible: clear flows, fallbacks, named inputs, and a build that fits the data, tools and time. 1 is "We will build an app" or a feature list with no flow. 2 is a described flow missing some of: named inputs, a fallback, a build order. 3 needs a described flow, named inputs, a fallback, and a build order. 4 requires a real working prototype or recording that is attached or linkable, with the full loop on real inputs and a fallback. A plan that cannot work with the data it names loses points. 0 only applies when no flow or feature at all is described anywhere in the proposal. A thin demo section in an otherwise described proposal is a 1, not a 0.
4. Sponsor tech: 1 is a logo or a decorative API call. 3 is core to the value. 4 is core and uses a feature specific to that platform, and could qualify for a second prize without bending the idea. 4 needs the proposal itself to name a platform-specific capability beyond the product category (for example "escrow" on a payments chain does not count), or research to confirm one. Without either, hold at 3. **[pending PM review]**
5. Innovation: 1 is a generic chat assistant, dashboard or agent wallet. 3 handles an unglamorous missing step that the crowded category skips. 4 is that plus a reason it was not possible before.
6. Scope: 1 is an everything platform. 3 is two flows with a clear cut line. 4 is that plus evidence it fits the window, such as a build plan by hour.
7. Trust and last mile: 3 names the main risk and a visible guardrail. 4 also shows how the warning, payment or result reaches the person and what they do with it.
8. Presentation: 2 is a product that is named but a story that is padded or unclear. 3 is the product up front, a clear story, and some numbers. 4 needs the product in the first sentence, concrete numbers, and a clean pass of the format checklist. Format items (lengths, slide caps, video length, repo history, AI disclosure) count only when the event requires them and the proposal stage can show them. **[pending PM review]**

## Calculation order

1. Rate every criterion.
2. Apply flags that change a rating (Demo to 0, Sponsor tech to 0, Problem and user held to 2 or less).
3. Compute points and sum.
4. Rescale only under the rescaling rule.
5. Apply total caps (40, 60, 70) to the rescaled total. The lowest applicable cap wins.
6. Round the headline total to a whole number, half up (32.5 becomes 33). Show points to two decimals, but add up the unrounded values.

Gap values use rescaled points when rescaling applies, and raw points otherwise. State which. Ties break by higher weight, then by criterion order. A rubric line fed by two criteria is one gap.

Total caps apply on every profile, including published rubrics. Only
single-criterion effects need a mapped line.

## Red flags and caps

| Red flag | Effect |
|---|---|
| Breaks a hard rule (late, over the length limit, missing required documents), confirmed | Total capped at 40, because these entries are cut before judging |
| No flow or feature described anywhere in the proposal (a feature list with no flow is a 1, not this) | Criterion 3 rated 0, total capped at 60 |
| Sponsor or host tech is not used at all, and the event scores it | Criterion 4 rated 0 |
| No user or user group is named at all, or the group has no identifiable referent (for example "students at our university" with no university) | Total capped at 70, and criterion 1 is rated 1 **[pending PM review]** (clarified trigger) |
| Claims with no source (statistics, "no competitors") | Flagged, and criterion 1 cannot exceed 2 |

An open or unverified requirement does not trigger the hard-rule cap; only a
confirmed break does. A named user group earns criterion 1 a 2 and does not
trigger the 70 cap.

A **source** is a named document, dataset, or study, or a self-run survey with
a stated sample size. "Studies show", "the internet" and uncited figures are
unsourced. When the unsourced-claim flag applies to a criterion with no rubric
line, its limit carries over to the whole line that holds its content.

When a proposal's fallback seems to bypass its own stated guardrail, note it
under Limits. Lower Trust only if the proposal contradicts itself outright.

## Rescaling

Only when a criterion cannot be scored, or the event does not score it, on a
non-published profile, such as Sponsor tech when the event is unknown. Rescaled = raw x 100 / (total weight
of scored criteria). Show raw and rescaled. A published rubric's weights already
total 100, so criteria without a rubric line carry no weight and nothing is
rescaled.

## Event profiles

The default weights suit a build hackathon. Use these adjustments when the event is different, or replace everything with the event's published rubric. Weights must total 100; state the final weights.

- **Startup pitch** (DICT PSC, DOST, Imagine Cup): move 20 to 30 points from criteria 3 and 5 into a new "business viability and validation" criterion.
- **Government hackathon** (eGovPH style): raise criterion 2 to 25 and criterion 4 to 25 if integration is scored, and lower criteria 3 and 5.
- **Sponsor-prize track** (Noir x Velo): raise criterion 4 to 25. Take the 10 extra points pro rata from the other seven criteria, rounded so the total is 100: 13, 13, 18, 25, 9, 9, 4, 9 for criteria 1, 2, 3, 4, 5, 6, 7, 8. **[pending PM review]** (the source does not say which criteria shrink)
- **Published rubric** (IDOL, Imagine Cup): map each of its lines to the criteria above, then use its weights.

### IDOL mapping **[pending PM review]**

IDOL's published weights: Innovation 30, Functionality 25, Impact 20, Technical Challenge 15, Presentation 10.

| IDOL line | Maps to |
|---|---|
| Innovation | Criterion 5 |
| Functionality | Criterion 3 (flow, inputs, fallback, build order) plus criterion 6 (scope and fit to the 24-hour window) |
| Impact | Criterion 2, plus the sourced-number part of criterion 1 |
| Technical Challenge | How specific the technical plan is: the "concrete specifics" part of criterion 3 (data sources, method, what is hard). Use the general scale, since no anchor exists |
| Presentation | Criterion 8 |

Default criteria with no IDOL line (1 on its own, 4, 7) carry no points and do not
trigger rescaling. If a proposal is strong there (for example interviews, written
consent), say so in the justifying lines but give no points. A flag whose target
criterion has no line carries over to the line that holds its content (the
unsourced-claim limit applies to Impact).

When one rubric line is fed by two criteria (Functionality, Impact), give the
line a single whole-number rating, using the lower of the two parts. When one
criterion feeds two lines, split its content as in the table so the same plan
is not rated twice.

## AI-writing scan (not scored)

A rough heuristic, not an AI detector. Report counts with these definitions:

- **Buzzwords:** seamless, leverage, cutting-edge, AI-powered, personalized, real-time insights, holistic, revolutionize, game-changing, empower, innovative. Count inflections (leverages, empowering). Do not count "platform".
- **Lists of three:** exactly three parallel items in a row, including three-part inspirational closers. Longer enumerations (feature or tool lists) are not counted.
- **Boilerplate:** a sentence that names nothing specific the team did or will do (for example "driven by one goal: to make a lasting impact").
- **Repeated phrases:** the same phrase of eight or more words in two places, or the same sentence reused.
- **Unsourced statistics:** a number or comparative claim with no named source.

## Limits

- The weights come from sparse data. The Philippine side rests on five recent weighted rubrics.
- A score is a rough prediction. It does not know who the judges are, and some events (eGovPH 2026) gave teams no scores at all.
- Ratings are one reviewer's judgment, applied with these anchors.
- Winner patterns are partly inferred. "No close winner" may mean the idea is new or only that the reference data is thin; say which cannot be told.
- Hard requirements come from the proposal and the session's files. A date remembered from elsewhere (for example a deadline in notes) is stated but stays unverified.
