import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('@/views/landing/Index.vue'),
  },
  {
    path: '/components',
    name: 'ComponentsSample',
    component: () => import('@/views/ComponentsSample.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
