import type { User } from './user';

export type Post = {
  id: number;
  imageUrl: string;
  description: string;
  commentCount: number;
  user: User;
  createdAt: string;
};
