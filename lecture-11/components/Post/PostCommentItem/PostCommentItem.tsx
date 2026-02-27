'use client';

import { useState, type ComponentProps } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { cn } from '@/lib/styling.helpers';
import { COMMENTS_QUERY_KEY } from '@/lib/query/query-options/constants';
import { deleteComment } from '@/api/comments/comments.actions';
import type { Comment } from '@/types';

import { useAppSelector } from '@/hooks/store/useAppSelector';

import { Button } from '@/components/ui/Button';

import { DeletePostCommentAlertDialog } from '@/components/alert-dialogs/DeletePostCommentAlertDialog';
import { UserAvatar } from '@/components/UserAvatar';

import { usePost } from '@/components/Post/PostContext';
import { Spinner } from '@/components/ui/Spinner';

type PostCommentItemProps = Pick<ComponentProps<'li'>, 'className'> & {
  comment: Comment;
  isOptimistic?: boolean;
};

export function PostCommentItem({ comment, isOptimistic, className }: PostCommentItemProps) {
  const { id, text, createdAt, user: author } = comment;

  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);

  const currentUserId = useAppSelector((state) => state.user.id);

  const queryClient = useQueryClient();

  const { postId } = usePost();

  const deleteCommentMutation = useMutation({
    mutationKey: [COMMENTS_QUERY_KEY, postId, 'delete'],
    mutationFn: (id: Comment['id']) => deleteComment(postId, id),
    onMutate: async (id, context) => {
      await context.client.cancelQueries({ queryKey: [COMMENTS_QUERY_KEY, postId], exact: true });

      const previousComments = context.client.getQueryData<Comment[]>([COMMENTS_QUERY_KEY, postId]);

      context.client.setQueryData<Comment[]>([COMMENTS_QUERY_KEY, postId], (old) =>
        old?.filter((comment) => comment.id !== id),
      );

      return { previousComments };
    },
    onError: (_, __, onMutateResult, context) => {
      context.client.setQueryData([COMMENTS_QUERY_KEY, postId], onMutateResult?.previousComments);
      toast.error('Uexpected Error', {
        description: 'Something went wrong during comment sending.',
      });
    },
    onSettled: () => {
      setIsDeleteDialogOpened(false);
      return queryClient.invalidateQueries({
        queryKey: [COMMENTS_QUERY_KEY, postId],
        exact: true,
      });
    },
  });

  return (
    <li className={cn('flex flex-col justify-between items-start gap-4 w-full', className)}>
      <DeletePostCommentAlertDialog
        open={isDeleteDialogOpened}
        isActionPending={deleteCommentMutation.isPending}
        onOpenChange={setIsDeleteDialogOpened}
        onActionSubmit={() => deleteCommentMutation.mutate(id)}
      />
      <div className='flex items-start gap-3 w-full'>
        <UserAvatar username={author.username} className='size-8' />
        <div className='flex flex-col w-full'>
          <div className='flex justify-between w-full'>
            <div className='flex items-center gap-3'>
              <span className='text-sm font-medium'>{author.username}</span>
              {isOptimistic ? (
                <Spinner className='size-3.5' />
              ) : (
                currentUserId === author.id && (
                  <Button
                    variant='link'
                    onClick={() => setIsDeleteDialogOpened(true)}
                    className='text-xs text-muted-foreground/80 h-auto p-0'
                  >
                    Remove
                  </Button>
                )
              )}
            </div>
            <span className='text-sm text-muted-foreground'>
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
          <span className='text-sm leading-4.5 break-all wrap-break-word'>{text}</span>
        </div>
      </div>
    </li>
  );
}
