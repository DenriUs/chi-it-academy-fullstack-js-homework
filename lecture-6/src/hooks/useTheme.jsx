import { useContext } from 'react';

import { ThemeContext } from '@providers/ThemeProvider';

const useTheme = () => {
  const values = useContext(ThemeContext);
  if (!values) {
    throw new Error(`useTheme must be used within a ThemeContext.`);
  }
  return values;
};

export default useTheme;
