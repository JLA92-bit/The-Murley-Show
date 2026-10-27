# Vault Breakers (`vault-breakers`)

**Inspired by:** The Crystal Maze, Keep Talking and Nobody Explodes
**Wave:** 5 · **Modes:** Co-op · **Players:** 2-8 · **Length:** 10-15 min · **Effort:** High
**Phone features:** `custom:vault-breakers/operator`, `custom:vault-breakers/manual`, haptics

## Pitch
Crack the vault before the alarm goes off. Each phone holds a different piece of the puzzle - you'll only solve it by talking.

## Intro and presentation
- **Title sequence:** a vault door the size of the screen spins its wheel, laser grids sweep across, and "VAULT BREAKERS" is laser-etched into the steel with sparks.
- **Signature moment:** solved modules clunk open with a green light and a heavy bolt sound; strikes flash red alarm lights around the edge of the TV; the final unlock swings the vault door open onto a pile of gold.

## How to Play lines
- The TV shows the vault and its locks.
- One player is the Operator and works the controls.
- Everyone else has part of the instructions on their phone.
- Talk, don't show! Three mistakes and the alarm goes off.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| difficulty | 2 | 1-4 (number of modules 3-6, time 6-4 min) |
| vaults | 2 | 1-4 (each is a round, operator rotates) |

## Flow
1. **BRIEF** - TV: vault with N modules, timer, 3 strike lights. Operator phone: `custom:vault-breakers/operator` with the module controls. Other phones: `custom:vault-breakers/manual` showing their slice of the rules (no phone has everything).
2. **CRACK** - Live play. Each operator input is validated by the server: correct module -> green light; wrong -> strike (TV alarm flash, all phones buzz).
3. **END** - All modules solved (win) or 3 strikes / time up (lose). `ctx.endRound()`.

## Modules (each a pure generator + validator in `logic/modules/`)
- **Wires:** TV shows 3-6 coloured wires. Rules table (e.g. "If there are two red wires, cut the last red wire") split across manual phones by row. Operator taps a wire to cut.
- **Symbol Keypad:** operator sees 4 symbols; each manual phone shows one column of 7 symbols; the column containing all 4 gives the press order.
- **Light Code:** TV blinks a light in Morse; one manual phone has the Morse table, another has the word-to-frequency list; operator sets the frequency with a dial.
- **Colour Echo:** TV flashes a colour sequence; each manual phone holds the mapping for one colour depending on strikes so far; operator taps the mapped colours.
- **Number Dial:** operator sees a 3-digit lock; manuals hold clues ("first digit is the number of vowels in the word on the TV").

## Scoring
Co-op: win = every player gets remaining seconds x 2 + 300; lose = 50 each for trying.

## Content
Generated from seeds; no content packs needed beyond `symbols.json` (40 SVG symbols) and `words.json` for Light Code.

## Done when
- Every generated vault is solvable: for each module a solver using all manual slices finds the answer (property test over 500 seeds).
- With N manual phones, information is split so no single manual phone holds a full rules table (when N >= 2).
- 3 strikes or timeout ends the round as a loss.

## Notes for Claude
- Build modules one at a time behind a registry so more can be added later.
- With 2 players there is one manual phone, which then holds everything.
