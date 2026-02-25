import { PostItemLoading } from '@components/Post';

export function PostPageLoading() {
  return (
    <div className='flex flex-col items-center gap-6 w-full p-6'>
      <PostItemLoading />
    </div>
  );
}
