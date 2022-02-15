// @mui
import { useTheme } from '@mui/material/styles';
import { Box, CardContent, Container, Grid, Link, Stack, Typography, Alert ,Button} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { common } from '@mui/material/colors';
// icons
import StorefrontIcon from '@mui/icons-material/Storefront';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppWelcome,
  AppWelcomefirst,
  AppFeatured,
  AppWelcomesecond,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  Appcompany,
  Apppic,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { user } = useAuth();
  const theme = useTheme();
  const { themeStretch } = useSettings();
  let nowZoom = 100;

function zoomOut(){                          // 화면크기축소
	nowZoom -= nowZoom - 10;

	if(nowZoom <= 70) nowZoom = 70;            // 화면크기 최대 축소율 70% 
	zooms();
}


function zoomIn(){                             // 화면크기확대
	nowZoom += nowZoom + 20;

	if(nowZoom >=200) nowZoom = 200;          // 화면크기 최대 확대율 200%
	zooms();
}


function zoomReset(){                        //  원래 화면크기로 되돌아가기
	nowZoom = 100;
	zooms();
}


function zooms(){
	document.body.style.zoom = nowZoom = '%';

	if(nowZoom === 70){
		alert ("더 이상 축소할 수 없습니다.");                       // 화면 축소율이 70% 이하일 경우 경고창
	}

	if(nowZoom === 200){
		alert ("더 이상 확대할 수 없습니다.");                       // 화면 확대율이 200% 이상일 경우 경고창
	}
}

return (
  <div>
  <a href="#;" onClick="zoomIn();">혹은 문자</a>		
<a href="#;" onClick="zoomOut();">혹은 문자</a>		
<a href="#;" onClick="zoomReset();">혹은 문자</a>		
</div>
  );
}



