import i18n from '@/i18n';
import { CONTENT_MAX_LENGTH } from '@nearlyapp/common/schemas/posts';
import z from 'zod';

export const createPostSchema = z.object({
  content: z
    .string()
    .min(1, i18n.t('publish.error.content.notEmpty'))
    .max(
      CONTENT_MAX_LENGTH,
      i18n.t('publish.error.content.maxLength', {
        max: CONTENT_MAX_LENGTH,
      }),
    ),
  parentPostUuid: z.uuid().optional(),
  coords: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    alt: z.number().nullable().optional(),
  }),
});

