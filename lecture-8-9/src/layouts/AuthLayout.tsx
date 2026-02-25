import { Outlet } from 'react-router';

export function AuthLayout() {
  return (
    <main className='flex w-full min-h-svh items-center justify-center'>
      <Outlet />
    </main>
  );
}
