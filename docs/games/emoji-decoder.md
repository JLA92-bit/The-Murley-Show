# Emoji Decoder (`emoji-decoder`)

**Inspired by:** Spicks and Specks rounds, emoji quiz apps
**Wave:** 5 · **Modes:** Solo, Teams · **Players:** 2-16 · **Length:** 10 min · **Effort:** Low
**Phone features:** `buzzer`, `text`

## Pitch
Movie, song and place titles hidden in emoji. The faster you crack it, the more it's worth.

## Intro and presentation
- **Title sequence:** emoji rain down Tetris-style, lock together into a block, scramble, and decode into "EMOJI DECODER" with a keyboard-clack flourish.
- **Signature moment:** emoji reveal one by one with a pop, while the clue value drains from a fuel gauge in the corner.

## How to Play lines
- Emoji appear one at a time.
- Buzz in and type the title.
- The fewer emoji you need, the more points you get.
- Wrong guess? You're out for that clue.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| clues | 10 | 6-15 |
| style | buzzer | buzzer, everyone types |

## Flow
1. **CLUE** - TV: category chip (Movie, Song, Aussie Place, TV Show, Saying), then emoji revealed one every 2 s. Points on screen drop 500 -> 100 as emoji appear.
2. **BUZZ** (buzzer style) - `buzzer`; winner types (`text`, 10 s). Wrong: locked out for this clue, reveal continues.
   **Everyone types** style: all phones `text`, unlimited guesses, each checked live; first correct gets full points, later correct get less.
3. **REVEAL** - Answer and the emoji line-up. `ctx.endRound()` every clue.

## Scoring
- Buzzer: current clue value if right, -50 if wrong.
- Everyone types: 1st correct value, 2nd 70%, 3rd 50%, others 30%.

## Content
`content/emoji-decoder/clues.json` `[{ id, rating, category, emoji: string[], answer, aliases }]`. Launch: 250.

## Done when
- Clue value decays per emoji shown.
- Wrong buzzers are locked out for the clue only.
- Everyone-types scoring follows the order rules.

## Notes for Claude
- Render emoji with bundled Twemoji SVGs (CC-BY 4.0, add attribution in /about) so the Android box shows them consistently.
