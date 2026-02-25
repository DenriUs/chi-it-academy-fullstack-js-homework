import type { User } from './user';

export type Comment = {
  id: number;
  text: string;
  user: User;
  createdAt: string;
};
