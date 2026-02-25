import type { AxiosRequestConfig } from 'axios';
import { protectedAxiosInstance } from '@api/axios.instance';
import { ROUTE_PREFIX } from '@api/posts/posts.actions';
import type { Post, Comment } from '@/types';

import type { CreateCommentDto } from './types';

const ROUTE_SUFFIX = 'comments';

export const createСomment = (
  postId: Post['id'],
  data: CreateCommentDto,
  config?: AxiosRequestConfig,
): Promise<Comment> => {
  return protectedAxiosInstance.post<Comment>(
    `${ROUTE_PREFIX}/${postId}/${ROUTE_SUFFIX}`,
    data,
    config,
  );
};

export const getComments = (
  postId: Post['id'],
  config?: AxiosRequestConfig,
): Promise<Comment[]> => {
  return protectedAxiosInstance.get<Comment[]>(
    `${ROUTE_PREFIX}/${postId}/${ROUTE_SUFFIX}`,
    {},
    config,
  );
};

export const deleteComment = (
  postId: Post['id'],
  commentId: Comment['id'],
  config?: AxiosRequestConfig,
): Promise<void> => {
  return protectedAxiosInstance.delete(
    `${ROUTE_PREFIX}/${postId}/${ROUTE_SUFFIX}/${commentId}`,
    config,
  );
};
