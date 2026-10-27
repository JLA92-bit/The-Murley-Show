# Pick Me! (`pick-me`)

**Inspired by:** Taken Out, Perfect Match (family-friendly version)
**Wave:** 5 · **Modes:** Solo · **Players:** 4-12 · **Length:** 10-15 min · **Effort:** Low
**Phone features:** `text`, `choices`, `vote`

## Pitch
One chooser is looking for the perfect road-trip buddy (or zombie-apocalypse partner). Contestants answer silly questions anonymously - the chooser eliminates until one is left.

## Intro and presentation
- **Title sequence:** a row of podiums with mystery letters lights up, confetti cannons fire, and "PICK ME!" bounces in with a cheesy game-show jingle.
- **Signature moment:** the unmasking - an eliminated answer card flips to reveal its author with a sad trombone, while the survivors' cards glow brighter.

## How to Play lines
- The chooser gets a scenario, like "Pick your camping buddy".
- Everyone else answers the chooser's questions anonymously.
- The chooser knocks out answers they don't like, one by one.
- Last one standing is the perfect match!

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| choosers | 2 | 1-4 (each is one round) |
| answerSeconds | 45 | 30-60 |

## Flow
1. **SCENARIO** - Chooser (rotation). TV: scenario card. Chooser phone: `choices` of 3 scenarios.
2. **QUESTION** - Chooser picks one of 3 questions (`choices`) or types their own (`text`). Contestants: `text` answer.
3. **LINE_UP** - TV: answers labelled A, B, C... in random order, no names. Chooser: `choices` to eliminate one, plus an optional reason from quick buttons ("Too weird", "Not enough snacks").
4. **UNMASK** - The eliminated answer's author is revealed with a sad trombone.
5. Repeat QUESTION -> UNMASK until one remains (with 7+ contestants, eliminate 2 per question). **MATCH!** - fireworks. Before the reveal, the chooser predicts who wrote the winning answers (`vote`). `ctx.endRound()`.

## Scoring
- Contestant +50 per question survived; the match +300.
- Chooser +150 if their prediction was right.

## Content
`content/pick-me/scenarios.json` `[{ id, rating, text }]` (40) and `questions.json` `[{ id, rating, text, scenarioTags }]` (200). All friendship and silly, never romance.

## Done when
- Answers are shown anonymously in random order.
- With 7+ contestants two are eliminated per question.
- Chooser prediction scoring works.

## Notes for Claude
- Run the family filter on contestant answers (profanity list) and let the VIP hide an answer.
