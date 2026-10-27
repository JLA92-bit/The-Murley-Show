# Blind Audition (`blind-audition`)

**Inspired by:** The Voice
**Wave:** 5 · **Modes:** Solo · **Players:** 4-16 · **Length:** 15 min · **Effort:** Medium
**Phone features:** `choices`, `mic`, `custom:blind-audition/turn`, `vote`
**Music source:** YouTube or file - see architecture section 12

## Pitch
Record a secret audition in another room. The judges hear it blind and slam their buttons to turn - then guess who sang.

## Intro and presentation
- **Title sequence:** four big judge chairs with their backs to the camera, a big red TURN button glows and pulses, and "BLIND AUDITION" spins in as the chairs turn one by one.
- **Signature moment:** during playback each judge's chair on the TV spins round the instant they hit their button.

## How to Play lines
- Sneak off somewhere private and record a short audition.
- Back in the room, auditions play anonymously.
- Hit TURN if you love what you hear.
- Then guess who sang it.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| auditionSeconds | 15 | 10-20 |
| reuseClips | off | off, use tonight's Vocal Drop clips |

## Flow
1. **AUDITION** - All phones at once: pick a song (`choices`), then "Find a private spot" with a 2-minute window to record (`mic`, starts when the player taps Ready). Reuse mode skips this and uses tonight's saved clips.
2. **PLAYBACK** - TV plays each clip anonymously in random order with a mystery silhouette; judge phones (everyone except the singer): big `custom:blind-audition/turn` button. Turn time is recorded.
3. **GUESS** - Everyone except the singer `vote`s who sang it.
4. **REVEAL** - Silhouette lifts to show the avatar. `ctx.endRound()` per clip.

## Scoring
- Singer: +100 per turn, +50 extra for turns in the first third of the clip, +60 per wrong guess.
- Guessers: +100 correct.

## Done when
- Clip order is random and the singer's phone hides judging and guessing for their own clip.
- Turn timing bonus works.

## Notes for Claude
- Apply a slight random pitch shift (+/- 1 semitone, soundtouchjs) to make guessing harder (setting, default off).
