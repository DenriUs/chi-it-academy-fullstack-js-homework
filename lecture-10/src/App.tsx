import { useEffect } from 'react';
import { RouterProvider } from 'react-router';

import { getCurrentUserApiThunk } from './store/slices/user.slice';
import { router } from './router/router';

import { useAppSelector } from '@hooks/useAppSelector';
import { useAppDispatch } from '@hooks/useAppDispatch';

import { AppLoading } from './AppLoading';

export default function App() {
  const { isInitialized } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCurrentUserApiThunk());
  }, [dispatch]);

  if (!isInitialized) {
    return <AppLoading />;
  }

  return <RouterProvider router={router} unstable_useTransitions={true} />;
}
