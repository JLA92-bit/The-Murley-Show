# Progress

Single source of truth for where the build is up to. Update at the end of every session.

Last updated: 2026-10-27 (session 1: Step 1 scaffold done)

## Foundations

- [x] Step 1 - Scaffold
- [ ] Step 2 - Rooms, QR join and avatars
- [ ] Step 3 - Engine runtime and reference game (`tap-race`)
- [ ] Step 3b - The Show Package
- [ ] Step 4 - Clock sync and buzzer
- [ ] Step 5 - Ratings and the ranked menu
- [ ] **Gate:** 8 real phones join by QR and stay connected for 30 minutes of tap-race

## Wave 1 - MVP games

- [ ] buzz-blitz
- [ ] most-likely-to
- [ ] hive-mind
- [ ] sketch-off
- [ ] double-agent
- [ ] **Gate:** 3 group playtests where most players ask to play again

## Wave 2 - The music update

- [ ] Step 6 - Media and music kit
- [ ] vocal-drop
- [ ] style-swap
- [ ] hum-dinger
- [ ] lip-sync-showdown
- [ ] duet-disaster
- [ ] choir-of-chaos
- [ ] **Gate:** Vocal Drop averages 4+ stars across 3 game nights

## Wave 3 - Move and camera

- [ ] Step 7 - Motion and camera kit
- [ ] freeze
- [ ] sixty-second-mayhem
- [ ] dance-off
- [ ] balloon-blitz
- [ ] charades-cam
- [ ] scavenger-snap
- [ ] couch-critics
- [ ] Step 8 - Android TV box app
- [ ] **Gate:** 90-minute game night with no crashes on the website and the Android box

## Wave 4 - Classics

- [ ] the-ladder
- [ ] ballpark
- [ ] spin-solve
- [ ] mind-meld
- [ ] bluff-busters
- [ ] hot-potato
- [ ] blurt
- [ ] case-closed
- [ ] hunted
- [ ] Step 9 - Power-ups and audience mode (power-ups on for buzz-blitz, the-ladder, hunted)
- [ ] **Gate:** game-night ready - 27 games, no crashes

## Wave 5 and later - ratings-led

Wave 5:

- [ ] long-shot
- [ ] last-one-standing
- [ ] pick-me
- [ ] bestie-test
- [ ] emoji-decoder
- [ ] boss-orders
- [ ] vault-breakers
- [ ] blind-audition
- [ ] masked-vocals
- [ ] foley-frenzy
- [ ] strike-a-pose
- [ ] mirror-mirror
- [ ] slow-mo-mayhem

Later:

- [ ] hard-hat-quiz
- [ ] finish-the-line
- [ ] pitch-perfect
- [ ] auto-tuned
- [ ] air-band
- [ ] beat-battle
- [ ] couch-rally
- [ ] gladiator-gauntlet
- [ ] stadium-wave

Also in this phase:

- [ ] Player profiles (device-based, optional)
- [ ] Badges
- [ ] End-of-night Highlights reel
- [ ] Labs shelf for prototypes

## Notes for the next session

- Next up: Step 2 - Rooms, QR join and avatars.
- Step 1 built and checked in headless Chromium: `pnpm dev`, `pnpm test`, `pnpm typecheck`, `pnpm lint` and `pnpm build` all pass. Not yet tried on a real phone or the TV box (see `docs/known-issues.md`).
- Dev layout: the server (port 8443, HTTPS) is the single front door. It proxies `/` to the TV Vite server (5173) and `/p/*` to the phone Vite server (5174, base `/p/`); `/join` and `/play` open the phone app. Production serves both built apps from the same port.
- The self-signed cert comes from the `selfsigned` package (not `@vitejs/plugin-basic-ssl`), so server and Vite share one origin and one certificate warning.
- `apps/android` is not created until Step 8; `pnpm android` just prints a message.
- `pnpm bots` is a stub until Step 2.
- Pinned TypeScript to 5.x because typescript-eslint does not support TS 7 yet.
