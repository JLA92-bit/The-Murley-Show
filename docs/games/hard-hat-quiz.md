# Hard Hat Quiz (`hard-hat-quiz`)

**Inspired by:** Hard Quiz, Mastermind
**Wave:** Later · **Modes:** Solo · **Players:** 2-8 · **Length:** 20 min · **Effort:** Medium
**Phone features:** `choices`, `text`, `buzzer`, `vote`

## Pitch
Pick your own expert subject, then face the hot seat on it while everyone watches.

## Intro and presentation
- **Title sequence:** a hard hat drops onto a podium with a clang, safety stripes sweep across the screen, and "HARD HAT QUIZ" is stencilled on like a road sign.
- **Signature moment:** the expert round - a single spotlight, a black chair and a ticking clock with the player's topic in huge letters behind them.

## How to Play lines
- Choose the topic you know best.
- Round 1: 60 seconds of questions on your topic.
- Round 2: everyone buzzes on general knowledge.
- Round 3: the top two go head to head.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| expertSeconds | 60 | 45-90 |
| questionSource | packs | packs only, packs + AI generation |

## Flow
1. **TOPIC** - Each player picks from available topic packs (`vote` list) or types their own (`text`, AI generation only).
2. **EXPERT** (each player in turn) - TV: topic, timer. Player phone: `choices` 4 options, rapid. +1 per correct.
3. **GENERAL** - 12 buzzer questions for all (reuse buzz helper).
4. **SHOWDOWN** - top 2 alternate 5 questions each from each other's topics.

## Scoring
- Expert: +100 per correct. General: +100 / -50. Showdown: +200 per correct; winner +500.

## Content
`content/hard-hat-quiz/topics/<topic>.json` `{ topic, questions: [{ id, question, options[4] }] }`. Launch: 40 topics x 25 questions.
**AI generation (optional):** if `ANTHROPIC_API_KEY` is set in `.env`, `/admin` can generate 25 questions for a typed topic using the Claude API, saved as a pack for the VIP to review before it's used. Never call the API during a game.

## Done when
- Expert rounds only draw from the player's own topic.
- Showdown uses each opponent's topic.
- Generated packs are not used until approved.

## Notes for Claude
- Generation lives in `apps/server/src/admin/generate.ts`, behind the admin PIN.
