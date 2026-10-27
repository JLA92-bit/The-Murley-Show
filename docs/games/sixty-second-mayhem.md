# 60 Second Mayhem (`sixty-second-mayhem`)

**Inspired by:** Minute to Win It
**Wave:** 3 · **Modes:** Solo, Teams · **Players:** 2-16 · **Length:** 8-10 min · **Effort:** Medium
**Phone features:** `motion`, touch, `custom:sixty-second-mayhem/challenge`, mic (Loudmouth only)

## Pitch
Rapid-fire phone challenges - shake, tap, balance, spin, react. Each one lasts seconds. Chaos guaranteed.

## Intro and presentation
- **Title sequence:** a giant stopwatch ticks, numbers flip like an airport board from 60 down, and "60 SECOND MAYHEM" bursts out of the stopwatch face with a starting-gun bang.
- **Signature moment:** each challenge gets its own 2-second title card (bold icon, name, one-line rule) that whips in sideways, then a live race-bar leaderboard during the challenge.

## How to Play lines
- Six quick challenges, one after another.
- Each one uses your phone differently - read the card fast!
- Top three in each challenge score points.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| challenges | 6 | 4-10 |
| includeMic | on | on, off |

## Challenges (each a module: `{ id, title, rule, icon, durationMs, phoneScreen, metric, higherIsBetter }`)
| Id | Name | What you do | Metric |
| --- | --- | --- | --- |
| shake | Shake Frenzy | Shake as fast as you can, 10 s | shake count |
| tap | Tap Storm | Tap the screen as fast as you can, 10 s | taps |
| statue | Statue | Hold perfectly still, up to 20 s | seconds until wobble |
| quickdraw | Quick Draw | Tap the instant the screen says DRAW (false start = out) | reaction ms (lower) |
| balance | Balance Ball | Tilt to keep a ball inside a moving ring, 15 s | % time inside |
| spin | Spin Cycle | Turn on the spot 3 full times holding the phone | seconds (lower) |
| loud | Loudmouth | Make the loudest sound you can for 3 s | peak level |
| hush | Ninja Hush | Stay quieter than everyone else for 8 s | mean level (lower) |
| sequence | Copy Cat | Repeat a growing colour sequence | length reached |
| flip | Pancake Flip | Toss the phone gently in the air in your hand and catch it flat (free-fall detection), max 3 flips | flips (safety: over a couch, low tosses) |

## Flow
1. **CARD** - TV: challenge card 2 s.
2. **GO** - Phones run the challenge locally and report the metric at the end (and progress at 5 Hz for the TV race bars).
3. **RANK** - TV ranks results. `ctx.endRound()` per challenge.

## Scoring
- 1st 300, 2nd 200, 3rd 100, everyone else 25.

## Done when
- Each challenge module has a unit test for its metric function using fixture sensor data.
- Quick Draw false starts are detected.
- Challenges using unavailable sensors are skipped for that device (with a fallback challenge).

## Notes for Claude
- Pancake Flip only appears when the household setting "Allow phone tosses" is on (default off).
