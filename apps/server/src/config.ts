import os from 'node:os';
import path from 'node:path';
import { z } from 'zod';

export const rootDir = path.resolve(import.meta.dirname, '../../..');

/** IPv4 addresses of this machine on the local network. */
export function lanAddresses(): string[] {
  const out: string[] = [];
  for (const list of Object.values(os.networkInterfaces())) {
    for (const i of list ?? []) {
      if (i.family === 'IPv4' && !i.internal) out.push(i.address);
    }
  }
  return out;
}

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(8443),
  PUBLIC_URL: z.string().url().optional(),
  DATA_DIR: z.string().default('./data'),
  CONTENT_DIR: z.string().default('./content'),
  ADMIN_PIN: z.string().default('1234'),
  TV_DEV_PORT: z.coerce.number().int().default(5173),
  PHONE_DEV_PORT: z.coerce.number().int().default(5174),
  NODE_ENV: z.string().default('development'),
});

export interface Config {
  port: number;
  /** Where phones reach the server. QR codes use this. */
  publicUrl: string;
  dataDir: string;
  contentDir: string;
  adminPin: string;
  dev: boolean;
  tvDevPort: number;
  phoneDevPort: number;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const e = envSchema.parse(env);
  const lan = lanAddresses()[0] ?? 'localhost';
  // .env.example ships with a placeholder; treat it as unset so QR codes work out of the box.
  const placeholder = e.PUBLIC_URL?.includes('play.example.com');
  const publicUrl = (
    e.PUBLIC_URL && !placeholder ? e.PUBLIC_URL : `https://${lan}:${e.PORT}`
  ).replace(/\/$/, '');
  return {
    port: e.PORT,
    publicUrl,
    dataDir: path.resolve(rootDir, e.DATA_DIR),
    contentDir: path.resolve(rootDir, e.CONTENT_DIR),
    adminPin: e.ADMIN_PIN,
    dev: e.NODE_ENV !== 'production',
    tvDevPort: e.TV_DEV_PORT,
    phoneDevPort: e.PHONE_DEV_PORT,
  };
}
