import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from 'vue-router'
import useAuthentication from '../composables/useAuthentication'
import useCustomUser from '../composables/useCustomUser'

const { user } = useAuthentication()
const { customUser } = useCustomUser()

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
        path: 'rooms/:id',
        component: () => import('../screens/rooms/_id.vue'),
      },
      {
        path: 'services',
        component: () => import('../screens/services/index.vue'),
        meta: { needsAuthentication: true },
      },
      {
        path: 'services/add',
        component: () => import('../screens/services/Add.vue'),
        meta: { needsAuthentication: true },
      },
      {
        path: 'reservations',
        component: () => import('../screens/reservations/index.vue'),
        meta: { needsAuthentication: true },
      },
      {
        path: 'reservations/:id',
        component: () => import('../screens/reservations/_id.vue'),
      },
      {
        path: 'reservations/add',
        redirect: '/reservations/add/1',
        component: () => import('../screens/reservations/Add.vue'),
        meta: { needsAuthentication: true },
        children: [
          {
            path: '1',
            component: () =>
              import('../screens/reservations/steps/StepOne.vue'),
          },
          {
            path: '2',
            component: () =>
              import('../screens/reservations/steps/StepTwo.vue'),
          },
          {
            path: '3',
            component: () =>
              import('../screens/reservations/steps/StepThree.vue'),
          },
          {
            path: '4',
            component: () =>
              import('../screens/reservations/steps/StepFour.vue'),
          },
        ],
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
    meta: { needsToBeAdmin: true },
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
        path: 'reservations',
        component: () =>
          import('../screens/admin/reservations/Reservations.vue'),
      },
      {
        path: 'reservations/:id',
        component: () => import('../screens/admin/reservations/_id.vue'),
      },
      {
        path: 'users',
        component: () => import('../screens/admin/users/Users.vue'),
      },
      {
        path: 'users/:id',
        component: () => import('../screens/admin/users/_id.vue'),
      },
      {
        path: 'users/:id/edit',
        component: () => import('../screens/admin/users/Update.vue'),
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

    if (to.meta.needsToBeAdmin && customUser.value?.role.name !== 'admin')
      return '/'

    if (to.meta.needsToBeAdmin && customUser.value?.role.name === 'admin')
      return
  },
)

export default router
