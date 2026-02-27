import zod from 'zod';

import { checkHasNoSpaces, checkHasOneNonSpaceCharacter } from '@/lib/validation.helpers';

export const registerSchema = zod
  .object({
    username: zod
      .string()
      .nonempty({ error: 'Enter username' })
      .refine(
        (value) => value === value.trim() && checkHasNoSpaces(value),
        'Username cannot contain spaces',
      ),
    password: zod
      .string()
      .min(8, { error: 'Password must be at least 8 characters long' })
      .refine(
        (value) => checkHasOneNonSpaceCharacter(value),
        'Password cannot contain only spaces',
      ),
    confirmPassword: zod.string(),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: 'custom',
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });

export type RegisterSchema = zod.infer<typeof registerSchema>;
