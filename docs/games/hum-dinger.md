# Hum Dinger (`hum-dinger`)

**Inspired by:** Name That Tune, Spicks and Specks
**Wave:** 2 · **Modes:** Solo, Teams · **Players:** 3-16 · **Length:** 10-15 min · **Effort:** Low
**Phone features:** `choices`, `mic`, `text`, `buzzer`
**Music source:** YouTube or file - see architecture section 12

## Pitch
Hum a secret song into your phone. Everyone races to name it - and then we drop your hum over the real thing.

## Intro and presentation
- **Title sequence:** a cartoon bee hums across the screen leaving a dotted music-note trail that spells "HUM DINGER", then buzzes into the title with a kazoo flourish.
- **Signature moment:** after the answer, the hum is dropped over the real song's chorus while a bee flies along the waveform.

## How to Play lines
- You'll get a secret song. Hum it - no words allowed!
- Everyone else races to name the song.
- Too hard? A short clip of the real song plays as a hint.
- Then we play your hum over the real thing.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| hummers | everyone | everyone, 6 per game |
| humSeconds | 12 | 8-15 |
| live | off | off (record), on (hum live, no recording) |

## Flow
1. **SECRET** - Hummer phone: `choices` of 3 songs. 
2. **HUM** - Hummer phone: `mic` with no lyrics and a 3-2-1 count-in. Live mode skips recording; the hummer hums aloud.
3. **GUESS** - TV plays the hum twice (record mode). Others: `text` (multi guesses) or `buzzer` in teams. After 15 s, TV plays a 2-second intro clip as a hint (points halve).
4. **REVEAL** - Title and artist, then the hum dropped over the chorus. `ctx.endRound()` per hummer.

## Scoring
- Guessers: 300 before the hint (decaying to 150), 120 after. Title only or artist only = half.
- Hummer: +100 per correct guesser, max 400.

## Done when
- Matching accepts title or artist aliases with half points for one only.
- Hint halves points from that moment.
- Live mode works without mic permission.

## Notes for Claude
- Reuse the matcher with a title/artist split.
