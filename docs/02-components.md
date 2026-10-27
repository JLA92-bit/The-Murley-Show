# 02 - Shared components

Build these once and reuse them in every game. Each phone component is a screen name the server can put in a `PhoneView`. Build a component the first time a game in the build order needs it (the "First needed by" column), with a `/dev` fixture page and tests.

## Phone components (`packages/ui-phone`)

| Screen name | Component | What it does | Key props | First needed by |
| --- | --- | --- | --- | --- |
| `join` | JoinScreen | Room code (pre-filled from QR link), name (max 12 chars, filtered), continue | `room?` | Foundations |
| `avatar` | AvatarBuilder | Draw a face on a circle canvas, or take a selfie (front camera, cropped to circle) | `allowSelfie` | Foundations |
| `waiting` | Waiting | Friendly waiting message, your avatar, optional reaction bar | `message`, `showReactions` | Foundations |
| `vip-menu` | VipMenu | Ranked game cards, filters, All games, Under review shelf | `cards` | Foundations |
| `vip-settings` | VipSettings | Auto form from a zod schema plus mode picker | `schema`, `modes` | Foundations |
| `buzzer` | Buzzer | Giant round maroon button; arms at `armedAt`; early press locks out 500 ms; haptic on press | `armedAt`, `label`, `lockedUntil?` | Buzz Blitz |
| `choices` | ChoiceGrid | 2-6 big option buttons with A/B/C/D shapes as well as colours; optional lock-in confirm | `options`, `confirm?`, `disabled?` | Buzz Blitz |
| `wager` | WagerSlider | Slider plus +/- steps, min and max, confirm | `min`, `max`, `step` | Buzz Blitz |
| `text` | TextAnswer | Single-line input, submit, optional multiple submissions, shows "close!" hints | `maxLength`, `multi?`, `placeholder` | Hive Mind |
| `number` | NumberInput | Calculator-style keypad with currency formatting | `prefix`, `decimals` | Ballpark |
| `vote` | Vote | Pick a player (avatars) or one of N items; can exclude self | `candidates`, `excludeSelf`, `multi?` | Most Likely To |
| `draw` | DrawingCanvas | Normalised 0-1 coordinates, 5 colours, 3 brush sizes, undo, clear; streams strokes | `prompt`, `palette`, `streamStrokes` | Sketch Off |
| `secret` | SecretCard | Tap-and-hold to reveal secret text (hides when released so neighbours can't peek) | `title`, `body`, `list?` | Double Agent |
| `dial` | Dial | Semicircle dial 0-180 degrees, drag to rotate, lock in | `leftLabel`, `rightLabel`, `value?` | Mind Meld |
| `swipe-spin` | SwipeSpinner | Measures swipe speed (px/ms) and direction on a wheel graphic | `minSpeed` | Spin and Solve |
| `letters` | LetterPicker | Grid of letters, disables used ones, vowels/consonants filter | `available`, `kind` | Spin and Solve |
| `word-card` | WordCard | Big word plus banned words; tilt down = correct, tilt up = pass, buttons as fallback | `word`, `banned`, `tilt` | Blurt |
| `mic` | MicRecorder | Count-in, recording, level meter, timed lyrics, beat pulse, haptic beat (Android), upload | see below | Vocal Drop |
| `camera` | CameraCapture | Photo or short video, front or back camera, preview, retake, upload | `kind`, `facing`, `maxMs` | Charades Cam |
| `motion` | MotionPad | Uses MotionKit to run a motion task and show live feedback | `task`, `durationMs` | Freeze! |
| `pointer` | GyroPointer | Calibrate (point at TV centre, tap), then streams aim at 30 Hz; tap to fire | `colour` | Balloon Blitz |
| `pose` | PoseCam | Propped-phone camera with body outline guide; runs PoseLandmarker; scores against a target | `target`, `scoreAt` | Dance Off (camera mode) |
| `face` | FaceCam | Front camera with FaceLandmarker blendshapes; scores against a target | `target`, `scoreAt` | Mirror Mirror |
| `speech` | SpeechInput | Push-to-talk speech recognition with typing fallback | `lang: 'en-AU'` | Hot Potato |
| `rating` | RatingScreen | 5 faces, quick tags, thumbs-down for the item, auto-skip after 8 s | `itemLabel` | Foundations |
| `results` | YourResult | Your place, points and a fun stat | `place`, `points`, `stat` | Foundations |

### MicRecorder details

Props: `{ startAt (server ms), countInBeats, bpm, durationMs, lyrics?: LrcLine[], lyricWindowMs?, showLevel, hapticBeat, purpose, linesToSing?: number[] }`

1. On mount it gets the stream (constraints from the architecture doc) inside the PermissionGate gesture.
2. At `startAt - countIn` it shows big 4-3-2-1 numbers pulsing on each beat and vibrates (Android `navigator.vibrate(40)` per beat).
3. At `startAt` it starts MediaRecorder and records the local start time; lyrics highlight by time (karaoke wipe), beat dot pulses, level meter shows input. Lines not in `linesToSing` show as "...". 
4. At `startAt + durationMs` it stops, uploads, and sends the game action `{ type: 'recorded', mediaId, recordStartedAt (clientTime) }`.
5. If upload fails it retries 3 times, then shows "Tap to retry".

### MotionKit (`packages/media/src/motion.ts`)

- `requestMotionPermission()` - iPhone `DeviceMotionEvent.requestPermission()` on tap; Android resolves immediately.
- `useMotion()` returns live `{ accel (x,y,z without gravity), gravity, rotationRate, orientation (alpha, beta, gamma) }` at the device rate (usually 60 Hz).
- Feature helpers (run on the phone, send only results): `shakeCounter(threshold = 12 m/s^2, minGapMs = 120)`, `stillness(windowMs = 300) -> variance`, `energy(windowMs) -> mean |a|`, `tiltState() -> 'up' | 'down' | 'level'` (debounced 400 ms), `spinCount()` (cumulative alpha), `jumpDetect()`.
- `calibrate(ms)` records a baseline so big and small movers score fairly.

### Haptics fallback

`haptic(pattern)` calls `navigator.vibrate` where supported (Android Chrome, Android box remotes ignore it). On iPhone it flashes the screen edge in the player's colour and plays a soft click if the game allows sound on phones.

## TV components (`packages/ui-tv`)

| Component | What it does |
| --- | --- |
| `Stage` | White background, top title bar in navy, avatar row along the bottom, scales the 1920 x 1080 canvas to the screen |
| `LobbyScreen` | Room code, **large QR**, join URL, joined avatars popping in with a sound, VIP badge, "Waiting for VIP to pick a game" |
| `CornerQR` | Small QR plus code in the bottom-right during games; hidden by VIP setting |
| `TimerRing` | Circular countdown synced to `phaseEndsAt`, turns orange in the last 5 s with ticks |
| `ScoreStrip` | Players or teams with points, animated count-ups, rank change arrows |
| `QuestionCard` | Large question text with auto-fit, category chip, optional image |
| `RevealSequence` | Helper to script reveals: show, wait, flip, sting, confetti; emits `tv:anim-done` |
| `AnswerBars` | Animated bar chart of votes or answers with avatars |
| `Podium` | 1st/2nd/3rd with avatars, confetti, music sting |
| `HowToPlayCard` | Name, tagline, rules, demo loop, "Inspired by ..." |
| `RatingSummary` | "Ratings in: 6/8" and the round's average face |
| `Reactions` | Floating emoji layer driven by `react` events |
| `VocalMixer` | Web Audio graph: track, vocals, compressor, reverb, ducking, alignment (see below) |
| `ClipPlayer` | Plays photos and videos in a frame with captions and slow motion |
| `AvatarPerformer` | Animated avatar that bounces and opens its mouth from an AnalyserNode level |
| `Gallery` | Grid of submitted photos or videos for voting |

### MusicPlayer (`packages/media/src/music-player.ts`)

One interface, two implementations, so games never care where a song comes from:

```ts
interface MusicPlayer {
  load(song: SongMeta, opts: { useInstrumental: boolean }): Promise<void>;
  prepare(fromMs: number): Promise<void>;              // cue and pre-roll (hides YouTube ads)
  play(fromMs: number, toMs?: number): Promise<void>;
  pause(): void; stop(): void;
  setVolume(v: number, rampMs?: number): void;        // 0..1
  setRate(rate: number): void;                        // speed round
  timeAt(audioCtxTime: number): number;               // song ms at a given AudioContext time
  whenSongTime(ms: number): number;                    // AudioContext time when the song reaches ms
  readonly kind: 'youtube' | 'file';
}
```

- `FileMusicPlayer` - Web Audio buffer source; exact timing.
- `YouTubeMusicPlayer` - IFrame Player API with the sync loop from architecture section 12; renders through the TV `YouTubeFrame` component (a rounded frame on the stage, sized by the game's layout).

### VocalMixer details (`packages/media/src/mixer.ts` + `ui-tv`)

- `loadSong(songId, { useInstrumental })` loads the song through a `MusicPlayer` (instrumental when available). For file songs it decodes `instrumental.mp3` if present, else `track.mp3`; for YouTube songs it uses `instrumentalVideoId` if present, else the main video.
- Vocals are always scheduled with `player.whenSongTime(targetMs)` so the same code aligns to either source. For YouTube songs, track ducking uses `setVolume` instead of a gain node.
- `addVocal(mediaId, { alignTo: 'chorus' | 'line', lineTimes?, gain, pan })`.
- Graph per vocal: high-pass 100 Hz -> compressor (threshold -24 dB, ratio 4) -> gain -> panner -> master; a send to a ConvolverNode reverb (bundled impulse response, 18% wet).
- If there is no instrumental, the full track is ducked by 9 dB (file) or to volume 55 (YouTube) while vocals play so players are heard over the original singer.
- **Alignment:** the expected first-sung moment is the first LRC line time inside the sung section. Detect the first onset in the vocal (RMS over 20 ms frames, threshold 3x noise floor measured in the first 300 ms). Shift the vocal so the onset lands on the expected time, limited to +/- 600 ms. Unit test with synthetic clips.
- **Mercy Mode:** adds a doubled copy of the vocal delayed 18 ms with playbackRate 1.003 and more reverb (30%), which hides pitch wobble. True pitch correction lives in the Auto-Tuned game.
- `renderOffline()` uses OfflineAudioContext to make a WAV for highlights.
- `play({ fromMs, toMs, preRollBeats })` starts the track a few beats before the sung section so the drop lands with a build-up.
