'use client';

import { CircleXIcon } from 'lucide-react';
import type { FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui/Button';

export function PostCommentStripeError({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className='flex flex-col justify-center items-center w-full py-10 mb-4'>
      <div className='flex justify-center items-center size-10 rounded-md mb-2 bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
        <CircleXIcon className='size-8' />
      </div>
      <div className='flex flex-col gap-2'>
        <div className='flex flex-col'>
          <span className='font-semibold'>Failed to load comments</span>
          <span className='text-muted-foreground text-sm'>
            Click &quot;Retry&quot; or try again later
          </span>
        </div>
        <div className='flex justify-center'>
          <Button variant='outline' onClick={resetErrorBoundary}>
            Retry
          </Button>
        </div>
      </div>
    </div>
  );
}
