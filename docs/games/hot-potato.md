# Hot Potato (`hot-potato`)

**Inspired by:** Pass the Bomb, Catch Phrase
**Wave:** 4 · **Modes:** Solo · **Players:** 3-16 · **Length:** 8 min · **Effort:** Low
**Phone features:** `custom:hot-potato/bomb` (uses `text` or `speech`, haptics), `vote`

## Pitch
A ticking bomb jumps between phones. Name something in the category to pass it on - before it blows!

## Intro and presentation
- **Title sequence:** a cartoon bomb with a fizzing fuse bounces across the screen, explodes into potato-chip confetti, and "HOT POTATO" lands in flaming letters.
- **Signature moment:** the boom - the fuse burns faster and the music speeds up, then a full-screen explosion with screen shake and the holder's avatar covered in soot.

## How to Play lines
- A category appears, like "Things in a kitchen".
- If the bomb is on your phone, name something to pass it on.
- No repeats. The room can veto a dodgy answer.
- Whoever holds it when it blows loses points.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| rounds | 5 | 3-8 |
| input | type | type, speak |
| passTo | choose | choose, next in circle, random |

## Flow
1. **CATEGORY** - TV: category, bomb animation. Server sets a hidden fuse 20-45 s (seeded).
2. **HOLD** - Holder phone: `custom:hot-potato/bomb` - big ticking bomb, vibration speeding up as the fuse burns (Android), answer input. Others' phones: who has it + the last answer + a **Veto** button.
3. **CHECK** - Answer must not repeat (matcher). If the category has a list, a match is accepted instantly. Otherwise others have 3 s to veto; a majority of non-holders vetoing rejects it. Accepted -> holder picks the next holder (`vote`, 5 s, or per setting). TV shows the answers piling up.
4. **BOOM** - Fuse ends. TV explosion, holder's phone shakes and flashes. `ctx.endRound()`.

## Scoring
- Exploded holder: -100. Everyone else: +50.
- Each accepted answer: +10.

## Content
`content/hot-potato/categories.json` `[{ id, rating, name, answers?: string[] }]`. Launch: 200 categories, 60 with answer lists.

## Done when
- The fuse is hidden from all clients until BOOM.
- Duplicate answers are rejected.
- Veto majority rejects an answer; the holder keeps the bomb.
- Passing can't go back to the player who just passed (unless only 2 players remain connected... min is 3).

## Notes for Claude
- Speak mode: SpeechInput with `lang: 'en-AU'`, falls back to typing if recognition isn't available.
