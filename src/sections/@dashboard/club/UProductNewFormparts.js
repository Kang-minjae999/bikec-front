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


const PARTSMODEL_OPTION = [
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
    year: Yup.string().min(4, '구매년도를 입력해주세요.').max(4, '구매년도를 입력해주세요.').nullable(),
  });

  const defaultValues = useMemo(
    () => ({
      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      images: currentProduct?.images || [], 
      category: currentProduct?.category || CATEGORY_OPTION[2],
      year: currentProduct?.year || '',      
      price: currentProduct?.price || 0,
      nego: currentProduct?.nego || false, 
      partsmodel: currentProduct?.partsmodel || [],
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
                />  <br/>
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
                <FormControlLabel
               control={<Checkbox checked={tradechecked} onChange={handleChange} />}
               label="부품을 사용할 수 있는 기종 선택하기"
              />
                {!tradechecked
                ? '' :  <Controller
                 name="partsmodel"
                 control={control}
                 render={({ field }) => (
                   <Autocomplete
                     multiple
                     onChange={(event, newValue) => field.onChange(newValue)}
                     options={PARTSMODEL_OPTION.map((option) => option)}
                     renderTags={(value, getTagProps) =>
                       value.map((option, index) => (
                         <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                       ))
                     }
                     renderInput={(params) => <TextField 
                      name="partsmodel" label="기종" {...params} />}
                   />
                 )}
               />} 
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

