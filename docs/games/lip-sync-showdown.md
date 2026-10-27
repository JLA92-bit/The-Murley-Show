# Lip Sync Showdown (`lip-sync-showdown`)

**Inspired by:** Lip Sync Battle, RuPaul's Drag Race lip syncs
**Wave:** 2 · **Modes:** Solo vs Solo (bracket) · **Players:** 2-16 · **Length:** 10-20 min · **Effort:** Low
**Phone features:** `choices`, `vote`, `custom:lip-sync-showdown/lyrics`
**Music source:** YouTube or file (the music video plays on the TV stage) - see architecture section 12

## Pitch
Two performers, one song, no singing - just pure lip sync drama. The room votes who owned the stage.

## Intro and presentation
- **Title sequence:** a velvet curtain drops away, two neon microphones light up facing each other and "LIP SYNC SHOWDOWN" flickers on in neon tubes with a crowd roar.
- **Signature moment:** a tournament bracket on the TV that animates winners moving up, ending in a crown-drop on the champion.

## How to Play lines
- Two performers face off to the same song.
- No singing - mouth the words and perform your heart out.
- Your phone shows the lyrics to help.
- The room votes. Winners move up the bracket.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| clipSeconds | 40 | 30-60 |
| format | bracket | bracket, single battles |

## Flow
1. **BRACKET** - TV shows the bracket (byes for odd numbers).
2. **SONG** - Both performers vote on 2 songs (TV picks on a split vote).
3. **PERFORM** - TV plays the song from the chorus start for `clipSeconds`. Performer phones: karaoke lyrics (`custom:lip-sync-showdown/lyrics`, also usable as a mic prop - screen flashes in the beat). Audience phones: a "Woo!" reaction button that fills a cheer meter per side.
4. **VOTE** - Everyone else `vote`s between the two. Winner advances. `ctx.endRound()` per battle.
5. **CROWN** - Champion crowned.

## Scoring
- +50 per vote received, +200 per battle won, champion +500.

## Done when
- Bracket handles 2-16 with byes.
- Performers can't vote in their own battle.

## Notes for Claude
- No recording in this game; it works even if mic permission is denied.
