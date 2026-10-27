# Style Swap (`style-swap`)

**Inspired by:** Whose Line Is It Anyway? song styles
**Wave:** 2 · **Modes:** Solo, Teams · **Players:** 2-16 · **Length:** 15 min · **Effort:** Low
**Phone features:** `choices`, `mic`
**Music source:** YouTube or file - see architecture section 12

## Pitch
Sing a hit song in a totally wrong style - opera, pirate, whisper, sports commentator. Commitment is everything.

## Intro and presentation
- **Title sequence:** a slot machine spins style icons (opera mask, pirate hat, cowboy boot, robot) and lands on "STYLE SWAP" with a jackpot ding and coin burst.
- **Signature moment:** each performance starts with the style slot machine spinning on the TV to reveal the performer's style card, with a matching sound effect.

## How to Play lines
- Your style is revealed by the slot machine.
- Pick a song and sing it in that style, no music.
- We drop your performance over the real track.
- Score for singing and for total commitment to the bit.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| performers | everyone | everyone, 3 per game |
| stylePick | random | random, pick from 3 |

## Flow
1. **STYLE** - TV slot machine reveals the style; performer phone shows the style card with tips ("Opera: big vibrato, dramatic arms").
2. **PICK / RECORD / DROP** - as Vocal Drop (reuse its phases and mixer, `section: chorus`).
3. **RATE** - Others: stars 1-5 for the singing and 1-5 for commitment. `ctx.endRound()`.

## Scoring
- Singing stars x 50 + commitment stars x 70.

## Content
`content/style-swap/styles.json` `[{ id, name, icon, tips, rating }]` (30): opera, country, pirate, whisper, robot, sports commentator, nanna at bingo, heavy metal, baby talk, news reader, auctioneer, sleepy, aussie bogan, Shakespearean actor.

## Done when
- Reuses Vocal Drop's PICK/RECORD/DROP code paths rather than copying them.
- Two-part rating is averaged and scored as listed.

## Notes for Claude
- Extract Vocal Drop's phases into `packages/games/src/_shared/vocal-flow.ts` if not done yet.
