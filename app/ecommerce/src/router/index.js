import { createWebHistory, createRouter } from "vue-router";

const routes = [
  { 
    name: 'login',
    path: '/', 
    component: () => import('../views/Login.vue'),
  },
  { 
    name: 'profile',
    path: '/profile', 
    component: () => import('../views/Profile.vue'),
    props:true,
  },
  { 
    name: 'user-profile',
    path: '/profile/:id', 
    component: () => import('../views/userProfile.vue'),
    props:true,
  },
  {
    name: 'Dashboard',
    path: '/dashboard',
    component: () => import('../views/Dashboard.vue')
  },
  {
    name: 'About',
    path: '/about',
    component: () => import('../views/About.vue')
  },
  {
    name: 'PostAdd',
    path: '/post-add',
    component: () => import('../views/PostAdd.vue')
  },
  {
    name: 'Favorites',
    path: '/favorites',
    component: () => import('../views/Favorites.vue')
  },
  {
    name: 'UserInformations',
    path: '/user-informations',
    component: () => import('../views/UserInformations.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;