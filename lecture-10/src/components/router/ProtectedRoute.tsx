import type { PropsWithChildren } from 'react';
import { RedirectRoute, type RedirectRouteProps } from './RedirectRoute';
import { useAppSelector } from '@hooks/useAppSelector';

type ProtectedRouteProps = PropsWithChildren & Partial<RedirectRouteProps>;

export function ProtectedRoute({
  children,
  redirectPath = '/login',
  shouldRedirect,
}: ProtectedRouteProps) {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  return (
    <RedirectRoute redirectPath={redirectPath} shouldRedirect={shouldRedirect ?? !isAuthorized}>
      {children}
    </RedirectRoute>
  );
}
