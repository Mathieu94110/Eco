import { createWebHistory, createRouter } from "vue-router";
import store from "../store";

const routes = [
  {
    name: "auth",
    path: "/",
    component: () => import("../views/AuthPage.vue"),
  },
  {
    name: "profile",
    path: "/profile",
    component: () => import("../views/ProfilePage.vue"),
    props: true,
  },
  {
    name: "Adds",
    path: "/adds",
    component: () => import("../views/AdsPage.vue"),
  },
  {
    name: "CreateAdd",
    path: "/create-add",
    component: () => import("../views/CreateAdd.vue"),
  },
  {
    name: "UserAdds",
    path: "/user-adds",
    component: () => import("../views/UserAdsPage.vue"),
  },
  {
    name: "UserAddsDetails",
    path: "/user-adds/:id",
    component: () => import("../views/UserAdsDetailsPage.vue"),
  },
  {
    name: "Favorites",
    path: "/favorites",
    component: () => import("../views/FavoritePage.vue"),
  },
  {
    name: "FavoritesDetails",
    path: "/favorites/:add",
    component: () => import("../views/FavoritesDetailsPage.vue"),
  },
  {
    name: "NotFound",
    path: "/:pathMatch(.*)*",
    component: () => import("../views/NotFoundPage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeResolve(async (to) => {
  if (to.name === "auth") {
    localStorage.removeItem("user");
  }
});

router.beforeEach((to) => {
  const publicPages = ["/"];
  const authRequired = !publicPages.includes(to.path);
  const isUserLoggedIn = store.getters.isLoggedIn;

  if (authRequired && !isUserLoggedIn) {
    return "/";
  }
});

export default router;
