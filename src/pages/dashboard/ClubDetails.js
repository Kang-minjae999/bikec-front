import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// @mui
import { Box, Tab, Card, Grid, Divider, Container, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProduct } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import Markdown from '../../components/Markdown';
import { SkeletonProduct } from '../../components/skeleton';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
// sections
import {
  ProductDetailsSummary,
  ProductDetailsCarousel,
} from '../../sections/@dashboard/club/product-details';


// ----------------------------------------------------------------------

export default function ClubDetails() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const [value, setValue] = useState('1');
  const { name = '' } = useParams();
  const { product, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(name));
  }, [dispatch, name]);


  return (
    <Page title="동호회 상세정보">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading="동호회 상세정보"
          links={[
            { name: '동호회', href: PATH_DASHBOARD.club.root },
            {
              name: '상세정보',
              href: PATH_DASHBOARD.club.shop,
            },
            { name: sentenceCase(name) },
          ]}
        />
        
        {error && <Typography variant="h6">동호회를 찾을 수 없어요.</Typography>}

        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7}>
                  <ProductDetailsCarousel product={product} />
                  <Card sx={{ml: 1 , mb:1}} >
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={(e, value) => setValue(value)}>
                    <Tab disableRipple value="1" label="동호회 설명" />
                  </TabList>
                </Box>
                <Divider />
                <TabPanel value="1">
                  <Box sx={{ p: 3 }}>
                    <Markdown children={product.description} />
                  </Box>
                </TabPanel>
              </TabContext>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ProductDetailsSummary
                    product={product}
                  />
                </Grid>
              </Grid>
            </Card>
          </>
        )}

        {!product && <SkeletonProduct />}
      </Container>
    </Page>
  );
}
