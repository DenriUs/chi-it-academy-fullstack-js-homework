import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';
import { PostEntity } from '../entities/post.entity';
import { ERROR_MESSAGES } from 'src/common/constants';
import { UserEntity } from '../../users/entities/user.entity';
import { PaginationDto } from '../dto/posts-pagination.dto';
import { PaginatedResultDto } from 'src/common/dto/paginated-response.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    public readonly postEntityRepository: Repository<PostEntity>,
  ) {}

  public async createOne(
    entityLike: Partial<PostEntity>,
    user: Partial<UserEntity>,
  ): Promise<PostEntity> {
    return this.postEntityRepository.manager.transaction(async () => {
      const entity = this.postEntityRepository.create({ ...entityLike, user });
      const { id } = await this.postEntityRepository
        .save(entity)
        .catch((error) => {
          console.log(error);
          throw new InternalServerErrorException(
            ERROR_MESSAGES.internalServerError,
          );
        });
      return this.getOne({ id });
    });
  }

  public async getOne(
    findOptionsWhere: FindOptionsWhere<PostEntity>,
    user?: Partial<UserEntity>,
  ): Promise<PostEntity> {
    return this.postEntityRepository
      .findOneOrFail({
        where: { ...findOptionsWhere, ...(user && { userId: user.id }) },
      })
      .catch(() => {
        throw new NotFoundException(ERROR_MESSAGES.postNotFound);
      });
  }

  public async getMany(
    findOptionsWhere: FindOptionsWhere<PostEntity>,
    { page, limit }: PaginationDto,
    user?: Partial<UserEntity>,
  ): Promise<PaginatedResultDto<PostEntity>> {
    const [data, total] = await this.postEntityRepository
      .findAndCount({
        where: { ...findOptionsWhere, ...(user && { userId: user.id }) },
        take: limit,
        skip: (page - 1) * limit,
        order: { createdAt: 'DESC' },
      })
      .catch(() => {
        throw new NotFoundException(ERROR_MESSAGES.postsNotFound);
      });
    return {
      data,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  public async deleteOne(
    findOptionsWhere: FindOptionsWhere<PostEntity>,
    user: Partial<UserEntity>,
  ): Promise<PostEntity> {
    const entity = await this.getOne(findOptionsWhere, user);
    return this.postEntityRepository.remove(entity).catch(() => {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.internalServerError,
      );
    });
  }
}
