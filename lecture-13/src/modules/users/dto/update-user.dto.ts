import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  public readonly username?: string;

  @IsEmail()
  @IsOptional()
  public readonly email?: string;
}
