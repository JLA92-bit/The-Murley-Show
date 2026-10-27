# Charades Cam (`charades-cam`)

**Inspired by:** Charades, Celebrity Name Game
**Wave:** 3 · **Modes:** Teams · **Players:** 4-16 · **Length:** 15 min · **Effort:** Medium
**Phone features:** `secret`, `camera`, `text`

## Pitch
Act out a secret clue in 5 seconds on camera. The TV plays your silent movie on loop while your team races to guess.

## Intro and presentation
- **Title sequence:** a clapperboard snaps shut, film grain and a sepia filter roll over the screen, and "CHARADES CAM" appears as an old silent-movie title card with piano trill.
- **Signature moment:** clips play in a silent-film frame with sepia, flicker and dramatic caption cards ("MEANWHILE..."), and a blooper reel of the best clips at the end.

## How to Play lines
- Your phone shows a secret clue.
- Act it out in 5 seconds - no talking, no sounds!
- Your silent movie plays on loop on the TV.
- Your team races to guess it.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| turnsEachTeam | 3 | 2-5 |
| clipSeconds | 5 | 3-8 |
| filmedBy | self | self (front camera), teammate (back camera) |

## Flow
1. **CLUE** - Actor (rotating) phone: `secret` with 2 clue choices (category: movie, animal, job, action, Aussie thing). 10 s.
2. **FILM** - Actor phone (or chosen teammate's phone): `camera` video, `clipSeconds`, countdown. Upload.
3. **GUESS** - TV loops the clip muted with the silent-film filter. Actor's team: `text` multi-guess, 40 s. Close hints like Sketch Off.
4. **STEAL** - If nobody gets it, other teams get 10 s.
5. **REVEAL** - `ctx.endRound()` per turn.

## Scoring
- Guessing team +200 (+100 bonus in the first 10 s); actor +100 if guessed.
- Steal +150.

## Content
`content/charades-cam/clues.json` `[{ id, rating, category, text, aliases }]`. Launch: 300.

## Done when
- Clip loops on the TV muted.
- Steal only opens when nobody on the acting team guessed.

## Notes for Claude
- Apply the silent-film look as a WebGL filter in PixiJS (sepia, grain, vignette, slight flicker).
