'use client';

import { useAppSelector } from '@/hooks/store/useAppSelector';

import { UserAvatar } from '@/components/UserAvatar';

import { PostCommentForm } from './PostCommentForm';

export function PostCommentFormWrapper() {
  const { isAuthorized, username } = useAppSelector((state) => state.user);

  return isAuthorized ? (
    <div className='flex items-center gap-2 pt-6'>
      <UserAvatar username={username ?? ''} className='size-8' />
      <PostCommentForm />
    </div>
  ) : null;
}
