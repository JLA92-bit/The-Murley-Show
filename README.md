# The Murley Show! - Claude Code starter pack

Everything Claude Code needs to build The Murley Show!, a private at-home party game show: TV as the stage, phones as controllers.

## What's in here

| File | What it's for |
| --- | --- |
| `CLAUDE.md` | Rules Claude Code reads automatically in every session: stack, style, quality bar, definition of done |
| `docs/00-build-order.md` | Step-by-step build order with copy-paste prompts for each Claude Code session |
| `docs/01-architecture.md` | Repo layout, rooms and QR joining, the game contract, engine phases, music (YouTube and files), media, ratings, Android box |
| `docs/02-components.md` | Shared phone and TV components every game reuses |
| `docs/03-show-polish.md` | The top-shelf presentation standard and the Showtime checklist |
| `docs/games/README.md` | Index of all 49 games by wave |
| `docs/games/<game-id>.md` | A full build spec for each game |
| `.env.example` | Settings to copy into `.env` |

## How to start

1. Install Node.js 20+, pnpm and Claude Code.
2. Make a folder called `murley-show`, copy this pack into it, `git init`, commit.
3. Run `claude` in the folder and paste Step 1 from `docs/00-build-order.md`.
4. One step per session. Test on real phones and the TV box, commit, `/clear`, next step.

## Running it (Step 1 scaffold)

```
pnpm install
pnpm dev        # server + TV app + phone app, HTTPS on your local network
pnpm test
pnpm typecheck
```

`pnpm dev` prints the addresses. Open the first on the TV and the second on a phone (tap through the certificate warning once per device):

- TV: `https://<your-LAN-IP>:8443/`
- Phone: `https://<your-LAN-IP>:8443/join` (the QR code adds `?room=ABCD`)

Copy `.env.example` to `.env` to change the port or `PUBLIC_URL`. The self-signed certificate is created automatically in `certs/` (git-ignored).
