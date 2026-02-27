import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { FindOptionsWhere, Repository } from 'typeorm';
import { ERROR_MESSAGES } from 'src/common/constants';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    public readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  public async createOne(
    createEntity: Partial<UserEntity>,
  ): Promise<UserEntity> {
    return this.userEntityRepository.manager.transaction(async () => {
      const entity = await this.userEntityRepository
        .save(createEntity)
        .catch(() => {
          throw new ConflictException(ERROR_MESSAGES.userAlreadyExists);
        });
      return this.getOne({ id: entity.id });
    });
  }

  public async getOne(
    conditions: FindOptionsWhere<UserEntity>,
    user?: Partial<UserEntity>,
  ): Promise<UserEntity> {
    return this.userEntityRepository
      .findOneOrFail({ where: { ...conditions, ...(user && { id: user.id }) } })
      .catch(() => {
        throw new NotFoundException(ERROR_MESSAGES.userNotFound);
      });
  }
}
