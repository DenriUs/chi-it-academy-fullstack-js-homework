import Box from '@mui/material/Box';

import Typography from '@components/ui/Typography';

export default function AboutPage() {
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 1, height: 1 }}
    >
      <Typography variant='h3' sx={{ fontWeight: 400 }}>
        About Page
      </Typography>
    </Box>
  );
}
