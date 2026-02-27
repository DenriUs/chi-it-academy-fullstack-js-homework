import { IsUUID } from 'class-validator';

export class Id {
  @IsUUID()
  public readonly id: string;
}
