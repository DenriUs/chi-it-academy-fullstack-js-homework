import zod from 'zod';

import { checkHasOneNonSpaceCharacter } from '@/lib/validation.helpers';

const ALLOWED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

export const DESCRIPTION_MAX_LENGTH = 2000;

export const createPostSchema = zod.object({
  image: zod
    .instanceof(File, { error: 'Select an image for your post' })
    .refine((file) => !file || file.size !== 0, { error: 'Select an image for your post' })
    .refine((file) => ALLOWED_IMAGE_TYPES.includes(file.type), {
      error: 'Only following image types allowed: png, jpg and jpeg',
    })
    .refine((file) => file.size <= MAX_IMAGE_SIZE, {
      error: 'Image size must not exceed 5 Mb',
    }),
  description: zod
    .string()
    .nonempty({
      error: 'Add a description to your post',
    })
    .max(DESCRIPTION_MAX_LENGTH, { error: 'Maximum length is 2000 characters' })
    .refine((value) => checkHasOneNonSpaceCharacter(value), {
      error: 'Add a description to your post',
    }),
});

export type CreatePostSchema = zod.infer<typeof createPostSchema>;
