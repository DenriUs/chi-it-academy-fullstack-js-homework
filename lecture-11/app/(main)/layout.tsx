import { ControlBar } from '@/components/ControlBar';
import { NewPostNotificationListener } from '@/components/NewPostNotificationListener';

export type MainLayoutProps = Readonly<{ children: React.ReactNode }>;

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex flex-col items-center w-full min-h-svh'>
      <ControlBar />
      <main className='flex flex-col max-w-480 w-full min-h-[calc(100vh-4rem)] mt-16'>
        <NewPostNotificationListener />
        {children}
      </main>
    </div>
  );
}
