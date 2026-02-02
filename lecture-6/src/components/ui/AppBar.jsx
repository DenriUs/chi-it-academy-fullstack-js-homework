import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

const AppBar = styled(MuiAppBar)(() => ({
  '--AppBar-color': 'var(--primary)',
  '--AppBar-background': 'var(--background)',
}));

export default AppBar;
