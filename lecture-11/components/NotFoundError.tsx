import Link from 'next/link';

import { Button } from './ui/Button';

type NotFoundErrorProps = {
  title?: string;
};

export default function NotFoundError({ title }: NotFoundErrorProps) {
  return (
    <div className='flex flex-col items-center gap-4'>
      <h3 className='text-3xl font-medium'>{title ? title : 'Not Found'}</h3>
      <Button>
        <Link href='/'>Back Home</Link>
      </Button>
    </div>
  );
}
