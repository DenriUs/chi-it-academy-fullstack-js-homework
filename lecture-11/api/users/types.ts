export type LoginDto = {
  username: string;
  password: string;
};

export type LoginResponseDto = {
  access_token: string;
  refresh_token: string;
  userId: number;
  userName: string;
};

export type CreateUserDto = LoginDto;
