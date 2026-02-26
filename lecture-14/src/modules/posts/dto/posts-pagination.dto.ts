import { IsOptional, IsPositive, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @Max(10)
  public readonly limit: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  public readonly page: number;
}
