import { Skeleton } from '@components/ui/Skeleton';

export function PostCommentItemLoading() {
  return (
    <li className='flex flex-col justify-between items-start gap-4 w-full'>
      <div className='flex items-start gap-3 w-full'>
        <Skeleton className='size-8 shrink-0 rounded-full' />
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex justify-between w-full'>
            <Skeleton className='h-2.5 w-24' />
            <Skeleton className='h-2.5 w-18' />
          </div>
          <Skeleton className='h-2.5 w-[80%]' />
        </div>
      </div>
    </li>
  );
}
