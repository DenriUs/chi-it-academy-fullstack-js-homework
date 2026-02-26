import zod from 'zod';

export const envSchema = zod.object({
  PORT: zod.coerce.number(),
  TYPEORM_HOST: zod.string(),
  TYPEORM_PORT: zod.coerce.number(),
  TYPEORM_DATABASE: zod.string(),
  TYPEORM_USERNAME: zod.string(),
  TYPEORM_PASSWORD: zod.string(),
  TYPEORM_SYNCHRONIZE: zod.coerce.boolean(),
});

export type EnvSchema = zod.infer<typeof envSchema>;
