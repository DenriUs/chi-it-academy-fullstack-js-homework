import { Controller, Get, Param } from '@nestjs/common';

import { ForAuthorized, User } from '../auth/auth.decorators';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from './users.service';
import { Id } from 'src/common/dto/id.dto';

@Controller('users')
@ForAuthorized()
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  public async getOne(
    @Param() id: Id,
    @User() user: UserEntity,
  ): Promise<UserEntity> {
    return this.usersService.getOne(id, user);
  }

  @Get('/my-profile')
  public getOneCurrent(@User() user: UserEntity): UserEntity {
    return user;
  }
}
