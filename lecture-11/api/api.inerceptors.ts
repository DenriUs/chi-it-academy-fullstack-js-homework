import { LocalStorageService } from '@/lib/local-storage/local-storage.service';
import { HTTP_EXCEPTIONS } from '@/lib/http.exceptions';
import { store } from '@/store';
import { logout } from '@/store/slices/user.slice';
import { ApiError } from './api.error';

import { FetchConfig } from './types';

export const defaultRequestInterceptor = (config: FetchConfig) => {
  if (typeof window === 'undefined') {
    return config;
  }
  const token = LocalStorageService.getItem<string>('access-token');
  if (token) {
    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  }
  return config;
};

export const defaultResponseErrorHandler = (error: unknown) => {
  if (error instanceof ApiError) {
    const { message, error: errorName, statusCode } = error;
    throw new ApiError(message, errorName, statusCode);
  }
  throw new ApiError('Unknown error occured', 'Unknown error', HTTP_EXCEPTIONS.internalServerError);
};

export const protectedResponseErrorHandler = (error: unknown) => {
  if (error instanceof ApiError) {
    const { statusCode } = error;
    if (statusCode === HTTP_EXCEPTIONS.unauthorized && typeof window !== 'undefined') {
      LocalStorageService.removeItem('access-token');
      store.dispatch(logout());
    }
  }
  defaultResponseErrorHandler(error);
};
