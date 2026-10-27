import { describe, expect, it } from 'vitest';
import { serverStatusSchema } from './protocol';
import { theme } from './theme';

describe('theme', () => {
  it('has the CLAUDE.md colour tokens', () => {
    expect(theme.colours.navy).toBe('#00294D');
    expect(theme.colours.maroon).toBe('#940E16');
    expect(theme.colours.white).toBe('#FFFFFF');
  });

  it('uses valid, unique hex colours', () => {
    const values = Object.values(theme.colours);
    for (const v of values) expect(v).toMatch(/^#[0-9A-F]{6}$/);
    expect(new Set(values).size).toBe(values.length);
  });

  it('orders team colours green, sky, amber, orange', () => {
    expect(theme.teamColours).toEqual(['green', 'sky', 'amber', 'orange']);
  });
});

describe('protocol', () => {
  it('validates a server status payload', () => {
    expect(
      serverStatusSchema.safeParse({ ok: true, serverTime: 1, tvs: 0, phones: 2 }).success,
    ).toBe(true);
    expect(serverStatusSchema.safeParse({ ok: false }).success).toBe(false);
  });
});
