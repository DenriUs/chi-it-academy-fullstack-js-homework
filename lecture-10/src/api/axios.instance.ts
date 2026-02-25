/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { HttpStatusCode } from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CreateAxiosDefaults,
  InternalAxiosRequestConfig,
} from 'axios';

import { LocalStorageService } from '@lib/local-storage/local-storage.service';
import { serializeSearchParams } from '@lib/search-params/search-params.helpers';
import type { SearchParams } from '@/router/types';

import { axiosDefaultConfig } from './axios.constants';
import { ApiError } from './api.error';
import type { MakeRequestArgs } from './types';
import { store } from '@/store';
import { logout } from '@/store/slices/user.slice';
import { history } from '@lib/browser-history';

const defaultRequestSuccessInterceptor = (config: InternalAxiosRequestConfig) => {
  const token = LocalStorageService.getItem<string>('access-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const defaultResponseSuccessInterceptor = (response: AxiosResponse) => {
  return response;
};

const defaultResponseErrorInterceptor = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    const { message, error: errorName, statusCode } = error.response.data as ApiError;
    return Promise.reject(new ApiError(message, errorName, statusCode));
  }
  return Promise.reject(
    new ApiError('Unknown error occured', 'Unknown error', HttpStatusCode.InternalServerError),
  );
};

const protectedResponseErrorInterceptor = (error: unknown) => {
  if (axios.isAxiosError(error) && error.response) {
    const { statusCode } = error.response.data as ApiError;
    if (statusCode === HttpStatusCode.Unauthorized) {
      LocalStorageService.removeItem('access-token');
      store.dispatch(logout());
      history.push('/login');
      return Promise.reject(error);
    }
  }
  return defaultResponseErrorInterceptor(error);
};

class Axios {
  public axios: AxiosInstance;

  public constructor(config?: CreateAxiosDefaults) {
    this.axios = axios.create(config);
  }

  private async makeRequest<T = any>({
    method,
    url,
    params,
    data,
    config,
  }: MakeRequestArgs): Promise<T> {
    if (params) {
      const serializedSearchParams = serializeSearchParams(params);
      url = `${url}?${serializedSearchParams}`;
    }
    const response = await this.axios[method](url, data, {
      ...config,
    });
    return response.data;
  }

  public get<T = any>(url: string, params?: SearchParams, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'get', url, params, config });
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'post', url, data, config });
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.makeRequest<T>({ method: 'delete', url, config });
  }
}

export const publicAxiosInstance = new Axios(axiosDefaultConfig);
publicAxiosInstance.axios.interceptors.request.use(defaultRequestSuccessInterceptor);
publicAxiosInstance.axios.interceptors.response.use(
  defaultResponseSuccessInterceptor,
  defaultResponseErrorInterceptor,
);

export const protectedAxiosInstance = new Axios(axiosDefaultConfig);
protectedAxiosInstance.axios.interceptors.request.use(defaultRequestSuccessInterceptor);
protectedAxiosInstance.axios.interceptors.response.use(
  defaultResponseSuccessInterceptor,
  protectedResponseErrorInterceptor,
);
