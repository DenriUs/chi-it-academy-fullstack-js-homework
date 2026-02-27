import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ type: 'varchar', length: 2000 })
  public readonly description: string;

  @Column({ type: 'varchar' })
  public readonly imageUrl: string;

  @JoinColumn()
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', eager: true })
  public readonly user: Partial<UserEntity>;

  @Exclude()
  @Column({ nullable: true })
  public readonly userId: string;

  @Exclude()
  @CreateDateColumn({ readonly: true, type: 'timestamptz' })
  public readonly createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ readonly: true, type: 'timestamptz' })
  public readonly updatedAt: Date;
}
