import { PostListLoading } from '@components/Post';

const LOADING_ITEMS_COUNT = 3;

export function StripePageLoading() {
  return (
    <div className='flex flex-col gap-6 p-6'>
      <PostListLoading length={LOADING_ITEMS_COUNT} />
    </div>
  );
}
