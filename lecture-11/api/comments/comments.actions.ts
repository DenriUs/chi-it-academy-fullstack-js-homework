import { protectedApiService } from '@/api/api.service';
import { FetchConfig } from '@/api/types';
import { ROUTE_PREFIX } from '@/api/posts/posts.actions';
import type { Post, Comment } from '@/types';

import type { CreateCommentDto } from './types';

const ROUTE_SUFFIX = 'comments';

export const createСomment = (
  postId: Post['id'],
  data: CreateCommentDto,
  config?: FetchConfig,
): Promise<Comment> => {
  return protectedApiService.post<Comment>(
    `${ROUTE_PREFIX}/${postId}/${ROUTE_SUFFIX}`,
    data,
    config,
  );
};

export const getComments = (postId: Post['id'], config?: FetchConfig): Promise<Comment[]> => {
  return protectedApiService.get<Comment[]>(
    `${ROUTE_PREFIX}/${postId}/${ROUTE_SUFFIX}`,
    {},
    config,
  );
};

export const deleteComment = (
  postId: Post['id'],
  commentId: Comment['id'],
  config?: FetchConfig,
): Promise<void> => {
  return protectedApiService.delete(
    `${ROUTE_PREFIX}/${postId}/${ROUTE_SUFFIX}/${commentId}`,
    config,
  );
};
