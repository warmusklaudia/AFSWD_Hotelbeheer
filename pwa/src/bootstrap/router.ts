import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import useAuthentication from '../composables/useAuthentication'

const { user } = useAuthentication()

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
        meta: { needsAuthentication: true },
      },
      {
        path: 'reservations',
        component: () => import('../screens/reservations/index.vue'),
        meta: { needsAuthentication: true },
      },
      {
        path: 'profile',
        component: () => import('../screens/Profile.vue'),
        meta: { needsAuthentication: true },
      },
    ],
  },
  {
    path: '/:pathMach(.*)*',
    name: 'ClientError',
    component: () => import('../screens/generic/ClientError.vue'),
  },
  {
    path: '/auth',
    redirect: '/auth/login',
    component: () => import('../components/holders/AuthHolder.vue'),
    children: [
      {
        path: 'login',
        component: () => import('../components/auth/Login.vue'),
        meta: { cantAuthentication: true },
      },
      {
        path: 'register',
        component: () => import('../components/auth/Register.vue'),
        meta: { cantAuthentication: true },
      },
      {
        path: 'forgot-password',
        component: () => import('../components/auth/ForgotPassword.vue'),
      },
    ],
  },
  {
    path: '/admin',
    redirect: '/admin/home',
    children: [
      {
        path: 'home',
        component: () => import('../screens/admin/Home.vue'),
      },
      {
        path: 'rooms',
        component: () => import('../screens/admin/rooms/Rooms.vue'),
      },
      {
        path: 'rooms/:id',
        component: () => import('../screens/admin/rooms/_id.vue'),
      },
      {
        path: 'rooms/:id/edit',
        component: () => import('../screens/admin/rooms/Update.vue'),
      },
      {
        path: 'rooms/add',
        component: () => import('../screens/admin/rooms/Add.vue'),
      },
      {
        path: 'cleaning',
        component: () => import('../screens/admin/Cleaning.vue'),
      },
      {
        path: 'services',
        component: () => import('../screens/admin/Services.vue'),
      },
      {
        path: 'breakfast-access',
        component: () => import('../screens/admin/BreakfastAccess.vue'),
      },
      {
        path: 'pricing',
        component: () => import('../screens/admin/Pricing.vue'),
      },
      {
        path: 'guests',
        component: () => import('../screens/admin/Guests.vue'),
      },
    ],
  },
]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(
  (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
    if (to.meta.needsAuthentication && !user.value) return 'auth/login'

    if (to.meta.cantAuthentication && user.value) return '/'
  },
)

export default router
