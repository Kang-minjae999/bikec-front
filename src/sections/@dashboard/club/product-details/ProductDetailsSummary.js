import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// form
import { useForm } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import {  Stack, Button,  Divider,  Typography } from '@mui/material';
import { paramCase } from 'change-case';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// components
import { FormProvider } from '../../../../components/hook-form';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

// ----------------------------------------------------------------------

ProductDetailsSummary.propTypes = {
  product: PropTypes.shape({
    cover: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    groupking: PropTypes.string,
    city: PropTypes.string,
    age: PropTypes.string,
    model: PropTypes.array,
    price: PropTypes.number,
    open: PropTypes.string,
  }),
};

export default function ProductDetailsSummary({ product, ...other }) {

  const navigate = useNavigate();

  const {
    id,
    name,
    groupking,
    city,
    age,
    model,
    price,
    cover,
    open,
  } = product;

  const isopen = true;

  const defaultValues = {
    id,
    name,
    groupking,
    city,
    age,
    model,
    price,
    cover,
    open,
  };

  const methods = useForm({
    defaultValues,
  });

  const { handleSubmit } = methods;


  const onSubmit = async () => {
    try {
      if (isopen) {
      navigate(`${PATH_DASHBOARD.club.root}/clubroom/${paramCase(name)}`);
      }else
      navigate(PATH_DASHBOARD.club.root);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RootStyle {...other}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h5" paragraph>
          {name}
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }}>
          {fCurrency(price)}명
        </Typography>
        <Divider sx={{ borderStyle: 'dashed' }} /><br/>
        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 3 }} color='text.secondary'>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }} >
            그룹장
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }} color='text.secondary'>
          {fCurrency(price)}
        </Typography>
        </Stack>  
        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 3 }} color='text.secondary'>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }} >
            성별
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }} color='text.secondary'>
          {fCurrency(price)}
        </Typography>
        </Stack>  
        <Stack direction="row"  justifyContent="space-between" sx={{ mb: 3 }} color='text.secondary'>
          <Typography variant="subtitle1" sx={{ mt: 0.5 }} >
            지역
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }} color='text.secondary'>
          {fCurrency(price)}도 노원구
        </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}color='text.secondary'>
            나이대
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}color='text.secondary'>
          {fCurrency(price)}대
        </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}color='text.secondary'>    
          <Typography variant="subtitle1" sx={{ mt: 0.5 }}color='text.secondary'>
            입장 가능한 브랜드
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}color='text.secondary'>
          {fCurrency(price)}명
          </Typography>
        </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}color='text.secondary'>    
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}color='text.secondary'>
            입장 가능한 모델
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}color='text.secondary'>
          {fCurrency(price)}명
          </Typography>
          </Stack>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}color='text.secondary'>    
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}color='text.secondary'>
            인원수
          </Typography>
          <Typography variant="h5" sx={{ mb: 3 }}color='text.secondary'>
          {fCurrency(price)}명
          </Typography>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <Stack direction="row" spacing={2} sx={{ mt: 5 }}>
          <Button fullWidth size="large" type="submit" variant="contained">
            {isopen ? '입장하기' : '가입 신청하기'}
          </Button>
        </Stack>
      </FormProvider>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------
