import type { AppRoutePath, PaginationSearchParams } from './types';

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

export const PAGINATION_SEARCH_PARAMS_FALLBACK: PaginationSearchParams = {
  page: 1,
  limit: 10,
} as const;
