import { queryOptions } from '@tanstack/react-query';

import { CURRENT_USER_POSTS_QUERY_KEY } from '@lib/query/query-options/constants';
import { getCurrentUserPosts } from '@api/posts/posts.actions';
import type { PostsParams } from '@api/posts/types';

export function getCurrentUserPostsQueryOptions({ page, limit }: PostsParams) {
  return queryOptions({
    queryKey: [CURRENT_USER_POSTS_QUERY_KEY, page, limit],
    queryFn: () => getCurrentUserPosts({ page, limit }),
  });
}
