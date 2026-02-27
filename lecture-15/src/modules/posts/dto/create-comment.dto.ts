import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  @ApiProperty({
    name: 'text',
    type: 'string',
    maxLength: 2000,
    required: true,
  })
  public readonly text: string;
}
