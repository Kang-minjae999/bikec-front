// @mui
import { Box, Container, Typography, Grid } from '@mui/material';
// components
import Image from '../../components/Image';
import { MotionInView, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

export default function AboutVision() {
  return (
    <Container sx={{ mt: 10 }}>
      <Box
        sx={{
          mb: 10,
          position: 'relative',
          borderRadius: 2,
          overflow: 'hidden',
        }}
      >
        <Image
          src="https://cdn.wadiz.kr/ft/images/green001/2020/0630/20200630163145474_70.jpg/wadiz/format/jpg/quality/80/optimize"
          alt="about-vision"
          effect="black-and-white"
        />

        <Box
          sx={{
            bottom: { xs: 24, md: 80 },
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            position: 'absolute',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4" color='common.white'sx={{ textAlign: 'center' }}>RIDERTOWN</Typography>
        </Box>
      </Box>

      <Grid container justifyContent="center">
        <Grid item xs={12} sm={8}>
          <MotionInView variants={varFade().inUp}>
            <Typography variant="h4" sx={{ textAlign: 'center' }}>
              라이더타운은 성숙한 라이딩 문화를 응원합니다!
            </Typography>
          </MotionInView>
        </Grid>
      </Grid>
    </Container>
  );
}
