# 00 - Build order and Claude Code prompts

Work through these steps in order. Each step is one Claude Code session: paste the prompt, let it work, test on real devices, commit, then run `/clear` before the next step. Every prompt assumes Claude Code is running in the repo folder that contains `CLAUDE.md`.

## Getting started

1. Install Node.js 20 or newer, then `npm install -g pnpm`.
2. Install Claude Code and sign in.
3. Make a folder called `murley-show`, copy everything from this starter pack into it, then run `git init` and commit.
4. Open a terminal in the folder and run `claude`.
5. Paste the prompt for Step 1.

Tips:

- If Claude Code gets stuck on a bug, ask it to "write a failing test that shows the bug, then fix it".
- After each step, try it on at least one iPhone and one Android phone. Note anything odd in `docs/known-issues.md` and paste that file into the next session if it's relevant.
- Commit after every step: `git add -A && git commit -m "Step N: <name>"`.

## Foundations

### Step 1 - Scaffold
> Read CLAUDE.md and docs/01-architecture.md. Scaffold the monorepo exactly as described in section 1: pnpm workspaces, strict TypeScript, apps/server (Express + Socket.IO), apps/tv and apps/phone (Vite + React), and the packages shared, engine, games, ui-phone, ui-tv and media. Add vitest, eslint and prettier. Put the colour tokens and fonts from CLAUDE.md in packages/shared/src/theme.ts. Make `pnpm dev` run the server, TV app and phone app together over HTTPS on the local network and print the LAN URLs. Stop when `pnpm dev`, `pnpm test` and `pnpm typecheck` all work, and tell me the URLs to open.

### Step 2 - Rooms, QR join and avatars
> Read docs/01-architecture.md section 3 and docs/02-components.md. Build rooms and joining: room:create from the TV, the TV LobbyScreen with the room code, a large QR code (qrcode package, SVG) linking to `${PUBLIC_URL}/join?room=CODE`, and joined avatars. Build the phone JoinScreen (pre-fills the code from the QR link), the AvatarBuilder (draw or selfie), VIP assignment, rejoin with sessionToken and the 60-second seat hold, kick, Audience for late joiners, and the CornerQR component. Add tools/bots with a `--players` option that joins fake phones. Write tests for room codes, VIP hand-over and rejoin. Stop when 8 bots plus my real phone can join by scanning the QR.

### Step 3 - Engine runtime and a reference game
> Read docs/01-architecture.md sections 5 to 8 and 15. Build the engine: the GameModule and GameContext types, the phase runner (MENU, SETTINGS, HOW_TO_PLAY, game phases, ROUND_RATING, GAME_RESULTS, PAUSE), timers that pause, teams with auto-balancing, award() and night points, createTestRoom() test helpers, the phone ScreenRouter, VipMenu, VipSettings (auto form from zod), RatingScreen, YourResult, and the TV HowToPlayCard, TimerRing, ScoreStrip, Podium and RatingSummary. To prove it works, build a tiny reference game called `tap-race` (everyone taps a button as many times as possible in 10 seconds, 3 rounds) and use it as the example for every later game. Stop when tap-race runs end to end with bots and real phones, in solo and teams mode.

### Step 3b - The Show Package
> Read docs/03-show-polish.md in full. Build the Show Package in packages/ui-tv/src/show/: ShowOpener (The Murley Show! brand opener), TitleSequence with all eight letter presets and the four-beat timeline, Wipe transitions, RevealKit, StageBackground, SoundKit (generate or source original/royalty-free stings, UI sounds and three music beds, and list their licences in content/sfx/LICENCES.md), HostVoice with an en-AU voice and a starter line bank in content/host/lines.json, HighlightCapture, and the /dev/show review page. Restyle the lobby, menu, How to Play, rating and results screens to the standard. Give tap-race a full title sequence as the reference example. Then go through the Showtime checklist for tap-race and fix anything that isn't ticked. Test on the Google TV Streamer for 60 fps.

### Step 4 - Clock sync and buzzer
> Read docs/01-architecture.md section 9. Build clock sync (clock:ping, offset median, clamp) in packages/media and the server, ctx.serverTimeOf(), and the shared Buzzer phone component with armedAt and early-press lockout. Add a /dev/buzzer page on the TV that shows every buzz with its corrected time in ms. Write tests that simulate phones with different clock offsets and network delays and check the earliest real press always wins.

### Step 5 - Ratings and the ranked menu
> Read docs/01-architecture.md section 10. Create the SQLite schema, record game sessions and ratings, the play-again question, ranking.ts with the fair score, menu score, group-size bands, exploration slot and Under review shelf, item flagging in ctx.content(), and the PIN-protected /admin creator dashboard on the TV app. Write unit tests for the ranking maths with made-up data.

**Gate:** 8 real phones join by QR and stay connected for 30 minutes of tap-race.

## Wave 1 - MVP games

For every game, use this prompt with the game id swapped in:

