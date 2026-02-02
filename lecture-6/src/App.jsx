import { BrowserRouter } from 'react-router';

import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';

import { ThemeProvider } from '@providers/ThemeProvider';

import AppRoutes from './routes';

function App() {
  return (
    <ThemeProvider>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            colorScheme: 'light',

            '--sidebar-width': '280px',
            '--hero-sidebar-width': '450px',
            '--hero-image-width': '400px',

            '--primary': 'rgba(0, 0, 0, 0.87)',
            '--icon': 'rgba(0, 0, 0, 0.54)',
            '--hover': 'rgba(0, 0, 0, 0.04)',
            '--selected': 'rgba(25, 118, 210, 0.08)',
            '--focus-selected': 'rgba(25, 118, 210, 0.2)',
            '--focus': 'rgba(0, 0, 0, 0.12)',
            '--outline': 'rgb(25, 118, 210)',
            '--disabled': 'rgba(0, 0, 0, 0.26)',
            '--background': 'rgb(255, 255, 255)',
            '--divider': 'rgba(0, 0, 0, 0.12)',
          },
          '.dark': {
            colorScheme: 'dark',

            '--primary': 'rgb(255, 255, 255)',
            '--icon': 'rgb(255, 255, 255)',
            '--hover': 'rgba(139, 139, 139, 0.25)',
            '--selected': 'rgba(139, 139, 139, 0.19)',
            '--focus-selected': 'rgb(84, 84, 84)',
            '--focus': 'rgb(84, 84, 84)',
            '--outline': 'rgb(255, 255, 255)',
            '--disabled': 'rgba(255, 255, 255, 0.26)',
            '--background': 'rgb(10, 10, 10)',
            '--divider': 'rgba(255, 255, 255, 0.12)',
          },
          '#root': {
            height: '100dvh',
          },
          '.dark body': {
            backgroundColor: 'var(--background)',
          },
        }}
      />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
