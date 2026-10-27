# 03 - Show polish: the top-shelf standard

The Murley Show! should feel like a big-budget TV game show from the very first second. A game is not finished until it passes the Showtime checklist at the end of this file. Build the Show Package (section 9) before any game, so every game gets the same polish for free.

## 1. Brand

- **Wordmark:** "THE MURLEY SHOW!" in Baloo 2 ExtraBold, navy `#00294D` letters with a 6 px navy outline offset into a maroon `#940E16` hard drop shadow (6 px down-right, no blur). The "!" is a maroon star-burst.
- **Show opener (TV load, 6 s):** white stage, two maroon curtains part, spotlights sweep, the wordmark drops in letter by letter with springy bounces, confetti in the six palette colours, applause and a 4-bar original theme sting. Skippable with any key or the VIP's phone.
- **Lobby:** the stage stays live - slow spotlight sweeps, gently floating palette shapes at 6% opacity over white, avatars pop onto the stage as they join with a cheer.
- Backgrounds are always white. Colour comes from shapes, light beams, confetti, outlines and accents, never from full-screen dark backgrounds.

## 2. Typography

| Use | Font | Style |
| --- | --- | --- |
| Game titles, big headings | Baloo 2 ExtraBold | "Sticker" style: navy outline + maroon or accent hard shadow, slight -2 degree tilt allowed |
| Scores, timers, room code | Bungee | Tabular numbers, count-up animations |
| Body text, questions | Nunito Bold/ExtraBold | High contrast navy on white, auto-fit to the box |

All fonts are open licence (OFL) and bundled locally. Questions auto-fit: start at 96 px, shrink to a floor of 56 px, then wrap.

## 3. Motion system

- **Tools:** GSAP (with SplitText for per-letter animation) for text and UI timelines, PixiJS for stage scenes, particles and lighting, Lottie only for pre-made illustrations.
- **Timing tokens:** `snap` 180 ms, `standard` 320 ms, `dramatic` 600 ms, `reveal-hold` 900 ms.
- **Easing tokens:** `pop` = back.out(1.7), `slam` = expo.out, `spring` = elastic.out(1, 0.5), `glide` = power3.inOut.
- **Rules:**
  - Nothing appears or disappears without motion; no hard cuts between phases.
  - Every phase change uses a **wipe**: a diagonal band in the game's accent colour sweeps across (320 ms), carrying the next screen in.
  - Idle screens are never static: breathing scale (1 to 1.02 over 3 s) on key elements, drifting shapes, pulsing timers.
  - Every reveal has a **build-up** (dim, drumroll or riser, 0.6-3 s) and a **payoff** (flash, sting, particles, count-up).
  - Respect the household **Reduced motion** setting: removes screen shake, flashes and large zooms, keeps fades.
  - No flashing more than 3 times per second (photosensitivity).

## 4. Title sequences (every game)

Every game spec has an **Intro and presentation** section. Build it with the `TitleSequence` kit (section 9), 4-6 seconds, in four beats:

1. **Establish (0-0.8 s):** the game's scene element arrives (wheel, vault door, curtain, traffic light...).
2. **Title (0.8-2.5 s):** the game name animates in with a letter preset, synced to a sound sting.
3. **Tagline (2.5-4 s):** one-line tagline and "Inspired by ..." in small text.
4. **Hand-off (4-5 s):** wipe into How to Play with a 15-second looping demo (fake players playing a round).

Letter presets: `slam` (drop and squash), `bounce` (staggered springs), `neon` (flicker on), `stamp` (rubber stamp thunk), `typewriter`, `shatter` (break apart and reassemble), `wave` (sinusoidal ripple), `marquee` (light-bulb sign chase).

The first play of a game each night gets the full sequence; repeats in the same night get a 2-second short version.

## 5. Signature moments

Each spec names a signature moment - the shareable, screenshot-worthy beat of that game (The Drop, the wheel crawl, the vault opening). Spend the most polish here: custom animation, its own sound design, and a camera-style zoom or shake. Signature moments are automatically clipped (TV screen recording via `canvas.captureStream()` for 8 s) into the end-of-night Highlights reel.

## 6. Sound design

- **Every action has a sound:** join pop, button tick, lock-in click, timer ticks in the last 5 s, correct chime, wrong honk, reveal stings, crowd reactions (cheer, gasp, aww, laugh).
- **Music beds:** each game has an original or royalty-free looping bed (menu bed, thinking bed, results bed) that crossfades between phases. Beds duck by 8 dB under the host voice and under recorded vocals.
- **Mix levels:** beds around -20 LUFS, stings around -14, vocals and voice around -16. Master limiter on the TV output.
- **Host voice (optional, default on):** "Murley", a friendly Aussie host. Use pre-written line banks per phase (`content/host/lines.json`: welcome, intro per game, close calls, winners, comebacks, eliminations) spoken with Web Speech synthesis using an en-AU voice, or replaced with recorded audio files dropped into `content/host/audio/` (same ids). Max one host line per phase; never talk over reveals.

## 7. Phone polish

- The phone's top bar takes the current game's accent colour and the player's avatar.
- Buttons press down (scale 0.94, shadow shrinks) with a tick sound (optional) and a haptic on Android.
- "You're up!" moments take over the full screen with a colour flash, a buzz and big text.
- Correct answers fire a small confetti burst on the phone; wrong answers a shake.
- Waiting screens show something to do: reactions, a mini fact, or the live leaderboard - never a blank spinner.
- Screen transitions slide in from the right (320 ms).

## 8. Performance budget

- **TV target:** 60 fps on a Google TV Streamer. Max 300 particles at once, texture atlases for sprites, no CSS `backdrop-filter` or heavy blur on the TV, PixiJS for anything animated in large numbers. Test every game on the real box.
- **Phone target:** 60 fps UI on a 4-year-old mid-range phone; camera AI at 15+ fps.
- **Load:** pre-load each game's assets during How to Play; never show a raw spinner - mask loading with animation.

## 9. The Show Package (build before Wave 1)

`packages/ui-tv/src/show/`:

- `ShowOpener` - the brand opener.
- `TitleSequence` - props: `{ title, tagline, inspiredBy, accent, letterPreset, scene: (app) => PixiScene, sting, short?: boolean }`. Games supply the scene element and choose the preset; the timeline is shared.
- `Wipe` - phase transition, accent-coloured.
- `RevealKit` - build-up and payoff helpers: `dim()`, `drumroll(ms)`, `flash()`, `stamp(text, colour)`, `countUp(from, to)`, `confetti(burst)`, `screenShake(intensity)`.
- `StageBackground` - white stage, moving light beams, drifting shapes.
- `SoundKit` - Howler sprite with the shared stings and UI sounds, bed crossfader with ducking.
- `HostVoice` - line picker and speaker.
- `HighlightCapture` - signature moment recorder.
- `/dev/show` - a page that plays every preset, wipe and reveal for review.

## 10. Showtime checklist (every game)

- [ ] Title sequence matches the spec, 4-6 s, short version on repeat.
- [ ] How to Play has a looping demo, not just text.
- [ ] Every phase change uses a wipe; no hard cuts.
- [ ] Every reveal has a build-up and a payoff.
- [ ] The signature moment is polished and captured for Highlights.
- [ ] Every player action has a sound and visual response on both phone and TV.
- [ ] No dead air: nothing on the TV sits unchanged for more than 3 seconds.
- [ ] Results end with a podium or awards moment.
- [ ] Readable from 4 metres on a real TV; works on the Google TV Streamer at 60 fps.
- [ ] Reduced motion setting respected.
- [ ] Phone screens tested on one iPhone and one Android phone.
