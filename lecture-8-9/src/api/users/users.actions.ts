import type { AxiosRequestConfig } from 'axios';
import { publicAxiosInstance } from '@api/axios.instance';
import type { LoginData, User } from '@/types';

import { mapLoginResponseDtoToLoginData } from '@lib/mappers/login.mapper';

import type { LoginDto, CreateUserDto, LoginResponseDto } from './types';

const ROUTE_PREFIX = '/users';

export const login = async (data: LoginDto, config?: AxiosRequestConfig): Promise<LoginData> => {
  const responseData = await publicAxiosInstance.post<LoginResponseDto>(
    '/api/auth/login',
    data,
    config,
  );
  return mapLoginResponseDtoToLoginData(responseData);
};

export const register = (data: CreateUserDto, config?: AxiosRequestConfig): Promise<User> => {
  return publicAxiosInstance.post<User>(`${ROUTE_PREFIX}/register`, data, config);
};

export const getCurrentUser = (config?: AxiosRequestConfig): Promise<User> => {
  return publicAxiosInstance.get<User>(`${ROUTE_PREFIX}/my-profile`, {}, config);
};
