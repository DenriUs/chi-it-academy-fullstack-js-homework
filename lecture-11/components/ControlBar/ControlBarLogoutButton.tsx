'use client';

import { LogOutIcon } from 'lucide-react';

import { logout } from '@/store/slices/user.slice';

import { useAppDispatch } from '@/hooks/store/useAppDispatch';

import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';

export function ControlBarLogoutButton() {
  const dispatch = useAppDispatch();

  const router = useRouter();

  const handleLogoutClick = async () => {
    dispatch(logout());
    router.replace('/login');
  };

  return (
    <Button variant='ghost' asChild>
      <Button variant='ghost' size='icon' onClick={handleLogoutClick}>
        <LogOutIcon />
      </Button>
    </Button>
  );
}
