import type { User } from '@/types';

import { UserAvatar } from '@components/UserAvatar';

import { PostActionMenu } from './PostActionMenu';

type PostHeaderProps = {
  username: User['username'];
};

export function PostHeader({ username }: PostHeaderProps) {
  return (
    <div className='flex justify-between items-center px-4 py-3'>
      <div className='flex items-center gap-3'>
        <UserAvatar size='lg' username={username} />
        <span className='text-sm font-medium'>{username}</span>
      </div>
      <div className='relative left-2'>
        <PostActionMenu />
      </div>
    </div>
  );
}
