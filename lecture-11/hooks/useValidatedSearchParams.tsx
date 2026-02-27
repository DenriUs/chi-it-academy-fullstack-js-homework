'use client';

import { useCallback, useEffect, useMemo } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ZodObject } from 'zod';

import { validateValues } from '@/lib/validation.helpers';
import { validateSearchParams } from '@/lib/search-params/search-params.helpers';
import type { SchemaInput } from '@/lib/validation.helpers';

type ValidateSearchParamsOptions = {
  ensureValidUrl: boolean;
};

export function useValidatedSearchParams<T extends ZodObject>(
  schema: T,
  fallbackValues: SchemaInput,
  options?: ValidateSearchParamsOptions,
) {
  const searchParams = useSearchParams();

  const pathname = usePathname();

  const router = useRouter();

  const searchParamsString = searchParams?.toString();

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
      router.replace(`${pathname}?${newSearchParams.toString()}`);
    },
    [schema, fallbackValues, router, pathname],
  );

  useEffect(() => {
    if (options?.ensureValidUrl) {
      const newSearchParams = new URLSearchParams();
      for (const [key, value] of Object.entries(validatedValues)) {
        newSearchParams.append(key, String(value));
      }
      if (newSearchParams.toString() !== searchParamsString) {
        router.replace(`${pathname}?${newSearchParams.toString()}`);
      }
    }
  }, [options?.ensureValidUrl, validatedValues, searchParamsString, router, pathname]);

  return [validatedValues, setSearchParams] as const;
}
