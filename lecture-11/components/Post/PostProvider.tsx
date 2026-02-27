'use client';

import { useState } from 'react';
import type { PropsWithChildren } from 'react';

import type { Post, User } from '@/types';

import { PostContext } from './PostContext';

type PostProviderProps = PropsWithChildren & {
  postId: Post['id'];
  authorId: User['id'];
  commentsDefaultVisibility: boolean;
};

export function PostProvider({
  postId,
  authorId,
  commentsDefaultVisibility,
  children,
}: PostProviderProps) {
  const [areCommentsVisible, setAreCommentsVisible] = useState(commentsDefaultVisibility);

  return (
    <PostContext.Provider value={{ postId, authorId, areCommentsVisible, setAreCommentsVisible }}>
      {children}
    </PostContext.Provider>
  );
}
