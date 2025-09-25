import z from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
});
