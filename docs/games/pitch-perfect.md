# Pitch Perfect (`pitch-perfect`)

**Inspired by:** SingStar, karaoke scoring
**Wave:** Later · **Modes:** Solo, Teams (duet lanes) · **Players:** 2-8 · **Length:** 15 min · **Effort:** High
**Phone features:** `custom:pitch-perfect/sing` (mic + pitch detection)
**Music source:** file only (needs stems and pitch.json) - see architecture section 12

## Pitch
Sing along with the real song while your phone tracks your pitch live. Hit the notes on the TV highway to score.

## Intro and presentation
- **Title sequence:** horizontal neon note bars slide across the screen like a highway, a glowing pitch line rides over them, and "PITCH PERFECT" lands with a choir "Ahh" chord resolving in tune.
- **Signature moment:** golden notes that explode into sparks when hit, and a "PERFECT!" streak counter.

## How to Play lines
- Sing along to the song - the TV shows the notes.
- Your phone listens and draws your pitch live.
- Stay on the note bars to score. Golden notes are worth more.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| difficulty | easy | easy (+/- 2 semitones), medium (+/- 1), hard (+/- 0.5) |
| octaveFree | on | on, off |

## Flow
1. **PICK** - Only songs with `pitch.json`.
2. **SING** - TV plays the full track (vocals ducked 6 dB) with note bars. Phone runs `pitchy` on 2048-sample frames every 20 ms, sends `{ t (server time), midi, clarity }` at 20 Hz on a volatile stream. TV draws the pitch line. Server scores.
3. **RESULT** - Accuracy %, streak, rank (Rookie, Rising Star, Headliner, Legend). `ctx.endRound()`.

## Scoring
- Points per 20 ms frame in tune (clarity > 0.85), golden notes x3. Normalised to 0-10000.

## Content
`content/songs/<id>/pitch.json` `[{ startMs, endMs, midi, golden? }]` made by `tools/song-tools/pitch.ts` from `vocals.wav` (Demucs), smoothed into notes (min 120 ms).

## Done when
- Scoring is octave-agnostic when octaveFree is on.
- Frames with low clarity are ignored.

## Notes for Claude
- The server compares the player's frame time (converted with clock sync) against note windows.
