import { SearchXIcon } from 'lucide-react';

export function PostListEmpty() {
  return (
    <div className='flex flex-1 justify-center items-center mb-16'>
      <div className='flex flex-col items-center gap-2'>
        <SearchXIcon className='size-8' />
        <span className='text-xl font-medium'>No Posts Found</span>
      </div>
    </div>
  );
}
