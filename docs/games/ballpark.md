# Ballpark (`ballpark`)

**Inspired by:** The Price Is Right
**Wave:** 4 · **Modes:** Solo, Teams · **Players:** 2-16 · **Length:** 10-15 min · **Effort:** Medium
**Phone features:** `number`, `custom:ballpark/chip-drop` (tilt)

## Pitch
Guess the price of real Australian products. Closest without going over wins - then tilt your phone to drop a chip down the bonus board.

## Intro and presentation
- **Title sequence:** a supermarket checkout scanner beeps as products slide across, price tags flutter down like confetti, and "BALLPARK" lands on a giant price sticker.
- **Signature moment:** the price reveal - every bid drops onto a number line as an avatar pin, then the real price slides in and the winner's pin bounces with a cash-register ka-ching.

## How to Play lines
- A product appears. Type what you think it costs.
- Closest without going over wins the round.
- Every third round the winner plays Chip Drop: tilt your phone to aim, tap to drop.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| rounds | 6 | 4-10 |
| bidSeconds | 20 | 10-30 |
| chipDrop | on | on, off |

## Flow
1. **ITEM** - TV: product photo, name, size (e.g. "Vegemite 380 g"). Phones: `number` (prefix $, 2 decimals). 
2. **REVEAL** - TV: number line with every bid as an avatar pin, then the actual price slides in. Winner highlighted. Exact bid: siren + bonus.
3. **CHIP_DROP** (every 3rd round, round winner only, if on) - TV: a peg board (matter.js) with 7 slots: 0, 50, 100, 500, 100, 50, 0. Winner phone: `custom:ballpark/chip-drop` - tilt left/right moves the chip along the top (gamma -30 to +30 degrees -> 0..1), tap to drop. 3 chips. Server picks the physics seed; the TV runs the simulation and reports the slot via `tv:anim-done`; the server re-runs the same seeded simulation headless to confirm.
4. `ctx.endRound()` after each item.

## Modes
- **Solo:** each player bids.
- **Teams:** each member bids privately, the team's bid is the median of member bids, shown on TV.

## Scoring
- Closest without going over: +100. Exact: +300 instead.
- Everyone over: closest overall gets +50.
- Chip Drop: slot value per chip.

## Content
`content/ballpark/items.json` + images in `content/ballpark/img/`:
```ts
z.array(z.object({
  id: z.string(), name: z.string(), size: z.string(), priceAud: z.number(),
  image: z.string(), store: z.string().optional(), checked: z.string()  // date checked
}))
```
Launch: 100 items. Add a TV `/admin` page "Add a Ballpark item": the VIP photographs a product with their phone camera, types name, size and price - perfect for using things in your own pantry.

## Edge cases
- No bids: no winner, show price.
- Tie (same bid): both win.
- Bid of $0 or empty: ignored.

## Done when
- Winner is the closest bid at or under the price; exact bids get 300.
- When all bids are over, closest overall gets 50.
- Team bid is the median of members' bids.
- The same seed always gives the same chip slot in the headless simulation.

## Notes for Claude
- Use matter.js on both TV (rendered via PixiJS) and server (headless) with identical settings and fixed timestep 1/60.
