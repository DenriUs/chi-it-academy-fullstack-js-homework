import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ type: 'varchar', length: 64, unique: true })
  public readonly username: string;

  @Exclude()
  @Column({ type: 'varchar', length: 60 })
  public readonly password: string;

  @Exclude()
  @CreateDateColumn({ readonly: true, type: 'timestamptz' })
  public readonly createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ readonly: true, type: 'timestamptz' })
  public readonly updatedAt: Date;
}
