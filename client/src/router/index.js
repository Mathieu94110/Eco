import { createWebHistory, createRouter } from 'vue-router';
import store from '../store';

const routes = [
  {
    name: 'auth',
    path: '/',
    component: () => import('../views/Auth.vue'),
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('../views/Profile.vue'),
    props: true,
  },
  {
    name: 'Adds',
    path: '/adds',
    component: () => import('../views/Adds.vue'),
  },
  {
    name: 'PostAdd',
    path: '/post-add',
    component: () => import('../views/PostAdd.vue'),
  },
  {
    name: 'UserAdds',
    path: '/user-adds',
    component: () => import('../views/UserAdds.vue'),
  },
  {
    name: 'UserAddsDetails',
    path: '/user-adds/:id',
    component: () => import('../views/UserAddsDetails.vue'),
  },
  {
    name: 'Favorites',
    path: '/favorites',
    component: () => import('../views/Favorites.vue'),
  },
  {
    name: 'FavoritesDetails',
    path: '/favorites/:add',
    component: () => import('../views/FavoritesDetails.vue'),
  },
  {
    name: 'NotFound',
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve(async (to) => {
  if (to.name === 'auth') {
    localStorage.removeItem('user');
  }
});

router.beforeEach(async (to) => {
  const publicPages = ['/'];
  const authRequired = !publicPages.includes(to.path);
  const isUserLoggedIn = store.getters.isLoggedIn;

  if (authRequired && !isUserLoggedIn) {
    return '/';
  }
  return to.path;
});

export default router;
