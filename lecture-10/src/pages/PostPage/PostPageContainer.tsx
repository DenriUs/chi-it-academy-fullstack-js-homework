import { Suspense } from 'react';
import { useParams } from 'react-router';

import { PostPage } from './PostPage';
import { PostPageLoading } from './PostPageLoading';

export function PostPageContainer() {
  const { postId } = useParams();

  return (
    <Suspense fallback={<PostPageLoading />}>
      <PostPage params={{ postId: parseInt(postId!) }} />
    </Suspense>
  );
}
