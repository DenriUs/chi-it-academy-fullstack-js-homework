import { useState, useRef, useMemo } from 'react';
import { useLocation } from 'react-router';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

import { AppRouteNames, AppRoutePathnames } from '@config/constants';

import useTheme from '@hooks/useTheme';

import IconButton from './ui/IconButton';
import CustomAppBar from './ui/AppBar';

interface AppBarProps {
  onMobileSidebarOpen: () => void;
}

const AppBar = ({ onMobileSidebarOpen }: AppBarProps) => {
  const themeMenuAnchorRef = useRef(null);

  const { theme, setTheme } = useTheme();

  const location = useLocation();

  const isHeroSidebarOpened = useMemo(() => {
    const pathSegments = location.pathname.split('/');
    return location.pathname.startsWith(AppRoutePathnames.HEROES) && pathSegments.length > 2;
  }, [location.pathname]);

  const handleThemeToggleClick = () => {
    const isPrevThemeDark = theme === 'dark';
    setTheme(isPrevThemeDark ? 'light' : 'dark');
  };

  return (
    <CustomAppBar
      position='fixed'
      elevation={0}
      sx={{
        width: {
          sm: 1,
          md: `calc(100% - var(--sidebar-width) - ${isHeroSidebarOpened ? '(var(--hero-sidebar-width) / 1.3)' : '0px'})`,
          lg: `calc(100% - var(--sidebar-width) - ${isHeroSidebarOpened ? 'var(--hero-sidebar-width)' : '0px'})`,
        },
        borderBottom: 1,
        borderColor: 'var(--divider)',
        ...(isHeroSidebarOpened && {
          mr: {
            sm: 0,
            md: 'calc(var(--hero-sidebar-width) / 1.3)',
            lg: 'var(--hero-sidebar-width)',
          },
        }),
      }}
    >
      <Toolbar>
        <IconButton
          size='large'
          edge='start'
          aria-label='menu'
          onClick={onMobileSidebarOpen}
          sx={{ display: { md: 'none' }, mr: 2 }}
        >
          <MenuRoundedIcon />
        </IconButton>
        <Typography variant='h6' component='h1' sx={{ flexGrow: 1 }}>
          {AppRouteNames[`/${location.pathname.split('/')[1]}` as AppRoutePathnames]}
        </Typography>
        <IconButton ref={themeMenuAnchorRef} onClick={handleThemeToggleClick}>
          {theme === 'dark' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
        </IconButton>
      </Toolbar>
    </CustomAppBar>
  );
};

export default AppBar;
