# Bluff Busters (`bluff-busters`)

**Inspired by:** Would I Lie to You?
**Wave:** 4 · **Modes:** Solo, Teams · **Players:** 3-12 · **Length:** 15-20 min · **Effort:** Low
**Phone features:** `text`, `secret`, `vote`, `choices`

## Pitch
Read out a "fact" about yourself and defend it. Is it true or a total bluff? The room decides.

## Intro and presentation
- **Title sequence:** a lie-detector needle scribbles across graph paper, spikes wildly, and "BLUFF BUSTERS" is stamped on in a red rubber stamp with a thunk.
- **Signature moment:** the verdict - a polygraph scroll prints across the TV and stops on a giant TRUE (green) or LIE (maroon) stamp.

## How to Play lines
- First, everyone types two true, surprising facts about themselves.
- On your turn your phone tells you to defend a true fact or a lie.
- Everyone grills you with questions, then votes Truth or Lie.
- Fool the room to score big.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| defendSeconds | 75 | 45-120 |
| turnsEach | 1 | 1-2 |

## Flow
1. **SETUP** - All phones: `text` x2 "A true fact about you that people might not believe" (60 s total). TV: "Gathering secrets..."
2. **CARD** - Teller (rotation) phone: `secret` showing the statement and TRUE or LIE in big letters. 50/50 seeded pick: their own true fact, or a lie from the content pack (rewritten in first person). TV: statement and teller avatar. 5 s.
3. **GRILL** - Teller tells the story out loud. Others' phones: "Ask a question" button which queues their name on the TV. TV: timer, question queue. `defendSeconds`.
4. **VOTE** - Others: `choices` Truth / Lie, 15 s.
5. **REVEAL** - Drumroll, TRUE or LIE stamp, votes shown. `ctx.endRound()`.

## Modes
- **Solo:** as above.
- **Teams:** the teller's own team votes too but scores nothing; opposing teams vote as a team (majority of members).

## Scoring
- Correct voter: +100.
- Teller: +75 per voter fooled.

## Content
`content/bluff-busters/lies.json`: `[{ id, rating, text }]` - believable personal statements, e.g. "I once got stuck on a chairlift for an hour". Launch: 150.

## Edge cases
- A player didn't submit facts: they always get a lie.
- Fewer than 3 voters: points still awarded.

## Done when
- Each player is teller `turnsEach` times.
- A teller never gets another player's fact.
- Scores match the rules above in solo and teams.

## Notes for Claude
- Store facts only in memory for the room; never in the database.
