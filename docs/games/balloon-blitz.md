# Balloon Blitz (`balloon-blitz`)

**Inspired by:** carnival shooting galleries, light-gun arcade games
**Wave:** 3 · **Modes:** Solo, Teams · **Players:** 2-12 · **Length:** 5-8 min · **Effort:** Medium
**Phone features:** `pointer`, haptics

## Pitch
Point your phone at the TV like a remote. Your crosshair follows. Tap to pop balloons before anyone else.

## Intro and presentation
- **Title sequence:** a carnival tent's flaps open, bunting drops, balloons float up and pop one by one to spell "BALLOON BLITZ" in confetti.
- **Signature moment:** gold balloons that leave a sparkle trail, bomb balloons that shake the whole screen when popped, and floating score numbers in each player's colour.

## How to Play lines
- Point your phone at the middle of the TV and tap to calibrate.
- Move your phone to aim. Tap to pop.
- Gold balloons are worth triple. Avoid the bombs!

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| rounds | 3 | 1-5 (45 s each) |
| ammo | unlimited | unlimited, 1 shot per second |

## Flow
1. **CALIBRATE** - `pointer`: "Point at the centre of the TV and tap". Then "Point at the top-left corner and tap" (scales the range per player).
2. **SHOOT** - TV: balloons rise (PixiJS), each player's crosshair in their colour. Phones stream aim at 30 Hz (volatile). Tap = `{ type: 'shoot', clientTime }`. Haptic on hit.
3. **ROUND_END** - `ctx.endRound()` per round. Later rounds have faster, smaller balloons.

## Hit detection (server authoritative)
- The balloon field is deterministic: positions are a function of seed and time (`balloonAt(seed, id, t)`), shared by the server and TV.
- Server keeps the last 500 ms of each player's aim samples; on shoot it uses the aim at the converted shot time and checks against balloon positions at that time.

## Scoring
- Normal 10, gold 30, bomb -20. Teams: sum.

## Done when
- `balloonAt` is pure and identical on TV and server (shared code).
- Shots use aim and balloon positions at the shot's server time.
- Calibration maps yaw and pitch to screen x and y.

## Notes for Claude
- Map with deviceorientation alpha (yaw) and beta (pitch) deltas from the calibrated centre; smooth with a one-euro filter (min cutoff 1.0, beta 0.007). Handle alpha wrap-around at 360.
