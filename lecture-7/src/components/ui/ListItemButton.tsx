import MuiListItemButton from '@mui/material/ListItemButton';
import { styled } from '@mui/material/styles';

const ListItemButton = styled(MuiListItemButton)(() => ({
  '&:hover': {
    backgroundColor: 'var(--hover)',
  },
  '&.Mui-selected': {
    backgroundColor: 'var(--selected)',
    '&.Mui-focusVisible': {
      backgroundColor: 'var(--focus-selected)',
    },
  },
  '&.Mui-selected:hover': {
    backgroundColor: 'var(--selected)',
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'var(--focus)',
  },
}));

export default ListItemButton;
