import type { LoaderFunctionArgs } from 'react-router';

import { queryClient } from '@lib/query/query.client';
import { validateSearchParams } from '@lib/search-params/search-params.helpers';
import { getPostsQueryOptions } from '@lib/query/query-options/posts/getPostsQueryOptions';
import { paginationSearchParamsSchemaConfig } from '@lib/search-params/schemas';

export const stripePageLoader = ({ request }: LoaderFunctionArgs) => {
  const { schema, fallbackValues } = paginationSearchParamsSchemaConfig;

  const searchParams = new URL(request.url).searchParams;
  const validatedSearchParams = validateSearchParams(schema, searchParams, fallbackValues);

  queryClient.ensureQueryData(getPostsQueryOptions(validatedSearchParams));
};
