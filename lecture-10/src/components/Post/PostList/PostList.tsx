import type { ComponentProps } from 'react';

import { cn } from '@lib/styling.helpers';
import type { Post } from '@/types/post';

import { PostItem } from '@components/Post/PostItem/PostItem';

type PostListProps = Pick<ComponentProps<'ul'>, 'className'> & {
  posts: Post[];
};

export function PostList({ posts, className }: PostListProps) {
  return (
    <ul className={cn('flex flex-col gap-6 items-center w-full', className)}>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
    </ul>
  );
}
