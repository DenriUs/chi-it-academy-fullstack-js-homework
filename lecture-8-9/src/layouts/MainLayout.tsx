import { Outlet } from 'react-router';

import { ControlBar } from '@components/ControlBar';

export function MainLayout() {
  return (
    <div className='flex flex-col items-center w-full min-h-svh'>
      <ControlBar />
      <main className='flex flex-col max-w-480 w-full min-h-[calc(100vh-4rem)] mt-16'>
        <Outlet />
      </main>
    </div>
  );
}
