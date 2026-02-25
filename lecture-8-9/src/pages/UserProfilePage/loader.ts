import type { LoaderFunctionArgs } from 'react-router';

import { queryClient } from '@lib/query/query.client';
import { validateSearchParams } from '@lib/search-params/search-params.helpers';
import { getCurrentUserPostsQueryOptions } from '@lib/query/query-options/posts/getCurrentUserPostsQueryOptions';
import { paginationSearchParamsSchemaConfig } from '@lib/search-params/schemas';

export const userProfilePageLoader = ({ request }: LoaderFunctionArgs) => {
  const { schema, fallbackValues } = paginationSearchParamsSchemaConfig;

  const searchParams = new URL(request.url).searchParams;
  const validatedSearchParams = validateSearchParams(schema, searchParams, fallbackValues);

  queryClient.ensureQueryData(getCurrentUserPostsQueryOptions(validatedSearchParams));
};
