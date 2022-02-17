import * as Yup from 'yup';
import { useCallback, useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Grid, Card, Chip, Stack, Button, Typography, Autocomplete } from '@mui/material';
// routes
import useAuth from '../../../hooks/useAuth';
import { PATH_DASHBOARD } from '../../../routes/paths';
import axios from '../../../utils/axios';
// components
import { RHFSwitch, RHFEditor, FormProvider, RHFTextField, RHFUploadSingleFile } from '../../../components/hook-form';
//
import BlogNewPostPreview from './BlogNewPostPreview';

// ----------------------------------------------------------------------


const POST_OPTION = [
  '바이크 소식/기사',
  '바이크 정보',
  '바이크 튜닝/정비 정보',
  '더 추가할 예정',
];

const TAGS_OPTION = [
  '바이크 신차 정보',
  '바이크 단종차 정보',
  '바이크 할인',
  '더 추가할 예정'
];


const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
}));

// ----------------------------------------------------------------------

export default function BlogNewPostForm() {
  const { user } = useAuth()
  const { nickname } = user;
  
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPreview = () => {
    setOpen(true);
  };

  const handleClosePreview = () => {
    setOpen(false);
  };

  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    content: Yup.string().min(10).required('Content is required'),
  });

  const defaultValues = {
    title: '',
    description: '',
    content: '',
    nickname: '',
  };

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    control,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;
    
      useEffect(() => {
        setValue("nickname" ,nickname)
        console.log(nickname)
      }, [setValue,nickname]);

      const values = watch();

  const onSubmit = async ({title, description, content, nickname}) => {
    const accessToken = window.localStorage.getItem('accessToken');
    try {
      await axios.post('/api/board/free', {
        headers : {
          accessToken
        },
        title,
        description,
        content,
        nickname,
      });     
      reset();
      handleClosePreview();
      enqueueSnackbar('Post success!');
      navigate(PATH_DASHBOARD.blog.posts);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        setValue(
          'cover',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );


  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <RHFTextField name="title" label="제목" />
                <div>
                  <LabelStyle>내용</LabelStyle>
                  <RHFEditor name="content"/>
                </div>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
              <LoadingButton fullWidth type="submit" variant="contained" size="large" loading={isSubmitting}>
                올리기
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </FormProvider>

    </>
  );
}

