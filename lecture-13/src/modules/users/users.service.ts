import { NotFoundError } from 'routing-controllers';
import { FindOptionsWhere } from 'typeorm';

import { AppDataSource } from '@/data-source';

import { UserEntity } from './entities/user.entity';

const usersRepository = AppDataSource.getRepository(UserEntity);

export const usersService = {
  async createOne(input: Partial<UserEntity>) {
    return usersRepository.save(input);
  },

  async findOne(findOptions: FindOptionsWhere<UserEntity>): Promise<UserEntity> {
    return usersRepository.findOneOrFail({ where: findOptions }).catch(() => {
      throw new NotFoundError();
    });
  },

  async find(findOptions: FindOptionsWhere<UserEntity>): Promise<UserEntity[]> {
    return usersRepository.find({ where: findOptions });
  },

  async updateOne(id: UserEntity['id'], input: Partial<UserEntity>) {
    const oldUser = await usersService.findOne({ id });
    const newUser = usersRepository.merge(oldUser, input);
    return usersRepository.save(newUser);
  },

  async deleteOne(id: UserEntity['id']) {
    const user = await usersService.findOne({ id });
    await usersRepository.remove(user);
  },
};
