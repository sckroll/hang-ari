import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
  },
  {
    path: '/club',
    name: 'Club',
    component: () => import('@/views/club/ClubPage.vue'),
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
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutPage.vue'),
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

export default router
