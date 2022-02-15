// routes
import { PATH_AUTH, PATH_PAGE } from '../../routes/paths';
// components
import { PATH_AFTER_LOGIN } from '../../config';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: '홈',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: '고객센터',
    path: '/pages',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    children: [
      {
        subheader: '고객센터',
        items: [
          { title: 'RIDERTOWN', path: PATH_PAGE.about },
          { title: '오시는 길', path: PATH_PAGE.contact },
          { title: 'QnA', path: PATH_PAGE.faqs },
        ],
      },
      {
        subheader: '이용하기',
        items: [
          { title: '로그인', path: PATH_AUTH.loginUnprotected },
          { title: '회원가입', path: PATH_AUTH.registerUnprotected },
          { title: '비밀번호 찾기', path: PATH_AUTH.resetPassword },
        ],
      },
      {
        subheader: '메인화면',
        items: [{ title: '메인화면으로 가기', path: PATH_AFTER_LOGIN }],
      },
    ],
  },
];

export default menuConfig;
