import { Controller, Get, Param } from '@nestjs/common';

import { ForAuthorized, User } from '../auth/auth.decorators';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from './users.service';
import { Id } from 'src/common/dto/id.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export default class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get current user data' })
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'User is authorized' })
  @ApiResponse({ status: 401, description: 'User is unauthorized' })
  @ForAuthorized()
  @Get('my-profile')
  public getOneCurrent(@User() user: UserEntity): UserEntity {
    return user;
  }

  @ApiOperation({ summary: 'Get user by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'User id',
  })
  @ApiResponse({ status: 200, description: 'User is found' })
  @ApiResponse({ status: 404, description: 'User is not found' })
  @Get(':id')
  public async getOne(
    @Param() id: Id,
    @User() user: UserEntity,
  ): Promise<UserEntity> {
    return this.usersService.getOne(id, user);
  }
}
