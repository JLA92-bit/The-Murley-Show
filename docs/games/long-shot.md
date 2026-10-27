# Long Shot (`long-shot`)

**Inspired by:** Pointless
**Wave:** 5 · **Modes:** Solo, Teams · **Players:** 2-16 · **Length:** 10-15 min · **Effort:** Medium
**Phone features:** `text`

## Pitch
Give a correct answer that hardly anyone else would think of. The more obscure, the better you score.

## Intro and presentation
- **Title sequence:** a giant column counts down from 100 with a descending tone, stops at zero with a glittering ping, and "LONG SHOT" fires in like an arrow hitting a bullseye.
- **Signature moment:** the countdown column - each answer drops the bar from 100, and a zero triggers fireworks and a "LONG SHOT!" banner.

## How to Play lines
- Each question has lots of right answers.
- Type a correct answer that most people wouldn't think of.
- Obscure right answers score big. Wrong answers score nothing.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| rounds | 6 | 4-10 |
| answerSeconds | 25 | 15-40 |

## Flow
1. **QUESTION** - TV: "Name a country beginning with M". Phones: `text`, one answer.
2. **COUNTDOWN** - For each player's answer in turn, TV shows a tall bar starting at 100 dropping to the answer's commonness score with a descending tone. Invalid answers buzz and stay at 100.
3. **RESULT** - Lowest valid score wins the round. `ctx.endRound()`.

## Modes
- **Teams:** members take turns being the answerer for their team each round.

## Scoring
- Valid answer: 100 - commonness points. Commonness 0 ("Pointless!"): +250 bonus.
- Invalid or blank: 0.
- Same answer as another player: both get half.

## Content
`content/long-shot/questions.json`:
```ts
z.array(z.object({ id: z.string(), rating: z.enum(['G','PG','M']), question: z.string(),
  answers: z.array(z.object({ text: z.string(), aliases: z.array(z.string()).default([]),
    commonness: z.number().int().min(0).max(100) })).min(8) }))
```
Launch: 120 questions, each with a complete answer list. Choose bounded lists such as countries starting with a letter, Australian states and capitals, planets and moons, Olympic sports, Aussie native animals, or Best Picture winners of a decade.
**Learning commonness:** each time an answer is given at home, store it in SQLite; after 20 plays of a question, blend: commonness = 0.5 x pack score + 0.5 x (share of players who gave it x 100).

## Edge cases
- Answer list missing a real valid answer: VIP gets a 5 s "Accept?" check (like Hive Mind) and accepted answers are added with commonness 5.

## Done when
- Scores follow 100 - commonness with the pointless bonus and duplicate halving.
- Matcher accepts aliases and typos.
- Commonness blending kicks in after 20 plays.

## Notes for Claude
- Reuse `match.ts`.
