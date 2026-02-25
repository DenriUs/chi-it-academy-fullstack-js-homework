import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@components/ui/Button';

import { AppLink } from './AppLink';
import { type AppLinkProps } from './AppLink';
import type { AppRoutePath } from '@/router/types';

type BackButtonProps<T extends AppRoutePath> = AppLinkProps<T> & {
  title: string;
};

export function BackButton<T extends AppRoutePath>({ title, ...props }: BackButtonProps<T>) {
  return (
    <Button variant='ghost' className='fixed' asChild>
      <AppLink {...props}>
        <ChevronLeftIcon /> {title}
      </AppLink>
    </Button>
  );
}
