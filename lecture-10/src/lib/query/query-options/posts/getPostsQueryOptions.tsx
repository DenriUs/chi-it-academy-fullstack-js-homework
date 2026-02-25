import { queryOptions } from '@tanstack/react-query';

import { POSTS_QUERY_KEY } from '@lib/query/query-options/constants';
import { getPosts } from '@api/posts/posts.actions';
import type { PostsParams } from '@api/posts/types';

export function getPostsQueryOptions({ page, limit }: PostsParams) {
  return queryOptions({
    queryKey: [POSTS_QUERY_KEY, page, limit],
    queryFn: () => getPosts({ page, limit }),
  });
}
