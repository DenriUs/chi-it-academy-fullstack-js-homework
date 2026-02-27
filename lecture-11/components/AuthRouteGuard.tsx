'use client';

import { ReactNode, useEffect } from 'react';

import { useAppSelector } from '@/hooks/store/useAppSelector';
import { usePathname, useRouter } from 'next/navigation';

const PUBLIC_ROUTE_PATHNAMES = ['/', '/login', '/register'];

const PUBLIC_ROUTE_REDIRECT_PATHNAME = '/login';

const PROTECTED_ROUTE_REDIRECT_PATHNAME = '/';

export function AuthRouteGuard({ children }: { children: ReactNode }) {
  const { isAuthorized, isInitialized } = useAppSelector((state) => state.user);

  const router = useRouter();

  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }
    const isCurrentRoutePublic = PUBLIC_ROUTE_PATHNAMES.includes(pathname);
    if (isInitialized && isAuthorized && isCurrentRoutePublic) {
      router.replace(PROTECTED_ROUTE_REDIRECT_PATHNAME);
    } else if (isInitialized && !isAuthorized && !isCurrentRoutePublic) {
      router.replace(PUBLIC_ROUTE_REDIRECT_PATHNAME);
    }
  }, [isAuthorized, isInitialized, pathname, router]);

  return children;
}
