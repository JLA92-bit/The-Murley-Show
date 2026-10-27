# Mind Meld (`mind-meld`)

**Inspired by:** Wavelength
**Wave:** 4 · **Modes:** Teams, Co-op · **Players:** 4-16 · **Length:** 15 min · **Effort:** Low
**Phone features:** `dial`, `text`, `choices`

## Pitch
One player sees a secret spot on a spectrum like "Cold to Hot" and gives a one-word clue. The team turns their dials to find it.

## Intro and presentation
- **Title sequence:** a semicircle dial sweeps across a rainbow spectrum, two brain icons connect with a zap of light, and "MIND MELD" shimmers like a radio frequency locking in.
- **Signature moment:** the shutter - a slow dramatic reveal of the hidden target bands under the team's needle, with a rising tone that peaks on a bullseye.

## How to Play lines
- The psychic sees a hidden target on a spectrum.
- They give a clue - one word or a short phrase.
- The team turns their dials to where they think the target is.
- The other team guesses if you're too far left or right.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| turnsEachTeam | 4 | 3-8 |
| clueSeconds | 45 | 30-90 |

## Flow
1. **PSYCHIC** - Psychic (rotating in team) phone: spectrum card and the target on a semicircle (0-180 degrees, bands drawn), `text` for the clue. Everyone else: `waiting`.
2. **TUNE** - TV: spectrum labels, clue, a shuttered dial with a needle at the team's average. Team phones: `dial` (live drag streams to the server at 10 Hz, TV needle follows the average). 60 s or all locked in.
3. **COUNTER** - Opposing team: `choices` Left / Right (is the target left or right of the needle?). 15 s, majority.
4. **REVEAL** - Shutter opens, bands show: bullseye (+/- 5 degrees) 4, near (+/- 12) 3, outer (+/- 20) 2. `ctx.endRound()` per turn.

## Modes
- **Teams:** 2-4 teams take turns; counter-guess by the next team.
- **Co-op:** everyone except the psychic tunes; no counter. Aim for a total.

## Scoring
- Band points x 100 to the guessing team.
- Counter team +100 if their Left/Right was right (not awarded on a bullseye).

## Content
`content/mind-meld/spectrums.json` `[{ id, rating, left, right }]` (150): "Cold" / "Hot", "Underrated snack" / "Overrated snack", "Useless superpower" / "Amazing superpower".

## Done when
- Band scoring by angle distance is correct at the edges.
- Team needle is the mean of locked or current dial values.
- Counter guess compares with the needle, not the bands.

## Notes for Claude
- Dial values are integers 0-180; target is seeded between 10 and 170.
