import { PAGINATION_SEARCH_PARAMS_FALLBACK } from '@/lib/search-params/schemas';
import { Post } from '@/types';

import { PostListEmpty } from './PostList/PostListEmpty';
import { PostList } from './PostList/PostList';
import { Pagination } from '../Pagination';
import { AppRoutePath } from '@/navigation/types';

const PAGINATION_ITEMS_LIMIT = PAGINATION_SEARCH_PARAMS_FALLBACK.limit;

type PostsStripeProps = {
  posts: Post[];
  paginationPath: AppRoutePath;
  page: number;
  total: number;
  lastPage: number;
};

export function PostsStripe({ posts, paginationPath, ...props }: PostsStripeProps) {
  return (
    <>
      {!posts.length ? (
        <PostListEmpty />
      ) : (
        <>
          <PostList posts={posts} />
          <Pagination path={paginationPath} limit={PAGINATION_ITEMS_LIMIT} {...props} />
        </>
      )}
    </>
  );
}
