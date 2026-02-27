import type { HttpStatusCode } from 'axios';

export type Methods = 'get' | 'post' | 'delete';

export type FetchConfig = RequestInit & {
  baseURL?: string;
  requestPrepareInterceptor?: (config: FetchConfig) => FetchConfig;
  responseErrorHandler?: (error: unknown) => void;
};

export type MakeRequestArgs = {
  method: Methods;
  url: string;
  params?: Record<string, unknown>;
  data?: Record<string, unknown> | FormData;
  config?: FetchConfig;
};

export type ResponseError = {
  message: string;
  error: string;
  statusCode: HttpStatusCode;
};

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: string;
  lastPage: number;
};
