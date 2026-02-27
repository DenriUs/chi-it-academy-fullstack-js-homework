'use client';

import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import type { Post } from '@/types';

import { Separator } from '@/components/ui/Separator';

import { PostCommentStripe } from '@/components/Post/PostCommentStripe/PostCommentStripe';
import { PostCommentStripeLoading } from '@/components/Post/PostCommentStripe/PostCommentStripeLoading';
import { PostCommentFormWrapper } from '@/components/Post/PostCommentForm/PostCommentFormWrapper';
import { PostCommentStripeError } from '@/components/Post/PostCommentStripe/PostCommentStripeError';

type PostCommentSectionProps = {
  postId: Post['id'];
};

export function PostCommentSection({ postId }: PostCommentSectionProps) {
  return (
    <div className='px-4'>
      <Separator />
      <div className='mt-4 mb-6'>
        <ErrorBoundary FallbackComponent={PostCommentStripeError}>
          <Suspense fallback={<PostCommentStripeLoading />}>
            <PostCommentStripe postId={postId} />
            <PostCommentFormWrapper />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}
