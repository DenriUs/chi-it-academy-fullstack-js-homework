import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';
import { styled } from '@mui/material/styles';

const SwipeableDrawer = styled(MuiSwipeableDrawer)(() => ({
  '& .MuiDrawer-paper': {
    color: 'var(--primary)',
    backgroundColor: 'var(--background)',
    borderColor: 'var(--divider)',
  },
}));

export default SwipeableDrawer;
