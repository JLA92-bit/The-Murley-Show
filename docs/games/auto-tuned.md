# Auto-Tuned (`auto-tuned`)

**Inspired by:** viral auto-tune remixes
**Wave:** Later · **Modes:** Solo · **Players:** 2-16 · **Length:** 10 min · **Effort:** High
**Phone features:** `mic`, `text`, `vote`

## Pitch
Say something silly. The game auto-tunes it into a banger. Vote for the best remix.

## Intro and presentation
- **Title sequence:** a robot DJ drops the needle, "AUTO-TUNED" stutters in syllable by syllable with a pitch-corrected vocal chop, and equaliser bars bounce behind it.
- **Signature moment:** each remix plays with a DJ deck animation and the player's avatar bobbing with headphones.

## How to Play lines
- Read your silly sentence into the phone - or write your own.
- We'll auto-tune it into a song.
- Vote for the best remix.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| style | pop | pop, trap, disco |

## Flow
1. **LINE** - Phone: a silly sentence from content or `text` to write one (family filter).
2. **RECORD** - `mic` 6 s.
3. **REMIX** - TV, offline: detect syllable onsets (energy), split into chunks, estimate each chunk's pitch (pitchy), shift each chunk to the next note of a melody pattern in C major pentatonic (soundtouchjs), time-stretch to the beat grid (100 BPM, one chunk per 8th note), loop 2 bars twice over a bundled original beat in the chosen style.
4. **PLAY + VOTE** - All remixes play; everyone `vote`s favourite (not own). `ctx.endRound()`.

## Scoring
- +100 per vote, winner +200.

## Content
`content/auto-tuned/lines.json` (100 silly sentences) and 3 original beats in `content/auto-tuned/beats/`.

## Done when
- Chunk detection splits a test clip into the expected count +/- 1.
- Output length is exactly 4 bars.

## Notes for Claude
- Expect a fun, robotic result rather than studio quality.
