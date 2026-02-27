import { ZodObject } from 'zod';

import { APP_ROUTES } from './constants';

export type AppRoutePath = (typeof APP_ROUTES)[keyof typeof APP_ROUTES] | '.';

export type Params = Record<string, string | number>;

export type SearchParams = Record<string, unknown>;

export type SearchParamsValidationConfig = {
  schema: ZodObject;
  fallbackValues: SearchParams;
};

export type NextParams<T extends Params> = Promise<T>;

export type NextSearchParams<T extends SearchParams> = Promise<T>;

export type NextErrorBoundaryProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export type PostPageParams = {
  postId: number;
};

export type PaginationSearchParams = {
  page: number;
  limit: number;
};

export type SerializedPaginationSearchParams = {
  page: string;
  limit: string;
};

export type AppRoutePathParamsMap = Record<AppRoutePath, unknown> & {
  [APP_ROUTES.post]: PostPageParams;
};

export type AppRouteSearchParamsMap = Record<AppRoutePath, unknown> & {
  [APP_ROUTES.home]: PaginationSearchParams;
  [APP_ROUTES.myPosts]: PaginationSearchParams;
};

export type AppRoutePathParams<T extends AppRoutePath> = {
  params?: unknown extends AppRoutePathParamsMap[T] ? Params : AppRoutePathParamsMap[T];
};

export type AppRouteSearchParams<T extends AppRoutePath> = {
  search?: unknown extends AppRouteSearchParamsMap[T] ? SearchParams : AppRouteSearchParamsMap[T];
};
