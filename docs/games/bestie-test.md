# Bestie Test (`bestie-test`)

**Inspired by:** Mr & Mrs, The Newlywed Game
**Wave:** 5 · **Modes:** Pairs · **Players:** 4-16 · **Length:** 15 min · **Effort:** Low
**Phone features:** `choices`, `text`, `vote`

## Pitch
How well do you really know your bestie? Predict how they'll answer questions about themselves.

## Intro and presentation
- **Title sequence:** two avatar silhouettes run towards each other, high-five in a burst of sparkles, and "BESTIE TEST" pops up inside a friendship-bracelet border.
- **Signature moment:** the match reveal - both answers spin round at once; a match fires a double-high-five animation and a choir "aww".

## How to Play lines
- You're paired up.
- One of you answers about yourself, the other predicts the answer.
- Matching answers score points for both of you.
- Swap roles every round.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| questions | 8 | 6-12 |
| pairing | random | random, VIP picks |

## Flow
1. **PAIRING** - Auto pairs (odd count: one trio where two predict). VIP can re-pair.
2. **QUESTION** - All pairs at once. TV: "What is <Subject>'s go-to takeaway?" (template with each pair's subject name on their own phones; TV shows the generic version). Subject phone: `choices` (if the question has options) or `text`. Predictor phone: same input labelled "Predict!". 25 s.
3. **CHECK** (text questions) - Subject phone sees the predictor's answer: "Close enough?" `choices` Yes / No (honour system, 8 s).
4. **REVEAL** - TV reveals each pair in turn: both answers side by side, MATCH stamp. Audience bets: before reveal, audience phones `vote` which pair will score highest overall.
5. Roles swap. `ctx.endRound()` after each question.

## Scoring
- Match: +100 to each in the pair. Pairs are awarded as a unit for ranking.

## Content
`content/bestie-test/questions.json` `[{ id, rating, template: "What's {name}'s favourite ...?", options?: string[4] }]`. Launch: 150, half with options.

## Done when
- Odd players make one trio and both predictors can score.
- Text matches use the matcher, with "close enough" override.
- Roles swap each round.

## Notes for Claude
- Pairs compete as units on the results screen; night points go to both members.
