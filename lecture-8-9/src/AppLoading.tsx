import { Spinner } from '@components/ui/Spinner';

export function AppLoading() {
  return (
    <div className='flex w-full h-screen justify-center items-center'>
      <Spinner className='size-10' />
    </div>
  );
}
