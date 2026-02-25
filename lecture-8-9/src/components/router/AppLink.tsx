import { Link, type LinkProps } from 'react-router';

import { serializePathParams } from '@lib/path-params/path-params.helpers';
import { serializeSearchParams } from '@lib/search-params/search-params.helpers';
import type { AppRoutePath, AppRoutePathParams, AppRouteSearchParams } from '@/router/types';

export type AppLinkProps<T extends AppRoutePath> = Omit<LinkProps, 'to'> &
  AppRoutePathParams<T> &
  AppRouteSearchParams<T> & {
    to: T;
  };

export function AppLink<T extends AppRoutePath>({ to, params, search, ...props }: AppLinkProps<T>) {
  let pathname = to as string;
  if (params) {
    pathname = serializePathParams(pathname, params);
  }

  return (
    <Link to={{ pathname, ...(search && { search: serializeSearchParams(search) }) }} {...props} />
  );
}
