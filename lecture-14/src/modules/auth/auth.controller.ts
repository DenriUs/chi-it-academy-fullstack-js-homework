import { Body, Controller, Post } from '@nestjs/common';
import AuthService from './auth.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtResponseDto } from './dto/jwt-response.dto';
import { UserEntity } from '../users/entities/user.entity';

@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<JwtResponseDto> {
    return this.authService.login(loginDto);
  }

  @Post('register')
  public async register(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.authService.register(user);
  }
}
