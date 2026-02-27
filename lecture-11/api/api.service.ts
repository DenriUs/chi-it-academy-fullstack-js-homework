import { createNewSearchParams } from '@/lib/search-params/search-params.helpers';

import { ApiError } from './api.error';
import { defaultConfig } from './api.constants';
import type { FetchConfig, MakeRequestArgs } from './types';
import { protectedResponseErrorHandler } from './api.inerceptors';

export class ApiService {
  private config: FetchConfig;

  public constructor(config: FetchConfig) {
    this.config = config;
  }

  private async makeRequest<T = unknown>({
    method,
    url,
    params,
    data,
    config,
  }: MakeRequestArgs): Promise<T> {
    const isBodyPresent = method !== 'get' && data;
    const isFormData = data instanceof FormData;

    const baseURL = config?.baseURL ?? this.config.baseURL;
    let fullURL = `${baseURL}${url}`;
    if (params) {
      fullURL = `${fullURL}?${createNewSearchParams(params).toString()}`;
    }

    let requestConfig: FetchConfig = {
      method,
      ...this.config,
      ...config,
      headers: {
        ...this.config.headers,
        ...config?.headers,
        ...(isBodyPresent && !isFormData && { 'Content-Type': 'application/json' }),
      },
      ...(isBodyPresent && { body: isFormData ? data : JSON.stringify(data) }),
    };
    if (requestConfig.requestPrepareInterceptor) {
      requestConfig = requestConfig.requestPrepareInterceptor(requestConfig);
    }

    const response = await fetch(fullURL, requestConfig);
    const responseData = await response.json();

    if (response.ok) {
      return responseData;
    }
    if (requestConfig.responseErrorHandler) {
      requestConfig.responseErrorHandler(responseData);
    }
    const { message, error, statusCode } = responseData as ApiError;
    return Promise.reject(new ApiError(message, error, statusCode));
  }

  public get<T = unknown>(
    url: string,
    params?: Record<string, unknown>,
    config?: FetchConfig,
  ): Promise<T> {
    return this.makeRequest<T>({ method: 'get', url, params, config });
  }

  public post<T = unknown>(
    url: string,
    data?: Record<string, unknown> | FormData,
    config?: FetchConfig,
  ): Promise<T> {
    return this.makeRequest<T>({ method: 'post', url, data, config });
  }

  public delete<T = unknown>(url: string, config?: FetchConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'delete', url, config });
  }
}

export const publicApiService = new ApiService({ ...defaultConfig });

export const protectedApiService = new ApiService({
  ...defaultConfig,
  responseErrorHandler: protectedResponseErrorHandler,
});
