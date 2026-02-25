import { useEffect } from 'react';
import { useNavigation } from 'react-router';

type AppNavigationOptions = {
  onNavigated?: () => void;
};

export function useAppNavigation(options?: AppNavigationOptions) {
  const onNavigated = options?.onNavigated;

  const navigation = useNavigation();

  const isNavigating = navigation.state !== 'idle';

  useEffect(() => {
    if (!isNavigating) {
      onNavigated?.();
    }
  }, [isNavigating, onNavigated]);

  return { ...navigation, isNavigating };
}
