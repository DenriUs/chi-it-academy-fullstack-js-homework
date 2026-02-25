import { useSuspenseQuery } from '@tanstack/react-query';

import { getPostQueryOptions } from '@lib/query/query-options/posts/getPostQueryOptions';

import { BackButton } from '@components/router/BackButton';

import { PostItem } from '@components/Post';

type PostPageProps = {
  params: { postId: number };
};

export function PostPage({ params: { postId } }: PostPageProps) {
  const { data } = useSuspenseQuery(getPostQueryOptions(postId));

  return (
    <div className='flex w-full p-6'>
      <BackButton title='Back Home' to='/' />
      <div className='flex flex-1 justify-center'>
        <PostItem post={data} />
      </div>
    </div>
  );
}
