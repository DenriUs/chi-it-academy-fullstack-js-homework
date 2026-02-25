import type { PropsWithChildren } from 'react';
import { RedirectRoute, type RedirectRouteProps } from './RedirectRoute';
import { useAppSelector } from '@hooks/useAppSelector';

type PublicRouteProps = PropsWithChildren & Partial<RedirectRouteProps>;

export function PublicRoute({ children, redirectPath = '/', shouldRedirect }: PublicRouteProps) {
  const isAuthorized = useAppSelector((state) => state.user.isAuthorized);

  return (
    <RedirectRoute redirectPath={redirectPath} shouldRedirect={shouldRedirect ?? isAuthorized}>
      {children}
    </RedirectRoute>
  );
}
