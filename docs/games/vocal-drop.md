# Vocal Drop (`vocal-drop`)

**Inspired by:** karaoke, Lip Sync Battle, The Masked Singer reveal moments
**Wave:** 2 (flagship) · **Modes:** Solo, Teams · **Players:** 1-16 · **Length:** 15-25 min · **Effort:** High
**Phone features:** `choices`, `mic`, `rating`-style vote, haptics
**Music source:** YouTube or file (an instrumental link or file gives the best result) - see architecture section 12

## Pitch
Pick a hit song and sing the chorus with no music at all - just the lyrics and a beat pulsing on your phone. Then the TV drops your vocal over the real track. Glory or glorious disaster.

## Intro and presentation
- **Title sequence:** studio lights snap on one by one across a white stage, a spotlight sweeps, and "VOCAL DROP" slams in letter by letter with a bass drop, each letter bouncing on its own spring. A waveform underlines it and pulses to an original 4-bar intro beat.
- **Signature moment - The Drop:** a 3-second build (rising riser, the screen zooms slightly, "3, 2, 1"), then a white flash and the full track hits with the player's vocal on top while their avatar performs on a stage with animated lights driven by the vocal's loudness.
- **Recording state on TV:** a big "ON AIR" sign glowing maroon, the performer's avatar on a stool, and a live mic level meter so the room sees them belting it out.

## How to Play lines
- Pick a song. Your phone shows the lyrics and a beat - but no music.
- Sing the chorus out loud while your phone records.
- Then we drop your vocal over the real song. Brace yourself.
- Everyone rates the performance.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| performers | everyone | everyone (one each), 3 per game, teams relay |
| section | chorus | chorus, verse, both |
| mercyMode | on | on, off |
| useInstrumental | when available | when available, always full track |
| variant | classic | classic, wrong song, speed round |
| reelSaves | ask | ask, never |

## Flow
1. **PICK** - Performer phone: `choices` of 3 songs (title, artist, difficulty stars) from the catalogue, filtered by `familyOk`. 15 s, then random. Teams: team members vote.
2. **GET_READY** - Performer phone: lyric preview for 10 s ("Get ready - you're on!"). TV: song card, performer avatar walks onto the stage. Others' phones: `waiting` with a Hype button (TV shows hype meter).
3. **RECORD** - Performer phone: `mic` with `startAt = now + 3 s`, `countInBeats: 4`, `bpm` from meta, `durationMs` = section length + 1 s, `lyrics` = LRC lines inside the section, `hapticBeat: true`. TV: ON AIR state with live level (performer phone streams its level at 10 Hz on a volatile event).
4. **MIX** - Server waits for the `recorded` action and the TV's `tv:media-ready`. TV VocalMixer aligns the vocal to the section's first lyric line and prepares the mix. Loading message: "Warming up the band..." (max 6 s, else play unaligned).
5. **DROP** - TV plays from 4 beats before the section through to its end, vocal on top, lyrics shown karaoke style, AvatarPerformer animated. Phones: reactions only.
6. **RATE** - Everyone except the performer: `choices` Nailed It / Close Enough / Gloriously Bad, then 1-5 stars (custom combined screen `custom:vocal-drop/rate`). 12 s.
7. **NEXT** - Next performer. `ctx.endRound()` after each performance.
8. **AWARDS** (end) - Best Vocal (highest stars), Most Gloriously Bad (most GB votes), Perfect Timing (smallest alignment shift), Crowd Favourite (most hype). Each with a trophy animation.
9. **SAVE** - If `reelSaves` is ask, the performer's phone asks "Save this drop to tonight's Highlights?".

## Variants
- **Wrong Song:** the vocal is dropped over a different song with BPM within +/- 8 (time-aligned to its chorus). Reveal: "Plot twist!"
- **Speed Round:** drop plays at 1.25x. File songs use `preservesPitch = false` for chipmunk chaos; YouTube keeps pitch (`setPlaybackRate(1.25)`), so the vocal alone gets the chipmunk effect.
- **Team Relay:** the section's LRC lines are split across team members in order. All members record at the same time on their own phones, each seeing only their lines (others shown as "..." with a countdown to their entry). The mixer gates each vocal to its own line windows, plus every member on the final line.

## Scoring
- Stars average x 100 to the performer (team in relay).
- Category awards +200 each.
- Hype: +1 per hype tap received, max +50.

## Content
Uses the song library (`content/songs/`, architecture section 12) through `MusicPlayer`, so YouTube and file songs both work. The game needs at least 6 songs with `lyrics.lrc` and a `chorus` in `meta.json`. Ship one original test song so it works on day one.

## Edge cases
- Upload fails twice: TV plays the track with a "the mic gremlins struck!" animation, performer can retry once.
- iPhone records `audio/mp4`, Android `audio/webm` - both must decode on the TV and the Android box.
- Performer sings nothing: alignment finds no onset, mix plays as is; still rated.
- Song without an instrumental: duck the full track 9 dB under the vocal.

## Done when
- Alignment unit tests: synthetic vocal with an onset at 830 ms and an expected lyric at 500 ms is shifted -330 ms; shifts are clamped to +/- 600 ms.
- Team Relay splits lines in order and gates each vocal to its windows.
- Wrong Song only picks songs within the BPM range and never the same song.
- Ratings and awards calculate correctly with ties (ties share the award).
- A bot strategy uploads the bundled test vocal and the game completes with 1, 4 and 16 performers.

## Notes for Claude
- The phone's recording start latency varies 50-300 ms; alignment fixes this, so do not try to compensate elsewhere.
- Request a Wake Lock on the performer's phone during RECORD.
- Pre-decode the next song while the current one is being rated so DROP starts instantly.
