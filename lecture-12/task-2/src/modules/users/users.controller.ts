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

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { UserEntity } from './entities/user.entity';
import { usersService } from './users.service';

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
