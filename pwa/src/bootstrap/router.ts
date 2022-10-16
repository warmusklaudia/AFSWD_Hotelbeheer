import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../components/holders/AppHolder.vue'),
    children: [
      {
        path: '',
        component: () => import('../screens/Home.vue'),
        meta: { needsAuthentication: false },
      },
      {
        path: 'rooms',
        component: () => import('../screens/rooms/index.vue'),
        meta: { needsAuthentication: false },
      },
      {
        path: 'services',
        component: () => import('../screens/services/index.vue'),
        meta: { needsAuthentication: false },
      },
      {
        path: 'reservations',
        component: () => import('../screens/reservations/index.vue'),
        meta: { needsAuthentication: false },
      },
      {
        path: 'profile',
        component: () => import('../screens/Profile.vue'),
        meta: { needsAuthentication: false },
      },
    ],
  },
  {
    path: '/:pathMach(.*)*',
    name: 'ClientError',
    component: () => import('../screens/generic/ClientError.vue'),
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
