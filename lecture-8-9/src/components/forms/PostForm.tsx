import { useState } from 'react';
import { HttpStatusCode } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { queryClient } from '@lib/query/query.client';
import { POSTS_QUERY_KEY } from '@lib/query/query-options/constants';
import { createPost } from '@api/posts/posts.actions';
import { ApiError } from '@api/api.error';

import { useAppNavigate } from '@hooks/useAppNavigate';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@components/ui/Card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@components/ui/Field';
import { Input } from '@components/ui/Input';
import { Button } from '@components/ui/Button';
import { Textarea } from '@components/ui/Textarea';
import { Spinner } from '@components/ui/Spinner';

import { createPostSchema, DESCRIPTION_MAX_LENGTH } from './schema';
import type { CreatePostSchema } from './schema';

export function PostForm({ ...props }: React.ComponentProps<'div'>) {
  const [isError, setIsError] = useState(false);

  const navigate = useAppNavigate();

  const createPostMutation = useMutation({
    mutationKey: [POSTS_QUERY_KEY, 'create'],
    mutationFn: (data: FormData) =>
      createPost(data, {
        onUploadProgress: (progress) => {
          console.log(progress);
        },
      }),
    onError: (error) => {
      if (error instanceof ApiError && error.statusCode === HttpStatusCode.BadRequest) {
        setIsError(true);
        return;
      }
      toast.error('Uexpected Error', {
        description: 'Something went wrong during post creating.',
      });
    },
    onSettled: () => {
      navigate('/');
      return queryClient.invalidateQueries({ queryKey: [POSTS_QUERY_KEY] });
    },
  });

  const form = useForm<CreatePostSchema>({
    resolver: zodResolver(createPostSchema),
    defaultValues: {
      description: '',
    },
  });

  const handleSubmit = async ({ image, description }: CreatePostSchema) => {
    const formData = new FormData();
    formData.set('image', image);
    formData.set('description', description);

    createPostMutation.mutate(formData);
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create a new post</CardTitle>
        <CardDescription>Upload your image and add a description to your post</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name='image'
              control={form.control}
              render={({ field: { ref, name, onChange }, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='image'>Image</FieldLabel>
                  <Input
                    ref={ref}
                    id='image'
                    name={name}
                    type='file'
                    accept='.png,.jpeg,.jpg'
                    aria-invalid={fieldState.invalid}
                    disabled={createPostMutation.isPending}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(file);
                    }}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Controller
              name='description'
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor='description'>Description</FieldLabel>
                  <Textarea
                    {...field}
                    id='description'
                    maxLength={DESCRIPTION_MAX_LENGTH}
                    aria-invalid={fieldState.invalid}
                    placeholder='Provide your description here.'
                    className='max-h-60 h-35'
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <Field>
              <Button type='submit' disabled={createPostMutation.isPending}>
                {createPostMutation.isPending && <Spinner />} Create
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
