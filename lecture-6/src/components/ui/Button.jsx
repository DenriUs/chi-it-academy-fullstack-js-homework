import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const Button = styled(MuiButton)(() => ({
  color: 'var(--background)',
  backgroundColor: 'var(--primary)',
}));

export default Button;
