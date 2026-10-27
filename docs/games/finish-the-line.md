# Finish the Line (`finish-the-line`)

**Inspired by:** Don't Forget the Lyrics!
**Wave:** Later · **Modes:** Solo, Teams · **Players:** 2-8 · **Length:** 15 min · **Effort:** High
**Phone features:** `speech`, `text`, `choices`
**Music source:** YouTube or file - see architecture section 12

## Pitch
The music stops. The lyrics vanish. Can you sing the next line word-perfect?

## Intro and presentation
- **Title sequence:** a scrolling lyric screen glitches out mid-line, letters scatter, and reassemble as "FINISH THE LINE" with a record-scratch.
- **Signature moment:** after the attempt, the real line types across the TV word by word, each word turning green (got it) or red (missed).

## How to Play lines
- Sing along with the lyrics on the TV.
- When the music stops, sing the next line into your phone.
- The closer you are to the real words, the more you score.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| turnsEach | 2 | 1-4 |
| input | speak | speak, type |

## Flow
1. **SONG** - Player picks from 3 songs by category.
2. **PLAY** - TV plays the song with karaoke lyrics up to a stop point (an LRC line chosen at random in the second half of the clip). Music cuts out.
3. **ANSWER** - Player phone: `speech` (push to talk, 12 s) with typing fallback. Shown back to them for a "Lock it in" confirm.
4. **CHECK** - Word-level comparison with the real line (normalised words, Levenshtein alignment). Score = matched words / total words. TV word-by-word reveal, then the real song continues for 4 s.
5. `ctx.endRound()` per turn.

## Scoring
- Accuracy x 500. 100% = +250 bonus.

## Done when
- Word alignment handles inserted and missing words.
- Typed fallback works with the same scoring.

## Notes for Claude
- `webkitSpeechRecognition` with `lang = 'en-AU'`, `interimResults = true`; show interim words on the phone.
