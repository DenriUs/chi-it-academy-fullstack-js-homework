import { Card, CardContent } from './ui/Card';
import { UserAvatar } from './UserAvatar';

type UserProfileCardProps = {
  username: string;
  postsCount: number;
};

export function UserProfileCard({ username, postsCount }: UserProfileCardProps) {
  return (
    <div className='flex justify-center'>
      <Card className='max-w-2xl w-full'>
        <CardContent className='flex flex-row justify-between items-center'>
          <div className='flex items-center gap-3'>
            <UserAvatar username={username} className='size-12' />
            <span className='text-lg font-medium'>{username}</span>
          </div>
          <span className='font-medium'>Posts: {postsCount}</span>
        </CardContent>
      </Card>
    </div>
  );
}
