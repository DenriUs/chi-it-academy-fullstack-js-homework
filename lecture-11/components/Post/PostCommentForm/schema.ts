import zod from 'zod';

import { checkHasOneNonSpaceCharacter } from '@/lib/validation.helpers';

export const commentSchema = zod.object({
  text: zod
    .string()
    .nonempty()
    .refine((value) => checkHasOneNonSpaceCharacter(value)),
});

export type CommentSchema = zod.infer<typeof commentSchema>;
