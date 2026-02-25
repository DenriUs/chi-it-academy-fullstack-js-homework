import { UserAvatar } from './UserAvatar';

type NewPostNotificationToastView = {
  username: string;
};

export function NewPostNotificationToastView({ username }: NewPostNotificationToastView) {
  return (
    <div className='flex items-center gap-2'>
      <UserAvatar username='test' />
      <div>
        <span>{username}</span> <span className='font-normal'>added a new post</span>
      </div>
    </div>
  );
}
