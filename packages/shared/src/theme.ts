/** Colour tokens and fonts from CLAUDE.md "Look and feel". */
export const theme = {
  colours: {
    white: '#FFFFFF',
    navy: '#00294D', // primary: headers, buttons, platform chrome
    maroon: '#940E16', // secondary: buzzers, highlights, alerts
    green: '#5CBD6C', // correct, go, team A
    sky: '#4BC9F5', // timers, info, team B
    amber: '#FBAD45', // points, winners, team C
    orange: '#F26839', // urgency, final round, team D
  },
  fonts: {
    heading: '"Baloo 2", system-ui, sans-serif', // ExtraBold, sticker style
    score: 'Bungee, system-ui, sans-serif', // scores and timers
    body: 'Nunito, system-ui, sans-serif',
  },
  /** TV design size: scale to fit, keep 5% safe margins. */
  tv: { width: 1920, height: 1080, safeMargin: 0.05, minBodyPx: 48 },
  /** Team colours in order (docs/01-architecture.md section 7). */
  teamColours: ['green', 'sky', 'amber', 'orange'] as const,
} as const;

export type Theme = typeof theme;
export type ColourName = keyof Theme['colours'];
