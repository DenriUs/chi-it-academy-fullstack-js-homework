import { paginationSearchParamsSchemaConfig } from '@/lib/search-params/schemas';

import type { AppRoutePath, SearchParamsValidationConfig } from './types';

export const APP_ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  newPost: '/post',
  post: ':postId',
  myPosts: '/my-posts',
  any: '*',
} as const;

export const APP_ROUTE_NAMES: Partial<Record<AppRoutePath, string>> = {
  '/': 'Home',
  '/login': 'Login',
  '/register': 'Register',
  '/post': 'New Post',
  ':postId': 'Post',
  '/my-posts': 'My Posts',
} as const;

export const APP_ROUTE_SEARCH_PARAMS_CONFIGS: Partial<
  Record<AppRoutePath, SearchParamsValidationConfig>
> = {
  '/': paginationSearchParamsSchemaConfig,
  '/my-posts': paginationSearchParamsSchemaConfig,
} as const;
