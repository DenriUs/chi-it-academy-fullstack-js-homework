import { useState, useEffect } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';

import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

import { AppRoutePathnames } from '@config/constants';

import useHero from '@hooks/useHero';
import useIsMobile from '@hooks/useIsMobile';

import Drawer from '@components/ui/Drawer';
import SwipeableDrawer from '@components/ui/SwipeableDrawer';
import Divider from '@components/ui/Divider';
import Skeleton from '@components/ui/Skeleton';
import Typography from '@components/ui/Typography';
import IconButton from '@components/ui/IconButton';

enum StatusColors {
  ALIVE = '#02a810',
  DEAD = '#f50a0a',
  UNKNOWN = '#ababab',
}

type OutletContext = {
  removeHeroRowSelection: () => void;
};

const HeroSidebar = () => {
  const [isMobileOpened, setIsMobileOpened] = useState(false);

  const { heroId } = useParams();

  const { data, loading } = useHero(heroId!);

  const { removeHeroRowSelection } = useOutletContext<OutletContext>();

  const navigate = useNavigate();

  const isMobile = useIsMobile();

  const navigateHeroesPage = () => {
    navigate(AppRoutePathnames.HEROES);
  };

  const handleCloseButtonClick = () => {
    removeHeroRowSelection();
    navigateHeroesPage();
  };

  const handleSwipableDrawerAnimationEnd = () => {
    if (isMobileOpened || !isMobile) return;
    handleCloseButtonClick();
  };

  useEffect(() => {
    setIsMobileOpened(isMobile);
  }, [isMobile]);

  const renderContent = () => (
    <Stack
      sx={{
        gap: 2,
        flexDirection: { sm: 'row', md: 'column' },
        alignItems: { xs: 'center', sm: 'flex-start', md: 'center' },
        p: { xs: 1.5, sm: 2, md: 2, lg: 3 },
        paddingBottom: { xs: 5 },
      }}
    >
      <Box
        sx={{
          width: 1,
          maxWidth: 'var(--hero-image-width)',
          height: 'var(--hero-image-width)',
          flexShrink: 0,
        }}
      >
        {loading ? (
          <Skeleton variant='rectangular' sx={{ width: 1, height: 1, borderRadius: 1 }} />
        ) : (
          <Box
            component='img'
            src={data?.image}
            loading='lazy'
            sx={{ width: 1, height: 1, objectFit: 'cover', borderRadius: 1 }}
          />
        )}
      </Box>
      <Stack sx={{ width: 1, maxWidth: 'var(--hero-image-width)', gap: 5, p: { sm: 1.5, md: 0 } }}>
        <Stack sx={{ gap: 0.25 }}>
          <Typography variant='h4' as='h2'>
            {loading ? (
              <Skeleton variant='rectangular' sx={{ width: 1, borderRadius: 1 }} />
            ) : (
              data?.name
            )}
          </Typography>
          <Stack sx={{ flexDirection: 'row', gap: 1, alignItems: 'center' }}>
            {loading ? (
              <Skeleton variant='rectangular' sx={{ width: 1, borderRadius: 1 }} />
            ) : (
              <>
                <Typography
                  as='span'
                  sx={{
                    display: 'inline-block',
                    width: '0.75rem',
                    height: '0.75rem',
                    borderRadius: '50%',
                    transform: 'translateY(-0.06rem)',
                    backgroundColor:
                      StatusColors[data?.status.toUpperCase() as keyof typeof StatusColors],
                  }}
                />
                <Typography as='span' sx={{ lineHeight: 1 }}>
                  {data?.status}
                </Typography>
              </>
            )}
          </Stack>
        </Stack>
        <Stack>
          <Typography variant='h5' as='p'>
            {loading ? (
              <Skeleton variant='rectangular' sx={{ width: 1, borderRadius: 1 }} />
            ) : (
              <>Origin:</>
            )}
          </Typography>
          <Typography as='span'>
            {loading ? (
              <Skeleton variant='rectangular' sx={{ width: 1, mt: 0.5, borderRadius: 1 }} />
            ) : (
              data?.origin.name
            )}
          </Typography>
        </Stack>
        <Stack>
          <Typography variant='h5' as='p'>
            {loading ? (
              <Skeleton variant='rectangular' sx={{ width: 1, borderRadius: 1 }} />
            ) : (
              <>Location:</>
            )}
          </Typography>
          <Typography as='span'>
            {loading ? (
              <Skeleton variant='rectangular' sx={{ width: 1, mt: 0.5, borderRadius: 1 }} />
            ) : (
              data?.location.name
            )}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );

  return (
    <>
      {!isMobile && (
        <Drawer
          variant='permanent'
          anchor='right'
          sx={{
            width: { md: 'calc(var(--hero-sidebar-width) / 1.3)', lg: 'var(--hero-sidebar-width)' },
            flexShrink: 0,
            boxSizing: 'border-box',
            mt: 10,
            '& .MuiDrawer-paper': {
              width: {
                md: 'calc(var(--hero-sidebar-width) / 1.3)',
                lg: 'var(--hero-sidebar-width)',
              },
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar>
            <IconButton onClick={handleCloseButtonClick}>
              <CloseRoundedIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          {renderContent()}
        </Drawer>
      )}
      <SwipeableDrawer
        open={isMobileOpened}
        onOpen={() => {}}
        anchor='bottom'
        onClose={() => setIsMobileOpened(false)}
        onTransitionEnd={handleSwipableDrawerAnimationEnd}
        keepMounted
        sx={{
          '& .MuiDrawer-paper': {
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          },
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 40 }}>
          <Box sx={{ width: 40, height: 6, backgroundColor: 'var(--icon)', borderRadius: 6 }} />
        </Box>
        <Divider />
        {renderContent()}
      </SwipeableDrawer>
    </>
  );
};

export default HeroSidebar;
