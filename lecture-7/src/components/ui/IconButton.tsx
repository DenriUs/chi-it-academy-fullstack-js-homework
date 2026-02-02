import MuiIconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';

const IconButton = styled(MuiIconButton)(() => ({
  color: 'var(--icon)',
  '&.Mui-disabled': {
    color: 'var(--disabled)',
  },
}));

export default IconButton;
