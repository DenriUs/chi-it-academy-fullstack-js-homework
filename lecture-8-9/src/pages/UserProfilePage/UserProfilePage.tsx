import { useSuspenseQuery } from '@tanstack/react-query';

import { cn } from '@lib/styling.helpers';
import { getCurrentUserPostsQueryOptions } from '@lib/query/query-options/posts/getCurrentUserPostsQueryOptions';

import { PAGINATION_SEARCH_PARAMS_FALLBACK } from '@/router/constants';
import type { PaginationSearchParams } from '@/router/types';

import { useAppSelector } from '@hooks/useAppSelector';
import { useAppNavigation } from '@hooks/useAppNavigtaion';

import { BackButton } from '@components/router/BackButton';

import { UserProfileCard } from '@components/UserProfileCard';
import { PostList, PostListEmpty } from '@components/Post';
import { Pagination } from '@components/Pagination';

const PAGINATION_ITEMS_LIMIT = PAGINATION_SEARCH_PARAMS_FALLBACK.limit;

type UserProfilePageProps = {
  searchParams: PaginationSearchParams;
};

export function UserProfilePage({ searchParams }: UserProfilePageProps) {
  const username = useAppSelector((state) => state.user.username);

  const {
    data: { data: posts, total, page, lastPage },
  } = useSuspenseQuery(getCurrentUserPostsQueryOptions(searchParams));

  const { isNavigating } = useAppNavigation({
    onNavigated: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
  });

  return (
    <div className='flex flex-col gap-6 w-full p-6'>
      <BackButton title='Back Home' to='/' />
      <div
        className={cn(
          'flex flex-1 flex-col gap-6',
          isNavigating && 'opacity-50 pointer-events-none',
        )}
      >
        <UserProfileCard username={username ?? ''} postsCount={total} />
        {!posts.length ? (
          <PostListEmpty />
        ) : (
          <>
            <PostList posts={posts} />
            <Pagination
              path='/my-posts'
              total={total}
              lastPage={lastPage}
              page={Number(page)}
              limit={PAGINATION_ITEMS_LIMIT}
            />
          </>
        )}
      </div>
    </div>
  );
}
