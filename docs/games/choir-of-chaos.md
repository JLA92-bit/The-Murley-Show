# Choir of Chaos (`choir-of-chaos`)

**Inspired by:** Choir of Hard Knocks, school choirs, stadium sing-alongs
**Wave:** 2 · **Modes:** Co-op, Teams · **Players:** 3-16 · **Length:** 10 min · **Effort:** Medium
**Phone features:** `mic`, `vote`
**Music source:** YouTube or file - see architecture section 12

## Pitch
Everyone sings the same line separately at the same time. We stack every voice into one giant choir over the real song - then spotlight each singer one by one.

## Intro and presentation
- **Title sequence:** rows of tiny avatar choristers rise on risers, open their mouths in a gospel "Ahhh" chord, and "CHOIR OF CHAOS" swells up in gold letters that wobble with vibrato.
- **Signature moment - Spotlight Solo:** after the full choir plays, the conductor (a baton cursor) points at random singers and their voice is soloed for one bar while everyone else drops out.

## How to Play lines
- Everyone gets the same lyrics.
- When the count-in ends, all sing together into your own phones.
- We stack every voice into one choir over the real song.
- Then the conductor spotlights singers one at a time...

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| rounds | 2 | 1-3 |
| spotlight | on | on, off |

## Flow
1. **PICK** - Room votes on 3 songs (`vote`).
2. **RECORD** - All phones `mic` with the same `startAt`, the chorus lyrics. TV: risers fill with avatars, each lighting up with its live level.
3. **CHOIR** - VocalMixer: every vocal aligned, pans spread evenly from -0.8 to 0.8, big hall reverb (35% wet), compressor on the vocal bus. Full chorus plays.
4. **SPOTLIGHT** (if on) - Replay the chorus; every bar, one random singer is soloed (others -24 dB), TV conductor points at them.
5. **RATE** - Co-op: everyone rates the choir 1-5. Teams: each team records separately (one after another), then everyone votes for the best team choir. `ctx.endRound()`.

## Scoring
- Co-op: everyone gets average stars x 100.
- Teams: winning team +300, others +100.

## Done when
- Pans are spread evenly for N vocals.
- Spotlight solos each singer at least once if bars >= singers.
- Teams record in sequence and are voted on together.

## Notes for Claude
- Normalise each vocal to -18 LUFS (approximate with RMS) before summing so loud singers don't drown the rest.
