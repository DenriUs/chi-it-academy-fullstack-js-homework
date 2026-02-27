import { publicApiService } from '@/api/api.service';
import { FetchConfig } from '@/api/types';
import type { LoginData, User } from '@/types';

import { mapLoginResponseDtoToLoginData } from '@/lib/mappers/login.mapper';

import type { LoginDto, CreateUserDto, LoginResponseDto } from './types';

const ROUTE_PREFIX = '/users';

export const login = async (data: LoginDto, config?: FetchConfig): Promise<LoginData> => {
  const responseData = await publicApiService.post<LoginResponseDto>(
    '/api/auth/login',
    data,
    config,
  );
  return mapLoginResponseDtoToLoginData(responseData);
};

export const register = (data: CreateUserDto, config?: FetchConfig): Promise<User> => {
  return publicApiService.post<User>(`${ROUTE_PREFIX}/register`, data, config);
};

export const getCurrentUser = (config?: FetchConfig): Promise<User> => {
  return publicApiService.get<User>(`${ROUTE_PREFIX}/my-profile`, {}, config);
};
