# The Boss's Orders (`boss-orders`)

**Inspired by:** Taskmaster
**Wave:** 5 · **Modes:** Solo, Teams · **Players:** 3-12 · **Length:** 15-20 min · **Effort:** Low
**Phone features:** `secret`, `camera`, `choices`, `text`

## Pitch
The Boss sets ridiculous real-world tasks around the house. Do them fast, film the proof, and hope the Boss likes your style.

## Intro and presentation
- **Title sequence:** an office desk slides in, a bossy rubber stamp hammers "APPROVED" on a stack of papers, and "THE BOSS'S ORDERS" appears as a fancy letterhead with a typewriter ding.
- **Signature moment:** the judging - each attempt appears as an evidence file on the Boss's desk, the Boss's comment types out, and points are stamped on with a thunk.

## How to Play lines
- Everyone gets the same task, like "Build the tallest tower from things in your pockets".
- You've got 3 minutes. Take a photo or short video as proof.
- The Boss judges every attempt on the TV and hands out points.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| tasks | 3 | 2-5 |
| taskMinutes | 3 | 1-5 |
| boss | rotate | rotate, VIP |
| location | indoors | indoors, indoors and outdoors |

## Flow
1. **TASK** - Boss (rotating) phone: `choices` of 3 tasks (filtered by location and safety). Everyone else: `secret` with the task text (some tasks are secret tasks with different instructions per player).
2. **DO_IT** - TV: task text, big countdown, music. Player phones: `camera` (photo or up to 15 s video) and Submit. Early submitters get a speed rank.
3. **JUDGE** - TV: ClipPlayer shows each submission in turn (random order, names shown). Boss phone: `choices` 1-5 points per submission plus optional `text` comment shown on TV ("Ambitious. Wrong. 2 points.").
4. `ctx.endRound()` per task.

## Modes
- **Teams:** one submission per team (any member uploads).

## Scoring
- Boss points x 100. Fastest submission +50 (if the Boss gave it 3+).

## Content
`content/boss-orders/tasks.json` `[{ id, rating, text, minutes, location: 'indoor'|'outdoor', props?: string, secret?: { perPlayer: string[] } }]`. Launch: 120. Safety rule: no climbing, fire, sharp objects, running on stairs, eating unknown things or pranks on people outside the game.

## Done when
- Task options respect the location setting.
- Every submission is judged exactly once.
- Missing submissions score 0 and show "No proof!".

## Notes for Claude
- Clips are deleted when the room closes unless saved to Highlights.
