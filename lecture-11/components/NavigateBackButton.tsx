import { ChevronLeftIcon } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import Link from 'next/link';

type BackButtonProps = {
  to: string;
  title: string;
};

export function NavigateBackButton({ to, title }: BackButtonProps) {
  return (
    <Button variant='ghost' className='fixed' asChild>
      <Link href={to}>
        <ChevronLeftIcon /> {title}
      </Link>
    </Button>
  );
}
