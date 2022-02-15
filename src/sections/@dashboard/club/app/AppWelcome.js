import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '../../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  name: PropTypes.string,
};

export default function AppWelcome({ name }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 0 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
        <Typography gutterBottom variant="h5">
         <strong>{!name ? '...' : name}<br/> 다음 라이딩</strong>
        </Typography>

        <Typography variant="body1" sx={{ pb: { xs: 3, xl: 5 }, maxWidth: 480, mx: 'auto' }}>
        {!name ? '...' : name}는   <br />
        2022년 02월 04일 18시에   <br />   
        라이딩이 예정되어 있어요!    <br />
        참석하시겠어요?
        </Typography>

        <Button variant="contained" to="/dashboard/blog/posts" component={RouterLink}>
          참석하기
        </Button>
      </CardContent>
    </RootStyle>
  );
}
