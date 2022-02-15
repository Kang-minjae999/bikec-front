import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, React } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, Typography, Autocomplete, InputAdornment } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFEditor,
  RHFTextField,
  RHFUploadMultiFile,
  RHFSwitch
} from '../../../components/hook-form';

// 바이크 중고거래 기준
// ----------------------------------------------------------------------
const CATEGORY_OPTION = 
[ 
  '중고바이크', 
  '중고안전장비', 
  '중고부품/튜닝용품'
  ];

const GEARBOX_OPTION = [
  '',
  '헬멧',
  '슈트',
  '바지',
  '부츠',
  '보호대',
];

const BRAND_OPTION = [
  '다이네즈',
  '코미네/꼬미네',
  '알파인스타',
  '홍진',
  '쇼에이',
  '알리',
  '..기타',
];

const YEAR_OPTION = [
  '2021',
  '2020',
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010',
  '2009',
  '2008',
  '2007',
  '2006',
  '2005',
  '2004',
  '2003',
  '2002',
  '2001',
  '2000',
];


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

ProductNewForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object,
};


export default function ProductNewForm({ isEdit, currentProduct }) {

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('상품명이 필요합니다.'),
    description: Yup.string().required('설명이 필요합니다.'),
    images: Yup.array().min(1, '사진을 한 개 이상 올려주세요.'),
    price: Yup.number().moreThan(0, '가격은 0원 이상입니다.'),
    brand: Yup.string().max(8, '브랜드를 선택해 주세요.').nullable(),
    model: Yup.string().min(2, '모델명을 선택해주세요.').nullable(),
    year: Yup.string().min(4, '구매년도를 선택해주세요.').max(4, '구매년도를 선택해주세요.').nullable(),
    category: Yup.string().min(2, '카테고리를 선택해주세요.').nullable(),
    gearbox: Yup.string().min(2, '종류를 선택해주세요.').nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      category: currentProduct?.category || CATEGORY_OPTION[1],
      gearbox: currentProduct?.class || GEARBOX_OPTION[0],
      brand: currentProduct?.brand || BRAND_OPTION[0],
      year: currentProduct?.year || '',    
      price: currentProduct?.price || 0,
      nego: currentProduct?.nego || false, 
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
    
  });

  const {
    reset,
    watch,
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (isEdit && currentProduct) {
      reset(defaultValues);
    }
    if (!isEdit) {
      reset(defaultValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEdit, currentProduct]);

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      enqueueSnackbar(!isEdit ? '성공적으로 업로드 되었습니다!' : '성공적으로 업로드 되었습니다!');
      navigate(PATH_DASHBOARD.eCommerce.list);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setValue(
        'images',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
    [setValue]
  );

  const handleRemoveAll = () => {
    setValue('images', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.images?.filter((_file) => _file !== file);
    setValue('images', filteredItems);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>        
              <div>
              <LabelStyle>상품명</LabelStyle>
              <RHFTextField name="name" label="상품명" autoComplete="false"/>
              </div>
              <div>
                <LabelStyle>내용</LabelStyle>
                <RHFEditor simple name="description" />
              </div>

              <div>
                <LabelStyle>상품 사진</LabelStyle>
                <RHFUploadMultiFile
                  name="images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                />
              </div>
            </Stack>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>

              <Stack spacing={3} mt={2}>
              <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      {...field}
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={CATEGORY_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField 
                        name="category"
                        label="카테고리" {...params}
                        placeholder='카테고리' />}
                    />
                  )}
                />              
                
                <Controller
                  name="gearbox"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={GEARBOX_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField 
                        name="gearbox"
                        label="종류" {...params}
                        placeholder='종류' />}
                    />
                  )}
                /> 

                  <Controller
                  name="brand"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={BRAND_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField 
                        name="brand"
                        label="브랜드" {...params}
                        placeholder='브랜드' />}
                    />
                  )}
                /> 
                  <Controller
                  name="year"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={YEAR_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField 
                        name="year"
                        label="구매년도" {...params}
                        placeholder='구매년도' />}
                    />
                  )}
                />
              </Stack>
            </Card>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label="가격"
                  placeholder="0"
                  onWheel={(e) => e.target.blur()}
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>원</InputAdornment>,
                    type: 'number',
                  }}
                />
              </Stack>

              <RHFSwitch name='nego' label='네고' labelPlacement='start'/> 


            </Card>

            <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
              {!isEdit ? '상품 올리기' : '상품 수정하기'}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

