import { LogOutIcon } from 'lucide-react';

import { queryClient } from '@lib/query/query.client';
import { logout } from '@/store/slices/user.slice';

import { useAppDispatch } from '@hooks/useAppDispatch';
import { useAppNavigate } from '@hooks/useAppNavigate';

import { Button } from '@components/ui/Button';

export function ControlBarLogoutButton() {
  const dispatch = useAppDispatch();

  const navigate = useAppNavigate();

  const handleLogoutClick = async () => {
    dispatch(logout());
    queryClient.clear();
    navigate('/login');
  };

  return (
    <Button variant='ghost' asChild>
      <Button variant='ghost' size='icon' onClick={handleLogoutClick}>
        <LogOutIcon />
      </Button>
    </Button>
  );
}
