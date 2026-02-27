import { defaultRequestInterceptor, defaultResponseErrorHandler } from './api.inerceptors';
import { FetchConfig } from './types';

export const defaultConfig: FetchConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  requestPrepareInterceptor: defaultRequestInterceptor,
  responseErrorHandler: defaultResponseErrorHandler,
};
