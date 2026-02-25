import { Suspense } from 'react';

import { paginationSearchParamsSchemaConfig } from '@lib/search-params/schemas';

import { useValidatedSearchParams } from '@hooks/useValidatedSearchParams';

import { StripePage } from './StripePage';
import { StripePageLoading } from './StripePageLoading';

const { schema, fallbackValues } = paginationSearchParamsSchemaConfig;

export function StripePageContainer() {
  const [paginationSearchParams] = useValidatedSearchParams(schema, fallbackValues, {
    ensureValidUrl: true,
  });

  return (
    <Suspense fallback={<StripePageLoading />}>
      <StripePage searchParams={paginationSearchParams} />
    </Suspense>
  );
}
