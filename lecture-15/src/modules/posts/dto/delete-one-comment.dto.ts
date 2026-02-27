import { IsUUID } from 'class-validator';

export class DeleteOneCommentDto {
  @IsUUID()
  public readonly postId: string;

  @IsUUID()
  public readonly commentId: string;
}
