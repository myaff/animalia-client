import { useUserStore } from '@/stores/user';
import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from 'vue-router';
import { defu } from 'defu';

const routes = [
  {
    path: '/login',
    component: () => import('../views/AuthView.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('../views/LoginView.vue'),
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/RegisterView.vue'),
      },
    ]
  },
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { needAuth: true },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
  },
];

function populateRouteMeta(routeRaw: RouteRecordRaw, meta?: RouteRecordRaw['meta']): RouteRecordRaw {
  if (!meta && !routeRaw.meta) return routeRaw;
  const newMeta = defu(meta, routeRaw?.meta || {});
  const children = routeRaw?.children?.map(item => populateRouteMeta(item, newMeta));
  return {
    ...routeRaw,
    meta: newMeta,
    children: children || [],
  };
}

function transformRoutes(routesRaw: RouteRecordRaw[]): RouteRecordRaw[] {
  return routesRaw.map(item => populateRouteMeta(item));
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: transformRoutes(routes),
})

router.beforeEach(async (to: RouteLocationNormalized) => {
  if (!to.meta?.needAuth || to.name === 'login') return true;
  const userStore = useUserStore();
  await userStore.init();
  if (userStore.isAuthorized) return true;
  else return { name: 'login' };
})

export default router;
