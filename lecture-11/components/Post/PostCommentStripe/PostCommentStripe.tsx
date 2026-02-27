import type { Post } from '@/types';

import { PostCommentList } from '@/components/Post/PostCommentList/PostCommentList';
import { useSuspenseQuery } from '@tanstack/react-query';
import { getCommentsQueryOptions } from '@/lib/query/query-options/comments/getCommentsQueryOptions';

type PostCommentStripeProps = {
  postId: Post['id'];
};

export function PostCommentStripe({ postId }: PostCommentStripeProps) {
  const { data } = useSuspenseQuery(getCommentsQueryOptions(postId));

  return (
    <>
      <span className='font-medium'>Comments: {data.length}</span>
      <PostCommentList comments={data} />
    </>
  );
}
