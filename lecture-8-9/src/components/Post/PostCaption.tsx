import type { Post } from '@/types';

import { PostDescription } from './PostDescription';
import { PostActions } from './PostActions';

type PostCaptionProps = {
  description: Post['description'];
};

export function PostCaption({ description }: PostCaptionProps) {
  return (
    <div className='flex justify-between gap-1 py-2 px-4 rounded-b-md'>
      <PostDescription text={description} />
      <PostActions />
    </div>
  );
}
