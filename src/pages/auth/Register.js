import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link, Container, Typography, Tooltip, Stack } from '@mui/material';
import SportsMotorsportsTwoToneIcon from '@mui/icons-material/SportsMotorsportsTwoTone';
// hooks
import useAuth from '../../hooks/useAuth';
import useResponsive from '../../hooks/useResponsive';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import Logo from '../../components/Logo';
// sections
import { RegisterForm } from '../../sections/auth/register';
import Label from '../../components/Label';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Register() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  return (
    <Page title="회원가입">
      <RootStyle>
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
          {smUp && (
            <Typography variant="body2" sx={{ mt: { md: -2 } }}>
              이미 계정이 있으신가요?{' '}
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
                로그인
              </Link>
            </Typography>
          )}
        </HeaderStyle>


        <Container>
          <ContentStyle>
            <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  회원가입
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>이름, 아이디, 비밀번호를 입력해주세요.</Typography>
              </Box>
              <Tooltip title={capitalCase(method)}>
                <>
                <SportsMotorsportsTwoToneIcon
                    color = "primary"
                    sx={{ width: 40, height: 40 }}
                  />
                </>
              </Tooltip>
            </Box>

            <RegisterForm />

            {!smUp && (
              <Typography variant="body2" sx={{ mt: 3, textAlign: 'center' }}>
                이미 계정이 있으신가요?{' '}
                <Link variant="subtitle2" to={PATH_AUTH.login} component={RouterLink}>
                  로그인
                </Link>
              </Typography>
            )}
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}


/*  \

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
}));


  const mdUp = useResponsive('up', 'md');



{mdUp && (
          <SectionStyle>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              라이더타운과 함께 <br/>라이딩에 빠져보아요.
            </Typography>
            <Image
              alt="register"
              src="http://www.ridemag.co.kr/news/photo/201911/14159_88631_5447.jpg"
            />
          </SectionStyle>
        )}
*/ 