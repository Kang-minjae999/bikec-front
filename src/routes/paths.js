// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  Kakaologincallback: path(ROOTS_AUTH, '/kakaologin/callback'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_PAGE = {
  home: '/',
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
    clubmy: path(ROOTS_DASHBOARD, '/clubmy'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all')
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  garage: {
      root: path(ROOTS_DASHBOARD, '/garage'),
      profile: path(ROOTS_DASHBOARD, '/garage/profile'),
      cards: path(ROOTS_DASHBOARD, '/garage/cards'),
      list: path(ROOTS_DASHBOARD, '/garage/list'),
      newUser: path(ROOTS_DASHBOARD, '/garage/new'),
      editById: path(ROOTS_DASHBOARD, `/garage/reece-chung/edit`),
      account: path(ROOTS_DASHBOARD, '/garage/account')
    },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),    
    motocycle: path(ROOTS_DASHBOARD, '/e-commerce/motocycle'),    
    motocyclegear: path(ROOTS_DASHBOARD, '/e-commerce/motocyclegear'),    
    motocycleparts: path(ROOTS_DASHBOARD, '/e-commerce/motocycleparts'),
    product: path(ROOTS_DASHBOARD, '/e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    editById: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/e-commerce/invoice')
  },
  alleCommerce: {
    checkout: path(ROOTS_DASHBOARD, '/all-e-commerce/checkout'),
  },
  usedeCommerce: {
    root: path(ROOTS_DASHBOARD, '/used-e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/used-e-commerce/shop'),   
    motocycle: path(ROOTS_DASHBOARD, '/used-e-commerce/motocycle'), 
    motocyclegarage: path(ROOTS_DASHBOARD, '/used-e-commerce/motocyclegarage'),    
    motocyclegear: path(ROOTS_DASHBOARD, '/used-e-commerce/motocyclegear'),  
    motocycleparts: path(ROOTS_DASHBOARD, '/used-e-commerce/motocycleparts'),
    product: path(ROOTS_DASHBOARD, '/used-e-commerce/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/used-e-commerce/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/used-e-commerce/list'),
    newProduct: path(ROOTS_DASHBOARD, '/used-e-commerce/product/new'),
    newProductgear: path(ROOTS_DASHBOARD, '/used-e-commerce/product/newgear'),
    newProductparts: path(ROOTS_DASHBOARD, '/used-e-commerce/product/newparts'),
    editById: path(ROOTS_DASHBOARD, '/used-e-commerce/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, 'used-e-commerce/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/used-e-commerce/invoice')
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    Motocycle: path(ROOTS_DASHBOARD, '/blog/Motocycle'),    
    Motocycleparts: path(ROOTS_DASHBOARD, '/blog/Motocycleparts'),
    Motocyclearticle: path(ROOTS_DASHBOARD, '/blog/Motocyclearticle'),
    post: path(ROOTS_DASHBOARD, '/blog/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/blog/new-post')
  },
  board: {
    root: path(ROOTS_DASHBOARD, '/board'),
    posts: path(ROOTS_DASHBOARD, '/board/posts'),
    list: path(ROOTS_DASHBOARD, '/board/list'),
    motocycle: path(ROOTS_DASHBOARD, '/board/Motocycle'),    
    motocyclefix: path(ROOTS_DASHBOARD, '/board/Motocyclefix'),
    motocyclepicture: path(ROOTS_DASHBOARD, '/board/Motocyclepicture'),
    free: path(ROOTS_DASHBOARD, '/board/free'),
    post: path(ROOTS_DASHBOARD, '/board/post/:title'),
    postById: path(ROOTS_DASHBOARD, '/board/post/apply-these-7-secret-techniques-to-improve-event'),
    newPost: path(ROOTS_DASHBOARD, '/board/new-post'),
    newPostmotocycle: path(ROOTS_DASHBOARD, '/board/newPostmotocycle'),
    newPostmotocyclefix: path(ROOTS_DASHBOARD, '/board/newPostmotocyclefix'),
    newPostmotocyclepicture: path(ROOTS_DASHBOARD, '/board/newPostmotocyclefix'),
  },
  club: {
    root: path(ROOTS_DASHBOARD, '/club'),
    club: path(ROOTS_DASHBOARD, '/club/club'),    
    clubroom: path(ROOTS_DASHBOARD, '/club/clubroom/:name'),    
    product: path(ROOTS_DASHBOARD, '/club/product/:name'),
    productById: path(ROOTS_DASHBOARD, '/club/product/nike-air-force-1-ndestrukt'),
    list: path(ROOTS_DASHBOARD, '/club/list'),
    newProduct: path(ROOTS_DASHBOARD, '/club/product/new'),
    editById: path(ROOTS_DASHBOARD, '/club/product/nike-blazer-low-77-vintage/edit'),
    checkout: path(ROOTS_DASHBOARD, '/club/checkout'),
    invoice: path(ROOTS_DASHBOARD, '/club/invoice')
  },
  
};

export const PATH_DOCS = 'http://localhost:3000';
