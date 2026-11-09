# AI-sounding patterns (the Crystal Lake check)

A rough heuristic, not an AI detector. Count each phrase once, under the first
pattern it matches (in the order below), report one line of counts, and fix them
in the rewrite. A word on both lists below counts once, under
Buzzwords; "Parallel threes everywhere" counts under Lists of three; even rhythm
counts as 1 per text. The first five definitions match `arbiter`'s AI-writing scan
(`arbiter/references/scoring-rules.md`); keep the two in sync.

## From the arbiter scan
- **Buzzwords:** seamless, leverage, cutting-edge, AI-powered, personalized, real-time insights, holistic, revolutionize, game-changing, empower, innovative. Count inflections (leverages, empowering). Do not count "platform".
- **Lists of three:** exactly three parallel items in a row, including three-part inspirational closers. Longer enumerations (feature or tool lists) are not counted. Fix only when the content does not really have three items; keep it when it does.
- **Boilerplate:** a sentence that names nothing specific the writer did or will do (for example "driven by one goal: to make a lasting impact"). In a chat message, stiff formula lines count ("I would like to inform everyone that", "Thank you for your cooperation and understanding"). A plain "thanks" or a plain "hi" does not.
- **Repeated phrases:** the same phrase of eight or more words in two places, or the same sentence reused.
- **Unsourced statistics:** a number or comparative claim with no named source in the text. Flag it for the user; never fix it by inventing a source. Don't flag a figure just because it is well known; flag figures the text gives no source for, in one line.

## Things that read as generated
- **Genre verbs and adjectives:** unlock, unleash, supercharge, elevate, empower, streamline, seamless, effortless, robust, cutting-edge, next-generation, world-class, all-in-one, blazing fast. Replace only if the meaning survives; if the word is the user's actual claim (for example "robust"), keep the meaning in plainer words.
- **Em dashes:** any em dash counts as one tell in the check. Crystal Lake output uses none; use a full stop or a comma.
- **Parallel threes everywhere:** three features, three reasons, three steps in a row. Use the number the content actually has.
- **Fake-editorial labels:** headings like "The details" or "Our philosophy" when a plain topic would do.

## Added for prose
- **Stiff signposts:** furthermore, moreover, in conclusion, it is important to note, it is worth noting, in today's fast-paced world, delve into, navigate the landscape of. These are tells. The user's own casual signposts ("Another issue is...", "Finally,...", "Together,...") are fine and are used in the English essay voice.
- **"Not just X, it's Y"** and similar contrast templates ("more than just", "not only... but also") used as a habit. Fix by stating the point directly, not by using another contrast.
- **Even rhythm:** most sentences about the same length, or every paragraph the same shape (claim, three supports, summary).
- **Stacked hedges:** may potentially, could possibly, it can be argued that, generally tends to.
- **Summary closers:** a final sentence that restates the paragraph ("Overall, ...", "In summary, ...") with nothing new in it.
- **Empty praise or framing:** "a crucial aspect", "plays a vital role", "a testament to", "a crucial reminder".

## Taglish tells
Check these when the source text is Taglish, and avoid them in a Taglish rewrite:
- Over-formal Tagalog that nobody texts ("Ipinababatid ko po", "ang inyong pang-unawa", "nararapat lamang").
- Machine-translated phrasing: word-for-word English structure with Filipino words swapped in.
- Filler stuffing: "kasi", "naman", "talaga", "po" in every sentence.
- Translating technical terms that people say in English (meeting, deadline, prototype).
- English stiff signposts and boilerplate closers, as in the lists above.

## What to leave alone
- Technical terms, names, quotes, numbers and citations.
- A pattern the user used on purpose in their own sample.
- Words that only look like tells in context (a real "platform" in a platform product).
