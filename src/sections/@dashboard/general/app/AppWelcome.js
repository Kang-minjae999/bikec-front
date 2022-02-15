import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled ,alpha} from '@mui/material/styles';
import { Typography, Button, Card, CardContent, Box, Stack, Container } from '@mui/material';
import Image from '../../../../components/Image';
import { SeoIllustration } from '../../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const OverlayStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,
  objectFit: 'cover',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

const HeroOverlayStyle = styled(m.img)({
  zIndex: 1,
});

const ContentStyle = styled((props) => <Stack spacing={5} {...props} />)(({ theme }) => ({
  zIndex: 10,
  maxWidth: 520,
  margin: 'auto',
  textAlign: 'center',
  position: 'relative',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(1),
  [theme.breakpoints.up('md')]: {
    margin: 'unset',
    textAlign: 'left',
  },
}));


// ----------------------------------------------------------------------


export default function AppWelcome() {
  return (      
       <Image
          alt="overlay"
          src='/Mainback.jpeg'
          ratio='16/9'
        />
  );
}
