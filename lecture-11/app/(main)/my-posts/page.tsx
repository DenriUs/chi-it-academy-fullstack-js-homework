'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { paginationSearchParamsSchemaConfig } from '@/lib/search-params/schemas';
import { getCurrentUserPostsQueryOptions } from '@/lib/query/query-options/posts/getCurrentUserPostsQueryOptions';

import { useValidatedSearchParams } from '@/hooks/useValidatedSearchParams';

import { NavigateBackButton } from '@/components/NavigateBackButton';
import { UserProfileCard } from '@/components/UserProfileCard';
import { PostsStripe } from '@/components/Post/PostsStripe';
import { useAppSelector } from '@/hooks/store/useAppSelector';

const { schema, fallbackValues } = paginationSearchParamsSchemaConfig;

export default function UserProfilePage() {
  const [validateSearchParams] = useValidatedSearchParams(schema, fallbackValues, {
    ensureValidUrl: true,
  });

  const username = useAppSelector((state) => state.user.username) ?? '';

  const {
    data: { data, total, page: currentPage, lastPage },
  } = useSuspenseQuery(getCurrentUserPostsQueryOptions(validateSearchParams));

  return (
    <div className='flex flex-col gap-6 w-full p-6'>
      <NavigateBackButton title='Back Home' to='/' />
      <div className={'flex flex-1 flex-col gap-6'}>
        <UserProfileCard username={username} postsCount={total} />
        <PostsStripe
          paginationPath='/my-posts'
          posts={data}
          page={Number(currentPage)}
          total={total}
          lastPage={lastPage}
        />
      </div>
    </div>
  );
}
