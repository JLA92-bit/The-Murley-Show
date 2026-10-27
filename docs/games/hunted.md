# Hunted (`hunted`)

**Inspired by:** The Chase
**Wave:** 4 · **Modes:** Teams vs 1 · **Players:** 3-12 · **Length:** 20 min · **Effort:** Medium
**Phone features:** `choices`, `text`, `number`, `buzzer`

## Pitch
One player becomes the Chaser. Everyone else builds cash, then races down the board before the Chaser catches them.

## Intro and presentation
- **Title sequence:** a dark board with seven glowing steps fades in, a shadowy figure steps into the top light with a heavy footstep, and "HUNTED" slashes across the screen with a sting.
- **Signature moment:** the chase board - the runner and Chaser pieces slide down the steps with each answer, the board turns red as the Chaser closes in, and a caught runner is swallowed by the shadow.

## How to Play lines
- Cash Builder: answer as many quick questions as you can in 60 seconds.
- Head to Head: stay ahead of the Chaser on the board to bank your cash.
- Final Chase: work as a team to set a target the Chaser can't beat.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| chaser | volunteer | volunteer (VIP picks), top scorer tonight, random |
| cashBuilderSeconds | 60 | 45-90 |
| finalSeconds | 120 | 90-180 |

## Flow
1. **CHASER_PICK** - per setting. TV: dramatic Chaser intro with their avatar in a dark frame.
2. **CASH_BUILDER** (each runner, one after another; 60 s each) - Runner phone: rapid `choices` (3 options) one after another. TV: question, running total (+1000 per correct). Others watch and may shout nothing (it's fun to watch).
3. **HEAD_TO_HEAD** (each runner) - Board of 7 steps. Chaser offers higher (start 2 steps from Chaser, bigger cash: `number` entered by Chaser, 2x-5x) and lower (start 4 steps, smaller: 0.1x-0.5x). Runner picks (`choices`). Each question: runner and Chaser answer `choices` (3 options) simultaneously, 10 s. Right = move one step down. Chaser on the same step = caught. Runner reaches the bottom = cash into the team bank, runner goes through.
4. **FINAL_CHASE** - Runners who got through (or all runners if nobody, with 0 bank... they still play for pride). Head start = number of runners through. `finalSeconds` of buzzer questions for the team: any runner buzzes (`buzzer`) and answers by typing (`text`, 6 s). Each right answer +1 step. Then the Chaser gets the same time with their own questions; when the Chaser answers wrong, the clock stops and the team can push back (buzz + answer right = Chaser -1 step).
5. **RESULT** - Chaser catches the target before time = Chaser wins.

## Scoring
- Runners win: bank split equally among runners who reached the final (all runners if they all failed but won the final - min 1000 each), awarded as points / 100.
- Chaser wins: Chaser gets the bank / 100 plus 500.

## Content
`content/hunted/multi.json` (3-option questions, difficulty 1-5) and `content/hunted/quick.json` (`{ id, question, answer, aliases }` short-answer for the final). Launch: 400 multi, 300 quick.

## Edge cases
- 2 players total: not allowed (min 3).
- Chaser disconnects: pause, then VIP picks a new Chaser.

## Done when
- Higher/lower offers change start step and cash correctly.
- Catch detection happens when steps are equal.
- Final chase push-backs only after a Chaser wrong answer.
- Scoring splits the bank among finalists.

## Notes for Claude
- Reuse the buzz helper from Buzz Blitz and the matcher from Hive Mind.
