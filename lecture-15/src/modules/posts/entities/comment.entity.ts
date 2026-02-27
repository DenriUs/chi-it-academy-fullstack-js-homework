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
import { PostEntity } from './post.entity';

@Entity('comments')
export class CommentEntity {
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column({ type: 'varchar', length: 2000 })
  public readonly text: string;

  @Exclude()
  @JoinColumn()
  @ManyToOne(() => PostEntity, { onDelete: 'CASCADE', eager: true })
  public readonly post: Partial<PostEntity>;

  @Exclude()
  @Column({ nullable: true })
  public readonly postId: string;

  @JoinColumn()
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE', eager: true })
  public readonly user: Partial<UserEntity>;

  @Exclude()
  @Column({ nullable: true })
  public readonly userId: string;

  @CreateDateColumn({ readonly: true, type: 'timestamptz' })
  public readonly createdAt: Date;

  @Exclude()
  @UpdateDateColumn({ readonly: true, type: 'timestamptz' })
  public readonly updatedAt: Date;
}
