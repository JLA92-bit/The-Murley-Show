# Buzz Blitz (`buzz-blitz`)

**Inspired by:** Jeopardy!, Hot Seat
**Wave:** 1 · **Modes:** Solo, Teams · **Players:** 2-16 · **Length:** 15-20 min · **Effort:** Low
**Phone features:** `buzzer`, `choices`, `text`, `wager`, `vote` (category board for the picker)

## Pitch
A category board quiz with a buzzer so fair it's timed to the millisecond. Buzz first, answer right, take control of the board.

## Intro and presentation
- **Title sequence:** a grid of 30 tiles flips over in a ripple from the top-left, each flashing a value, then the tiles shatter outwards and "BUZZ BLITZ" crackles in on an electric arc with a buzzer zap.
- **Signature moment:** the buzz-time readout - after every buzz the TV shows each player's reaction time in milliseconds on a sliding podium, fastest first, with a lightning bolt on the winner.

## How to Play lines
- The picker chooses a category and value from the board.
- Wait for your buzzer to light up, then smash it.
- Right answer wins the points and the next pick. Wrong answer loses half and lets everyone else steal.
- Finish with a secret wager on one last question.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| boardSize | 5x5 | 4x4, 5x5, 6x5 |
| rounds | 2 | 1, 2 (round 2 doubles values) |
| answerSeconds | 10 | 6-20 |
| finalWager | on | on, off |
| answerStyle | choices | choices (4 options), typed |
| roundMinutes | 12 | 6-20 (board ends early when time runs out) |

## Flow
1. **BOARD** - TV: category columns, values 100-500 (x2 in round 2), used cells greyed. Picker phone (random at start, then whoever last answered right): a `vote` screen listing remaining cells as "Category - value". Others: `waiting` "Picker is choosing...". 20 s, then a random cell is picked. 1 in 25 cells (seeded) is a hidden **Double Down**.
2. **CLUE** - TV: the clue on a QuestionCard, read aloud by TTS if enabled. All phones: `buzzer` disarmed; `armedAt = now + 2500 ms` (after reading). Early press = 500 ms lockout.
3. **BUZZ** - Buzzers arm. First buzz opens the 250 ms fairness window; earliest corrected time wins. TV flashes the winner and lists every buzz time in ms. No buzz in 8 s -> REVEAL.
4. **DOUBLE DOWN** (only on a Double Down cell, before CLUE) - picker alone gets `wager` (min 5, max max(score, 500)), no buzzer, only they answer.
5. **ANSWER** - Winner phone: `choices` (4 options, shuffled) or `text` (typed mode, fuzzy-checked). `answerSeconds`. Others see "Steve is answering...".
6. **JUDGE** - Right: +value, winner becomes picker. Wrong or timeout: -value/2, winner locked for this clue, back to BUZZ for everyone else (one steal round only). Second wrong or no buzz -> REVEAL.
7. **REVEAL** - TV shows the answer, who got it, buzz times. 3 s. Back to BOARD. When the board empties or `roundMinutes` pass, `ctx.endRound()`.
8. **FINAL WAGER** (after last round, if on) - TV: category only. Every player with score > 0 gets `wager` (0 to their score) for 20 s, then the clue and a private `choices`/`text` answer for 30 s. TV reveals in ascending score order: answer, wager, new total.

## Modes
- **Solo:** as above.
- **Teams:** any team member can buzz for the team; the buzzer answers. Steal goes to other teams. Final wager: team captain (first in team list) wagers, every member answers, majority answer counts (captain breaks ties).

## Scoring
- Right: `+value`, wrong: `-value / 2` (scores can go negative).
- Double Down: `+/- wager`.
- Final: `+/- wager`.

## Content
`content/buzz-blitz/*.json`, each file one category:
```ts
z.object({
  category: z.string().max(24),
  rating: z.enum(['G','PG','M']),
  clues: z.array(z.object({
    id: z.string(),
    difficulty: z.number().int().min(1).max(5),   // maps to 100-500
    clue: z.string().max(140),
    answer: z.string(),
    aliases: z.array(z.string()).default([]),
    options: z.array(z.string()).length(4)        // first option is correct; shuffle at runtime
  })).min(5)
})
```
Launch: 30 categories x 5 clues. Mix of Australian and general topics (Aussie Snacks, Animals, Movies, Science, Sport, Music, Food, Geography, Kids TV, Words). Wrong options must be plausible.

## Edge cases
- Buzz winner disconnects during ANSWER: treat as timeout, no penalty.
- Exact tie in corrected time: earlier arrival wins.
- Picker disconnects in BOARD: next highest score picks.
- Board cells with no clue at a difficulty: generate from adjacent difficulty.

## Done when
- With phones offset by -120 ms, +80 ms and 0 ms and network delays 30-200 ms, the earliest real press always wins.
- An early press locks that phone for 500 ms and does not count.
- Wrong answer deducts half and allows one steal by others only.
- The board ends the round when empty or when roundMinutes pass.
- Double Down only lets the picker answer and clamps the wager.
- Final wager clamps to 0..score and players with score <= 0 sit out.
- Teams mode: any member's buzz counts for the team.

## Notes for Claude
- This game builds the reusable buzz flow: put `runBuzzRound()` helpers in `packages/engine/src/helpers/buzz.ts` for Hive Mind, Hunted and Emoji Decoder to reuse.
- Typed answers: normalise (lowercase, strip punctuation and leading "the/a/an"), then accept exact, alias, or Levenshtein distance <= 2 for answers over 5 characters.
