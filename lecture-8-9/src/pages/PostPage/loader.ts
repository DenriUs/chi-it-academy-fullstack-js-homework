import type { LoaderFunctionArgs } from 'react-router';

import { queryClient } from '@lib/query/query.client';
import { getPostQueryOptions } from '@lib/query/query-options/posts/getPostQueryOptions';

export const postPageLoader = ({ params }: LoaderFunctionArgs) => {
  const postId = params.postId;

  if (!postId) {
    throw new Response('Not Found', { status: 404 });
  }

  queryClient.ensureQueryData(getPostQueryOptions(parseInt(postId)));
};
