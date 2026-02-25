import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { SendHorizonalIcon } from 'lucide-react';

import { queryClient } from '@lib/query/query.client';
import { COMMENTS_QUERY_KEY } from '@lib/query/query-options/constants';
import { createСomment } from '@api/comments/comments.actions';

import { Field, FieldGroup } from '@components/ui/Field';
import { InputGroupButton } from '@components/ui/InputGroup';
import { InputWidthAddons } from '@components/ui/InputWithAddons';

import { usePost } from '@components/Post/PostContext';

import { commentSchema } from './schema';
import type { CommentSchema } from './schema';

export function PostCommentForm() {
  const { postId } = usePost();

  const createCommentMutation = useMutation({
    mutationKey: [COMMENTS_QUERY_KEY, postId, 'create'],
    mutationFn: (data: CommentSchema) => createСomment(postId, data),
    onError: () => {
      toast.error('Uexpected Error', {
        description: 'Something went wrong during comment sending.',
      });
    },
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [COMMENTS_QUERY_KEY, postId], exact: true });
    },
  });

  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    mode: 'onChange',
    defaultValues: {
      text: '',
    },
  });

  const handleSubmit = async (values: CommentSchema) => {
    createCommentMutation.mutate(values);
    form.reset();
  };

  return (
    <div className='w-full'>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Controller
            name='text'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <InputWidthAddons
                  {...field}
                  id='text'
                  placeholder='Add a comment...'
                  rightAddon={
                    <InputGroupButton
                      size='icon-xs'
                      type='submit'
                      disabled={!field.value.length || fieldState.invalid}
                    >
                      <SendHorizonalIcon />
                    </InputGroupButton>
                  }
                />
              </Field>
            )}
          />
        </FieldGroup>
      </form>
    </div>
  );
}
