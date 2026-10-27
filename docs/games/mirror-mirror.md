# Mirror Mirror (`mirror-mirror`)

**Inspired by:** face-pulling contests
**Wave:** 5 · **Modes:** Solo · **Players:** 2-16 · **Length:** 5-8 min · **Effort:** Medium
**Phone features:** `face`

## Pitch
Copy the ridiculous face on the TV. Your phone's camera measures how close you got - and the snapshots go up on the big screen.

## Intro and presentation
- **Title sequence:** an ornate golden mirror spins in, cracks into a funhouse distortion, and "MIRROR MIRROR" ripples into place.
- **Signature moment:** each round ends with a gallery of everyone's snapshot next to the target face in funhouse-mirror frames.

## How to Play lines
- A face appears on the TV - surprised, grumpy, cheeky...
- Copy it into your front camera.
- Your phone scores how close you got.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| faces | 8 | 5-12 |

## Flow
1. **FACE** - TV: target face (cartoon) with name. 5 s countdown.
2. **SNAP** - At `scoreAt`, phones compute similarity and upload a snapshot.
3. **GALLERY** - `ctx.endRound()` per face.

## Scoring
- Similarity x 100 (0-100). Best of round +50.

## Content
`content/mirror-mirror/faces.json` `[{ id, name, art, targets: { jawOpen, mouthSmileLeft, mouthSmileRight, browInnerUp, browDownLeft, browDownRight, eyeBlinkLeft, eyeBlinkRight, cheekPuff, mouthPucker } }]` (40).

## Done when
- Similarity is cosine similarity over the 10 blendshapes, clamped 0-1.

## Notes for Claude
- FaceLandmarker with `outputFaceBlendshapes: true`.
