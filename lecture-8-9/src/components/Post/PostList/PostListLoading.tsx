import { PostItemLoading } from '@components/Post/PostItem/PostItemLoading';

type PostListLoadingProps = {
  length: number;
};

export function PostListLoading({ length }: PostListLoadingProps) {
  return (
    <ul className='flex flex-col gap-6 items-center w-full'>
      {Array.from({ length }).map((_, index) => (
        <PostItemLoading key={index} />
      ))}
    </ul>
  );
}
