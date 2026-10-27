# Double Agent (`double-agent`)

**Inspired by:** Spyfall, Mafia, Werewolf
**Wave:** 1 · **Modes:** Solo · **Players:** 4-12 · **Length:** 8-10 min per round · **Effort:** Medium
**Phone features:** `secret`, `vote`, `choices`

## Pitch
Everyone knows the secret location - except the Double Agent. Ask sneaky questions to expose them before they work out where you are.

## Intro and presentation
- **Title sequence:** a world map flickers with location pins, a fingerprint scan sweeps the screen, and "DOUBLE AGENT" types out in redacted-file style with a spy-theme guitar riff.
- **Signature moment:** the reveal - a file folder slides onto the TV, a CLASSIFIED stamp, then the agent's photo-style avatar drops out with "AGENT EXPOSED" or "AGENT ESCAPED".

## How to Play lines
- Hold your phone to see your secret location and role.
- One player is the Double Agent and doesn't know the location.
- Take turns asking each other questions out loud.
- Accuse the agent - or, agent, guess the location to win.

## Settings (VIP)
| Setting | Default | Options |
| --- | --- | --- |
| roundMinutes | 6 | 4-10 |
| rounds | 3 | 1-5 |
| agents | auto | auto (1, or 2 when 9+ players), 1, 2 |

## Flow
1. **ROLES** - Each phone: `secret` - location + role (e.g. "Bondi Beach - Lifeguard"); agent's phone: "You are the DOUBLE AGENT" plus the full location list. TV: location grid (all possible locations, so the agent can study them), timer, who asks first.
2. **INTERROGATION** - Asking player's phone: `vote` to choose who to ask. TV shows "Mia asks Jack". The question is asked out loud. The answerer then becomes the asker (cannot ask back the person who just asked them). Every phone has two buttons: **Accuse** (once per round per player) and, for agents, **I know the location!**
3. **ACCUSATION** - Accuser picks a suspect (`vote`). Everyone except the suspect votes Yes/No (`choices`, 15 s). Unanimous Yes -> REVEAL. Otherwise play resumes.
4. **AGENT_GUESS** - Agent picks a location from the list (`vote`). REVEAL.
5. **TIME_UP** - Everyone votes for a suspect (`vote`, 30 s). Plurality is accused (tie = agent wins).
6. **REVEAL** - Agent unmasked with dramatic music. `ctx.endRound()`.

## Scoring
- Agent caught: every non-agent +100, the accuser +200 extra.
- Agent survives time-up or a wrong accusation: agent +300.
- Agent guesses the location right: agent +400 (any time); wrong: civilians +100 each.
- With 2 agents, they don't know each other; each scores independently.

## Content
`content/double-agent/locations.json` `[{ id, rating, name, icon, roles: string[6..8] }]` - 50 locations with an Aussie lean (Bunnings sausage sizzle, Bondi Beach, School camp, Footy grand final, Outback servo, Space station).

## Edge cases
- Accused player disconnects: accusation still resolves.
- Agent disconnects: round ends, civilians win.

## Done when
- Exactly the configured number of agents; agents never see the location.
- Accusation needs unanimous Yes from everyone except the suspect.
- An asker cannot immediately ask back the person who asked them.
- All scoring cases above are covered.

## Notes for Claude
- `secret` must hide content when the finger lifts - neighbours glance at phones in this game.
