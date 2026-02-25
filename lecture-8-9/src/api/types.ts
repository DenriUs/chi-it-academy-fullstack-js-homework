/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig, HttpStatusCode } from 'axios';

import type { SearchParams } from '@/router/types';

export type Methods = 'get' | 'post' | 'delete';

export type MakeRequestArgs = {
  method: Methods;
  url: string;
  params?: SearchParams;
  data?: any;
  config?: AxiosRequestConfig;
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
