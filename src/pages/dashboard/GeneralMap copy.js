/* global kakao */
import { React , useEffect, useState } from 'react';
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
  Appmapcard,
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
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../routes/paths';



// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  const [open, setopen] = useState(false);
  const Location =()=>{
    useEffect(()=>{
          const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
          const imageSize = new kakao.maps.Size(64, 69);
          const imageOption = {offset: new kakao.maps.Point(27, 69)}; 
          const container = document.getElementById('mapview');
          const options = {
            center: new kakao.maps.LatLng(37.37181890649,126.93344241297),
          };
          const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

          // 윈도우
          const iwContent = '<div><Appmapcard/>아니이거 왜안돼<div/>';
          const iwRemoveable = true; 
          const infowindow = new kakao.maps.InfoWindow({
            content : iwContent,
            removable : iwRemoveable
          }); 

          const mapview = new kakao.maps.Map(container, options);
          const markerPosition  = new kakao.maps.LatLng(37.37181890649, 126.93344241297); 
          const marker = new kakao.maps.Marker({
            map : mapview,
            position: markerPosition,
            image: markerImage,
          });


        

        marker.setMap(mapview)

        kakao.maps.event.addListener(marker, 'click', () => {
          infowindow.open(mapview, marker);  
        });


        kakao.maps.event.addListener(mapview, 'click', () => {
          infowindow.close(mapview, marker);  
        });

        

        


        },[]);

      return (
          <div>
            <div id="mapview" style={{height:"70vh"}}>  </div> 
            {setopen ? <Appmapcard/> : ''}
          </div>
      )
  }
  

  return (
    <Page title="General: App">
      <Container maxWidth={themeStretch ? false : 'xl'}>
      <HeaderBreadcrumbs
          heading="라이딩 명소"
          links={[
            { name: '홈', href: PATH_DASHBOARD.general.app },
            { name: '라이딩 명소', href: PATH_DASHBOARD.general.app },
            { name: '지도' },
          ]}
        />
        <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
         <Location/>
            </Grid>
        </Grid>
      </Container>
    </Page>
  );
}



