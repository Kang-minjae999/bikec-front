import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback } from 'react';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Box, Grid, Card, Stack, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../hooks/useAuth';
// utils
import { fData } from '../../utils/formatNumber';
// _mock
import { countries } from '../../_mock';
// components
import { FormProvider, RHFSwitch, RHFSelect, RHFTextField, RHFUploadAvatar } from '../../components/hook-form';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();

  const UpdateUserSchema = Yup.object().shape({
    displayName: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    nickname: user?.nickname || '',
    username: user?.username || '',
    email: user?.email || '',
    photoURL: user?.photoURL || '',
    phone: user?.phone || '',
    address: user?.address || '',
    detail_address: user?.detail_address || '',
    birthday: user?.birthday || '',
    sex: user?.sex || '',
    zipcode: user?.zipcode || '',
  };

  const methods = useForm({
    resolver: yupResolver(UpdateUserSchema),
    defaultValues,
  });

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async () => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      enqueueSnackbar('Update success!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  *.jpeg, *.jpg, *.png, *.gif <br />
                  파일을 올려주세요.
                  <br /> 최대 크기 {fData(31457280)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={7}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                columnGap: 2,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="nickname" label="닉네임" />
              <RHFTextField name="username" label="이름" />
              <RHFTextField name="email" label="이메일" />
              <RHFTextField name="phone" label="전화번호" />
              <RHFTextField name="address" label="주소" />
              <RHFTextField name="detail_address" label="상세주소" />
              <RHFTextField name="zipcode" label="우편번호" />
              <RHFTextField name="birthday" label="생일" />
              <RHFTextField name="sex" label="성별" />
            </Box>
            <Stack spacing={3} alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                저장하기
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
