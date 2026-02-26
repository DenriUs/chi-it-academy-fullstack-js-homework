import path from 'path';
import fs from 'fs';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { PostsService } from './services/posts.service';
import { PostEntity } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { ForAuthorized, User } from '../auth/auth.decorators';
import { UserEntity } from '../users/entities/user.entity';
import { Id } from 'src/common/dto/id.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentsService } from './services/comments.service';
import { CommentEntity } from './entities/comment.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { PaginatedResultDto } from 'src/common/dto/paginated-response.dto';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES_REGEX = /^image\/(png|jpeg|jpg)$/;

const IMAGES_FOLDER = 'uploads';

@Controller('posts')
@ForAuthorized()
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: (req, file, cb) => {
          const rootPath = process.cwd();
          const uploadPath = path.join(rootPath, IMAGES_FOLDER);
          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
          }
          cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
          const filename = `${uuidv4()}${path.extname(file.originalname)}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(ALLOWED_IMAGE_TYPES_REGEX)) {
          return cb(
            new BadRequestException('Allowed image types: .png, .jpg, .jpeg'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  public async createOne(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: MAX_IMAGE_SIZE })],
        exceptionFactory: (error) => new BadRequestException(error),
      }),
    )
    image: Express.Multer.File,
    @Body() createPostDto: CreatePostDto,
    @User() user: UserEntity,
  ): Promise<PostEntity> {
    const imageUrl = `${process.env.SERVER_URL}/${IMAGES_FOLDER}/${image.filename}`;
    return this.postsService.createOne({ ...createPostDto, imageUrl }, user);
  }

  @Get(':id')
  public async getOne(@Param() id: Id): Promise<PostEntity> {
    return this.postsService.getOne(id);
  }

  @Get()
  public async getMany(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<PaginatedResultDto<PostEntity>> {
    return this.postsService.getMany({}, { page, limit });
  }

  @Delete(':id')
  public async deleteOne(
    @Param() id: Id,
    @User() user: UserEntity,
  ): Promise<PostEntity> {
    return this.postsService.deleteOne(id, user);
  }

  @Get('my-posts')
  public async getManyForCurrentUser(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @User() user: UserEntity,
  ): Promise<PaginatedResultDto<PostEntity>> {
    return this.postsService.getMany({}, { page, limit }, user);
  }

  @Post(':id/comments')
  public async createOneComment(
    @Param() id: Id,
    @Body() createCommentDto: CreateCommentDto,
    @User() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.createOne(id, createCommentDto, user);
  }

  @Get(':id/comments')
  public async getManyComments(@Param() id: Id): Promise<CommentEntity[]> {
    return this.commentsService.getMany(id);
  }

  @Delete(':postId/comments/:commentId')
  public async deleteOneComment(
    @Param(':postId') postId: Id,
    @Param(':commentId') commentId: Id,
    @User() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.deleteOne(postId, commentId, user);
  }
}
