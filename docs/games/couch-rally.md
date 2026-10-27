# Couch Rally (`couch-rally`)

**Inspired by:** arcade kart racers, top-down racing games
**Wave:** Later · **Modes:** Solo, Teams · **Players:** 2-8 · **Length:** 10 min · **Effort:** High
**Phone features:** `custom:couch-rally/wheel` (gyro steering, touch pedals)

## Pitch
Hold your phone sideways like a steering wheel and race your friends around top-down tracks on the TV.

## Intro and presentation
- **Title sequence:** a chequered flag waves full screen, engines rev in stereo, and "COUCH RALLY" skids in leaving tyre marks.
- **Signature moments:** a race countdown with lights, drift sparks, item pick-ups (boost, banana-style slip pad, shield), a photo-finish freeze frame.

## How to Play lines
- Turn your phone sideways and hold it like a wheel.
- Right side to accelerate, left side to brake.
- Tilt to steer. Grab boosts. Don't fall off the screen!

## Flow
1. **GRID** - Phones: `wheel` (landscape), calibrate level.
2. **RACE** - Server simulates arcade physics at 30 ticks per second; phones send `{ steer (-1..1), throttle, brake, item }` at 30 Hz; TV interpolates. Shared screen camera zooms to keep all karts visible; karts left off-screen respawn behind the leader.
3. **FINISH** - 3 laps. `ctx.endRound()` per race.

## Scoring
- 1st 300, 2nd 200, 3rd 120, others 50.

## Content
`content/couch-rally/tracks/*.json` (spline points, width, item spots) - 5 tracks.

## Done when
- Physics is deterministic for a given input log (replay test).

## Notes for Claude
- Steering from the landscape tilt angle (beta in landscape) with a +/- 35 degree range and a 3 degree dead zone.
