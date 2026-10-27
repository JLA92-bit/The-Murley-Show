import { describe, expect, it } from 'vitest';
import { loadConfig } from './config';

describe('loadConfig', () => {
  it('uses sensible defaults', () => {
    const c = loadConfig({});
    expect(c.port).toBe(8443);
    expect(c.publicUrl).toMatch(/^https:\/\/.+:8443$/);
    expect(c.dev).toBe(true);
  });

  it('honours PUBLIC_URL and strips a trailing slash', () => {
    expect(loadConfig({ PUBLIC_URL: 'https://play.murleyshow.test/' }).publicUrl).toBe(
      'https://play.murleyshow.test',
    );
  });

  it('ignores the .env.example placeholder URL', () => {
    expect(loadConfig({ PUBLIC_URL: 'https://play.example.com' }).publicUrl).not.toContain(
      'example.com',
    );
  });

  it('is production when NODE_ENV=production', () => {
    expect(loadConfig({ NODE_ENV: 'production' }).dev).toBe(false);
  });
});
