'use client';

import { useMutationState } from '@tanstack/react-query';

import { cn } from '@/lib/styling.helpers';
import { COMMENTS_QUERY_KEY } from '@/lib/query/query-options/constants';
import type { Comment } from '@/types';

import { useAppSelector } from '@/hooks/store/useAppSelector';

import { usePost } from '@/components/Post/PostContext';

import { PostCommentItem } from '@/components/Post/PostCommentItem/PostCommentItem';

type PostCommentList = {
  comments: Comment[];
};

export function PostCommentList({ comments }: PostCommentList) {
  const user = useAppSelector((state) => state.user);

  const { postId } = usePost();

  const createCommentMutationVariables = useMutationState<Comment>({
    filters: {
      mutationKey: [COMMENTS_QUERY_KEY, postId, 'create'],
      exact: true,
      status: 'pending',
    },
    select: (mutation) => ({
      ...(mutation.state.variables as Comment),
      id: -1,
      createdAt: new Date().toLocaleDateString(),
      user: { id: user.id!, username: user.username! },
    }),
  });

  const newCommentOptimistic = createCommentMutationVariables[0];

  return (
    <ul className='flex flex-col gap-6 mt-3'>
      {newCommentOptimistic && (
        <PostCommentItem comment={newCommentOptimistic} isOptimistic className={cn('opacity-50')} />
      )}
      {comments.map((comment) => (
        <PostCommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}
