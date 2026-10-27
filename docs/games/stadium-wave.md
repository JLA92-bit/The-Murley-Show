# Stadium Wave (`stadium-wave`)

**Inspired by:** stadium crowd waves, concert phone-light shows
**Wave:** Later · **Modes:** Co-op · **Players:** 4-16 · **Length:** 5 min · **Effort:** Low
**Phone features:** `custom:stadium-wave/light`, `motion`, haptics
**Music source:** YouTube or file (light show) - see architecture section 12

## Pitch
The co-op finale. Line up, and your phones become a light show - then pull off the perfect Mexican wave together.

## Intro and presentation
- **Title sequence:** stadium seats fill with avatar fans, phone torches flicker on across the crowd, and "STADIUM WAVE" rolls across the screen as a wave of coloured letters.
- **Signature moment:** the TV shows the wave travelling along the line of avatars in sync with the real phones lighting up.

## How to Play lines
- Stand in a line and put yourselves in order on the TV.
- When your phone lights up, raise it high and stand tall.
- Keep the wave smooth to score.
- Then enjoy the light show!

## Flow
1. **LINE_UP** - VIP drags avatars into order on the VIP phone (or players tap "I'm next" in order).
2. **WAVE** - Server schedules each phone's moment (start + i x gap). Phones go full-screen colour, vibrate, and detect an upward motion; send the time. Gaps shrink each round (600, 450, 300 ms).
3. **SCORE** - Smoothness = 1 - (standard deviation of actual gaps / target gap). `ctx.endRound()` per wave.
4. **LIGHT_SHOW** - Finale: phones flash team colours to a song's beat (from the music library, BPM-locked), TV mirrors it.

## Scoring
- Co-op: smoothness x 500 to everyone.

## Done when
- Phone light timings are scheduled in server time and converted per phone.

## Notes for Claude
- Use a Wake Lock and full brightness hint (full-screen white or colour).
