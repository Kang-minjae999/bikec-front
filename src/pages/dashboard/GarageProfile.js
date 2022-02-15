import { useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Tab, Box, Card, Tabs, Container, Stack, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userAbout, _userFeeds, _userGallery } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileAbout,
  ProfileSocialInfo,
  ProfileGallery,
} from '../../sections/@dashboard/garage/profile';


// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { name = '' } = useParams();

  const [currentTab, setCurrentTab] = useState('profile');

  const handleChangeTab = (newValue) => {
    setCurrentTab(newValue);
  };

  const PROFILE_TABS = [
    {
      label: '프로필',
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile myProfile={_userAbout} posts={_userFeeds}/>,
    },
    {
      label: '갤러리',
      value: 'gallery',
      icon: <Iconify icon={'ic:round-perm-media'} width={20} height={20} />,
      component: <ProfileGallery gallery={_userGallery} />,
    },
  ];

  return (
    <Page title="정비소">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="Profile"
          links={[
            { name: '홈', href: PATH_DASHBOARD.root },
            { name: '정비소', href: PATH_DASHBOARD.garage.root },
            { name: name || '' },
          ]}
        />
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card
          sx={{
            mb: 3,
            height: 600,
            Width: 800,
            position: 'relative',
          }}
        >
          
          <ProfileCover myProfile={_userAbout} name={name} />

          <TabsWrapperStyle>
            <Tabs
              value={currentTab}
              scrollButtons="auto"
              variant="scrollable"
              allowScrollButtonsMobile
              onChange={(e, value) => handleChangeTab(value)}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card
          sx={{
            mb: 3,
            height: 600,
            Width: 300,
            position: 'relative',
          }}
        >
          <ProfileAbout profile={_userAbout}/><br/>
          <ProfileSocialInfo profile={_userAbout}/>
        </Card>
        </Grid> 
      </Grid>  


        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
