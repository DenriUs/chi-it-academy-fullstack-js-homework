import { Skeleton } from '@components/ui/Skeleton';

export function PostItemLoading() {
  return (
    <li className='flex flex-col max-w-2xl w-full'>
      <div className='px-4 py-3'>
        <div className='flex items-center gap-3'>
          <Skeleton className='size-10 rounded-full ' />
          <Skeleton className='w-40 h-3 rounded-[0.2rem]' />
        </div>
      </div>
      <div className='w-full max-h-[calc(100vh-15rem)] min-h-45 h-full aspect-video overflow-hidden'>
        <Skeleton className='w-full h-full rounded-xs' />
      </div>
      <div className='flex flex-col gap-2 w-full py-3 px-4'>
        <Skeleton className='w-full h-4 rounded-[0.3rem]' />
        <Skeleton className='w-[80%] h-4 rounded-[0.3rem]' />
      </div>
    </li>
  );
}
