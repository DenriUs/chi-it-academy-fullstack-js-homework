import { Body, Controller, Post } from '@nestjs/common';
import AuthService from './auth.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtResponseDto } from './dto/jwt-response.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'User login' })
  @ApiResponse({ status: 200, description: 'User is logged in' })
  @ApiResponse({ status: 401, description: 'Incorrect credentials' })
  @Post('login')
  public async login(@Body() loginDto: LoginDto): Promise<JwtResponseDto> {
    return this.authService.login(loginDto);
  }

  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'New user is registered' })
  @ApiResponse({ status: 409, description: 'Username is already taken' })
  @Post('register')
  public async register(@Body() user: CreateUserDto): Promise<UserEntity> {
    return this.authService.register(user);
  }
}
