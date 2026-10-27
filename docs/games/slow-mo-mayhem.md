# Slow-Mo Mayhem (`slow-mo-mayhem`)

**Inspired by:** Australia's Funniest Home Videos, action-movie slow motion
**Wave:** 5 · **Modes:** Solo, Teams · **Players:** 2-16 · **Length:** 10 min · **Effort:** Medium
**Phone features:** `camera` (video), `vote`

## Pitch
Film a dramatic 3-second stunt - the TV replays it in epic slow motion with movie-trailer commentary.

## Intro and presentation
- **Title sequence:** a movie-trailer voice line plays over black ("In a world... of living rooms"), then "SLOW-MO MAYHEM" punches in letter by letter in super-slow motion with a deep boom.
- **Signature moment:** replays at quarter speed with letterbox bars, a lens-flare sweep, a commentary caption and an orchestral hit at the clip's biggest motion moment.

## How to Play lines
- Get a dramatic challenge, like "Catch an imaginary ball".
- A teammate films 3 seconds (or prop your phone up).
- The TV replays it in epic slow motion.
- Vote for the most epic.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| challenges | 3 | 2-5 |

## Flow
1. **CHALLENGE** - TV card. 45 s to set up.
2. **FILM** - `camera` video 3 s, `frameRate: { ideal: 60 }`.
3. **PREMIERE** - TV `ClipPlayer` at `playbackRate = 0.25`, letterbox, caption from `commentary.json`, sting at the frame with the largest frame difference (computed on the TV by sampling frames).
4. **VOTE** - `ctx.endRound()` per challenge.

## Scoring
- +100 per vote.

## Content
`content/slow-mo-mayhem/challenges.json` (60, safe: no jumping off furniture, no throwing objects at people) and `commentary.json` (80 lines).

## Done when
- Clips play at 0.25x with the sting at the peak-motion frame.

## Notes for Claude
- Many phones cap browser video at 30 fps; slow motion still works, just less smooth.
