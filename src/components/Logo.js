import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import TwoWheelerIcon from '@mui/icons-material/TwoWheeler';
// @mui
import { Box,Link } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default function Logo({ disabledLink = false, sx }) {

  const logo = (
    <Box sx={{ width: 30, height: 30, ...sx }}>
    <TwoWheelerIcon  fontSize = 'large' color='primary'/>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <Link component={RouterLink} to="/dashboard/app" underline="none">{logo}</Link>;
}
