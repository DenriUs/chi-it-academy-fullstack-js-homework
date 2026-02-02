import MuiSkeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

const Skeleton = styled(MuiSkeleton)(() => ({
  backgroundColor: 'var(--divider)',
}));

export default Skeleton;
