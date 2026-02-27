import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
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
  @IsNotEmpty()
  @ApiProperty({
    name: 'password',
    type: 'string',
    example: 'password',
    required: true,
  })
  public readonly password: string;
}
