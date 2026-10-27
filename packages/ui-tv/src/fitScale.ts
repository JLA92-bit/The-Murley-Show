import { theme } from '@murley/shared';

/** Scale factor that fits the 1920 x 1080 design canvas inside a window. */
export function fitScale(winW: number, winH: number): number {
  return Math.min(winW / theme.tv.width, winH / theme.tv.height);
}
