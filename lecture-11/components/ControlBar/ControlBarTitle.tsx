import { APP_ROUTES, APP_ROUTE_NAMES } from '@/navigation/constants';
import { usePathname } from 'next/navigation';

const getTitle = (pathname: string) => {
  for (const [key, value] of Object.entries(APP_ROUTE_NAMES)) {
    if (pathname === APP_ROUTES.home || (key !== APP_ROUTES.home && pathname.startsWith(key))) {
      return value;
    }
  }
  return typeof parseInt(pathname.split('/')[1]) === 'number'
    ? APP_ROUTE_NAMES[APP_ROUTES.post]
    : '';
};

export function ControlBarTitle() {
  const pathname = usePathname();

  const title = getTitle(pathname);

  return title ? <h1 className='shrink-0 text-2xl font-medium'>{title}</h1> : null;
}
