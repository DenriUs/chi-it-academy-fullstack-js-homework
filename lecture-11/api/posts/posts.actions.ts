import { protectedApiService } from '@/api/api.service';
import { FetchConfig } from '@/api/types';
import type { PaginatedResponse } from '@/api/types';
import type { Post } from '@/types/post';

import type { PostsParams } from './types';

export const ROUTE_PREFIX = '/api/exhibits';

export const createPost = (data: FormData, config?: FetchConfig): Promise<Post> => {
  return protectedApiService.post<Post>(ROUTE_PREFIX, data, config);
};

export const getPost = (id: Post['id'], config?: FetchConfig): Promise<Post> => {
  return protectedApiService.get<Post>(`${ROUTE_PREFIX}/post/${id}`, {}, config);
};

export const getPosts = async (
  params: PostsParams,
  config?: FetchConfig,
): Promise<PaginatedResponse<Post>> => {
  return protectedApiService.get<PaginatedResponse<Post>>(ROUTE_PREFIX, params, config);
};

export const getCurrentUserPosts = (
  params: PostsParams,
  config?: FetchConfig,
): Promise<PaginatedResponse<Post>> => {
  return protectedApiService.get<PaginatedResponse<Post>>(
    `${ROUTE_PREFIX}/my-posts`,
    params,
    config,
  );
};

export const deletePost = (postId: Post['id'], config?: FetchConfig): Promise<void> => {
  return protectedApiService.delete(`${ROUTE_PREFIX}/${postId}`, config);
};
