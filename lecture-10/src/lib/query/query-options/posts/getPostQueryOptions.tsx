import { queryOptions } from '@tanstack/react-query';

import { POSTS_QUERY_KEY } from '@lib/query/query-options/constants';
import { getPost } from '@api/posts/posts.actions';
import type { Post } from '@/types/post';

export function getPostQueryOptions(id: Post['id']) {
  return queryOptions({
    queryKey: [POSTS_QUERY_KEY, id],
    queryFn: () => getPost(id),
  });
}
