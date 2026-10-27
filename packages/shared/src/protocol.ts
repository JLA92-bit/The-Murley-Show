import { z } from 'zod';

/** Event names used on the Socket.IO connection (docs/01-architecture.md section 13). */
export const events = {
  tvReady: 'tv:ready',
  phoneHello: 'phone:hello',
  roomState: 'room:state',
} as const;

/** Step 1 smoke-test payload: the server tells every client it is alive. */
export const serverStatusSchema = z.object({
  ok: z.literal(true),
  serverTime: z.number(),
  tvs: z.number().int().nonnegative(),
  phones: z.number().int().nonnegative(),
});
export type ServerStatus = z.infer<typeof serverStatusSchema>;
