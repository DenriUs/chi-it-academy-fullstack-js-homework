'use client';

import { createContext, useContext } from 'react';
import type { Dispatch, SetStateAction } from 'react';

import type { Post, User } from '@/types';

type PostContext = {
  postId: Post['id'];
  authorId: User['id'];
  areCommentsVisible: boolean;
  setAreCommentsVisible: Dispatch<SetStateAction<boolean>>;
};

export const PostContext = createContext<PostContext | null>(null);

export function usePost() {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePost must be used within PostProvider');
  }
  return context;
}
