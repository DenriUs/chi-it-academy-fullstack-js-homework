import { APP_ROUTES } from './constants';

export type AppRoutePath = (typeof APP_ROUTES)[keyof typeof APP_ROUTES] | '.';

export type PathParams = Record<string, string | number>;

export type SearchParams = Record<string, string | number | null | undefined>;

export type PostPagePathParams = {
  postId: number;
};

export type PaginationSearchParams = {
  page: number;
  limit: number;
};

export type AppRoutePathParamsMap = Record<AppRoutePath, unknown> & {
  [APP_ROUTES.post]: PostPagePathParams;
};

export type AppRouteSearchParamsMap = Record<AppRoutePath, unknown> & {
  [APP_ROUTES.home]: PaginationSearchParams;
  [APP_ROUTES.myPosts]: PaginationSearchParams;
};

export type AppRoutePathParams<T extends AppRoutePath> = {
  params?: unknown extends AppRoutePathParamsMap[T] ? PathParams : AppRoutePathParamsMap[T];
};

export type AppRouteSearchParams<T extends AppRoutePath> = {
  search?: unknown extends AppRouteSearchParamsMap[T] ? SearchParams : AppRouteSearchParamsMap[T];
};
