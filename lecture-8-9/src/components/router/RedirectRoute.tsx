import type { PropsWithChildren } from 'react';

import type { AppRoutePath } from '@/router/types';

import { AppNavigate } from './AppNavigate';

export type RedirectRouteProps = PropsWithChildren & {
  redirectPath: AppRoutePath;
  shouldRedirect: boolean;
};

export function RedirectRoute({ redirectPath, shouldRedirect, children }: RedirectRouteProps) {
  if (shouldRedirect) {
    return <AppNavigate to={redirectPath} replace />;
  }

  return children;
}
