import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  public readonly username: string;

  @IsEmail()
  public readonly email: string;
}
