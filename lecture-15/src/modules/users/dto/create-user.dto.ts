import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    name: 'username',
    type: 'string',
    example: 'test',
    required: true,
  })
  public readonly username: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
    name: 'password',
    type: 'string',
    minLength: 8,
    example: 'password',
    required: true,
  })
  public readonly password: string;
}
