# Foley Frenzy (`foley-frenzy`)

**Inspired by:** Whose Line Is It Anyway?, film sound studios
**Wave:** 5 · **Modes:** Teams · **Players:** 3-12 · **Length:** 15 min · **Effort:** Medium
**Phone features:** `mic` (cue mode)

## Pitch
A silent cartoon plays. Your team voices every sound effect live into your phones - creaky doors, barking dogs, explosions - then watch it back with your sounds.

## Intro and presentation
- **Title sequence:** an old film reel projector clatters, a countdown leader (5, 4, 3) flickers, and "FOLEY FRENZY" appears as a silent-movie title card, then crashes with a cartoon "BOING".
- **Signature moment:** the playback screen looks like a cinema with a mini audience of avatars reacting.

## How to Play lines
- Your team gets a short silent cartoon.
- Each of you is given sound cues to voice.
- Watch the countdown on your phone and make your sounds right on cue.
- Then we play the cartoon with your team's sounds.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| scenes | 2 | 1-3 |
| rehearsal | on | on, off (one silent practice run) |

## Flow
1. **SCENE** - Team gets a scene. Cues are split between members (round-robin).
2. **REHEARSE** - TV plays the scene silently once; phones show cue names and a timeline.
3. **RECORD** - TV plays the scene silently; all team phones record (`mic` with a cue timeline instead of lyrics: upcoming cue name with a countdown bar and a flash + buzz at the cue moment).
4. **PREMIERE** - TV plays the scene with all recordings layered (noise gate at -40 dB on each so background chatter is reduced).
5. **RATE** - Other teams rate 1-5 stars. `ctx.endRound()` per team scene.

## Scoring
- Stars x 100 to the team. Bonus +100 for "Funniest Sound" vote.

## Content
`content/foley-frenzy/scenes/*.json`: scenes built in code with a small scene DSL (PixiJS shapes and sprites: stick figures, doors, cats, cars, rain), each 12-20 s with 6-10 cues `{ atMs, label }`. Launch: 8 scenes.

## Done when
- Cues are distributed across members.
- Gate threshold is applied to each recording.
- Scene timing is identical in rehearsal, recording and premiere.

## Notes for Claude
- Scenes are deterministic animations driven by time, not frames, so the playback matches the recording.
