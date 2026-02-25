import type { LoginResponseDto } from '@api/users/types';
import type { LoginData } from '@/types/auth';

export const mapLoginResponseDtoToLoginData = (dto: LoginResponseDto): LoginData => ({
  ...dto,
  accessToken: dto.access_token,
  refreshToken: dto.refresh_token,
  username: dto.userName,
});
