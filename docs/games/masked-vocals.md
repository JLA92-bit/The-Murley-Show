# Masked Vocals (`masked-vocals`)

**Inspired by:** The Masked Singer
**Wave:** 5 · **Modes:** Solo · **Players:** 4-16 · **Length:** 15 min · **Effort:** Medium
**Phone features:** `mic`, `text`, `vote`

## Pitch
Your voice gets a disguise - chipmunk, robot, giant or ghost. Can the room work out who's behind the mask?

## Intro and presentation
- **Title sequence:** masks (fox, robot, koala, dragon) fly in and lock into a ring, eyes glowing, then "MASKED VOCALS" appears with a theatrical drum roll and glitter burst.
- **Signature moment - The Unmasking:** the mask cracks into pieces that fall away to reveal the player's avatar, with a gasp sound.

## How to Play lines
- Record a line in private - your voice gets disguised.
- You'll be given a mask character and you write one sneaky clue.
- Everyone guesses who's behind each mask.
- Fool the room to score big.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| prompt | sing | sing a line, say a phrase |
| clueRounds | 2 | 1-3 |

## Flow
1. **SETUP** - Each player privately records (2-minute window, `mic`) either a sung lyric line from a song or a spoken phrase from content ("I am the mysterious lamington"), and writes 2 clues about themselves (`text`).
2. **SHOW** - For each player: TV shows their mask character, plays the disguised clip (mask effect assigned at random), shows clue 1. Everyone else `vote`s a guess.
3. **CLUE 2** - If fewer than half guessed right, play again with clue 2 and re-vote.
4. **UNMASK** - `ctx.endRound()` per masked singer.

## Mask effects (TV, soundtouchjs + Web Audio)
Chipmunk (pitch +7), Giant (pitch -6), Robot (ring modulator 50 Hz), Ghost (pitch +3, long echo, reverb), Radio (band-pass 500-3000 Hz with crackle).

## Scoring
- Guessers: +150 on clue 1, +75 on clue 2.
- Masked player: +60 per wrong guess on the final vote.

## Content
`content/masked-vocals/masks.json` (20 characters with SVG art) and `phrases.json` (60).

## Done when
- Each player gets a unique mask and a random effect.
- Clue 2 only plays when fewer than half guessed correctly.

## Notes for Claude
- Pre-render effects with OfflineAudioContext during SETUP so playback is instant.
