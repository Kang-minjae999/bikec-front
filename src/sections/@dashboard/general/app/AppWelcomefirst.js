import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { common } from '@mui/material/colors';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Button, Card, CardContent, Link, Box } from '@mui/material';
import { SeoIllustration } from '../../../../assets';
import { AppWelcomesecond } from '.';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.main,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

// ----------------------------------------------------------------------
export default function AppWelcome() {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: { md: 3 },
          pl: { md: 5 },
          color: 'grey.800',
        }}
      >
      <Typography variant="h1" sx={{ color: 'common.white' }}>
       RIDER TOWN  
        <Typography component="span" variant="h2" sx={{ color: 'common.white' }}>
        &nbsp; 라이더 타운                
       <Typography variant="overline" sx={{ color: 'common.white' }}>
       &nbsp;WELCOME
       </Typography>
       </Typography>
       </Typography><br/>
      </CardContent>

    </RootStyle>
  );
}
