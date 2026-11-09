---
name: crystal-lake
description: Anti-AI-slop pass ("Crystal Lake"). After writing a non-code deliverable for the user (an essay, report, email, proposal, or an answer meant to be pasted or submitted), offer to run it through Crystal Lake, which checks for AI-sounding patterns and rewrites it in the user's own voice. Also run it directly when the user says "crystal lake", "humanize this", "make it sound like me", "polish this", or "does this sound like AI". Not for code, casual chat, quick answers, or option lists.
---

# Crystal Lake

Makes written text read like the user wrote it, and removes the patterns that
make text read as machine-generated. It edits wording and rhythm. It never
changes facts or claims.

Read `references/ai-tells.md` (the pattern list) and `references/voices.md`
(the voices) before running.

## Offering it
- After you write a qualifying deliverable, end with one line, placed last
  (after any other required ending):
  "Want me to run this through Crystal Lake? (AI-pattern check and a rewrite in your voice)"
- **Qualifying:** text meant to be sent or submitted, about three sentences or
  longer: essays, reports, emails, proposals, messages to other people. A
  mixed answer (for example a README with code) qualifies only if more than
  half of its words are prose.
- **Not qualifying:** code, casual chat, quick factual answers, lists of
  options, one or two sentence replies, or anything the user only wants to read.
- **Once per deliverable.** A new recipient or a new document is a new
  deliverable. Edits to the same text are not. If the user declines or ignores the
  offer, don't offer again for that text. If they say "stop offering", stop for
  the rest of the session.
- **Project rules win.** If the project's memory says Claude must not draft
  ideas or problem/solution text (for example when a teammate owns ideation, or
  an event requires the team to understand and disclose AI help), don't
  offer there. Never rephrase text Claude drafted for those sections, even if
  the user "approves" it; the user rewrites it in their own words and
  Crystal Lake rephrases that version. If project rules can't be read (memory
  not loaded), don't offer; run only on request. Direct runs on the user's own
  writing are still allowed under project rules.

## Running it directly
"Crystal lake", "humanize this", "make it sound like me", "polish this" and
"does this sound like AI" run the pass with no offer. If no text is given, use
the most recent qualifying text, confirm that in one line, and ask only if
several candidates exist. Claude-written text is normal input, except Claude-drafted text in projects
whose rules forbid it. "Polish this" is a full pass unless the user says
grammar only. When another
skill flagged text (for example `arbiter`'s scan), run it only on text the user
wrote.

## Running it
1. **Voice.** Ask in one line: English essay voice, Taglish, or a sample the
   user pastes. Skip the question if the user already said. Keep the register
   to the destination (a formal report stays formal even with a casual sample),
   or ask.
2. **Check.** Scan with the definitions in `ai-tells.md`. Count each phrase
   once, under the first pattern it matches. Say plainly that this is a pattern
   check, not a real AI detector.
3. **Rewrite** in the chosen voice (see `voices.md`):
   - Keep every fact, number, name, source, and the meaning. Keep technical
     terms.
   - Don't make any claim stronger or weaker, and don't add framing the user
     didn't write.
   - When removing a "not just X, it's Y" contrast, state the point directly.
     Don't swap in another contrast template.
   - Keep the length within about 15 percent or 20 words, whichever is larger.
     Casual or Taglish text may run shorter; never pad it with filler, and say
     so in the summary.
   - Vary sentence length. No em dashes.
   - Never add experiences, quotes, numbers, examples, or details the user
     did not give.
4. **Show** the cleaned text first, then up to 5 lines:
   - the patterns found and removed, with counts
   - figures or claims with no source in the text, for the user to check (flag
     only; don't invent a source)
   - a reminder to read it aloud and change anything that doesn't sound like
     them

   Then, on separate lines outside that count: the disclosure line (see
   Guardrails), the not-a-detector note, and a note if the rewrite came out
   shorter.

## Guardrails
- **No promises about detectors.** Never say a text will pass GPTZero, Turnitin,
  or any other tool, and never invent a detector score. Detectors are
  unreliable and results vary. If the user asks for a pass, say that, then do
  the normal pattern check and rewrite with no tuning.
- **Don't evade rules.** If the destination bans AI help, or the user says they
  want to hide AI use from a rule ("so she can never tell"), don't do the
  rewrite. Say that rule applies, and offer to help outline from the user's own
  notes. A ban on AI writing help covers any rewrite of the user's text, including
  light edits. If the user says the instructor permits AI help (with
  disclosure), treat the ban as lifted. Otherwise, making AI-drafted text read
  like the user is allowed: the
  line is the rules and the user's stated intent, not a guess about motives.
- **Disclosure.** If the text is for school, a hackathon, or any named submission or checker
  (such as Turnitin), say once per conversation, at run time, in one line, that any
  AI-use disclosure rule still applies.
- **Don't invent.** If the user asks for a personal story or detail to make it
  "sound real", decline that part and offer to rephrase what they actually
  gave. Do the rest of the rewrite.
- Keep it short. No lecture.

## Working with the user's other skills
- `oath`: confirm before running any command. This skill needs none; reading
  its reference files and memory is not a command.
- `enchiridion`: read the project type and project rules from memory before
  offering.
- `arbiter`: uses the same pattern definitions for its AI-writing scan.
