# Strike a Pose (`strike-a-pose`)

**Inspired by:** Hole in the Wall
**Wave:** 5 · **Modes:** Solo, Teams · **Players:** 1-8 · **Length:** 10 min · **Effort:** High
**Phone features:** `pose`

## Pitch
A wall with a weird cut-out shape is coming at you. Contort your body to fit through before it hits - your phone's camera judges.

## Intro and presentation
- **Title sequence:** a foam wall rolls towards the camera with a body-shaped hole, smashes through the screen, and "STRIKE A POSE" falls in as foam blocks.
- **Signature moment:** the wall moves towards a live silhouette of the player (outline from the pose landmarks); on impact it either passes cleanly with a whoosh or splashes into a pool with a sploosh.

## How to Play lines
- Prop your phone so it can see your whole body.
- A wall with a shape cut out is coming.
- Strike the pose before it reaches you!
- Fit the hole to score. Miss and you're in the pool.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| walls | 8 | 5-12 |
| speed | normal | slow, normal, fast |

## Flow
1. **SET_UP** - `pose` outline guide, step back until the outline is green.
2. **WALL** - TV: 3D-ish wall (PixiJS with scale and perspective) approaching for 6 s (4 s on fast). Phones run PoseLandmarker; at `scoreAt` (server time) each phone computes the match and uploads a small snapshot JPEG.
3. **IMPACT** - Pass if match >= 70%. TV replays the snapshot over the wall hole. `ctx.endRound()` per wall.

## Scoring
- Match % points (70-100 -> 70-100 points), clean pass +50, perfect (>= 92%) +100.
- Teams: two players on the same wall, both must pass for a team pass bonus.

## Content
`content/strike-a-pose/poses.json` `[{ id, name, landmarks: Landmarks33, difficulty }]` (40), recorded with `/dev/pose-recorder`; the wall hole is drawn from the landmark skeleton with thick rounded limbs.

## Done when
- Joint-angle similarity is mirror-aware (a left arm up matches the TV's displayed side).
- Snapshot is taken at scoreAt +/- 50 ms.

## Notes for Claude
- Use the lite pose model; run at 15-30 fps. Phones that can't keep 12 fps show a "camera too slow" warning and use a simpler 4-joint score.
