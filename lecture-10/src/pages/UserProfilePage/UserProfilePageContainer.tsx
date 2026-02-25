import { Suspense } from 'react';

import { paginationSearchParamsSchemaConfig } from '@lib/search-params/schemas';

import { useValidatedSearchParams } from '@hooks/useValidatedSearchParams';

import { UserProfilePage } from './UserProfilePage';
import { UserProfilePageLoading } from './UserProfilePageLoading';

const { schema, fallbackValues } = paginationSearchParamsSchemaConfig;

export function UserProfilePageContainer() {
  const [paginationSearchParams] = useValidatedSearchParams(schema, fallbackValues, {
    ensureValidUrl: true,
  });

  return (
    <Suspense fallback={<UserProfilePageLoading />}>
      <UserProfilePage searchParams={paginationSearchParams} />
    </Suspense>
  );
}
