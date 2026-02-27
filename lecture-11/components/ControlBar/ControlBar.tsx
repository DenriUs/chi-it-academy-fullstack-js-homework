'use client';

import { useSelector } from 'react-redux';
import Link from 'next/link';
import { PlusIcon } from 'lucide-react';

import type { RootState } from '@/store/store';

import { Button } from '@/components/ui/Button';

import { UserAvatar } from '@/components/UserAvatar';

import { ControlBarTitle } from './ControlBarTitle';
import { ControlBarLogoutButton } from './ControlBarLogoutButton';

export function ControlBar() {
  const { isAuthorized, username } = useSelector((state: RootState) => state.user);

  return (
    <header className='fixed flex w-full h-16 shrink-0 items-center gap-8 border-b px-8 z-9999 bg-background'>
      <ControlBarTitle />
      <div className='flex justify-between items-center w-full'>
        {isAuthorized && username ? (
          <>
            <ControlBarPostActions />
            <div className='flex items-center gap-3'>
              <ControlBarUserSection username={username} />
              <ControlBarLogoutButton />
            </div>
          </>
        ) : (
          <div className='flex w-full justify-end'>
            <ControlBarLoginButton />
          </div>
        )}
      </div>
    </header>
  );
}

function ControlBarPostActions() {
  return (
    <div className='flex gap-2'>
      <ControlBarNewPostButton />
      <ControlBarMyPostsButton />
    </div>
  );
}

function ControlBarMyPostsButton() {
  return (
    <Button variant='outline' asChild>
      <Link href='/my-posts'>My Posts</Link>
    </Button>
  );
}

function ControlBarNewPostButton() {
  return (
    <Button asChild>
      <Link href='/post'>
        <PlusIcon /> New Post
      </Link>
    </Button>
  );
}

type ControlBarUserSectionProps = {
  username: string;
};

function ControlBarUserSection({ username }: ControlBarUserSectionProps) {
  return (
    <div className='flex items-center gap-3'>
      <UserAvatar username={username} />
      <span className='font-medium'>{username}</span>
    </div>
  );
}

function ControlBarLoginButton() {
  return (
    <Button variant='outline' asChild>
      <Link href='/login'>Login</Link>
    </Button>
  );
}
