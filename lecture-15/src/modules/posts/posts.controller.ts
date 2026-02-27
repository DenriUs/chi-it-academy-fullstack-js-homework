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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteOneCommentDto } from './dto/delete-one-comment.dto';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_IMAGE_TYPES_REGEX = /^image\/(png|jpeg|jpg)$/;

const IMAGES_FOLDER = 'uploads';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly commentsService: CommentsService,
  ) {}

  @ApiOperation({ summary: 'Create a new post' })
  @ApiBearerAuth()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
        description: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'New post is created' })
  @ApiResponse({ status: 400, description: 'Image type is not allowed' })
  @ApiResponse({ status: 401, description: 'User is unauthorized' })
  @ForAuthorized()
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

  @ApiOperation({ summary: "Get current user's paginated posts" })
  @ApiBearerAuth()
  @ApiQuery({
    name: 'page',
    type: 'number',
    default: '1',
    example: '1',
    description: 'Posts page number',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    default: '10',
    example: '10',
    description: 'Posts count per page',
  })
  @ApiResponse({ status: 200, description: 'Posts are found' })
  @ApiResponse({ status: 404, description: 'Posts are not found' })
  @ApiResponse({ status: 401, description: 'User is unauthorized' })
  @ForAuthorized()
  @Get('my-posts')
  public async getManyForCurrentUser(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @User() user: UserEntity,
  ): Promise<PaginatedResultDto<PostEntity>> {
    return this.postsService.getMany({}, { page, limit }, user);
  }

  @ApiOperation({ summary: 'Get a post by id' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Post id',
  })
  @ApiResponse({ status: 200, description: 'Post is found' })
  @ApiResponse({ status: 404, description: 'Post is not found' })
  @Get(':id')
  public async getOne(@Param() id: Id): Promise<PostEntity> {
    return this.postsService.getOne(id);
  }

  @ApiOperation({ summary: 'Get paginated posts' })
  @ApiQuery({
    name: 'page',
    type: 'number',
    default: '1',
    example: '1',
    description: 'Posts page number',
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    default: '10',
    example: '10',
    description: 'Posts count per page',
  })
  @ApiResponse({ status: 200, description: 'Posts are found' })
  @ApiResponse({ status: 404, description: 'Posts are not found' })
  @Get()
  public async getMany(
    @Query('page') page: number,
    @Query('limit') limit: number,
  ): Promise<PaginatedResultDto<PostEntity>> {
    return this.postsService.getMany({}, { page, limit });
  }

  @ApiOperation({ summary: 'Delete a post' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Post id',
  })
  @ApiResponse({ status: 200, description: 'Post is deleted' })
  @ApiResponse({ status: 404, description: 'Post is not found' })
  @ApiResponse({ status: 401, description: 'User is unauthorized' })
  @ForAuthorized()
  @Delete(':id')
  public async deleteOne(
    @Param() id: Id,
    @User() user: UserEntity,
  ): Promise<PostEntity> {
    return this.postsService.deleteOne(id, user);
  }

  @ApiOperation({ summary: 'Add a new comment' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Post id',
  })
  @ApiResponse({ status: 201, description: 'New comment is added' })
  @ApiResponse({ status: 401, description: 'User is unauthorized' })
  @ForAuthorized()
  @Post(':id/comments')
  public async createOneComment(
    @Param() id: Id,
    @Body() createCommentDto: CreateCommentDto,
    @User() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.createOne(id, createCommentDto, user);
  }

  @ApiOperation({ summary: 'Get all comments for a post' })
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    description: 'Post id',
  })
  @ApiResponse({ status: 201, description: 'Comments are found' })
  @ApiResponse({ status: 400, description: 'Comments are not found' })
  @Get(':id/comments')
  public async getManyComments(@Param() { id }: Id): Promise<CommentEntity[]> {
    return this.commentsService.getMany({ postId: id });
  }

  @ApiOperation({ summary: 'Delete a comment' })
  @ApiBearerAuth()
  @ApiParam({
    name: 'postId',
    type: 'string',
    required: true,
    description: 'Post id',
  })
  @ApiParam({
    name: 'commentId',
    type: 'string',
    required: true,
    description: 'Comment id',
  })
  @ApiResponse({ status: 200, description: 'Comment is deleted' })
  @ApiResponse({ status: 404, description: 'Comment or Post is not found' })
  @ApiResponse({ status: 401, description: 'User is unauthorized' })
  @ForAuthorized()
  @Delete(':postId/comments/:commentId')
  public async deleteOneComment(
    @Param() { postId, commentId }: DeleteOneCommentDto,
    @User() user: UserEntity,
  ): Promise<CommentEntity> {
    return this.commentsService.deleteOne(
      { id: postId },
      { id: commentId },
      user,
    );
  }
}
