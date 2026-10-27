# Couch Critics (`couch-critics`)

**Inspired by:** Gogglebox
**Wave:** 3 · **Modes:** Solo · **Players:** 2-12 · **Length:** 8-10 min · **Effort:** Medium
**Phone features:** `camera` (front, propped), `face` (Poker Face variant), `vote`

## Pitch
The TV plays a surprise clip while your phone films your reaction. Then everyone's faces play back side by side, Gogglebox style.

## Intro and presentation
- **Title sequence:** a retro TV set with rabbit-ear antenna flicks on with static, a row of couch silhouettes appears, and "COUCH CRITICS" pops up like a TV guide listing.
- **Signature moment:** the reaction wall - a grid of everyone's faces playing in sync next to the clip, with the biggest reaction auto-zoomed using face tracking (largest mouth-open or brow-raise moment).

## How to Play lines
- Prop your phone up facing you.
- A surprise clip plays on the TV. React!
- Then watch everyone's reactions side by side.
- Vote for the best reaction - or play Poker Face and try not to react at all.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| clips | 3 | 1-5 |
| variant | best reaction | best reaction, poker face |
| clipSource | built-in | built-in surprises, my clips folder |

## Flow
1. **SET_UP** - Phones: `camera` preview "Prop me up so I can see your face".
2. **WATCH** - All phones record front video with the same `startAt`, for the clip's duration. TV plays the clip.
3. **REACTION_WALL** - TV grid: all reactions in sync with the clip in a corner. Auto-zoom on the biggest moment.
4. **VOTE** - Best reaction `vote` (not own). Poker Face: no vote - the phone's FaceLandmarker scores expressiveness (sum of smile, jaw-open and brow blendshape peaks); lowest wins.
5. `ctx.endRound()` per clip.

## Scoring
- Best reaction: +100 per vote. Poker Face: 1st 300, 2nd 200, 3rd 100.

## Content
- Built-in surprises: 10 original short animations built in PixiJS (jump-scare-free, family-friendly: a cake that slowly collapses, a cat that knocks things off a table, a magic trick reveal).
- `content/couch-critics/my-clips/` - drop your own MP4s (home videos, YouTube links also allowed through the YouTube source, see architecture section 12).

## Done when
- All reactions start from the same server time and play back in sync.
- Poker Face scoring picks the lowest expressiveness.

## Notes for Claude
- Record at 480p to keep 12 simultaneous uploads quick.
