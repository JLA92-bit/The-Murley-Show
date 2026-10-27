# Spin and Solve (`spin-solve`)

**Inspired by:** Wheel of Fortune
**Wave:** 4 · **Modes:** Solo, Teams · **Players:** 2-6 (up to 6 teams) · **Length:** 15-20 min · **Effort:** Medium
**Phone features:** `swipe-spin`, `letters`, `text`, `choices`

## Pitch
Swipe your phone hard to spin the wheel on the TV, call letters, and solve the puzzle before anyone else.

## Intro and presentation
- **Title sequence:** a giant wheel spins up from a blur to full colour, letters tumble out of it onto a light-up board, and "SPIN & SOLVE" flips into place tile by tile.
- **Signature moment:** the wheel itself - a physics-feeling ease-out with ticking pegs, a flapper that bends, and a dramatic slow crawl over Bankrupt.

## How to Play lines
- On your turn: Spin, Buy a Vowel or Solve.
- Swipe the wheel on your phone - the harder you swipe, the bigger the spin.
- Each letter in the puzzle earns the wedge's value.
- Bankrupt wipes your round score. Solve to bank it.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| puzzles | 4 | 3-6 |
| vowelCost | 250 | 100-500 |
| bonusRound | on | on, off |

## Flow
1. **TURN** - TV: the 4 x 14 puzzle board, category, used letters, wheel. Current player: `choices` Spin / Buy a Vowel (only if round cash >= vowelCost) / Solve. 20 s, then auto Spin.
2. **SPIN** - Phone: `swipe-spin`. Server converts swipe speed (clamped 0.5-4 px/ms) to spin strength, adds seeded jitter, picks the final wedge, sends `{ wedge, rotations, durationMs }` to the TV which animates to land exactly there.
   Wedges (24): values 300-900 in 50s, 2 x Bankrupt, 1 x Lose a Turn, 1 x Mystery (500 or Bankrupt 50/50 on reveal), 1 x 1000.
3. **CALL** - Phone: `letters` (consonants not yet used). Each occurrence lights up on TV with a ding; earn wedge x count. Letter not present or already used: turn passes.
4. **BUY** - `letters` (vowels). Pay vowelCost, reveal; turn continues if present.
5. **SOLVE** - `text` 20 s. Normalised compare to the phrase. Right: bank round cash (minimum 500) and next puzzle. Wrong: turn passes.
6. Each puzzle = one round (`ctx.endRound()`).
7. **BONUS** (top banked player, if on) - R S T L N E revealed; player picks 3 consonants + 1 vowel (`letters`), then 15 s `text` to solve. Prize 2000.

## Modes
- **Solo:** up to 6 players take turns; extra players become audience and can predict the solver.
- **Teams:** up to 6 teams; team members rotate as the active spinner each turn.

## Scoring
- Banked cash is awarded as points when a puzzle is solved. Bonus: +2000.

## Content
`content/spin-solve/puzzles.json`:
```ts
z.array(z.object({ id: z.string(), rating: z.enum(['G','PG','M']),
  category: z.string(), phrase: z.string().regex(/^[A-Z0-9 '&!?,-]+$/).max(52) }))
```
Launch: 300 puzzles (Aussie sayings, places, food, movies, phrases).

## Edge cases
- Phrase that doesn't fit 4 x 14: rejected by the content loader.
- Active player disconnects: turn passes after 10 s.
- All consonants used: Spin disabled.

## Done when
- Board layout wraps words onto 4 rows of 14 without splitting words, centred.
- Letter counts and earnings are correct; repeated letters lose the turn.
- Bankrupt sets round cash to 0 and passes the turn; banked cash is untouched.
- Vowel purchase deducts cost and is blocked when cash is too low.
- Swipe speed maps monotonically to rotations, and the TV lands on the server's wedge.

## Notes for Claude
- Animate the wheel with an ease-out over `durationMs` computed so the final angle is exactly the wedge centre plus a small random offset inside the wedge.
