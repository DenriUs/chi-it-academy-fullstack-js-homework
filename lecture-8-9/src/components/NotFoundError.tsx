import { Button } from './ui/Button';

import { AppLink } from './router/AppLink';

type NotFoundErrorProps = {
  title?: string;
};

export default function NotFoundError({ title }: NotFoundErrorProps) {
  return (
    <div className='flex flex-col items-center gap-4'>
      <h3 className='text-3xl font-medium'>{title ? title : 'Not Found'}</h3>
      <Button>
        <AppLink to='/'>Back Home</AppLink>
      </Button>
    </div>
  );
}
