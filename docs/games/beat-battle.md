# Beat Battle (`beat-battle`)

**Inspired by:** beatbox battles, loop pedals
**Wave:** Later · **Modes:** Teams · **Players:** 2-12 · **Length:** 10 min · **Effort:** Medium
**Phone features:** `mic` (loop mode), `vote`

## Pitch
Record a 4-beat beatbox loop. Your teammates layer on top. Build the sickest beat in the room.

## Intro and presentation
- **Title sequence:** a loop pedal stomps, a beatbox "boots and cats" loop starts, and "BEAT BATTLE" builds layer by layer, each layer adding a letter.
- **Signature moment:** a circular loop visual with each layer as a coloured ring that pulses with its sound.

## How to Play lines
- One at a time, record a 4-beat loop with your voice.
- Each loop plays on repeat while the next teammate adds theirs.
- The room votes for the best beat.

## Flow
1. **LAYER** - Team members in order: phone `mic` with a visual metronome and haptic click, 4 beats at 90 BPM (2.67 s), recording starts on beat 1 of the next bar. TV plays the existing layers looping (the room hears them; bleed into the mic is fine and adds character).
2. **QUANTISE** - TV trims each recording to exactly one bar starting at its first onset, gain-normalises, adds to the loop.
3. **SHOWCASE** - Full loop plays 4 times per team; vote. `ctx.endRound()`.

## Scoring
- +100 per vote to the team; winner +300.

## Done when
- Each layer is exactly one bar long and starts on beat 1.

## Notes for Claude
- Use a single AudioContext clock for the loop; schedule layers sample-accurately.
