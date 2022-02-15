import * as Yup from 'yup';
import { useState, React } from 'react';
// form
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Stack, IconButton, InputAdornment, Alert, Typography, Accordion, AccordionSummary, AccordionDetails, Autocomplete, Chip, Checkbox, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DaumPostcode from 'react-daum-postcode';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField, RHFCheckbox } from '../../../components/hook-form'
import Regicheck1 from './Rescheck1';
import Regicheck2 from './Rescheck2';
import Regicheck3 from './Rescheck3';

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const { register } = useAuth();

  const isMountedRef = useIsMountedRef();

  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('유효한 이메일 주소를 입력해주세요.')
                       .required('이메일을 입력해주세요.'),
    password: Yup.string().required('비밀번호를 입력해주세요.')
                          .matches(/^(?=.*[a-z])(?=.*\d)(?=.*[0-9])(?=.*[@$!%*#?&])[a-z\d@$!%*#?&]{8,}$/,"최소 8자 이상으로 특수문자, 숫자를 최소 한개씩 포함해야 합니다.")
                          .min(8, '비밀번호는 최소 8자 이상입니다.'),
    password2: Yup.string().required('비밀번호를 입력해주세요.')
                           .oneOf(([Yup.ref('password'),null]),('비밀번호가 일치하지 않습니다.')),
    username: Yup.string().required('이름을 입력해주세요.'),
    nickname: Yup.string().required('닉네임을 입력해주세요.')
                          .max(8, '닉네임은 8자리 이하로 입력해주세요.')
                          .min(2, '닉네임은 2자리 이상으로 입력해주세요.'),
    birthday: Yup.string().required('생일을 입력해주세요.')
                       .max(6, '8자리를 입력해주세요.')
                       .min(6, '8자리를 입력해주세요.')
                       .matches(/^[0123456789]*$/, "숫자만 적어주세요. "),
    phone: Yup.string().required('핸드폰 번호를 입력해주세요.')
                       .matches(/^[0123456789]*$/, "숫자만 적어주세요. ")
                       .max(11, '11자리를 입력해주세요.')
                       .min(11, '11자리를 입력해주세요.'),
    sex: Yup.string().required('성별을 입력해주세요.'),
    resisteragree1: Yup.boolean().oneOf([true], '체크해주세요.').required('체크해주세요.'),
    resisteragree2: Yup.boolean().oneOf([true], '체크해주세요.').required('체크해주세요.'),
    resisteragree3: Yup.boolean().oneOf([true], '체크해주세요.').required('체크해주세요.'),
  });

  const SEX_OPTION = [
    '남', 
    '여',
  ];
  

  const defaultValues = {
    email: '',
    password: '',
    password2: '',
    username: '',
    nickname: '',
    birthday: '',
    phone: '',    
    sex: '',   
    address:
      {
      address: '',
      detailaddress: '',
      zipcode: '',
      },
    resisteragree1:false,
    resisteragree2:false,
    resisteragree3:false,
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,   
  });

  const {
    reset,
    setError,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors, isSubmitting },
  } = methods;
 
  const [ischeck, setischeck] = useState(false);

  const check =()=>{
    setischeck(!ischeck)
    setValue("resisteragree1",!ischeck)
    setValue("resisteragree2",!ischeck)
    setValue("resisteragree3",!ischeck)
  }

  

 // 다음 주소
  const [isOpenPost, setIsOpenPost] = useState(false); // 주소열기
  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const onCompletePost = (data) => {
    let fullAddr = data.address;
    let extraAddr = '';
    const zipcode = data.zonecode;
    console.log(fullAddr)

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddr += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
    }

    setIsOpenPost(false);
    setValue("address.address",fullAddr)
    setValue("address.zipcode",zipcode)
    console.log(getValues("address"))
    console.log(getValues("address.address"))
  };


  const postCodeStyle = {
    display: 'block',
    position: 'relative',
    top: '0%',
    width: '480px',
    height: '490px',
    padding: '7px',
  };
// 다음 주소 끝

  const onSubmit = async (data) => {
    try {
      await register(
        data.email, 
        data.password,
        data.username, 
        data.nickname,
        data.birthday,
        data.phone,
        data.sex,
        data.address);
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', error);
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}        
        <RHFTextField name="email" label="이메일" />
        
        <RHFTextField
          name="password"
          label="비밀번호"
          type={showPassword ? 'text' : 'password'}
          helperText="최소 8자 이상으로 특수문자, 숫자를 최소 한개씩 포함해주세요."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <RHFTextField
          name="password2"
          label="비밀번호 확인"
          type={showPassword ? 'text' : 'password'}
          helperText="앞에 입력한 비밀번호와 같은 값을 입력해주세요."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="username" label="이름" helperText="한글로 입력해주세요." autoComplete='none'/>
          <RHFTextField name="nickname" label="닉네임"  helperText="2자 이상 8자 이하로 입력해주세요." autoComplete='none'/>  
          </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="birthday" label="생일"  helperText="'-'없이 6자리를 입력해주세요."  placeholder="YYMMDD"/>        
        <RHFTextField name="phone" label="핸드폰 번호" helperText="'-'없이 11자리를 입력해주세요."  placeholder="01012345678"/>
        </Stack>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="address.address" label="주소" onClick={onChangeOpenPost} autoComplete='none'/>  
        </Stack>

         <Stack   direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {isOpenPost  ? (
          <DaumPostcode style={postCodeStyle} autoClose onComplete={onCompletePost} />
          ) : ''}      
          {}
          </Stack>
        <Stack   direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <RHFTextField name="address.detailaddress" label="상세주소" autoComplete='none'/> 
        <Controller
                  name="sex"
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      onChange={(event, newValue) => field.onChange(newValue)}
                      options={SEX_OPTION.map((option) => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip {...getTagProps({ index })} key={option} size="small" label={option} />
                        ))
                      }
                      renderInput={(params) => <RHFTextField name="sex" label="성별" {...params} />}
                    />
                  )}  /> 
        </Stack>

        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
        >      
        (필수) 약관 전체 동의하기 &nbsp;
        <Checkbox checked={ischeck} onChange={check}/>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
        >              
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header">
          <Typography>라이더 타운 이용약관
            </Typography>
        </AccordionSummary>
        <AccordionDetails>        
        <Regicheck1/>
        </AccordionDetails>
      </Accordion>
      (필수) 약관에 동의하기 &nbsp;
      <RHFCheckbox name="resisteragree1" label="" /> 
      </Stack>
      <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
        >              

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          <Typography>개인정보 처리 약관
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Regicheck2/>
        </AccordionDetails>
      </Accordion>  
      (필수) 약관에 동의하기  &nbsp;
      <RHFCheckbox name="resisteragree2" label="" />
      </Stack>
      <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
        >              

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header">
          <Typography>전자상거래 처리 약관
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Regicheck3/>
        </AccordionDetails>
      </Accordion>
      (필수) 약관에 동의하기  &nbsp;
      <RHFCheckbox name="resisteragree3" label="" />
      </Stack>

        {errors.resisteragree1 && <Alert severity="error"><strong>라이더타운 이용 약관에 동의해주세요.</strong></Alert>}
        {errors.resisteragree2 && <Alert severity="error"><strong>개인정보 처리 약관에 동의해주세요.</strong></Alert>}      
        {errors.resisteragree3 && <Alert severity="error"><strong>전자상거래 이용 약관에 동의해주세요.</strong></Alert>}
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting} >
          가입하기
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}
