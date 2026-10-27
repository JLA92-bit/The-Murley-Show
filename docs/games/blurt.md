# Blurt (`blurt`)

**Inspired by:** Taboo, Heads Up!
**Wave:** 4 · **Modes:** Teams · **Players:** 4-16 · **Length:** 15 min · **Effort:** Low
**Phone features:** `word-card`, `custom:blurt/judge`

## Pitch
Describe the word without saying any of the banned words while your team shouts guesses. Tilt your phone down for a point.

## Intro and presentation
- **Title sequence:** speech bubbles burst onto the screen with banned words crossed out in red, then "BLURT!" explodes out of the biggest bubble with a party-horn blast.
- **Signature moment:** the buzz - the judge's buzz throws a giant maroon NOPE across the TV with a game-show honk.

## How to Play lines
- The describer sees a word and four words they can't say.
- Describe it - your team shouts out guesses.
- Tilt your phone down when they get it, up to pass.
- The other team buzzes you if you say a banned word.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| turnSeconds | 60 | 45-90 |
| turnsEachTeam | 3 | 2-6 |
| maxPasses | 3 | 0-5 |

## Flow
1. **TURN** - Describer (rotating within team) phone: `word-card` with word + banned words; tilt down (beta below -60 degrees held 400 ms) = got it, tilt up = pass, buttons too. Opposing team phones: `custom:blurt/judge` showing the same card plus a big **BUZZ** button. TV: timer, team score, card count, last resolved words (never the live word).
2. **BUZZ** - Judge press: -1, next card.
3. **END** - Time up: TV lists all words with ticks and crosses. `ctx.endRound()` per turn.

## Scoring
- Correct: +100. Buzz: -100. Pass: 0 (beyond maxPasses the pass is blocked).

## Content
`content/blurt/cards.json` `[{ id, rating, word, banned: string[4] }]`. Launch: 400.

## Done when
- Tilt detection fires once per gesture (debounced) and maps correctly.
- Passes stop at maxPasses.
- Judges only on opposing teams see the card.

## Notes for Claude
- Calibrate tilt at turn start as "phone held upright facing describer".
