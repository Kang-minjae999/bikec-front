import PropTypes from 'prop-types';
// @mui
import { Stack, Card, CardHeader, Typography, Button, Grid } from '@mui/material';
import Image from '../../../../components/Image';
import appkakaochatlogo from './appkakaochatlogo.png';


// ----------------------------------------------------------------------
Appkakaochat.propTypes = {
  name: PropTypes.string,
  product: PropTypes.shape({
    cover: PropTypes.string
  }),
};

// ----------------------------------------------------------------------
export default function Appkakaochat({name, product}) {
  const { cover } = product;
  const sexy = "https://open.kakao.com/o/gqmkX5Wc"
  return (
    <Card>
      <CardHeader title="KAKOA CHATING" />
      <Stack spacing={3} sx={{ p: 3 }}>
      <Grid container spacing={3}>
       <Grid item xs={12} md={8}>
      <Typography><strong>{name}</strong>에는<br/>  
      <strong>카카오 단체 채팅방</strong>이 있어요!<br/> 
      카카오 채팅방에 참가해주세요!<br/>
      <br/><br/>{sexy}
      </Typography>
      </Grid>
       <Grid item xs={12} md={4}>
         <Image 
                key={appkakaochatlogo}
                alt="large image"
                src={appkakaochatlogo}
                ratio="1/1"
              />
        </Grid>
        </Grid>
        <Button variant="contained" onClick={() => window.open(`${sexy}`, '_blank')}>
          참가하기
        </Button>
      </Stack>
    </Card>
  );
}


// ----------------------------------------------------------------------
