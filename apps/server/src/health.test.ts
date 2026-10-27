import type { AddressInfo } from 'node:net';
import http from 'node:http';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createApp } from './app';
import { loadConfig } from './config';

describe('GET /health', () => {
  let server: http.Server;
  let base = '';
  beforeAll(async () => {
    server = http.createServer(createApp(loadConfig({ NODE_ENV: 'production' })).app);
    await new Promise<void>((r) => server.listen(0, '127.0.0.1', r));
    base = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
  });
  afterAll(() => new Promise<void>((r) => server.close(() => r())));

  it('reports ok', async () => {
    const body = (await (await fetch(`${base}/health`)).json()) as { ok: boolean };
    expect(body.ok).toBe(true);
  });
});
