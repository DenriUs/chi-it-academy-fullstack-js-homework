import {
  Param,
  Body,
  Get,
  Post,
  Patch,
  Delete,
  JsonController,
  OnUndefined,
} from 'routing-controllers';

import { UserEntity } from '@/modules/users/entities/user.entity';
import { usersService } from '@/modules/users/users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@JsonController('/users')
export class UserController {
  @Post()
  public async createOne(@Body() data: CreateUserDto) {
    return usersService.createOne(data);
  }

  @Get()
  public getAll(): Promise<UserEntity[]> {
    return usersService.find();
  }

  @Patch('/:id')
  public updateOne(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return usersService.updateOne(id, data);
  }

  @Delete('/:id')
  @OnUndefined(200)
  public deleteOne(@Param('id') id: number) {
    return usersService.deleteOne(id);
  }
}
