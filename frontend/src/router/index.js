import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/club',
    name: 'ClubList',
    component: () => import('@/views/club/ClubListPage.vue'),
  },
  {
    path: '/club/:id',
    name: 'Club',
    component: () => import('@/views/club/ClubPage.vue'),
  },
  {
    path: '/new',
    name: 'NewClub',
    component: () => import('@/views/club/NewClubPage.vue'),
    meta: { isAuthRequired: true, isReversed: true },
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import('@/views/community/CommunityPage.vue'),
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/UserPage.vue'),
    meta: { isAuthRequired: true },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutPage.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/LoginPage.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/user/RegisterPage.vue'),
    meta: { isReversed: true },
  },
  {
    path: '/components',
    name: 'ComponentsSample',
    component: () => import('@/views/ComponentsSamplePage.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // meta.isAuthRequired 속성이 true일 때만 로그인 여부 확인
  if (to.meta.isAuthRequired && from.name && !store.getters.getUser) {
    alert('로그인이 필요합니다.')
    next('/login')
    return
  }
  next()
})

router.afterEach((to, from) => {
  // 헤더 메뉴 색상 반전 여부 확인
  store.commit('setHeaderReversed', to.meta.isReversed)
})

export default router
