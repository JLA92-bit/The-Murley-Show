# 01 - Architecture

This is the contract every game is built against. If a game spec and this file disagree, this file wins for shared behaviour and the game spec wins for game rules.

## 1. Repository layout

```
murley-show/
  CLAUDE.md
  package.json                 pnpm workspaces root, scripts: dev, test, typecheck, bots, build, android
  pnpm-workspace.yaml
  .env.example                 PUBLIC_URL, PORT, DATA_DIR, CONTENT_DIR
  apps/
    server/                    Express + Socket.IO + SQLite + media store
      src/index.ts             boot: load content, open DB, start HTTP(S) + sockets
      src/rooms/               RoomManager, Room, PlayerSession
      src/media/               upload route, media store, cleanup
      src/db/                  SQLite schema + queries (ratings, sessions, profiles, highlights)
      src/content/             content loader (validates every pack with the game's zod schema)
    tv/                        Vite + React + PixiJS host screen
      src/routes/              /, /room/:code, /song-lab, /admin, /dev/:gameId
      src/shell/               Lobby, Menu, HowToPlay, RatingSummary, Results, Highlights, CornerQR
    phone/                     Vite + React controller page
      src/routes/              /join, /play, /dev/:gameId
      src/shell/               JoinScreen, AvatarBuilder, ScreenRouter, PermissionGate, Waiting
    android/                   Capacitor project wrapping the tv build
  packages/
    shared/                    protocol types, zod schemas, theme, game registry metadata, utils
    engine/                    room runtime, phase runner, timers, teams, scoring, ratings, ranking
    games/                     src/<game-id>/ one folder per game (see section 4)
    ui-phone/                  shared phone components (docs/02-components.md)
    ui-tv/                     shared TV components (docs/02-components.md)
    media/                     clock sync, recording helpers, LRC parser, alignment, mixer graphs
  content/
    <game-id>/*.json           content packs per game
    songs/<song-id>/           meta.json, track.mp3, instrumental.mp3 (optional), lyrics.lrc, pitch.json (optional), chart.json (optional)
    sfx/                       sound effects and stings
    fonts/
  tools/
    bots/                      fake phone clients for playthrough tests
    song-tools/                bpm, onset, pitch and chart extraction (Node)
    stems/                     optional Python scripts using Demucs to split vocals and instruments
  docs/
    00-build-order.md
    01-architecture.md
    02-components.md
    games/<game-id>.md
  data/                        runtime only, git-ignored: murley.db, media/, highlights/
```

Package names: `@murley/shared`, `@murley/engine`, `@murley/games`, `@murley/ui-phone`, `@murley/ui-tv`, `@murley/media`.

## 2. Running at home

- **Development:** `pnpm dev` serves the TV app, phone app and server on the LAN with a self-signed HTTPS certificate (`@vitejs/plugin-basic-ssl` for Vite, the same cert for the server). Phones must use HTTPS for mic, camera and motion sensors. Tap through the certificate warning once on each phone.
- **Game nights (recommended):** run the server on a home computer, mini PC or Raspberry Pi 5 and publish it with a free **Cloudflare Tunnel** on your own domain (for example `play.murleyshow.com`). Phones get a real HTTPS URL, so no certificate warnings, and the TV or Android box loads the same URL. `PUBLIC_URL` in `.env` must match it because the QR codes use it.
- **Fully offline (later):** a local certificate made with mkcert and its root certificate installed on each phone, or the server running on the Android box itself.
- Production build: the server serves the built TV app at `/` and the phone app at `/join` and `/play` from one port.

## 3. Rooms, joining and the QR code

- TV calls `room:create` and gets a room with a 4-letter code (letters only, no I or O, no rude words - keep a blocklist).
- The TV lobby shows: the code in 160 px letters, a **QR code at least 420 x 420 px** encoding `${PUBLIC_URL}/join?room=CODE`, the join URL in text, and the avatars of everyone who has joined.
- Phone `/join?room=CODE` pre-fills the code and goes straight to name and avatar. `/join` without a code shows a 4-letter input.
- During any game, `CornerQR` shows a 160 px QR plus code in the bottom-right corner of the TV. VIP setting: Show / Hide / Lobby only. Default Show.
- People who join mid-game become **Audience** until the next game starts, then become players if there is room (max 16 players, unlimited audience).
- First player in is **VIP**. If the VIP leaves, VIP passes to the longest-connected player.
- Each phone stores `deviceId` and `sessionToken` in localStorage. On reconnect it sends `room:rejoin` and gets its seat back. Seats are held for 60 seconds; after that the player becomes Audience on return.
- Kick: VIP can remove a player from the lobby or pause menu.

