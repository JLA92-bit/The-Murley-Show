# Duet Disaster (`duet-disaster`)

**Inspired by:** The Voice battle rounds, classic pop duets
**Wave:** 2 · **Modes:** Pairs · **Players:** 2-16 · **Length:** 15 min · **Effort:** Medium
**Phone features:** `mic`, `choices`
**Music source:** YouTube or file - see architecture section 12

## Pitch
Two singers record alternating lines at the same time - without hearing each other. We stitch it together over the real song.

## Intro and presentation
- **Title sequence:** two spotlights from opposite sides chase each other, collide in the middle and "DUET DISASTER" cracks in half then snaps back together with a guitar sting.
- **Signature moment:** split-screen stage - each singer's avatar lights up on their own lines, and both glow gold on the final shared line.

## How to Play lines
- You're paired with a duet partner.
- Your phone shows only your lines - sing them when they light up.
- You'll both sing at the same time, so don't get distracted!
- Then hear your duet over the real song.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| pairing | random | random, VIP picks |
| section | chorus | chorus, verse |

## Flow
1. **PAIR** - Pairs formed (odd count: one trio, lines split three ways).
2. **PICK** - Pair votes on 3 songs; first member's pick breaks ties.
3. **RECORD** - Both phones: `mic` with the same `startAt`, full section duration, `linesToSing` = alternating LRC lines (A: 1, 3, 5...; B: 2, 4, 6...; both on the last line). Phones show only their lines and a countdown bar to their next entry.
4. **DROP** - VocalMixer gates each vocal to its own line windows (+150 ms either side), both on the last line, panned A left 0.4 and B right 0.4.
5. **RATE** - Others rate 1-5 stars plus "Best Chemistry" vote at the end. `ctx.endRound()` per pair.

## Scoring
- Stars average x 100 to both partners. Best Chemistry +200 each.

## Content
Song library. Prefer songs with at least 4 lyric lines in the section.

## Done when
- Line windows come from LRC times; gating mutes each vocal outside its windows.
- Trios split lines A, B, C in rotation.
- Both recordings start from the same server time.

## Notes for Claude
- Reuse VocalMixer with a `gateWindows` option rather than cutting audio.
