// @mui
import { useTheme } from '@mui/material/styles';
import { Box, CardContent, Container, Grid, Link, Stack, Typography, Alert ,Button} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { common } from '@mui/material/colors';
// icons
import StorefrontIcon from '@mui/icons-material/Storefront';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppWelcomefirst,
  AppFeatured,
  AppWelcomesecond,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  Appcompany,
  Apppic,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
            <AppWelcomefirst displayName={user?.displayName} />
            </Grid>
            <Grid item xs={12} md={12}>
            <AppWelcomesecond displayName={user?.displayName} />
            </Grid>

          <Grid item xs={12} md={12}>
            <AppFeatured />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="방문한 라이더들"
              percent={0.2}
              total={4876}
              chartColor={theme.palette.chart.blue[0]}
              chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="어플 다운로드 수"
              percent={-0.1}
              total={678}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <AppWidgetSummary
              title="어플 다운로드 수"
              percent={-0.1}
              total={678}
              chartColor={theme.palette.chart.red[0]}
              chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <AppWelcome displayName={user?.displayName} />
            </Grid> 
          <Grid item xs={12} md={12} lg={12}>
            <Apppic />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Apppic />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Apppic />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Appcompany/>
          </Grid>

        </Grid>
      </Container>
    </Page>
  );
}



