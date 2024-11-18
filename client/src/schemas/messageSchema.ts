import { z } from 'zod';

export const messageSchema = z.object({
  id: z.number(),
  text: z.string(),
  authorid: z.number(),
  groupid: z.number(),
});

export type MessageT = z.infer<typeof messageSchema>;
