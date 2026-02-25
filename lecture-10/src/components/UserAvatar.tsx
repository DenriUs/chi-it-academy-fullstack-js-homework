import type { ComponentProps } from 'react';
import type { User } from '@/types';

import { Avatar, AvatarFallback } from './ui/Avatar';

type UserAvatar = ComponentProps<typeof Avatar> & {
  username: User['username'];
};

export function UserAvatar({ username, ...props }: UserAvatar) {
  return (
    <Avatar {...props}>
      <AvatarFallback>{username.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
