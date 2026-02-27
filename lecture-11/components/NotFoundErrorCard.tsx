import { CircleXIcon } from 'lucide-react';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';

type NotFoundErrorCardProps = {
  title: string;
  onRetry: () => void;
};

export function NotFoundErrorCard({ title, onRetry }: NotFoundErrorCardProps) {
  return (
    <div className='flex flex-col flex-1 justify-center items-center max-w-480 w-full p-6 mb-16'>
      <Card className='max-w-60 w-full'>
        <CardHeader className='place-items-center'>
          <div className='flex justify-center items-center size-10 rounded-md mb-2 bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive'>
            <CircleXIcon className='size-8' />
          </div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>User with given id was not found</CardDescription>
        </CardHeader>
        <CardFooter className='justify-center'>
          <Button onClick={onRetry} className='flex-1'>
            Back Home
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
