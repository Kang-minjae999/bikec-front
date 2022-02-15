// @mui
import { Box, Skeleton, Grid } from '@mui/material';

// ----------------------------------------------------------------------

export default function SkeletonboardItem() {
  return (
    <Grid item xs={12} sm={12} md={12}>
      <Skeleton variant="rectangular" width="100%" sx={{ height: 100, borderRadius: 2 }} />
      <Box sx={{ display: 'flex', mt: 1.5 }}>
        <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
        <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
      </Box>
    </Grid>
  );
}