## 4. One folder per game

```
packages/games/src/<game-id>/
  index.ts        exports the GameModule (logic) - imported by the server
  meta.ts         GameMeta (name, inspiredBy, players, modes, features) - imported everywhere
  content.ts      zod schema for this game's content packs
  logic.ts        pure game logic
  logic.test.ts   vitest, written from the spec's "Done when" list
  Tv.tsx          the game's TV view (React + PixiJS)
  phone/          only if the spec needs game-specific phone screens
  fixtures.ts     fake states for /dev/<game-id> routes
```

`packages/games/src/registry.ts` lists every game. Entry points `@murley/games/logic` (server, no React) and `@murley/games/tv`, `@murley/games/phone` keep server bundles free of React.

## 5. The GameModule contract

```ts
// packages/shared/src/game.ts
export type Mode = 'solo' | 'teams' | 'coop';
export type Feature =
  | 'buzzer' | 'text' | 'draw' | 'vote' | 'mic' | 'camera' | 'motion'
  | 'gyro-pointer' | 'haptics' | 'speech' | 'pose' | 'face' | 'music';

export interface GameMeta {
  id: string;                 // kebab-case, matches docs/games/<id>.md
  name: string;               // "Buzz Blitz"
  inspiredBy: string[];       // ["Jeopardy!", "Hot Seat"]
  tagline: string;            // one line for the menu card
  howToPlay: string[];        // 3-5 short lines for the How to Play screen
  minPlayers: number; maxPlayers: number;
  modes: Mode[];              // first entry is the default
  features: Feature[];
  wave: 1 | 2 | 3 | 4 | 5 | 'later';
  estMinutes: number;
  accent: keyof Theme['colours'];
}

export interface GameModule<S, A extends { type: string }> {
  meta: GameMeta;
  settings: z.ZodType;               // VIP settings, all fields have defaults
  init(ctx: GameContext, settings: unknown): S;
  onAction(s: S, from: PlayerId, action: A, ctx: GameContext): S;
  onTimer(s: S, timerId: string, ctx: GameContext): S;
  onPlayerLeft?(s: S, id: PlayerId, ctx: GameContext): S;
  onPlayerReturned?(s: S, id: PlayerId, ctx: GameContext): S;
  tvView(s: S, ctx: GameContext): TvView;                    // { phase, data } sent to the TV
  phoneView(s: S, id: PlayerId, ctx: GameContext): PhoneView; // per player, may hold secrets
  audienceView?(s: S, ctx: GameContext): PhoneView;
}

export interface GameContext {
  roomId: string;
  players: Player[];          // { id, name, avatar, colour, teamId?, isVip, connected }
  teams: Team[];              // empty in solo mode
  mode: Mode;
  familyFilter: boolean;
  now(): number;              // server ms, deterministic in tests
  rng(): number;              // seeded 0..1
  shuffle<T>(xs: T[]): T[];
  setTimer(id: string, ms: number): void;   // fires onTimer(id)
  clearTimer(id: string): void;
  content<T>(pack: string): T[];            // already filtered by familyFilter
  media(id: string): MediaRef | undefined;
  award(target: PlayerId | TeamId, points: number, reason: string): void;
  serverTimeOf(playerId: PlayerId, clientTime: number): number; // clock-sync conversion
  endRound(summary?: RoundSummary): void;   // engine runs RATING then calls back
  endGame(): void;
  emitEffect(e: Effect): void;               // haptic pulse, sound sting, confetti - fire and forget
}
```

`PhoneView` is a descriptor, not React: `{ screen: 'buzzer' | 'choices' | 'text' | ... | 'custom:<game-id>/<name>', props: {...} }`. The phone's `ScreenRouter` maps screen names to components from `@murley/ui-phone` or the game's `phone/` folder.

Every view also carries `{ phaseEndsAt?: number }` so phones and TV can show synced countdowns.

## 6. Engine phases (shared by every game)

```
LOBBY -> MENU -> SETTINGS -> HOW_TO_PLAY -> [game phases] -> ROUND_RATING -> [game phases] ... -> GAME_RESULTS -> MENU
```

