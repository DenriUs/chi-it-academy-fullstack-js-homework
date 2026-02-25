import { Navigate } from 'react-router';
import type { NavigateProps } from 'react-router';

import { serializePathParams } from '@lib/path-params/path-params.helpers';
import { serializeSearchParams } from '@lib/search-params/search-params.helpers';
import type { AppRoutePath, AppRoutePathParams, AppRouteSearchParams } from '@/router/types';

export type AppNavigateProps<T extends AppRoutePath> = Omit<NavigateProps, 'to'> &
  AppRoutePathParams<T> &
  AppRouteSearchParams<T> & {
    to: T;
  };

export function AppNavigate<T extends AppRoutePath>({
  to,
  params,
  search,
  ...props
}: AppNavigateProps<T>) {
  let pathname = to as string;
  if (params) {
    pathname = serializePathParams(pathname, params);
  }

  return (
    <Navigate
      to={{ pathname, ...(search && { search: serializeSearchParams(search) }) }}
      {...props}
    />
  );
}