> Build the game in docs/games/<game-id>.md. Read CLAUDE.md, the architecture, components and show-polish docs first. Turn the spec's "Done when" list into failing vitest tests, then write logic.ts until they pass. Then build the TV view and phone screens to the top-shelf standard: the title sequence and signature moment exactly as the spec's "Intro and presentation" section describes, wipes between phases, build-up and payoff on every reveal, sound on every action. Then the content pack (at least the launch quantity in the spec, Australian English, family-friendly, schema-valid), then a bot strategy. Run `pnpm bots -- --game <game-id>` with the minimum and maximum players in every mode. Add /dev/<game-id> fixture pages showing every phase. Go through the Showtime checklist and tick every item. Finish by listing anything I need to test on a real phone or the TV box.

Build in this order: `buzz-blitz`, `most-likely-to`, `hive-mind`, `sketch-off`, `double-agent`.

**Gate:** 3 group playtests where most players ask to play again.

## Wave 2 - The music update

### Step 6 - Media and music kit
> Read docs/01-architecture.md sections 11 and 12 and the MicRecorder, MusicPlayer and VocalMixer sections of docs/02-components.md. Build: the PermissionGate, the media upload API with limits and cleanup, the MicRecorder phone component, an LRC parser, the song catalogue loader, the MusicPlayer interface with FileMusicPlayer and YouTubeMusicPlayer (IFrame Player API, pre-roll, sync loop, drift correction, per-device latency calibration), the TV YouTubeFrame component, the VocalMixer with alignment and Mercy Mode, the AvatarPerformer, and the /song-lab page on the TV app (add by YouTube link or search if YOUTUBE_API_KEY is set, or by MP3; embeddable check; tap tempo; mark chorus; Tap to Time lyrics; instrumental link with offset finder; Calibrate this TV; preview a fake drop; save). Add tools/stems/split.py using Demucs with a README. Include one short original test song so it works with no setup (a generated 30-second backing loop and an LRC for a made-up chorus). Test alignment and the YouTube sync maths with simulated clocks.

Then add 10-20 of your family's favourite songs in Song Lab (YouTube links are the quickest start) and build: `vocal-drop`, `style-swap`, `hum-dinger`, `lip-sync-showdown`, `duet-disaster`, `choir-of-chaos`.

**Gate:** Vocal Drop averages 4 or more stars across 3 game nights.

## Wave 3 - Move and camera

### Step 7 - Motion and camera kit
> Read the MotionKit, GyroPointer, CameraCapture, PoseCam and FaceCam sections of docs/02-components.md. Build MotionKit with permission handling and the feature helpers, the MotionPad, GyroPointer (with one-euro smoothing and a calibrate step), CameraCapture (photo and video, front and back, retake, resize, upload), PoseCam and FaceCam using @mediapipe/tasks-vision with the model files bundled locally, the TV ClipPlayer and Gallery, and a /dev/pose-recorder page that saves my pose landmarks to JSON so I can make new poses and dance moves. Add a household setting to turn camera and movement games off.

Then build: `freeze`, `sixty-second-mayhem`, `dance-off`, `balloon-blitz`, `charades-cam`, `scavenger-snap`, `couch-critics`.

### Step 8 - Android TV box app
> Read docs/01-architecture.md section 16. Create apps/android with Capacitor wrapping the TV build: server URL setup on first launch (typed or by scanning a QR shown at /admin), autoplay audio without a gesture, keep awake, landscape lock and D-pad focus on lobby, menu and admin screens. Add `pnpm android` and a README that explains building the APK and sideloading it with adb.

**Gate:** a 90-minute game night with no crashes on the website and the Android box.

## Wave 4 - Classics

Build: `the-ladder`, `ballpark`, `spin-solve`, `mind-meld`, `bluff-busters`, `hot-potato`, `blurt`, `case-closed`, `hunted`.

Add power-ups and audience mode now (Step 9):

> Add the platform-wide power-ups (Steal, Double Points, Freeze an opponent's timer, Peek) as an engine feature that games opt into with `meta.powerUps: true`, earned by a correct answer streak of 3, held on the phone, played before a round. Add audience mode: audience phones can vote in Vote screens (shown separately), bet points on who wins each game, and send reactions. Turn on power-ups for buzz-blitz, the-ladder and hunted.

**Gate:** game-night ready - 27 games, no crashes, you're happy to run it for guests.

## Wave 5 and later - ratings-led

Open `/admin`, look at the ratings, and build the remaining games in the order players are most likely to enjoy (start with games similar to your highest-rated ones). Wave 5: `long-shot`, `last-one-standing`, `pick-me`, `bestie-test`, `emoji-decoder`, `boss-orders`, `vault-breakers`, `blind-audition`, `masked-vocals`, `foley-frenzy`, `strike-a-pose`, `mirror-mirror`, `slow-mo-mayhem`. Later: `hard-hat-quiz`, `finish-the-line`, `pitch-perfect`, `auto-tuned`, `air-band`, `beat-battle`, `couch-rally`, `gladiator-gauntlet`, `stadium-wave`.

Also in this phase: player profiles (device-based, optional), badges, the end-of-night Highlights reel, and a Labs shelf for prototypes.

## Making a brand-new game later

> Read docs/games/_template.md and two existing specs similar to my idea. Write a new spec at docs/games/<new-id>.md for this game: <describe it>. Ask me up to 5 questions first if anything important is unclear. Then build it with the standard game prompt.
