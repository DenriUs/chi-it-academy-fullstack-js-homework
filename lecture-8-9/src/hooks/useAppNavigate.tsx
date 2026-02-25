import { useNavigate } from 'react-router';
import type { NavigateOptions } from 'react-router';

import type { AppRoutePath, AppRoutePathParams, AppRouteSearchParams } from '@/router/types';
import { serializePathParams } from '@lib/path-params/path-params.helpers';
import { serializeSearchParams } from '@lib/search-params/search-params.helpers';

type AppNavigateConfig<T extends AppRoutePath> = AppRoutePathParams<T> &
  AppRouteSearchParams<T> & {
    options?: NavigateOptions;
  };

export function useAppNavigate() {
  const navigate = useNavigate();

  return <T extends AppRoutePath>(to: T, config?: AppNavigateConfig<T>) => {
    let pathname = to as string;
    if (config?.params) {
      pathname = serializePathParams(pathname, config.params);
    }
    return navigate(
      { pathname, ...(config?.search && { search: serializeSearchParams(config?.search) }) },
      config?.options,
    );
  };
}
