import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import Profile from "@/views/Profile.vue";
import userProfile from "@/views/userProfile.vue";

const routes = [
  { 
    name: 'login',
    path: '/', 
    component: Login,
  },
  { 
    name: 'profile',
    path: '/profile', 
    component: Profile, 
    props:true,
  },
  { 
    name: 'user-profile',
    path: '/profile/:id', 
    component: userProfile, 
    props:true,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router;