- **MENU:** VIP phone shows game cards ranked by the menu score (section 10), filtered to games that fit the player count and enabled features (School/Family settings). TV shows the same cards large.
- **SETTINGS:** VIP picks mode (Solo, Teams, Co-op as allowed), rounds, timers, and game settings from the game's zod schema (auto-built form).
- **HOW_TO_PLAY:** 12 seconds (skippable by VIP). TV: game name, tagline, `howToPlay` lines, a looping demo animation if the game provides one, and "Inspired by ...". Phones: same text plus any permission prompt the game needs (mic, camera, motion) via `PermissionGate`. The game does not start until all players granted or chose "play without" (they get the fallback screen).
- **ROUND_RATING:** after each `ctx.endRound()`. 8 seconds. Phones show `RatingScreen`. TV shows the round summary and a live count of ratings in.
- **GAME_RESULTS:** TV podium for this game, then night leaderboard update. Phones show your place and points. Then "Play this one again next time?" yes/no.
- **HIGHLIGHTS:** VIP can trigger at the end of the night. Replays saved clips and top moments.
- **PAUSE:** VIP can pause any time. All timers freeze (engine stores remaining ms).

## 7. Teams

- Teams mode: 2-4 teams (VIP picks count, default 2). Auto-balanced by night points so far (snake draft), shuffleable by VIP.
- Team colours in order: Green, Sky, Amber, Orange. Team names default to "Team Green" etc and are editable by the first member.
- `ctx.award(teamId, ...)` splits nothing - the team gets the points and every member shares the team total on the night leaderboard.

## 8. Scoring and the night leaderboard

- Games award raw points with `ctx.award`.
- At GAME_RESULTS the engine converts each game's ranking into **night points**: 1st 1000, 2nd 750, 3rd 600, 4th 500, then -50 per place down to a floor of 150. Ties share the higher value. Co-op games give everyone the same night points (stars x 200, max 1000).
- Comeback: the last game of the night (VIP marks it "Final") doubles night points.

## 9. Clock sync and fair buzzers

- On join and every 30 seconds each phone sends 5 `clock:ping { t0 }`, server replies `clock:pong { t0, serverTime }`. The phone computes offset = serverTime - (t0 + t1) / 2 and keeps the median; it reports `{ offset, rtt }` to the server.
- Every action carries `clientTime` (phone `performance.timeOrigin + performance.now()`). `ctx.serverTimeOf()` converts it using the stored offset, clamped to within +/- 150 ms of arrival time so a hacked clock cannot cheat.
- Buzz resolution: when the first buzz arrives, open a 250 ms window, then pick the earliest converted time. Show every buzz time in ms on the TV.
- Phones arm their buzzer at `armedAt` (server time converted to local) so all phones go live together. Buzzing before `armedAt` locks that phone out for 500 ms.

## 10. Ratings, game sessions and the menu ranking

SQLite tables (`apps/server/src/db/schema.sql`):

```sql
CREATE TABLE nights (id TEXT PRIMARY KEY, started_at INTEGER, ended_at INTEGER);
CREATE TABLE game_sessions (
  id TEXT PRIMARY KEY, night_id TEXT, game_id TEXT, mode TEXT, group_size INTEGER,
  family_filter INTEGER, started_at INTEGER, ended_at INTEGER,
  completed INTEGER, play_again_yes INTEGER, play_again_no INTEGER);
CREATE TABLE ratings (
  id INTEGER PRIMARY KEY, session_id TEXT, game_id TEXT, round INTEGER,
  item_id TEXT, stars INTEGER, tags TEXT, created_at INTEGER);
CREATE TABLE item_flags (item_id TEXT, game_id TEXT, thumbs_down INTEGER, PRIMARY KEY(item_id, game_id));
CREATE TABLE profiles (device_id TEXT PRIMARY KEY, name TEXT, avatar TEXT, stats TEXT);
CREATE TABLE highlights (id TEXT PRIMARY KEY, night_id TEXT, game_id TEXT, media_id TEXT, title TEXT, created_at INTEGER);
```

Ratings never store player names. `item_id` is the content item (question, song, prompt) used that round, so weak items can be flagged.

Ranking (`packages/engine/src/ranking.ts`):

```
fair(game)  = (C * m + sum(stars)) / (C + n)          C = 30, m = mean stars across all games (default 3.5)
finish      = completed sessions / sessions            (0..1)
again       = play_again_yes / (yes + no)              (0..1, default 0.5)
recency     = 1 if played in the last 2 nights by this household, else 0
menuScore   = fair + 0.5 * finish + 0.5 * again - 0.75 * recency
```

- Split stats by group-size band (2-4, 5-8, 9-16) and mode when n >= 20 in that band; otherwise use overall stats.
- Menu order: highest menuScore first, but **every 5th card is an exploration pick**: the game with the fewest ratings that fits the group.
- `fair < 3.0` with n >= 100 -> "Under review" shelf (still playable from All games).
- Items with average stars under 2.5 over 10+ ratings, or 3+ thumbs-down, are skipped by `ctx.content()` until cleared in `/admin`.
- `/admin` on the TV app (PIN protected) shows a creator dashboard: per game fair score, n, finish rate, play-again rate, tag counts, the round where groups quit, and flagged items with Clear / Delete buttons.

