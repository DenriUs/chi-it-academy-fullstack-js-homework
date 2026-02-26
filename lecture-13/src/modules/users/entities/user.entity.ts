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

  @Column({ type: 'varchar', length: 30 })
  public readonly username: string;

  @Column({ type: 'varchar', length: 320, unique: true })
  public readonly email: string;

  @CreateDateColumn({ readonly: true, type: 'timestamptz' })
  public readonly createdAt: Date;

  @UpdateDateColumn({ readonly: true, type: 'timestamptz' })
  public readonly updatedAt: Date;
}
