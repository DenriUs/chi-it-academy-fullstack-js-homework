import { useMemo } from 'react';
import { configResponsive, useResponsive } from 'ahooks';

configResponsive({ md: 900 });

const useIsMobile = () => {
  const responsive = useResponsive();

  const isMobile = useMemo(() => !responsive.md, [responsive.md]);

  return isMobile;
};

export default useIsMobile;
