import { NextSearchParams, SerializedPaginationSearchParams } from '@/navigation/types';
import { getPosts } from '@/api/posts/posts.actions';

import { PostsStripe } from '@/components/Post/PostsStripe';

type HomePageProps = {
  searchParams: NextSearchParams<SerializedPaginationSearchParams>;
};

export default async function HomePage({ searchParams }: HomePageProps) {
  const { page, limit } = await searchParams;

  const {
    data,
    page: currentPage,
    total,
    lastPage,
  } = await getPosts({ page: Number(page), limit: Number(limit) });

  return (
    <div className='flex flex-col flex-1 gap-6 p-6'>
      <PostsStripe
        paginationPath='/'
        posts={data}
        page={Number(currentPage)}
        total={total}
        lastPage={lastPage}
      />
    </div>
  );
}
