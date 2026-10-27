# Last One Standing (`last-one-standing`)

**Inspired by:** The Weakest Link, 1 vs 100
**Wave:** 5 · **Modes:** Solo · **Players:** 4-16 · **Length:** 15 min · **Effort:** Medium
**Phone features:** `choices`, `vote`, `custom:last-one-standing/mob`

## Pitch
Elimination trivia - but knocked-out players join the Mob and use sabotage to bring down the survivors.

## Intro and presentation
- **Title sequence:** a ring of spotlights shines on a circle of avatar podiums, they snap off one by one until a single light remains, and "LAST ONE STANDING" appears in that beam.
- **Signature moment:** eliminations - the knocked-out player's podium sinks into the floor and their avatar reappears in the Mob gallery wearing a mischievous mask.

## How to Play lines
- Everyone answers the same question. Fast and right scores most.
- The lowest scorer each round is knocked out.
- Knocked out? You join the Mob - answer right to earn sabotage.
- Last one standing wins.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| questionsPerRound | 5 | 3-7 |
| eliminate | lowest | lowest score, room vote |
| questionSeconds | 12 | 8-20 |

## Flow
1. **QUESTION** - TV: question and 4 options, survivors' avatars. Survivors: `choices`. Mob: `choices` too.
2. **REVEAL** - Correct answer, who got it, speed ranking.
3. **SABOTAGE** (between questions, if Mob has tokens) - Mob phones: `custom:last-one-standing/mob` - pick a sabotage and a target survivor, 8 s. Majority target wins; each sabotage costs 1 token from each voter.
   - **Scramble:** target's options shuffle every 2 s next question.
   - **Shrink:** target's timer -4 s.
   - **Fake Tip:** target's phone shows "The Mob says: C" (a random wrong option).
4. **ELIMINATION** - After `questionsPerRound`: lowest round score is out (ties: slowest total time). Vote variant: survivors `vote` someone off; TV shows each round's strongest player first. `ctx.endRound()`.
5. **FINAL** - Last 2 play 5 head-to-head questions. Most right wins (sudden death if tied).

## Scoring
- Correct: +100 + speed bonus (0-50 by fraction of time left).
- Mob correct: +50 and 1 sabotage token.
- Winner: +500. Runner-up: +200.

## Content
Reuses `content/the-ladder/questions.json` (difficulty 3-8).

## Done when
- Elimination removes the lowest round scorer, ties broken by total time.
- Sabotage effects apply only to the chosen target and only for the next question.
- Mob earns one token per correct answer.

## Notes for Claude
- Phones must not leak the real option order to the target under Scramble: send a shuffled order each tick.
