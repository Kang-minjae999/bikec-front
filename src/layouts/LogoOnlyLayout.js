import { Outlet } from 'react-router-dom';
// @mui
import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import Label from '../components/Label';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
      <Stack 
        direction="row"
        justifyContent="flex-start"
        alignItems="center" 
        spacing={1}>
        <Logo sx={{ mb: 0.5 }}/>
          <Label 
          sx={{ mt: 0.5 }}
          color="primary" 
          variant = 'filled'>
            RIDERTOWN
          </Label>
        </Stack>
      </HeaderStyle>
      <Outlet />
    </>
  );
}
