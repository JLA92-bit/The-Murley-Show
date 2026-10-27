# Scavenger Snap (`scavenger-snap`)

**Inspired by:** The Amazing Race, scavenger hunts
**Wave:** 3 · **Modes:** Solo, Teams · **Players:** 2-16 · **Length:** 10 min · **Effort:** Low
**Phone features:** `camera`, `vote`

## Pitch
Race around the house to photograph "something older than you" or "the weirdest thing in the fridge". Fastest and funniest win.

## Intro and presentation
- **Title sequence:** a treasure map unrolls, a red dotted line races across it, a camera shutter snaps, and "SCAVENGER SNAP" develops like a Polaroid.
- **Signature moment:** the gallery shows every photo as a Polaroid pinned to a corkboard, with a camera flash as each one lands.

## How to Play lines
- A challenge appears. Go!
- Snap a photo that fits - the faster the better.
- Everyone votes for their favourite. You can't vote for your own.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| challenges | 4 | 3-6 |
| seconds | 90 | 60-180 |
| location | indoors | indoors, indoors and outdoors |

## Flow
1. **CHALLENGE** - TV: challenge card and countdown with a ticking soundtrack.
2. **HUNT** - Phones: `camera` photo (back camera default). First three submissions are announced on TV ("Ella is back!").
3. **GALLERY** - TV corkboard of photos with names. Phones: `vote` for a favourite (not own). 20 s.
4. **RESULT** - `ctx.endRound()` per challenge.

## Scoring
- +100 per vote. Speed: 1st 150, 2nd 100, 3rd 50.

## Content
`content/scavenger-snap/challenges.json` `[{ id, rating, text, location }]`. Launch: 150 home-safe challenges.

## Done when
- Players can't vote for themselves.
- Speed bonus goes to the first three valid uploads.

## Notes for Claude
- Resize images on the phone before upload (architecture section 11).
