import { useState } from 'react';
import { Outlet } from 'react-router';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import AppBar from '@components/AppBar';
import NavigationSidebar from '@components/NavigationSidebar';

export default function MainLayout() {
  const [isMobileSidebarOpened, setIsMobileSidebarOpened] = useState(false);

  return (
    <Box
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      }}
    >
      <NavigationSidebar
        isMobileOpened={isMobileSidebarOpened}
        onMobileClose={() => setIsMobileSidebarOpened(false)}
      />
      <AppBar onMobileSidebarOpen={() => setIsMobileSidebarOpened(true)} />
      <Box
        component='main'
        sx={{
          display: 'flex',
          width: 1,
          flexDirection: 'column',
          maxWidth: '1920px',
          minWidth: 0,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
