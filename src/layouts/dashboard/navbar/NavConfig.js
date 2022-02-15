// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  
  {
    subheader: 'Ridertown',
    items: [ 
      { title: '나의 라이딩', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      { title: '나의 프로필', path: PATH_DASHBOARD.user.profile ,icon: ICONS.user },
      { title: '나의 동호회 - 새로 제작 예정', path: PATH_DASHBOARD.general.clubmy ,icon: ICONS.chat },
      { title: '나의 장바구니', path: PATH_DASHBOARD.alleCommerce.checkout ,icon: ICONS.ecommerce },
    ],
  },


  /* 아래는 삭제
  { title: '이커머스', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.ecommerce },
  { title: '분석', path: PATH_DASHBOARD.general.analytics, icon: ICONS.analytics },
  { title: '은행', path: PATH_DASHBOARD.general.banking, icon: ICONS.banking },
  { title: '책', path: PATH_DASHBOARD.general.booking, icon: ICONS.booking }, */

  // MANAGEMENT
  // ----------------------------------------------------------------------
  
  {
    subheader: 'community',
    items: [
      // MANAGEMENT : USER
      {
        title: '동호회',
        path: PATH_DASHBOARD.club.root,
        icon: ICONS.cart,
        children: [
          { title: '동호회방 찾기', path: PATH_DASHBOARD.club.club },
          { title: '동호회 상세정보', path: PATH_DASHBOARD.club.productById },
          { title: '동호회 리스트', path: PATH_DASHBOARD.club.list },
          { title: '동호회 만들기', path: PATH_DASHBOARD.club.newProduct },
          { title: '동호회 수정하기', path: PATH_DASHBOARD.club.editById },
          { title: '동호회 체크아웃', path: PATH_DASHBOARD.club.checkout },
          { title: '동호회 인보이스', path: PATH_DASHBOARD.club.invoice },
        ],
      },
      {
        title: '정비소',
        path: PATH_DASHBOARD.garage.root,
        icon: ICONS.cart,
        children: [
          { title: '정비소 프로필', path: PATH_DASHBOARD.garage.profile },
          { title: '정비소 카드', path: PATH_DASHBOARD.garage.cards },
          { title: '정비소 리스트', path: PATH_DASHBOARD.garage.list },
          { title: '정비소 만들기', path: PATH_DASHBOARD.garage.newUser },
          { title: '정비소 수정하기', path: PATH_DASHBOARD.garage.editById },
          { title: '정비소 계정', path: PATH_DASHBOARD.garage.account },
        ],
      },
      {
        title: '읽기전용',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: '바이크 소식/기사', path: PATH_DASHBOARD.blog.Motocyclearticle },
          { title: '바이크 정보', path: PATH_DASHBOARD.blog.Motocycle },
          { title: '바이크 튜닝/정비 정보', path: PATH_DASHBOARD.blog.Motocycleparts },
          { title: '더 추가할 예정', path: PATH_DASHBOARD.user.editById },
        ],
      },
      {
        title: '게시판',
        path: PATH_DASHBOARD.board.root,
        icon: ICONS.blog,
        children: [
          { title: '바이크', path: PATH_DASHBOARD.board.motocycle },
          { title: '정비', path: PATH_DASHBOARD.board.motocyclefix },
          { title: '사진', path: PATH_DASHBOARD.board.motocyclepicture },
          { title: '자유', path: PATH_DASHBOARD.board.free },
          { title: '추가 예정', path: PATH_DASHBOARD.user.account },
        ],
      },
    ],
  },

      // MANAGEMENT : E-COMMERCE
  {
    subheader: 'Market',
    items: [
      {
        title: '거래',
        path: PATH_DASHBOARD.eCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: '신차거래', path: PATH_DASHBOARD.eCommerce.motocycle },
          { title: '안전장비', path: PATH_DASHBOARD.eCommerce.motocyclegear },
          { title: '튜닝/정비용품', path: PATH_DASHBOARD.eCommerce.motocycleparts },
          { title: '제품', path: PATH_DASHBOARD.eCommerce.productById },
          { title: '리스트', path: PATH_DASHBOARD.eCommerce.list },
          { title: '제품 올리기', path: PATH_DASHBOARD.eCommerce.newProduct },
          { title: '수정하기', path: PATH_DASHBOARD.eCommerce.editById },
          { title: '체크아웃', path: PATH_DASHBOARD.eCommerce.checkout },
          { title: '인보이스', path: PATH_DASHBOARD.eCommerce.invoice },
        ],
      },
      {
        title: '중고거래',
        path: PATH_DASHBOARD.usedeCommerce.root,
        icon: ICONS.cart,
        children: [
          { title: '중고바이크', path: PATH_DASHBOARD.usedeCommerce.motocycle },
          { title: '센터중고바이크', path: PATH_DASHBOARD.usedeCommerce.motocyclegarage },
          { title: '안전장비', path: PATH_DASHBOARD.usedeCommerce.motocyclegear },
          { title: '튜닝/정비용품', path: PATH_DASHBOARD.usedeCommerce.motocycleparts },
          { title: '제품', path: PATH_DASHBOARD.usedeCommerce.productById },
          { title: '리스트', path: PATH_DASHBOARD.usedeCommerce.list },
          { title: '제품 올리기', path: PATH_DASHBOARD.usedeCommerce.newProduct },
          { title: '수정하기', path: PATH_DASHBOARD.usedeCommerce.editById },
          { title: '체크아웃', path: PATH_DASHBOARD.usedeCommerce.checkout },
          { title: '인보이스', path: PATH_DASHBOARD.usedeCommerce.invoice },
        ],
      },

      // MANAGEMENT : BLOG
      {
        title: '블로그는 참고용',
        path: PATH_DASHBOARD.blog.root,
        icon: ICONS.blog,
        children: [
          { title: '포스트들', path: PATH_DASHBOARD.blog.posts },
          { title: '포스트', path: PATH_DASHBOARD.blog.postById },
          { title: '새 포스트', path: PATH_DASHBOARD.blog.newPost },
        ],
      },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: '앱',
    items: [
      {
        title: '메일',
        path: PATH_DASHBOARD.mail.root,
        icon: ICONS.mail,
        info: (
          <Label variant="outlined" color="error">
            +32
          </Label>
        ),
      },
      { title: '채팅', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
      { title: '캘린더', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
      {
        title: '칸반',
        path: PATH_DASHBOARD.kanban,
        icon: ICONS.kanban,
      },
    ],
  },
];

export default navConfig;
