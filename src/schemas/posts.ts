import z from 'zod';

export const createPostSchema = z.object({
  content: z.string().min(1),
  parentPostUuid: z.uuid().optional(),
  coords: z.object({
    lat: z.number(),
    lng: z.number(),
    alt: z.number().nullable(),
  }),
});
