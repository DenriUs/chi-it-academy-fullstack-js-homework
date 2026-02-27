'use client';

import { PropsWithChildren, useEffect } from 'react';

import { getCurrentUserApiThunk } from '@/store/slices/user.slice';

import { useAppDispatch } from '@/hooks/store/useAppDispatch';

type UserStateInitializerProps = PropsWithChildren;

export function UserStateInitializer({ children }: UserStateInitializerProps) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUserApiThunk());
  }, [dispatch]);

  return children;
}
