import { useLocation } from 'react-router';

import { APP_ROUTES, APP_ROUTE_NAMES } from '@/router/constants';

const getTitle = (pathname: string) => {
  for (const [key, value] of Object.entries(APP_ROUTE_NAMES)) {
    if (pathname === APP_ROUTES.home || (key !== APP_ROUTES.home && pathname.startsWith(key))) {
      return value;
    }
  }
  return '';
};

export function ControlBarTitle() {
  const location = useLocation();

  const title = getTitle(location.pathname);

  return title ? <h1 className='shrink-0 text-2xl font-medium'>{title}</h1> : null;
}
