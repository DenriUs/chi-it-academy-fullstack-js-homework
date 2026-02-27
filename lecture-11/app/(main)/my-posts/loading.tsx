import { Skeleton } from '@/components/ui/Skeleton';

import { PostListLoading } from '@/components/Post';

const LOADING_ITEMS_COUNT = 3;

export default function UserProfileLoadingPage() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <UserCardLoading />
      <PostListLoading length={LOADING_ITEMS_COUNT} />
    </div>
  );
}

export function UserCardLoading() {
  return (
    <div className='flex justify-center'>
      <div className='flex justify-between items-center max-w-2xl w-full p-6'>
        <div className='flex items-center gap-3'>
          <Skeleton className='size-12 rounded-full ' />
          <Skeleton className='w-35 h-4 rounded-[0.2rem]' />
        </div>
        <Skeleton className='w-18 h-4 rounded-[0.2rem]' />
      </div>
    </div>
  );
}
