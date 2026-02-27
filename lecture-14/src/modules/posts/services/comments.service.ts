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
import { CommentEntity } from '../entities/comment.entity';
import { PostsService } from './posts.service';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    public readonly commentEntityRepository: Repository<CommentEntity>,
    private readonly postsService: PostsService,
  ) {}

  public async createOne(
    findOptionsWhere: Partial<PostEntity>,
    entityLike: Partial<CommentEntity>,
    user: Partial<UserEntity>,
  ): Promise<CommentEntity> {
    return this.commentEntityRepository.manager.transaction(async () => {
      const post = await this.postsService.getOne(findOptionsWhere);
      const entity = this.commentEntityRepository.create({
        ...entityLike,
        post,
        user,
      });
      const { id } = await this.commentEntityRepository
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
    findOptionsWhere: FindOptionsWhere<CommentEntity>,
    user?: Partial<UserEntity>,
  ): Promise<CommentEntity> {
    return this.commentEntityRepository
      .findOneOrFail({
        where: { ...findOptionsWhere, ...(user && { userId: user.id }) },
      })
      .catch(() => {
        throw new NotFoundException(ERROR_MESSAGES.postNotFound);
      });
  }

  public async getMany(
    findOptionsWhere: FindOptionsWhere<CommentEntity>,
    user?: Partial<UserEntity>,
  ): Promise<CommentEntity[]> {
    return this.commentEntityRepository
      .find({
        where: { ...findOptionsWhere, ...(user && { userId: user.id }) },
      })
      .catch(() => {
        throw new NotFoundException(ERROR_MESSAGES.postsNotFound);
      });
  }

  public async deleteOne(
    postFindOptionsWhere: FindOptionsWhere<PostEntity>,
    commentFindOptionsWhere: FindOptionsWhere<CommentEntity>,
    user: Partial<UserEntity>,
  ): Promise<CommentEntity> {
    const entity = await this.getOne(
      { id: commentFindOptionsWhere.id, postId: postFindOptionsWhere.id },
      user,
    );
    return this.commentEntityRepository.remove(entity).catch(() => {
      throw new InternalServerErrorException(
        ERROR_MESSAGES.internalServerError,
      );
    });
  }
}
