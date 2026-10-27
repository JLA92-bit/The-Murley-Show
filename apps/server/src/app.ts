import fs from 'node:fs';
import path from 'node:path';
import type { IncomingMessage } from 'node:http';
import type { Socket } from 'node:net';
import express, { type Express } from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { rootDir, type Config } from './config';

export interface AppHandle {
  app: Express;
  /** Route WebSocket upgrades that Socket.IO does not own (Vite HMR in dev). */
  upgrade(req: IncomingMessage, socket: Socket, head: Buffer): void;
}

const isSocketIo = (url = '') => url.startsWith('/socket.io');
const isPhonePath = (url = '') => url === '/p' || url.startsWith('/p/');

/**
 * Production serves the built TV app at / and the phone app at /p (with /join and /play
 * opening it). Development proxies to the two Vite dev servers so everything is on one origin.
 */
export function createApp(config: Config): AppHandle {
  const app = express();
  app.disable('x-powered-by');

  app.get('/health', (_req, res) => {
    res.json({ ok: true, serverTime: Date.now() });
  });

  if (config.dev) {
    const phone = createProxyMiddleware({
      target: `http://127.0.0.1:${config.phoneDevPort}`,
      changeOrigin: true,
      pathFilter: (pathname) => isPhonePath(pathname),
    });
    const phoneIndex = createProxyMiddleware({
      target: `http://127.0.0.1:${config.phoneDevPort}`,
      changeOrigin: true,
      pathFilter: ['/join', '/play'],
      pathRewrite: () => '/p/',
    });
    const tv = createProxyMiddleware({
      target: `http://127.0.0.1:${config.tvDevPort}`,
      changeOrigin: true,
      pathFilter: (pathname) => !isPhonePath(pathname) && !isSocketIo(pathname),
    });
    app.use(phoneIndex, phone, tv);
    return {
      app,
      upgrade(req, socket, head) {
        if (isSocketIo(req.url)) return;
        (isPhonePath(req.url) ? phone : tv).upgrade?.(req, socket, head);
      },
    };
  }

  const tvDist = path.join(rootDir, 'apps/tv/dist');
  const phoneDist = path.join(rootDir, 'apps/phone/dist');
  const sendPhone = (_req: express.Request, res: express.Response) => {
    const index = path.join(phoneDist, 'index.html');
    if (fs.existsSync(index)) res.sendFile(index);
    else res.status(503).send('Phone app not built. Run pnpm build.');
  };
  app.get(['/join', '/play'], sendPhone);
  app.use('/p', express.static(phoneDist));
  app.use(express.static(tvDist));
  app.get('/{*splat}', (_req, res) => {
    const index = path.join(tvDist, 'index.html');
    if (fs.existsSync(index)) res.sendFile(index);
    else res.status(503).send('TV app not built. Run pnpm build.');
  });
  return { app, upgrade() {} };
}
