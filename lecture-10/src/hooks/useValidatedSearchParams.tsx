import { useCallback, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router';
import type { ZodObject } from 'zod';

import { validateValues } from '@lib/validation.helpers';
import type { SchemaInput } from '@lib/validation.helpers';
import { validateSearchParams } from '@lib/search-params/search-params.helpers';

type ValidateSearchParamsOptions = {
  ensureValidUrl: boolean;
};

export function useValidatedSearchParams<T extends ZodObject>(
  schema: T,
  fallbackValues: SchemaInput,
  options?: ValidateSearchParamsOptions,
) {
  const [searchParams, setSearchParamsInternal] = useSearchParams();

  const searchParamsString = searchParams.toString();

  const validatedValues = useMemo(() => {
    return validateSearchParams(schema, searchParamsString, fallbackValues);
  }, [schema, searchParamsString, fallbackValues]);

  const setSearchParams = useCallback(
    (values: SchemaInput) => {
      const validatedValues = validateValues(schema, values, fallbackValues);
      const newSearchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(validatedValues)) {
        newSearchParams.append(key, String(value));
      }
      setSearchParamsInternal(newSearchParams, { replace: true });
    },
    [schema, fallbackValues, setSearchParamsInternal],
  );

  useEffect(() => {
    if (options?.ensureValidUrl) {
      const newSearchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(validatedValues)) {
        newSearchParams.append(key, String(value));
      }
      if (newSearchParams.toString() !== searchParamsString) {
        setSearchParamsInternal(newSearchParams, { replace: true });
      }
    }
  }, [options?.ensureValidUrl, validatedValues, searchParamsString, setSearchParamsInternal]);

  return [validatedValues, setSearchParams] as const;
}
