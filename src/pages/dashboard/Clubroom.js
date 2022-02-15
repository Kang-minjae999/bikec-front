import { capitalCase, sentenceCase } from 'change-case';
import { PropTypes } from 'prop-types';

import { useState, useEffect } from 'react';
// @mui
import { Container, Tab, Box, Tabs, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// _mock_
import { _userPayment, _userAddressBook, _userInvoices, _userAbout } from '../../_mock';
// components
import Page from '../../components/Page';
import Iconify from '../../components/Iconify';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  AccountGeneral,
  AccountBilling,
  AccountSocialLinks,
  AccountNotifications,
  AccountChangePassword,
} from '../../sections/@dashboard/club/account';
import Clubroomhome from './Clubroomhome';
import useAuth from '../../hooks/useAuth';
import Image from '../../components/Image';
import Clubboard from './Clubboard';
import Clubchat from './Clubchat';
import Clubcalender from './Clubcalender';
// ----------------------------------------------------------------------

export default function Clubroom() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { product } = useSelector(state => state.product);
  const dispatch = useDispatch();
  const { name = '' } = useParams();

  
  useEffect(() => {
    dispatch(getProduct(name));
    console.log(name)
  }, [dispatch, name]);


  console.log(product);

  const [currentTab, setCurrentTab] = useState('Home');

  const ACCOUNT_TABS = [
    {
      value: 'Home',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Clubroomhome/>,
    },    {
      value: 'Board',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Clubboard />,
    },
    {
      value: 'Calender',
      icon: <Iconify icon={'eva:share-fill'} width={20} height={20} />,
      component: <Clubcalender />,
    },
    {
      value: 'Chat',
      icon: <Iconify icon={'eva:bell-fill'} width={20} height={20} />,
      component: <Clubchat />,
    },
    {
      value: 'what',
      icon: <Iconify icon={'ic:round-receipt'} width={20} height={20} />,
      component: <AccountBilling cards={_userPayment} addressBook={_userAddressBook} invoices={_userInvoices} />,
    },
    {
      value: 'do i do',
      icon: <Iconify icon={'ic:round-vpn-key'} width={20} height={20} />,
      component: <AccountChangePassword />,
    },
  ];

  return (
    <Page title="프로필">
      <Container maxWidth={themeStretch ? false : 'lx'}>
      <Grid container>    
        <Grid item xs={12} md={9} >
            <Typography variant="h4">{name}</Typography>
            <Typography>{user.displayName}님! {name}에 오신것을 환영합니다! 안라무복하세요!</Typography><br/>
          </Grid>     
          <Grid item xs={12} md={3} >
          <HeaderBreadcrumbs
          heading="CLUB"
          links={[
            { name: '동호회', href: PATH_DASHBOARD.club.root },
          ]}
        />         
        </Grid> 
        </Grid> 
        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => setCurrentTab(value)}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab disableRipple key={tab.value} label={capitalCase(tab.value)} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        <Box sx={{ mb: 2 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
