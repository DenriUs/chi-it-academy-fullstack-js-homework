import { useNavigate } from 'react-router';

import Stack from '@mui/material/Stack';

import { AppRoutePathnames } from '@config/constants';

import Button from '@components/ui/Button';
import Typography from '@components/ui/Typography';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 1,
        height: 1,
        gap: 3,
      }}
    >
      <Typography variant='h3' sx={{ fontWeight: 400 }}>
        Not Found
      </Typography>
      <Button variant='contained' onClick={() => navigate(AppRoutePathnames.HOME)} disableElevation>
        Back Home
      </Button>
    </Stack>
  );
}