## 11. Media (mic, camera)

- Phones record with MediaRecorder. Audio: prefer `audio/webm;codecs=opus`, fall back to `audio/mp4` (iPhone). Video: `video/webm;codecs=vp9` or `video/mp4`, 720p max, 2.5 Mbps.
- Recording constraints for singing: `{ echoCancellation: false, noiseSuppression: false, autoGainControl: false }`. For speech games keep the defaults on.
- Upload: `POST /api/media` multipart (`file`, `roomCode`, `sessionToken`, `purpose`, `meta` JSON) -> `{ mediaId, url, durationMs }`. Limits: audio 15 MB, video 60 MB, image 8 MB. Images are resized on the phone to 1280 px long edge, JPEG 0.82.
- Phones then send the game action with `mediaId`. Server keeps media in `data/media/<roomId>/` and deletes it when the room closes or after 12 hours. Saved highlights move to `data/highlights/`.
- The TV fetches media by URL and decodes audio with `AudioContext.decodeAudioData` (the Android box WebView handles both Opus/WebM and AAC/MP4).
- `PermissionGate` asks for permissions once per night on a tap (iPhone requires a user gesture for motion and audio playback).

## 12. Music library (home use) - two sources

Songs can come from **YouTube** (huge catalogue, no files to manage, needs internet) or from **your own music files** (perfect sync, full audio processing, works offline). Every song lives in `content/songs/<song-id>/` with a `meta.json`:

```
meta.json        { id, title, artist, year, bpm, firstBeatMs, durationMs,
                   chorus: { startMs, endMs }, verse?: { startMs, endMs },
                   difficulty (1-5), tags: [], familyOk: true,
                   source: 'youtube' | 'file',
                   youtube?: { videoId, instrumentalVideoId?, instrumentalOffsetMs? } }
lyrics.lrc       timed lyrics (LRC format), made in Song Lab or supplied
track.mp3        file source only: the full song from your own collection
instrumental.mp3 file source, optional: backing track without vocals (tools/stems)
pitch.json       file source, optional, for Pitch Perfect
chart.json       file source, optional, for Air Band
```

All times (`chorus`, LRC lines, `firstBeatMs`) are in the main track's timeline - the YouTube video's timeline for YouTube songs.

### YouTube source

