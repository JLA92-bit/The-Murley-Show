# Hive Mind (`hive-mind`)

**Inspired by:** Family Feud
**Wave:** 1 · **Modes:** Teams (Solo variant for 2-3 players) · **Players:** 2-16 · **Length:** 15-20 min · **Effort:** Medium
**Phone features:** `text`, `buzzer`, `choices`

## Pitch
Guess the most popular answers to survey questions - and some of those answers came from the people in this room.

## Intro and presentation
- **Title sequence:** honeycomb cells assemble across the screen, bees zip between them carrying letters, and "HIVE MIND" glows in amber as the last cell clicks in with a buzz chord.
- **Signature moment:** answer tiles flip with a satisfying clack and a points ding; strikes slam a giant maroon X across the board with a thud.

## How to Play lines
- First, everyone answers a few quick survey questions in secret.
- Two players face off: buzz in and name the top answer.
- The winning team takes turns finding every answer before three strikes.
- Three strikes and the other team can steal the lot.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| rounds | 4 | 3-6 (last round double points) |
| warmUpQuestions | 3 | 0-5 |
| answerSeconds | 15 | 10-25 |

## Flow
1. **WARM_UP** - Every phone gets `text` for `warmUpQuestions` survey questions, one at a time, 20 s each. TV: "Surveying the room..." with a fill bar. Answers are merged into those questions' boards (see Notes) and used in later rounds.
2. **FACE_OFF** - Next player from each team (rotating). TV shows the question. Both face-off phones: `buzzer` (armed after 2 s). Buzz winner types an answer (`text`, 10 s). If it's the #1 answer they win control. Otherwise the other player answers; higher-ranked answer wins control (tie or both miss: first buzzer wins).
3. **PLAY** - Controlling team members answer in rotation. Current answerer: `text`; teammates: "Shout suggestions!" on `waiting`. Match -> tile flips with its points. Miss -> big X, strike sound. All tiles found -> team banks. 3 strikes -> STEAL.
4. **STEAL** - Every member of the other team submits one guess (`text`, 20 s); their captain then sees those guesses as `choices` and picks one (10 s). Match = steal the whole bank; miss = controlling team banks.
5. **REVEAL_REST** - TV flips the remaining tiles. `ctx.endRound()`.
6. After the last round, final scores.

**Host check:** if an answer is close but not matched (similarity 0.6-0.8), the VIP phone gets a 5 s "Accept 'pavlova' for 'Pav'?" choice; accepted answers are saved as aliases.

## Modes
- **Teams (default):** 2 teams only (3-4 teams are not supported for this game; the settings screen forces 2).
- **Solo (2-3 players or VIP choice):** no face-off. Each round everyone types up to 3 answers privately (30 s). Each matched answer scores its points for that player (each answer only once per player). TV flips tiles as they're found.

## Scoring
- Bank = sum of revealed answer points x round multiplier (last round x2). Awarded to the team that banks.
- Solo: points per matched answer x multiplier.

## Content
`content/hive-mind/questions.json`:
```ts
z.array(z.object({
  id: z.string(),
  rating: z.enum(['G','PG','M']),
  question: z.string(),                 // "Name something you take to the beach"
  answers: z.array(z.object({
    text: z.string(),
    points: z.number().int(),
    aliases: z.array(z.string()).default([])
  })).min(4).max(8),                     // points roughly sum to 100
  warmUp: z.boolean().default(true)      // can be used as a warm-up question
}))
```
Launch: 200 questions, Aussie flavoured ("Name something you'd find at a sausage sizzle").

## Edge cases
- Odd team sizes: rotation wraps per team.
- A team with one connected member: that member answers every time.
- Warm-up question answered by fewer than 2 people: skip merging.

## Done when
- Matching accepts aliases, plurals and typos (distance <= 2 for words longer than 5 letters) and rejects already-revealed answers.
- Warm-up merge: a room answer matching an existing answer adds 5 points per vote; an unmatched answer given by 2+ players becomes a new tile worth 5 x votes; board keeps the top 8, re-sorted.
- 3 strikes triggers STEAL, and a correct steal awards the whole bank to the stealing team.
- Last round doubles points.
- Solo variant scores each player independently.

## Notes for Claude
- Normalise answers: lowercase, trim, remove punctuation and leading articles, singularise with a small rule set (`es`/`s`), then compare with aliases and Levenshtein.
- Put the matcher in `packages/engine/src/helpers/match.ts` - many games reuse it.
