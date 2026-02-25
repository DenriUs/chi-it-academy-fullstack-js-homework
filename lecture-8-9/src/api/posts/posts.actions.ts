import type { AxiosRequestConfig } from 'axios';

import { protectedAxiosInstance } from '@api/axios.instance';
import type { PaginatedResponse } from '@api/types';
import type { Post } from '@/types/post';

import type { PostsParams } from './types';

export const ROUTE_PREFIX = '/api/exhibits';

export const createPost = (data: FormData, config?: AxiosRequestConfig): Promise<Post> => {
  return protectedAxiosInstance.post<Post>(ROUTE_PREFIX, data, config);
};

export const getPost = (id: Post['id'], config?: AxiosRequestConfig): Promise<Post> => {
  return protectedAxiosInstance.get<Post>(`${ROUTE_PREFIX}/post/${id}`, {}, config);
};

export const getPosts = async (
  params: PostsParams,
  config?: AxiosRequestConfig,
): Promise<PaginatedResponse<Post>> => {
  return protectedAxiosInstance.get<PaginatedResponse<Post>>(ROUTE_PREFIX, params, config);
};

export const getCurrentUserPosts = (
  params: PostsParams,
  config?: AxiosRequestConfig,
): Promise<PaginatedResponse<Post>> => {
  return protectedAxiosInstance.get<PaginatedResponse<Post>>(
    `${ROUTE_PREFIX}/my-posts`,
    params,
    config,
  );
};

export const deletePost = (postId: Post['id'], config?: AxiosRequestConfig): Promise<void> => {
  return protectedAxiosInstance.delete(`${ROUTE_PREFIX}/${postId}`, config);
};
