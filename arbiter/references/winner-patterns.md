# Winner patterns and judge findings

Condensed from the project manager's `research.md` and `judges.md` (not published here).
Copied on: 2026-11-09. Sources and full entries are in those files.

Use this to compare by pattern and to spot gaps. Never use it to suggest what
the team should build, name or write, and never list a winner's features as
things the proposal lacks. If no winner is close, say "no close winner" and use
the checklist alone. No published data exists on losing entries, so anything
about why entries lose is partly inferred.

## Cross-cutting patterns

1. The builder is close to the problem: a lawyer (CrossBeam), a road ministry employee (TARA), a cardiologist (PostVisit), a blind founder (FROM YOUR EYES). When the team is not the user, winners show direct user contact.
2. One user, one workflow, one number: a 90%+ permit rejection rate (CrossBeam), $1 to 4 million per road study (TARA), 1/20 the price of a smart cane (Shepherd).
3. The demo works end to end on real inputs and cannot fail on stage: real permit letters, real dashcam footage, cached demo data (TARA), a rule-based fallback (Conductr).
4. Sponsor tech sits in the core, and one build can win several prizes: ETHPark-QR took four awards, Shepherd three. Thin SDK wrappers tend not to win.
5. Narrow and deep beats broad and shallow: CrossBeam shipped two flows and left the rest as roadmap. Write-ups give specifics such as latency and test counts.
6. Trust and safety objections are answered before judges ask: physician in the loop (PostVisit), motor stops if the link drops (Shepherd), no logs (Jayu).
7. Many winners are not first attempts: FROM YOUR EYES, Reflect and Latinum had prior work. Short events restrict code, but research, interviews and data prep are usually allowed.
8. Civic, climate and warning winners focus on the last mile: every ITU EW4All flood and storm finalist was about delivering a warning people understand or turning a forecast into a decision.

## Comparison checklist (yes, partly, or no)

Report results by item number. Do not turn a "no" into a recommendation.

1. Can the problem be stated as one named user, one task they cannot do today, and one number for the cost?
2. Does someone on the team have first-hand contact with the problem, or interviews or data from real users?
3. Is the output something the user already acts on (letter, report, route, alert, payment, work order)?
4. Does the plan run the full loop on a real input from the problem domain, within the time slot?
5. Does the demo plan survive API or WiFi failure (cached data, fallback mode, recorded backup)?
6. Is the sponsor or host tech in the core, using a platform-specific feature a sponsor judge can see in under a minute?
7. Can one build qualify for more than one prize track without bending the idea?
8. Is the scope cut to one or two flows that work completely, with the rest labeled roadmap?
9. In a crowded category (agent wallets, generic chat, dashboards), what specific workflow or missing step makes it different?
10. Are trust and safety risks (money, health, physical safety, personal data, misinformation) answered by a visible guardrail?
11. For warning, climate or civic ideas, does it cover how the warning reaches the person and changes what they do?
12. Does the write-up give concrete technical specifics instead of a list of tools?
13. Does the proposal map to every line of the event's actual rubric, with effort matching the weights?
14. Does the submission meet every format rule (lengths, video, slide caps, repo history, deadline, AI-use disclosure)?
15. Is there allowed pre-event work, such as research, datasets, user interviews or design?

Under the proposal lens, items 4 and 5 are about the plan. A missing prototype is not a gap.

## What judges consistently want

A working core flow; a specific problem with a named user and evidence; concrete social impact; a direct answer to the stated track; meaningful host or sponsor tech; evidence of talking to users; clear differentiation; scope that fits the time; a short story that starts with the product; a believable path to real use from an honest team.

## Common reasons entries get marked down

Over-scoping; opening with background so judges do not know what they are evaluating; a vague problem or user; ignoring or bolting on required tech, or building the whole product around the sponsor API; format violations and missing deliverables; suspicious build history; strong code with a weak idea or pitch; denying weaknesses in Q&A; overcomplicated AI pipelines.

## Philippine events only

Apply this section only when the event is Philippine-hosted. These come from a small set of rubrics, so treat them as a pattern to test.

- Social and public impact carries more points (eGovPH 35%, PSC8 45% across relevance and impact).
- Integration with the host's platform is often scored or required (eGovPH 30%; UnionBank, Alibaba Cloud PH and InnOlympics made it a condition). Panels are often the host's own staff, so fit to the host matters.
- Many national student contests are startup pitches that want a business model and traction. Check the event type first.
- Technical difficulty is rarely its own line at Philippine pitch events.
- Live pitching with long Q&A is the norm.
- Feedback is unpredictable, so map the pitch to the published criteria line by line.
- Philippine context counts as impact (offline-first, connectivity gaps, local disaster risk).

## Rubric weight reference

| Event | Type | Weights |
|---|---|---|
| Philippine Startup Challenge 8 (2023) | pitch | Viability 25, Relevance 25, Impact 20, Creativity 20, Presentation 10 |
| eGovPH Hackathon (2026) | hackathon | Social impact 35, Integration 30, Presentation 15, UI/UX 10, Reels or slides 10 |
| DOST-Wadhwani (2025) | pitch | Commercial viability 30, Inventiveness 25, Market-problem fit 15, Execution 15, Pitch 10, Economic impact 5 |
| Smart Batangas (2025) | hackathon | Innovation and relevance 30, Technical 30, Design thinking 20, Usability and feasibility 10, Pitch 10 |
| DEPDev Annex D (2026) | grant | Innovativeness 40, Feasibility 30, Impact 20, Strategic alignment 10 |

## Past IDOL winners (comparison by pattern only)

One-line summaries from the sample report. They are too thin to say why anyone
won, so use them only to check overlap of the core idea, never as a feature
list.

- 2023: consumer electricity tracking with alerts and bill estimates (UP Diliman "One"); first runner-up on leak and illegal-tapping detection.
- 2024: net-metering app on a blockchain with tokens.
- 2025: EV charging map, routing and reservation; runners-up on IoT fire safety and unattended-appliance detection.
