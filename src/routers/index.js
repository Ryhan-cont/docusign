import { createRouter, createWebHistory } from 'vue-router'

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
        component: () => import('@/pages/message/sent.vue'),
        meta: {pageTitle: 'Sent',}
      },
      {
        path: '/:pathMatch(.*)*',
        name: '404',
        component: () => import('@/pages/error/404.vue'),
        meta: {pageTitle: '404',}
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
