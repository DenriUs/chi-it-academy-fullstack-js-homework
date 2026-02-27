import zod from 'zod';

import { SearchParams } from '@/navigation/types';
import { validateValues } from '@/lib/validation.helpers';
import type { SchemaInput } from '@/lib/validation.helpers';

export const createNewSearchParams = (params: SearchParams) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null || value !== undefined) {
      searchParams.set(key, String(value));
    }
  }
  return searchParams;
};

export const validateSearchParams = <T extends zod.ZodObject>(
  schema: T,
  parseValue: URLSearchParams | string | undefined,
  fallbackValues: SchemaInput,
) => {
  if (typeof parseValue === 'string') {
    parseValue = new URLSearchParams(parseValue);
  } else if (typeof parseValue === 'undefined') {
    parseValue = new URLSearchParams();
  }
  return validateValues<T>(schema, Object.fromEntries(parseValue), fallbackValues);
};
