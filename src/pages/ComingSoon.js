// @mui
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Button, Stack, Container, Typography, InputAdornment } from '@mui/material';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
// hooks
import useCountdown from '../hooks/useCountdown';
// components
import Page from '../components/Page';
import InputStyle from '../components/InputStyle';
// assets
import { PATH_PAGE } from '../routes/paths';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const CountdownStyle = styled('div')({
  display: 'flex',
  justifyContent: 'center',
});

const SeparatorStyle = styled(Typography)(({ theme }) => ({
  margin: theme.spacing(0, 1),
  [theme.breakpoints.up('sm')]: {
    margin: theme.spacing(0, 2.5),
  },
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  const countdown = useCountdown(new Date('08/08/2022 21:30'));

  return (
    <Page title="Coming Soon" sx={{ height: 1 }}>
      <RootStyle>
        <Container>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <Typography variant="h3" paragraph>
              조금만 기다려주세요!
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>배기음과 함께 열심히 달려가고 있어요! </Typography>
            
            <Stack alignItems="center">
            <TwoWheelerIcon fontSize = 'large' color='primary' sx={{ my: 10, height: 50 }} />
            <Button 
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_PAGE.home}
                startIcon={<TwoWheelerIcon/>}
              >
                돌아가기
              </Button>

            </Stack>
            <br/><br/><br/>

            <CountdownStyle>
              <div>
                <Typography variant="h2">{countdown.days}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>일</Typography>
              </div>

              <SeparatorStyle variant="h2">:</SeparatorStyle>

              <div>
                <Typography variant="h2">{countdown.hours}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>시</Typography>
              </div>

              <SeparatorStyle variant="h2">:</SeparatorStyle>

              <div>
                <Typography variant="h2">{countdown.minutes}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>분</Typography>
              </div>

              <SeparatorStyle variant="h2">:</SeparatorStyle>

              <div>
                <Typography variant="h2">{countdown.seconds}</Typography>
                <Typography sx={{ color: 'text.secondary' }}>초</Typography>
              </div>
            </CountdownStyle>

            <InputStyle
              fullWidth
              placeholder="알림을 받고 싶으면 메일주소를 적어주세요!"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button variant="contained" size="large">
                      메일받기
                    </Button>
                  </InputAdornment>
                ),
              }}
              sx={{ my: 5, '& .MuiOutlinedInput-root': { pr: 0.5 } }}
            />
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
