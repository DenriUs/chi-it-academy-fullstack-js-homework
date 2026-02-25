import { queryOptions } from '@tanstack/react-query';

import { COMMENTS_QUERY_KEY } from '@lib/query/query-options/constants';
import { getComments } from '@api/comments/comments.actions';
import type { Post } from '@/types/post';

export function getCommentsQueryOptions(postId: Post['id']) {
  return queryOptions({
    queryKey: [COMMENTS_QUERY_KEY, postId],
    queryFn: () => getComments(postId),
  });
}
