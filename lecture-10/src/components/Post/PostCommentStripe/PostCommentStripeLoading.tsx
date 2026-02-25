import { PostCommentListLoading } from '@components/Post/PostCommentList/PostCommentListLoading';

const LOADING_ITEMS_COUNT = 5;

export function PostCommentStripeLoading() {
  return (
    <div className='mt-3 mb-6'>
      <PostCommentListLoading length={LOADING_ITEMS_COUNT} />
    </div>
  );
}
