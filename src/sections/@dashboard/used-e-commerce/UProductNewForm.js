import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useMemo, React, useState } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import { Card, Chip, Grid, Stack, Typography, Autocomplete, InputAdornment, FormControlLabel, Checkbox, TextField } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import {
  FormProvider,
  RHFSelect,
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

const GEARBOX_OPTION = 
[
  '','메뉴얼', '스쿠터'
];

const BRAND_OPTION = [
  { group: '', classify: ['브랜드를 선택해주세요.'] },
  { group: '일제', classify: ['혼다', '야마하', '스즈키', '가와사키'] },
  { group: '미제', classify: ['할리데이비슨', '인디안'] },
  { group: '유럽제', classify: ['허스크바나', 'z', 'zz', 'zzz'] },
  { group: '인도/대만', classify: ['베넬리', 'z', 'zz', 'zzz'] },
  { group: '국산', classify: ['대림','KR모터스'] },
];


const MODEL_OPTION = [
  'cbr125r',
  'cbr250rr',
  'cbr500r',
  'cbr600rr',
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

const TRADEMODEL_OPTION = [
  'cbr125r',
  'cbr250rr',
  'cbr500r',
  'cbr600rr',
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


  const [tradechecked, settradeChecked] = useState(false);

  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('상품명이 필요합니다.'),
    description: Yup.string().required('설명이 필요합니다.'),
    images: Yup.array().min(1, '사진을 한 개 이상 올려주세요.'),
    price: Yup.number().moreThan(0, '가격은 0원 이상입니다.'),
    mileage: Yup.number().moreThan(0, '키로수를 입력해주세요.'),
    year: Yup.string().min(4, '년식을 입력해주세요.').max(4, '년식을 입력해주세요.').nullable(),
    brand: Yup.string().max(8, '브랜드를 선택해 주세요.').nullable(),
    model: Yup.string().min(2, '모델명을 선택해주세요.').nullable(),
    category: Yup.string().min(2, '카테고리를 선택해주세요.').nullable(),
    gearbox: Yup.string().min(2, '종류를 선택해주세요.').nullable(),
    displacement: Yup.number().moreThan(1, '배기량을 입력해주세요.').lessThan(10000,'배기량을 알맞게 입력해주세요.').nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [],
      category: currentProduct?.category || CATEGORY_OPTION[0],
      gearbox: currentProduct?.gearbox || '',
      brand: currentProduct?.brand || BRAND_OPTION[0].classify[0],
      model: currentProduct?.model || '',    
      year: currentProduct?.year || '',
      mileage: currentProduct?.mileage || 0,      
      price: currentProduct?.price || 0,
      nego: currentProduct?.nego || false, 
      trade: currentProduct?.trade || false,
      trademodel: currentProduct?.trademodel || [],
      displacement: currentProduct?.displacement || 0,
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


  
  const handleChange = () => {
    settradeChecked((prev) => !prev);
};

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

                <RHFSelect name="brand" label="브랜드">
                  {BRAND_OPTION.map((brand) => (
                    <optgroup key={brand.group} label={brand.group}>
                      {brand.classify.map((classify) => (
                        <option key={classify} value={classify}>
                          {classify}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </RHFSelect>

                <Controller
                  name="model"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={MODEL_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField 
                        name="model"
                        label="모델명" {...params}
                        placeholder='모델명' />}
                    />
                  )}
                />

                  <RHFTextField
                  name="displacement"
                  label="배기량"
                  placeholder="0"
                  onWheel={(e) => e.target.blur()}
                  value={getValues('displacement') === 0 ? '' : getValues('displacement')}
                  onChange={(event) => setValue('displacement', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>cc</InputAdornment>,
                    type: 'number',
                  }}
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
                        label="년식" {...params}
                        placeholder='년식' />}
                    />
                  )}
                />

                  <RHFTextField
                  name="mileage"
                  label="키로수"
                  placeholder="0"
                  onWheel={(e) => e.target.blur()}
                  value={getValues('mileage') === 0 ? '' : getValues('mileage')}
                  onChange={(event) => setValue('mileage', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    endAdornment: <InputAdornment position='end'>km</InputAdornment>,
                    type: 'number',
                  }}
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
              <RHFSwitch name='trade' label='대차' labelPlacement='start'/> 

              &nbsp;&nbsp;
              <FormControlLabel
               control={<Checkbox checked={tradechecked} onChange={handleChange} />}
               label="대차 가능한 기종 선택하기"
              />
              <br/>
                {!tradechecked
                ? '' :  <Controller
                 name="trademodel"
                 control={control}
                 render={({ field }) => (
                   <Autocomplete
                     multiple
                     onChange={(event, newValue) => field.onChange(newValue)}
                     options={TRADEMODEL_OPTION.map((option) => option)}
                     renderTags={(value, getTagProps) =>
                       value.map((option, index) => (
                         <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                       ))
                     }
                     renderInput={(params) => <TextField 
                      name="trademodel" label="모델명" helperText='모델명을 검색해주세요.'{...params} />}
                   />
                 )}
               />}

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

