import NotFoundError from '@components/NotFoundError';

export function NotFoundPage() {
  return (
    <div className='flex flex-1 justify-center items-center mb-16 p-6'>
      <NotFoundError />
    </div>
  );
}
