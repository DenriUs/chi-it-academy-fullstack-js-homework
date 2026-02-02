import MuiDrawer from '@mui/material/Drawer';
import { styled } from '@mui/material/styles';

const Drawer = styled(MuiDrawer)(() => ({
  '& .MuiDrawer-paper': {
    color: 'var(--primary)',
    backgroundColor: 'var(--background)',
    borderColor: 'var(--divider)',
  },
}));

export default Drawer;
