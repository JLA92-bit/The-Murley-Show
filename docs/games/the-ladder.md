# The Ladder (`the-ladder`)

**Inspired by:** Who Wants to Be a Millionaire?, Hot Seat
**Wave:** 4 · **Modes:** Solo · **Players:** 3-16 · **Length:** 15-25 min · **Effort:** Medium
**Phone features:** `choices`, `vote`

## Pitch
One player climbs a 12-step ladder in the hot seat. Everyone else is the lifeline - and scores points for helping well.

## Intro and presentation
- **Title sequence:** the camera rises up a glowing ladder of values, spotlights converge on a single chair, and "THE LADDER" lights up step by step to a tense synth pulse.
- **Signature moment:** the lock-in: the board dims, a heartbeat thumps, and the chosen answer pulses orange before flashing green (with a fanfare) or maroon (with a low boom).

## How to Play lines
- One player sits in the hot seat and answers questions that get harder.
- Use lifelines: Ask the Room, 50:50 or Phone a Friend.
- Walk away any time with what you've got, or risk it all.
- Everyone else secretly answers too, and earns points for being right.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| climbsPerGame | 3 | 1-6 |
| steps | 12 | 8, 12, 15 |
| questionSeconds | 30 | 20-60, off |
| hotSeatPick | fastest-finger | fastest-finger, rotate |

## Flow
1. **FASTEST_FINGER** (if `hotSeatPick` = fastest-finger) - TV: "Put these in order" with 4 items. All non-previous hot-seaters: `custom:the-ladder/order` (drag to reorder, submit). Fastest correct order takes the hot seat. Nobody correct: fastest closest (most items in place).
2. **QUESTION** - TV: ladder on the right (values, safe havens at steps 4 and 8 highlighted), question + 4 options. Hot seat phone: `choices` with confirm ("Final answer?") plus lifeline buttons and Walk Away. Everyone else: `choices` labelled "Your secret guess", lock in silently.
3. **LIFELINES** (once each per climb):
   - **Ask the Room:** other phones vote (`choices`, 10 s); TV shows AnswerBars.
   - **50:50:** removes two wrong options on the hot seat phone and TV.
   - **Phone a Friend:** hot seat picks a player (`vote`); that player gets the question on `choices` with a 20 s timer and a "Confidence" slider; only the hot seat phone sees the result.
4. **LOCK** - Dramatic pause 2-4 s (longer at higher steps), music sting.
5. **RESULT** - Right: climb. Wrong: drop to last safe haven, climb ends. Walk Away: keep current value. Top step: winner fanfare.
6. Next climb with the next hot-seater. After `climbsPerGame` climbs, `ctx.endGame()`. Each climb is one round (`ctx.endRound()`).

## Scoring
- Ladder values (12 steps): 100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000 shown on TV. Night points use rank, so raw size doesn't matter; award `value / 100` points to the hot seat.
- Secret guessers: +10 per correct guess.
- Ask the Room: +20 to each voter whose vote matched the correct answer if the hot seat followed the majority.
- Phone a Friend: +30 to the friend if right.

## Content
`content/the-ladder/questions.json`:
```ts
z.array(z.object({
  id: z.string(), rating: z.enum(['G','PG','M']),
  difficulty: z.number().int().min(1).max(12),
  question: z.string().max(160),
  options: z.array(z.string()).length(4),   // first is correct
  fact: z.string().optional()               // shown after reveal
}))
```
Plus `content/the-ladder/order.json` for fastest finger: `{ id, prompt, items: string[4] }` in correct order. Launch: 600 questions (50 per difficulty), 60 order questions.

## Edge cases
- Hot seat disconnects: pause 30 s, then auto Walk Away.
- Fewer than 3 players: Ask the Room shows 1-2 votes; still allowed.

## Done when
- Lifelines can each be used once per climb and 50:50 removes exactly two wrong options.
- Wrong answer drops to the last safe haven; walk away keeps the current value.
- Fastest finger picks the fastest fully-correct order, else the most items in place.
- Secret guess and helper points are awarded as listed.

## Notes for Claude
- Reveal suspense: TV dims the board and plays a heartbeat loop during LOCK. Use `RevealSequence`.
