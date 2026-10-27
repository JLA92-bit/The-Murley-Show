import { describe, expect, it } from 'vitest';
import { fitScale } from './fitScale';

describe('fitScale', () => {
  it('is 1 at design size', () => expect(fitScale(1920, 1080)).toBe(1));
  it('is limited by the tighter side', () => {
    expect(fitScale(960, 1080)).toBe(0.5);
    expect(fitScale(3840, 1080)).toBe(1);
  });
});
