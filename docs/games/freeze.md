# Freeze! (`freeze`)

**Inspired by:** Red Light Green Light, Squid Game: The Challenge
**Wave:** 3 · **Modes:** Solo, Teams · **Players:** 2-16 · **Length:** 5-8 min · **Effort:** Low
**Phone features:** `motion`, haptics

## Pitch
Shake your phone to race on green. Freeze on red - the tiniest wobble and you're zapped.

## Intro and presentation
- **Title sequence:** a giant traffic light drops in, flicks green-amber-red, and "FREEZE!" shatters into ice shards that snap back together with a crack sound.
- **Signature moment:** when the light turns red the whole TV freezes with an ice-crystal overlay, and zapped players' avatars turn into ice blocks and fall over.

## How to Play lines
- Green light: shake your phone to run.
- Red light: freeze! Don't move a muscle.
- Move on red and you're zapped back to the start (or out!).
- First to the finish line wins.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| races | 3 | 1-5 |
| penalty | back to start | back to start, out |
| sensitivity | normal | gentle, normal, strict |

## Flow
1. **READY** - Phones: `motion` calibration "Hold your phone normally for 3 seconds".
2. **RACE** - Light cycles: green 2-6 s, red 2-5 s (seeded, random). TV: race track with avatar runners. Phones: full-screen green or red, shake counter feedback on green; vibration and flash on light change.
   - Green: phones send shake counts at 5 Hz; runners advance 1 unit per shake (max 6 per second, anti-spam).
   - Red: after a 400 ms grace, phones send stillness variance at 10 Hz; above the threshold for 250 ms = zapped.
3. **FINISH** - First to 100 units wins; race ends when 3 have finished or 60 s pass. `ctx.endRound()` per race.

## Scoring
- 1st 300, 2nd 200, 3rd 100, others by distance (distance / 2).
- Teams: average distance of members.

## Done when
- Red-light detection ignores the grace period.
- Shake rate is capped.
- A phone that stops sending data on red for 1 s is treated as moving (anti-cheat: someone pocketing the phone).

## Notes for Claude
- Thresholds per sensitivity live in the game's settings schema so they're tunable after playtests.
