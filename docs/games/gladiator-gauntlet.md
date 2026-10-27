# Gladiator Gauntlet (`gladiator-gauntlet`)

**Inspired by:** Gladiators
**Wave:** Later · **Modes:** Teams vs 1 · **Players:** 3-12 · **Length:** 10-15 min · **Effort:** Medium
**Phone features:** `motion`, touch, `custom:gladiator-gauntlet/event`

## Pitch
One player becomes the Gladiator - powered up, but outnumbered. Contenders take them on in phone-powered arena events.

## Intro and presentation
- **Title sequence:** arena floodlights blaze on, a crowd chants, and "GLADIATOR GAUNTLET" rises on a golden podium with a metal clang; the Gladiator's avatar gets a helmet and a stage name ("THE BLENDER").
- **Signature moment:** head-to-head split screen with power bars and slow-motion knockouts.

## How to Play lines
- One of you is the Gladiator, with a power boost.
- Contenders take on the Gladiator in quick events.
- Win events to bank points for your team.

## Events
- **Tug of War:** shake as hard as possible for 10 s; Gladiator's shakes count 1.3x.
- **Reflex Wall:** tap targets appearing on your phone; Gladiator can shake to add wobble to contenders' screens.
- **Balance Beam:** tilt to keep a ball on a beam on your phone; Gladiator's shakes add wind.
- **Eliminator:** all three events back to back.

## Flow
1. **PICK** - Gladiator chosen (volunteer or top scorer). Stage name generated from `names.json`.
2. **EVENT** - Each contender in turn faces the Gladiator in one event. `ctx.endRound()` per event.
3. **ELIMINATOR** - Final, contenders race each other through all events.

## Scoring
- Contender beats Gladiator: +200 to their team. Gladiator wins: +150 to Gladiator. Eliminator winner +400.

## Done when
- Handicap applies only to the Gladiator.
- Wobble and wind effects only reach contenders' phones.
