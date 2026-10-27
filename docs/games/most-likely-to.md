# Most Likely To (`most-likely-to`)

**Inspired by:** the classic "Who's most likely to..." party game
**Wave:** 1 · **Modes:** Solo · **Players:** 3-16 · **Length:** 5-8 min · **Effort:** Low
**Phone features:** `vote`

## Pitch
"Who's most likely to survive a week without their phone?" Vote for someone in the room - and score by agreeing with the majority.

## Intro and presentation
- **Title sequence:** a trophy cabinet swings open, silly award ribbons flutter out, and "MOST LIKELY TO..." unrolls on a red ribbon with a drumroll.
- **Signature moment:** the result - avatars race up a vote chart and the winner gets a rosette ribbon pinned on their avatar with their new title.

## How to Play lines
- A question appears.
- Vote for the player most likely to do it.
- Score points if you picked who the room picked.
- The winner of each question earns a silly title.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| questions | 10 | 6-20 |
| voteSeconds | 15 | 10-25 |
| allowSelfVote | on | on, off |

## Flow
1. **PROMPT** - TV: the prompt in big text. Phones: `vote` (all players, avatars).
2. **RESULT** - TV: AnswerBars with avatars, the top pick gets a title badge ("Most likely to adopt 12 cats") that shows next to their name for the rest of the night. `ctx.endRound()` every question.

## Scoring
- +100 if your vote matches the top pick (ties: any of the tied).
- The top pick gets 0 points but a badge.

## Content
`content/most-likely-to/prompts.json` `[{ id, rating, text, badge }]`. Launch: 300 kind, funny prompts. Never mean-spirited.

## Done when
- Votes tally correctly with ties.
- Badges persist to the night leaderboard view.
- Self-vote obeys the setting.

## Notes for Claude
- Build this right after Buzz Blitz: it's the simplest game and a good test of ratings.
