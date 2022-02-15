import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Card, Container, Grid, Stack , Typography } from '@mui/material';
import { sentenceCase } from 'change-case';
import { ChatSidebar , ChatWindow } from '../../sections/@dashboard/chat';
import  {PATH_DASHBOARD}  from '../../routes/paths';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import { useDispatch, useSelector } from '../../redux/store';
import { getProduct } from '../../redux/slices/product';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  Appkakaochat,
  AppFeatured,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/club/app';
import Chat from './Chat';
import Clubcalender from './Clubcalender';

// ----------------------------------------------------------------------
export default function Clubroomhome() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const { product } = useSelector(state => state.product);
  const dispatch = useDispatch();
  
  const { name = '' } = useParams();
  
  
  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);
  
  console.log(product);



  return (
    <Page title="동호회">
      <Container maxWidth={themeStretch ? false : 'xl'}>    
          <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
          <AppNewInvoice />
          </Grid>          
          <Grid item xs={12} md={4}>
            {product && (
          <Appkakaochat name={name} product={product}/>)}
          </Grid>  
          </Grid>
          <br/>

          <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Clubcalender/>
          </Grid>    
          <Grid item xs={12} md={4} >
          <AppTopAuthors /><br/>
          <AppWidget title="참석 예정인 멤버" total={10} icon={'eva:person-fill'} chartData={95} /><br/>
          <AppFeatured /><br/>
          </Grid>  
           </Grid>
          <br/>



          <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentDownload />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppAreaInstalled />
          </Grid>

          <Grid item xs={12} lg={8}>
            <AppNewInvoice />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopRelated />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopInstalledCountries />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTopAuthors />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <AppWidget title="Conversion" total={38566} icon={'eva:person-fill'} chartData={48} />
              <AppWidget title="Applications" total={55566} icon={'eva:email-fill'} color="warning" chartData={75} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
