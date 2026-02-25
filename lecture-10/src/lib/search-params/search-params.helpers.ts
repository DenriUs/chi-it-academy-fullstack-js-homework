import zod from 'zod';

import type { SearchParams } from '@/router/types';

import { validateValues } from '../validation.helpers';
import type { SchemaInput } from '../validation.helpers';

export const serializeSearchParams = (params: SearchParams) => {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== null || value !== undefined) {
      searchParams.set(key, String(value));
    }
  }
  return searchParams.toString();
};

export const validateSearchParams = <T extends zod.ZodObject>(
  schema: T,
  parseValue: URLSearchParams | string,
  fallbackValues: SchemaInput,
) => {
  if (typeof parseValue === 'string') {
    parseValue = new URLSearchParams(parseValue);
  }
  return validateValues<T>(schema, Object.fromEntries(parseValue), fallbackValues);
};
