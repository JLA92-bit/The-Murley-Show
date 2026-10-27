# <Game Name> (`game-id`)

**Inspired by:** <show or game names>
**Wave:** <1-5 or Later> · **Modes:** <Solo, Teams, Co-op> · **Players:** <min-max> · **Length:** <minutes> · **Effort:** <Low, Medium, High>
**Phone features:** <shared component screen names>

## Pitch
One or two sentences a player would hear on the How to Play screen.

## How to Play lines
- 3-5 short lines shown on the TV and phones before the game.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |

## Flow
Numbered phases. For each phase: what the TV shows, what each phone shows, what ends the phase (timer, all submitted, VIP skip), and what happens next. Call `ctx.endRound()` where a round ends.

## Modes
How Solo, Teams and Co-op differ.

## Scoring
Exact points with `ctx.award()`.

## Content
File path, JSON shape (written as a zod schema), launch quantity, writing guidelines.

## Edge cases
Disconnects, ties, nobody answers, odd player counts.

## Done when
- Testable statements. These become the vitest tests.

## Notes for Claude
Implementation hints, libraries, gotchas.
