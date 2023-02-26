import { createWebHistory, createRouter } from "vue-router";
import store from "../store";
import NotFoundPage from "../views/NotFoundPage.vue";

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
    name: "Ads",
    path: "/ads",
    component: () => import("../views/AdsPage.vue"),
  },
  {
    name: "CreateAd",
    path: "/create-ad",
    component: () => import("../views/CreateAd.vue"),
  },
  {
    name: "UserAds",
    path: "/user-ads",
    component: () => import("../views/UserAdsPage.vue"),
  },
  {
    name: "UserAdsDetails",
    path: "/user-ads/:id",
    component: () => import("../views/UserAdsDetailsPage.vue"),
  },
  {
    name: "Favorites",
    path: "/favorites",
    component: () => import("../views/FavoritePage.vue"),
  },
  {
    name: "FavoritesDetails",
    path: "/favorites/:ad",
    component: () => import("../views/FavoritesDetailsPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage,
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
