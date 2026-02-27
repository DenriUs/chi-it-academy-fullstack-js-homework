import { getPost } from '@/api/posts/posts.actions';

import { NavigateBackButton } from '@/components/NavigateBackButton';

import { PostItem } from '@/components/Post';
import { NextParams, PostPageParams } from '@/navigation/types';

type PostPageProps = {
  params: NextParams<PostPageParams>;
};

export default async function PostPage({ params }: PostPageProps) {
  const { postId } = await params;

  const post = await getPost(Number(postId));

  return (
    <div className='flex w-full p-6'>
      <NavigateBackButton title='Back Home' to='/' />
      <div className='flex flex-1 justify-center'>
        <PostItem post={post} />
      </div>
    </div>
  );
}
