import { createWebHistory, createRouter } from "vue-router";

const routes = [
  {
    name: "auth",
    path: "/",
    component: () => import("../views/Auth.vue"),
  },
  {
    name: "profile",
    path: "/profile",
    component: () => import("../views/Profile.vue"),
    props: true,
  },
  {
    name: "Adds",
    path: "/dashboard",
    component: () => import("../views/Adds.vue"),
  },
  {
    name: "About",
    path: "/about",
    component: () => import("../views/About.vue"),
  },
  {
    name: "PostAdd",
    path: "/post-add",
    component: () => import("../views/PostAdd.vue"),
  },
  {
    name: "Favorites",
    path: "/favorites",
    component: () => import("../views/Favorites.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
