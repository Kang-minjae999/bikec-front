import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// @mui
import { Container } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProducts } from '../../redux/slices/product';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import UProductNewFormparts from '../../sections/@dashboard/e-commerce/UProductNewFormparts';

// ----------------------------------------------------------------------

export default function EcommerceProductCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { products } = useSelector((state) => state.product);
  const isEdit = pathname.includes('edit');
  const currentProduct = products.find((product) => paramCase(product.name) === name);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Page title="중고거래 / 새 상품 올리기">
      <Container maxWidth={themeStretch ? false : 'lx'}>
        <HeaderBreadcrumbs
          heading={!isEdit ? '상품 올리기' : '상품 수정하기'}
          links={[
            { name: '거래', href: PATH_DASHBOARD.root },
            {
              name: '중고거래',
              href: PATH_DASHBOARD.usedeCommerce.root,
            },
            { name: !isEdit ? '새 상품' : name },
          ]}
        />

        <UProductNewFormparts isEdit={isEdit} currentProduct={currentProduct} />
      </Container>
    </Page>
  );
}