- **Player:** the YouTube IFrame Player API inside the TV app (works in Chrome and in the Android box app's WebView). The music video plays in a framed panel on the TV stage during music games - it becomes part of the show. Never hide the player.
- **Mixing:** YouTube audio cannot be routed into Web Audio (it's a cross-origin iframe), so the track and the vocals mix at the speakers. Vocals still go through the full Web Audio chain (compressor, reverb, Mercy Mode). The track is lowered with `player.setVolume()` (100 -> 55) while vocals play, in place of Web Audio ducking.
- **Instrumentals:** for the best Vocal Drop, Song Lab can store a second link to a karaoke or instrumental version (`instrumentalVideoId`) and its offset from the main video; the game uses it when present.
- **Sync (`packages/media/src/youtube-sync.ts`):**
  1. During GET_READY, `cueVideoById` at `sectionStart - preRoll - 2 s`, play muted, wait for state PLAYING with the expected `videoId` and duration (this also lets any pre-roll ad finish off-stage), pause, seek back.
  2. At the drop, `playVideo()`, then sample `getCurrentTime()` against `AudioContext.currentTime` every animation frame for 600 ms and fit a straight line.
  3. Schedule the vocal buffer to start when the video reaches the vocal's target time, minus the device's `audioLatencyMs`.
  4. Re-measure every 2 s; if drift exceeds 80 ms, restart the vocal source at the corrected offset with a 30 ms crossfade.
  5. Expected accuracy is about +/- 80 ms - fine for a party sing-along.
- **Latency calibration:** Song Lab's "Calibrate this TV" plays a click track through YouTube and through Web Audio; you tap along and it stores `audioLatencyMs` for that device (the Android box and a laptop differ).
- **Adding songs:** paste a YouTube link into Song Lab. If `YOUTUBE_API_KEY` is set in `.env` (free YouTube Data API v3 key), Song Lab can search instead: about 100 searches a day on the free quota. Song Lab checks that the video allows embedding (error 101/150 means it doesn't) and warns.
- **YouTube Premium:** Premium removes ads in a browser where you're signed in to YouTube. The Android box app's WebView can't sign in to Google, so embedded videos there may still show ads even though the YouTube app on the same Streamer is Premium. The pre-roll in step 1 lets ads play during GET_READY instead of during the drop. If ads become a nuisance, run the TV screen from a laptop's Chrome (signed in to Premium) over HDMI, or use file-source songs.
- **What YouTube can't do here:** the YouTube app's downloads stay locked inside that app, and the native YouTube app can't be timed precisely from another app, so the embedded player is the way to use YouTube.

### File source

- Web Audio for everything: precise sync, true ducking, EQ, stems, offline play.
- `tools/stems/split.py` (optional, Python, Demucs `htdemucs`) makes `instrumental.mp3` and `vocals.wav`.
- Required for Pitch Perfect and Air Band (they need stems and analysis).

### Which games use which source

| Game | YouTube | File |
| --- | --- | --- |
| Vocal Drop, Duet Disaster, Choir of Chaos, Style Swap | Yes (instrumental video recommended) | Yes (best quality) |
| Hum Dinger, Lip Sync Showdown, Finish the Line, Blind Audition, Dance Off, Stadium Wave light show | Yes | Yes |
| Pitch Perfect, Air Band | No | Yes (with stems) |
| Masked Vocals, Auto-Tuned, Beat Battle, Foley Frenzy | Not needed (no song track) | Not needed |

### Song Lab (`/song-lab` on the TV app)

1. Add a song: paste a YouTube link (or search), or drop in an MP3.
2. Tempo: tap along to set BPM, with an auto-detect suggestion for file songs; set the first beat.
3. Sections: play and press a key (or tap on your phone) to mark chorus start and end, optionally verse.
4. **Lyrics - Tap to Time:** paste plain lyrics, play the song, and tap once at the start of each line; Song Lab writes `lyrics.lrc`. Nudge the whole file earlier or later while listening. An existing LRC file can be dropped in instead.
5. Optional instrumental link or file, with an offset finder (plays both, you nudge until they line up).
6. Preview: plays a fake drop with a bundled test vocal so you can hear the alignment.
7. Save. The content loader lists songs with a valid `meta.json` and `lyrics.lrc`, plus `track.mp3` for file songs. Music games pick from this list and show a YouTube or File badge.

## 13. Socket protocol (namespaced events, all payloads zod-validated)

Phone -> server: `room:join`, `room:rejoin`, `clock:ping`, `clock:report`, `vip:select-game`, `vip:settings`, `vip:start`, `vip:pause`, `vip:kick`, `vip:skip`, `game:action { type, payload, clientTime }`, `motion:stream` (volatile, max 30 Hz), `rate { stars, tags, itemThumbDown? }`, `react { emoji }`, `play-again { yes }`.

TV -> server: `room:create`, `tv:ready`, `tv:media-ready { mediaId }`, `tv:anim-done { key }` (lets logic wait for an animation), `admin:*`.

Server -> clients: `room:state`, `view:tv`, `view:phone`, `clock:pong`, `effect` (haptic, sound, confetti), `stream:pointer` and `stream:motion` (volatile, TV only), `error { code, message }`.

Views are full snapshots sent on every state change, throttled to 15 per second per client. High-rate streams (pointers, live drawing strokes, pitch lines) use volatile events that bypass game state.

## 14. Family filter and household settings

- Family filter is on by default. Every content item has `rating: 'G' | 'PG' | 'M'`; filter on shows G and PG only.
- Household settings (TV `/admin`): camera games on/off, mic games on/off, movement games on/off, corner QR default, music volume defaults, admin PIN.

## 15. Testing

- `packages/engine/src/testing.ts` exports `createTestRoom(gameId, { players, mode, settings, seed })` returning helpers: `act(playerIndex, action)`, `advance(ms)`, `tv()`, `phone(i)`, `scores()`.
- Every game: logic tests from its spec, plus a bot strategy in `tools/bots/strategies/<game-id>.ts` that sends random valid actions read from the phone view (for mic and camera games the bot uploads a bundled test clip from `tools/bots/fixtures/`).
- Playwright smoke test: create room, join 3 phones by QR URL, play one round of the game, check results screen.

## 16. Android TV box app

- `apps/android` is a Capacitor project whose web assets are the TV build. On first launch it asks for the server URL (or scan a QR shown at `/admin` on another device) and stores it.
- `setMediaPlaybackRequiresUserGesture(false)` on the WebView so music plays without a tap. Keep the screen awake (Capacitor KeepAwake). Lock to landscape.
- Full D-pad support on TV screens that need it: lobby buttons, admin, pause. Gameplay itself is driven by phones.
- Build with `pnpm android` then `npx cap open android` and Build APK in Android Studio, or `./gradlew assembleRelease`. Sideload the APK with `adb install` or a file manager.
