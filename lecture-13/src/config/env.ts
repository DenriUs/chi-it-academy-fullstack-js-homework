import { ZodError } from 'zod';
import { config } from 'dotenv';

import { envSchema } from './env.schema';
import type { EnvSchema } from './env.schema';

config({ quiet: true });

const getParseErrorMessage = (error: ZodError<EnvSchema>) => {
  const invalidEnvs = [];
  const issues = error.issues;
  for (let i = 0; i < issues.length; i++) {
    invalidEnvs.push(issues[i].path[0]);
  }
  return `Missed or misconfigured envs: [${invalidEnvs.join(', ')}]`;
};

const parsedEnv = envSchema.safeParse(process.env);
if (parsedEnv.error) {
  console.error(getParseErrorMessage(parsedEnv.error));
  process.exit(1);
}

export const env = { ...parsedEnv.data } as const;
