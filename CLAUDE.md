# The Murley Show! - instructions for Claude Code

The Murley Show! is a private, at-home party game platform. The TV runs the **host screen** (the show), every phone runs a **controller page** (a web page, no install), and a Node server owns all game state. It is used at home with family and friends only - it is not a public release.

Read these before writing code, in this order:

1. `docs/01-architecture.md` - repo layout, protocol, the GameModule contract, engine phases, media, music, ratings
2. `docs/02-components.md` - the shared phone and TV components every game reuses
3. `docs/03-show-polish.md` - the presentation standard: title sequences, motion, sound, the Showtime checklist
4. `docs/00-build-order.md` - the order things get built in
5. `docs/games/<game-id>.md` - the spec for the game you are building

## The quality bar

This is a top-shelf game show, not a prototype. Every game opens with an animated title sequence, uses game-show typography, moves constantly, sounds great and delivers a polished signature moment. A game that works but looks plain is **not done**. When in doubt, add the build-up and the payoff.

## Golden rules

- **Server is the single source of truth.** Phones and TV only render views the server sends and send actions back. Never decide scoring, timing or winners on a client.
- **Game logic is pure.** Each game's `logic.ts` is a reducer-style module with no I/O, no `Date.now()`, no `Math.random()`. Use `ctx.now()`, `ctx.rng()` and `ctx.setTimer()` from the engine so logic is deterministic and testable.
- **Reuse shared components.** If a phone screen exists in `packages/ui-phone` (Buzzer, ChoiceGrid, MicRecorder ...), use it. Only build a game-specific screen when the spec says so. If you build something two games could use, move it into the shared package.
- **One game per session.** Build one game spec at a time, end to end, then stop and report.
- **Tests first for logic.** Turn the spec's "Done when" list into vitest tests before writing the logic.
- **Never break other games.** Run `pnpm test` and `pnpm typecheck` across the whole repo before finishing.

## Stack (do not swap without asking)

- TypeScript (strict) everywhere, pnpm workspaces, Node 20+
- Server: Express + Socket.IO, SQLite via better-sqlite3, zod for validation
- TV app: Vite + React 18 + PixiJS 8 for scenes and particles, GSAP (with SplitText) for text and UI timelines, Howler.js for sound effects, Web Audio API for vocal mixing and file-source music
- Music: two sources behind one `MusicPlayer` interface - YouTube IFrame Player API, or local MP3 files (architecture section 12)
- Phone app: Vite + React 18, mobile-first, portrait
- Camera AI: `@mediapipe/tasks-vision` (PoseLandmarker, FaceLandmarker) running on the phone
- Audio analysis: `pitchy` (pitch), `soundtouchjs` (pitch and tempo shifting)
- QR codes: `qrcode` package rendering SVG on the TV
- Android TV box: Capacitor wrapping the TV app build
- Tests: vitest (logic and components), Playwright (end to end), bot clients in `tools/bots`

## Commands

- `pnpm dev` - server, TV app and phone app together, HTTPS on the local network
- `pnpm test` - all unit tests
- `pnpm typecheck` - tsc across all packages
- `pnpm bots -- --game <id> --players 8 --rounds 3` - simulated playthrough with fake phones
- `pnpm build` - production build of everything
- `pnpm android` - build the TV app and sync it into the Capacitor Android project

## Look and feel

- Backgrounds are **white** (`#FFFFFF`). Colour tokens live in `packages/shared/src/theme.ts`:
  - Navy `#00294D` (primary: headers, buttons, platform chrome)
  - Maroon `#940E16` (secondary: buzzers, highlights, alerts)
  - Green `#5CBD6C` (correct, go, team A), Sky `#4BC9F5` (timers, info, team B)
  - Amber `#FBAD45` (points, winners, team C), Orange `#F26839` (urgency, final round, team D)
- Never use colour as the only signal: pair it with an icon, label or shape.
- TV: 1920 x 1080 design size, scale to fit, keep 5% safe margins, body text at least 48 px, readable from 4 metres.
- Phone: one main action per screen, tap targets at least 64 px tall, works one-handed in portrait.
- Fonts: "Baloo 2" ExtraBold for headings (sticker style), "Bungee" for scores and timers, "Nunito" for body - all bundled locally.
- Full motion, typography and sound rules are in `docs/03-show-polish.md`.

## Writing style for all on-screen text

- Australian English (colour, favourite, organise, mum, arvo is fine in jokes).
- Use a hyphen ( - ), never an em dash.
- Friendly game-show host voice, short sentences, family-friendly by default.
- Every game's How to Play screen shows a small line: "Inspired by <shows>".

## Joining

- The TV lobby always shows the 4-letter room code **and a large QR code**. The QR encodes `https://<PUBLIC_URL>/join?room=ABCD`, so scanning opens the phone page straight into the room with no typing.
- During games a small QR sits in the TV's bottom-right corner (VIP can hide it) so late arrivals and audience members can join any time.

## Definition of done for a game

1. Logic tests from the spec's "Done when" list pass.
2. `pnpm bots -- --game <id>` completes 3 rounds with the minimum and the maximum player count, in every mode the game supports, with no errors.
3. TV and phone views render every phase in the spec (add a Storybook-style fixture route `/dev/<game-id>` in each app that shows each phase with fake data).
4. At least the launch content quantity listed in the spec exists in `content/<game-id>/` and passes its zod schema.
5. The title sequence and signature moment from the spec are built, and every item on the Showtime checklist (`docs/03-show-polish.md` section 10) is ticked or explained.
6. You report anything that needs checking on a real phone or on the TV box (mic, camera, motion, vibration, YouTube sync, 60 fps).

## Things to avoid

- No accounts or logins for players. Names and avatars only.
- No external network calls from game logic. Content is loaded from `content/` at server start.
- Recorded audio, photos and video are deleted when the room closes unless everyone in the clip taps Save.
- Do not add analytics, ads or third-party trackers.
