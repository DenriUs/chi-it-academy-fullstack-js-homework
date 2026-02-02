import { useLocation, useNavigate } from 'react-router';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import EmojiPeopleRoundedIcon from '@mui/icons-material/EmojiPeopleRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';

import { AppRoutePathnames, AppRouteNames } from '@config/constants';

import useIsMobile from '@hooks/useIsMobile';

import Drawer from '@components/ui/Drawer';
import Divider from '@components/ui/Divider';
import IconButton from '@components/ui/IconButton';
import ListItemButton from '@components/ui/ListItemButton';
import ListItemIcon from '@components/ui/ListItemIcon';

type NavigationItem = {
  title: string;
  pathname: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

const navItems: NavigationItem[] = [
  {
    title: AppRouteNames[AppRoutePathnames.HOME]!,
    pathname: AppRoutePathnames.HOME,
    icon: HomeRoundedIcon,
  },
  {
    title: AppRouteNames[AppRoutePathnames.HEROES]!,
    pathname: AppRoutePathnames.HEROES,
    icon: EmojiPeopleRoundedIcon,
  },
  {
    title: AppRouteNames[AppRoutePathnames.ABOUT]!,
    pathname: AppRoutePathnames.ABOUT,
    icon: InfoRoundedIcon,
  },
];

interface NavigationSidebarProps {
  isMobileOpened: boolean;
  onMobileClose: () => void;
}

const NavigationSidebar = ({ isMobileOpened, onMobileClose }: NavigationSidebarProps) => {
  const location = useLocation();

  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const handleNavigationButtonClick = (pathname: string) => {
    if (isMobile) {
      onMobileClose();
    }
    navigate(pathname);
  };

  return (
    <Box component='nav'>
      <Drawer
        open={isMobileOpened}
        onClose={onMobileClose}
        variant={isMobile ? 'temporary' : 'permanent'}
        sx={{
          width: { xs: 1, sm: 'var(--sidebar-width)' },
          flexShrink: 0,
          boxSizing: 'border-box',
          mt: 10,
          '& .MuiDrawer-paper': {
            width: { xs: 1, sm: 'var(--sidebar-width)' },
            boxSizing: 'border-box',
          },
        }}
      >
        <Toolbar>
          {isMobile && (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: 1 }}>
              <IconButton onClick={onMobileClose}>
                <ArrowBackRoundedIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
        <Divider />
        <List>
          {navItems.map((navItem) => (
            <ListItem key={navItem.title} disablePadding>
              <ListItemButton
                onClick={() => handleNavigationButtonClick(navItem.pathname)}
                selected={location.pathname.startsWith(navItem.pathname)}
              >
                <ListItemIcon>
                  <navItem.icon />
                </ListItemIcon>
                <ListItemText primary={<>{navItem.title}</>} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default NavigationSidebar;
