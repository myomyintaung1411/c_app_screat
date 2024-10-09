import Main from './views/Main.vue'
// import NotFound from './views/NotFound.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
 import store from '@/store/index'
 import { computed } from 'vue'

/** @type {import('vue-router').RouterOptions['routes']} */
export const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: { title: 'Main',requireAuth: true },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: 'Home',requireAuth: true  },
        component: () => import('./views/Home/index.vue')
      },
      // {
      //   path: '/envelope',
      //   name: '爱满中华',
      //   meta: { title: '爱满中华',requireAuth: true  },
      //   component: () => import('./views/Envelope/index.vue')
      // },
      // {
      //   path: '/team',
      //   name: 'Team',
      //   meta: { title: 'Team',requireAuth: true  },
      //   component: () => import('./views/Team/index.vue')
      // },
      {
        path: '/news',
        name: 'News',
        meta: { title: 'News',requireAuth: true  },
        component: () => import('./views/News/index.vue')
      },
      {
        path: '/user',
        name: 'User',
        meta: { title: 'User',requireAuth: true  },
        component: () => import('./views/User/index.vue')
      },
    ],

  },
  // {
  //   path: '/homeArticle',
  //   name: 'HomeDetails',
  //   meta: { title: 'Article Detail Page',requireAuth: true },
  //   component: () => import('./views/home/CarousalDetails.vue')
  // },
    {
    path: '/newsDetails',
    name: 'NewsDetails',
    meta: { title: 'NewsDetails Page',requireAuth: true },
    component: () => import('./views/News/NewsDetails.vue')
  },
   {    path: '/team',
        name: 'Team',
        meta: { title: 'Team',requireAuth: true  },
        component: () => import('./views/Team/index.vue')
  },
  {
    path: '/address',
    name: 'Shipment Address',
    meta: { title: 'Shipment Address',requireAuth: true },
    component: () => import('./views/user/address.vue')
  },
  {
    path: '/messageList',
    name: 'messageList',
    meta: { title: 'messageList',requireAuth: true },
    component: () => import('./views/Home/messageList.vue')
  },
  {
    path: '/missionPlay',
    name: 'MissionPlay',
    meta: { title: 'MissionPlay',requireAuth: true },
    component: () => import('./views/Home/missionPlay.vue')
  },
  {
    path: '/rechargePage',
    name: 'Recharge',
    meta: { title: 'Recharge',requireAuth: true },
    component: () => import('./views/Home/Recharge.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    meta: { title: 'Pay',requireAuth: true },
    component: () => import('./views/Home/payPage.vue')
  },
  // {
  //   path: '/chat',
  //   name: 'Chat',
  //   meta: { title: 'Chat',requireAuth: true },
  //   component: () => import('./views/user/chat.vue')
  // },
  {
    path: '/bankcard',
    name: 'my card pack',
    meta: { title: 'my card pack',requireAuth: true },
    component: () => import('./views/user/bankCard.vue')
  },
  {
    path: '/addBankCard',
    name: 'Add Bank Card',
    meta: { title: 'Add Bank Card',requireAuth: true },
    component: () => import('./views/user/addBank.vue')
  },
  {
    path: '/addAddress',
    name: 'addAddress',
    meta: { title: 'addAddress',requireAuth: true },
    component: () => import('./views/user/addAddress.vue')
  },
  // {
  //   path: '/envelopeRecord',
  //   name: 'Envelope Record',
  //   meta: { title: 'Envelope Record',requireAuth: true },
  //   component: () => import('./views/Envelope/EnvelopeRecord.vue')
  // },
  {
    path: '/profileinfo',
    name: 'ProfileInfo',
    meta: { title: 'ProfileInfo',requireAuth: true },
    component: () => import('./views/user/personalInfo.vue')
  },
  {
    path: '/comment',
    name: 'Comment',
    meta: { title: 'Comment',requireAuth: true },
    component: () => import('./views/user/comment.vue')
  },
  {
    path: '/commentDetails',
    name: 'commentDetails',
    meta: { title: 'commentDetails',requireAuth: true },
    component: () => import('./views/user/commentDetails.vue')
  },
  // {
  //   path: '/teamdetails',
  //   name: 'TeamDetails',
  //   meta: { title: 'TeamDetails',requireAuth: true },
  //   component: () => import('./views/Team/TeamDetail.vue')
  // },
  {
    path: '/appdownload',
    name: 'AppDownload',
    meta: { title: 'AppDownload',requireAuth: true },
    component: () => import('./views/user/downApp.vue')
  },
  // {
  //   path: '/promotion',
  //   name: 'Promotion',
  //   meta: { title: 'Promotion',requireAuth: true },
  //   component: () => import('./views/user/promotion.vue')
  // },
  // {
  //   path: '/accsetting',
  //   name: 'AccountSetting',
  //   meta: { title: 'Account Setting',requireAuth: true },
  //   component: () => import('./views/user/accountSetting.vue')
  // },
  {
    path: '/changepass',
    name: 'PasswordChange',
    meta: { title: 'Password Change',requireAuth: true },
    component: () => import('./views/user/chnagePass.vue')
  },
  {
    path: '/changephone',
    name: 'PhoneChange',
    meta: { title: 'Phone Change',requireAuth: true },
    component: () => import('./views/user/changePhone.vue')
  },
  {
    path: '/real-name',
    name: 'RealName',
    meta: { title: 'Real Name',requireAuth: true },
    component: () => import('./views/user/realName.vue')
  },
  {
    path: '/withdraw',
    name: 'Withdraw',
    meta: { title: 'Withdraw',requireAuth: true },
    component: () => import('./views/User/Withdraw.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: 'Login',requiresVisitor: true },
    component: () => import('./views/auth/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    meta: { title: 'Register',requiresVisitor: true },
    component: () => import('./views/auth/Register.vue')
  },
  {
    path: '/forgetpass',
    name: 'ForgetPassword',
    meta: { title: 'Forget Password',requiresVisitor: true },
    component: () => import('./views/auth/ForgetPassword.vue')
  },


   { path: '/:path(.*)', component: () => import('./views/NotFound.vue')},
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const loginInfo = computed(()=> store.getters["app/LoginData"])
  // console.log(loginInfo.value);
  const token = loginInfo.value?.token
  console.log(token,"router token");
  if (to.matched.some(record => record.meta.requiresVisitor)
  ) {
    if (token) {
      next('/')
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requireAuth)) {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  } else {
    next()
  }
  // next()

});


/* Default title tag */
const defaultDocumentTitle = '爱满中华'
router.afterEach(to => {
  /* Set document title from route meta */

  if (to.meta && to.meta.title) {
    document.title = `${defaultDocumentTitle}  —  ${to.meta.title}`
  } else {
    document.title = defaultDocumentTitle
  }
})


export default router