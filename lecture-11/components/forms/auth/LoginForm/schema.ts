import zod from 'zod';

export const loginSchema = zod.object({
  username: zod.string().nonempty({ error: 'Enter your username' }),
  password: zod.string().trim().nonempty({ error: 'Enter your password' }),
});

export type LoginSchema = zod.infer<typeof loginSchema>;
