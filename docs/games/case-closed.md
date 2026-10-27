# Case Closed (`case-closed`)

**Inspired by:** Deal or No Deal
**Wave:** 4 · **Modes:** Solo · **Players:** 4-16 · **Length:** 15-20 min · **Effort:** Medium
**Phone features:** `secret`, `choices`, `vote`, `custom:case-closed/banker`

## Pitch
Every phone secretly holds briefcases full of cash. The contestant opens them one by one while holders hype or play down what's inside. Deal or no deal?

## Intro and presentation
- **Title sequence:** a row of briefcases snaps shut one after another down the screen, the last one springs open with a burst of golden light, and "CASE CLOSED" rises out of it.
- **Signature moment:** the Banker's call - an old phone rings on screen, the offer types out on a ticker, and the room's Deal/No Deal predictions fill a tug-of-war bar.

## How to Play lines
- One contestant. Everyone else secretly holds cases.
- Before a case opens, its holder can hype it up or play it down - bluffing allowed.
- The Banker makes offers. Deal or no deal?
- Everyone else predicts the contestant's choice for points.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| contestants | 3 | 1-5 (each is one round) |
| cases | 16 | 12, 16, 20 |
| bankerIsPlayer | on | on, off (computer banker) |

## Flow
1. **SETUP** - Contestant (rotation) and Banker (random other player, if on). Values shuffled into cases. Cases dealt round-robin to non-contestant, non-banker players. Holders' phones: `secret` listing their case numbers and values. Contestant picks their own case (`vote` of case numbers) - nobody holds that one.
2. **OPEN** - Contestant picks a case (`vote`). Holder phone: `choices` "Hype it!" / "Play it down" (8 s) - TV shows "Holder says: it's a BIG one!" or "it's nothing...". Then reveal with sting; TV value board crosses it off.
3. **OFFER** - after 5, 4, 3, 2, 1, 1... opens. Computer suggests offer = EV of remaining x factor (0.35 rising 0.12 per offer, max 0.95). Banker phone: `custom:case-closed/banker` slider from 70% to 130% of the suggestion, plus a taunt (choose from 6), 15 s. Everyone except the contestant: `choices` "Deal" / "No deal" prediction.
4. **DECIDE** - Contestant: `choices` Deal / No Deal, 20 s. TV: audience predictions as bars.
5. **FINAL** (no deal to the end) - Contestant may swap their case with the last remaining case, then it opens. `ctx.endRound()`.

## Scoring
- Contestant: final amount / 100 points.
- Predictors: +50 per correct Deal/No Deal prediction.
- Holders: +40 when they bluffed (hype on a value below the median, or play-down on a value above it) and the contestant then picked to keep going (a bluff that stuck), +20 for an honest call.
- Banker: +(starting EV - contestant's final amount) / 100, minimum 0.

## Content
`content/case-closed/values.json`: value sets per case count, e.g. 16 cases: 1, 5, 10, 25, 50, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 75000, 100000. Taunts: `taunts.json` 30 lines.

## Edge cases
- Holder disconnected: computer picks "play it down".
- 4 players: 2 holders, so each holds 6-8 cases.

## Done when
- Every case except the contestant's is held by exactly one holder.
- Offers use EV of remaining values and the factor schedule.
- Bluff scoring follows the median rule.
- Swap at the end works and the correct value is awarded.

## Notes for Claude
- Show the value board on TV in two columns, low left (sky) and high right (amber).
