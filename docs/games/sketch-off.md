# Sketch Off (`sketch-off`)

**Inspired by:** Pictionary, Telephone (the drawing game)
**Wave:** 1 · **Modes:** Solo (Classic and Telephone variants) · **Players:** 3-12 · **Length:** 15 min · **Effort:** Medium
**Phone features:** `draw`, `text`, `choices`, `vote`

## Pitch
Draw on your phone and watch every stroke appear live on the TV. Or play Telephone, where drawings and guesses mutate around the room.

## Intro and presentation
- **Title sequence:** a pencil sketches the words "SKETCH OFF" in a single scribbly line, paint splats fill the letters with colour, and a crumpled paper ball bounces off the title.
- **Signature moment:** live drawing - strokes appear on the TV as they are drawn with a pencil-scratch sound, and Telephone chains reveal like a flip-book.

## How to Play lines
- Classic: one person draws, everyone else races to guess.
- Telephone: draw a prompt, guess the next drawing, draw that guess... then watch the chaos unfold.
- Close guesses get a secret "so close!" hint.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| variant | classic | classic, telephone |
| drawSeconds | 80 | 45-120 |
| roundsEach | 1 | 1-2 (classic) |

## Flow - Classic
1. **PICK** - Drawer (rotation) phone: `choices` of 3 words (easy, medium, hard). 10 s.
2. **DRAW** - Drawer: `draw` with the word shown. Strokes stream to the server (volatile) and on to the TV, which redraws them live. Guessers: `text` with `multi: true` (unlimited guesses). Each guess is checked: correct -> "You got it!" and their phone goes to `waiting`; distance 1-2 -> private "So close!". TV: live canvas, timer, word as blanks with letter hints revealed at 50% and 75% time, list of who has guessed.
3. **REVEAL** - Word, drawing saved to the night's gallery. Ends when time is up or everyone guessed. `ctx.endRound()` after each drawer.

## Flow - Telephone
1. **PROMPT** - Everyone gets a different starting prompt (from content) and draws it (`draw`, `drawSeconds`).
2. **PASS** - Each drawing goes to the next player (seat order), who writes what they think it is (`text`, 30 s). That guess goes to the next player to draw. Continue until each chain has `min(players, 8)` steps.
3. **SHOWCASE** - TV plays each chain step by step (prompt -> drawing -> guess -> drawing ...), VIP taps to advance. After each chain, everyone `vote`s their favourite step in it.
4. `ctx.endRound()` after the showcase.

## Scoring
- Classic guessers: 1st correct 300, then 250, 200, 150, 100, rest 75 (minus 1 point per second elapsed, minimum 50).
- Classic drawer: +50 per correct guesser, max 400.
- Telephone: +100 per vote your step receives; +200 to the original prompt-writer's chain if the final guess matches the prompt.

## Content
`content/sketch-off/words.json` `[{ id, rating, word, difficulty: 1|2|3, aliases }]` (400) and `prompts.json` for Telephone `[{ id, rating, text }]` (200, funnier: "A koala doing taxes").

## Edge cases
- Drawer disconnects: skip to the next drawer, no points.
- Telephone with a disconnected player: their step is auto-filled ("(they wandered off)") and the chain continues.

## Done when
- Strokes use normalised 0..1 coordinates and render identically on any canvas size.
- Guess checking awards order-based points and private close hints.
- Telephone chains route each step to the next seat and never give a player their own chain twice in a row.
- Hints reveal letters at 50% and 75% time.

## Notes for Claude
- Simplify stroke points with Ramer-Douglas-Peucker (epsilon 0.002) and batch every 40 ms.
- Save finished drawings as PNG (TV renders offscreen) for Highlights.
