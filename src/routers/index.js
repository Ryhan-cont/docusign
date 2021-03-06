import { createRouter, createWebHistory } from 'vue-router'
import {usePannelLayoutStore} from '@/store/layout/pannelLayout'


const routes = [
  {
    path: '/',
    component: () => import('@/layouts/pannel/Pannel.vue'),
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('@/pages/dashboard/index.vue'),
        meta: {pageTitle: 'Dashboard',}
      },
      {
        path: '/pickup-management',
        name: 'pickupManagement',
        component: () => import('@/pages/pickup-management/index.vue'),
        meta: {pageTitle: 'Pickup Management',}
      },
      {
        path: '/income',
        name: 'income',
        component: () => import('@/pages/income/index.vue'),
        meta: {pageTitle: 'Fncome',}
      },
      {
        path: '/forecast',
        name: 'forecast',
        component: () => import('@/pages/forecast/index.vue'),
        meta: {pageTitle: 'Forecast',}
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/simple/Simple.vue'),
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import('@/pages/auth/login.vue'),
        meta: {pageTitle: 'Login',},
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/layouts/message/Message.vue'),
    children: [
      {
        path: '/sent',
        name: 'sent',
        component: () => import('@/pages/messages/sent.vue'),
        meta: {pageTitle: 'Sent',}
      },
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/pages/error-page/404.vue'),
        meta: {pageTitle: '404',}
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  let pannelLayout = usePannelLayoutStore();
  window.currentRoute = to.name
  pannelLayout.activeRoute = to.name;
  next();
});

// router.afterEach((to, from) => {
//     console.log('Complete', to, from)
// });
export default router
