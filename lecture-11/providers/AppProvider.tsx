import { PropsWithChildren } from 'react';

import { StoreProvider } from '@/providers/StoreProvider';
import { QueryClientProvider } from '@/providers/QueryClientProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';

import { AuthRouteGuard } from '@/components/AuthRouteGuard';

import { UserStateInitializer } from '@/components/state/UserStateInitializer';

type AppProviderProps = PropsWithChildren;

export function AppProvider({ children }: AppProviderProps) {
  return (
    <StoreProvider>
      <QueryClientProvider>
        <UserStateInitializer>
          <AuthRouteGuard>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </AuthRouteGuard>
        </UserStateInitializer>
      </QueryClientProvider>
    </StoreProvider>
  );
}
