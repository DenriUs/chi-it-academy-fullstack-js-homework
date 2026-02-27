import { PostCommentItemLoading } from '@/components/Post/PostCommentItem/PostCommentItemLoading';

type PostCommentListLoadingProps = {
  length: number;
};

export function PostCommentListLoading({ length }: PostCommentListLoadingProps) {
  return (
    <ul className='flex flex-col gap-6'>
      {Array.from({ length }).map((_, index) => (
        <PostCommentItemLoading key={index} />
      ))}
    </ul>
  );
}
