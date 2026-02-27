'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { MessageSquareIcon, MessageSquareOffIcon, XIcon } from 'lucide-react';
import { toast } from 'sonner';

import { POSTS_QUERY_KEY } from '@/lib/query/query-options/constants';
import { getCommentsQueryOptions } from '@/lib/query/query-options/comments/getCommentsQueryOptions';
import { deletePost } from '@/api/posts/posts.actions';
import type { Post } from '@/types';

import { useAppSelector } from '@/hooks/store/useAppSelector';

import { Button } from '@/components/ui/Button';

import { DeletePostAlertDialog } from '@/components/alert-dialogs/DeletePostAlertDialog';

import { usePost } from './PostContext';

export function PostActions() {
  const [isDeleteDialogOpened, setIsDeleteDialogOpened] = useState(false);

  const currentUserId = useAppSelector((state) => state.user.id);

  const { postId, authorId, areCommentsVisible, setAreCommentsVisible } = usePost();

  const queryClient = useQueryClient();

  const router = useRouter();

  const deletePostMutation = useMutation({
    mutationKey: [POSTS_QUERY_KEY, postId, 'delete'],
    mutationFn: (id: Post['id']) => deletePost(id),
    onError: () => {
      toast.error('Uexpected Error', {
        description: 'Something went wrong during comment sending.',
      });
    },
    onSettled: () => {
      setIsDeleteDialogOpened(false);
      router.refresh();
    },
  });

  return (
    <div className='relative flex left-1 bottom-0.5'>
      <DeletePostAlertDialog
        open={isDeleteDialogOpened}
        onOpenChange={setIsDeleteDialogOpened}
        isActionPending={deletePostMutation.isPending}
        onActionSubmit={() => deletePostMutation.mutate(postId)}
      />
      <Button
        variant='ghost'
        size='icon'
        onMouseEnter={() => queryClient.prefetchQuery(getCommentsQueryOptions(postId))}
        onClick={() => setAreCommentsVisible((prev) => !prev)}
      >
        {areCommentsVisible ? (
          <MessageSquareOffIcon className='size-5' />
        ) : (
          <MessageSquareIcon className='size-5' />
        )}
      </Button>
      {currentUserId === authorId && (
        <Button variant='ghost' size='icon' onClick={() => setIsDeleteDialogOpened(true)}>
          <XIcon className='size-5' />
        </Button>
      )}
    </div>
  );
}
