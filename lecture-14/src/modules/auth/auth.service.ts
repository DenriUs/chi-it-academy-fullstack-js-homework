import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';

import { UsersService } from 'src/modules/users/users.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { ERROR_MESSAGES } from 'src/common/constants';
import { LoginDto } from './dto/login.dto';
import { JwtResponseDto } from './dto/jwt-response.dto';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export default class AuthService {
  private readonly HASH_ROUNDS = 10;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  public async login({
    username,
    password,
  }: LoginDto): Promise<JwtResponseDto> {
    if (!username || !password) {
      throw new BadRequestException();
    }
    const user = await this.usersService.getOne({ username });
    if (!user || !(await compare(password, user.password))) {
      throw new UnauthorizedException(ERROR_MESSAGES.authIncorrectCredentials);
    }
    return this.generateToken(user);
  }

  public async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const password = await hash(createUserDto.password, this.HASH_ROUNDS);
    const user = await this.usersService.createOne({
      ...createUserDto,
      password,
    });
    return user;
  }

  private async generateToken(
    user: Partial<UserEntity>,
  ): Promise<JwtResponseDto> {
    const payload = {
      sub: user.id,
      username: user.username,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }
}
