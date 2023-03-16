import { createWebHistory, createRouter } from "vue-router";
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from "../shared/guards/auth.guards";
import store from "../store";

const routes = [
  {
    name: "auth",
    path: "/",
    beforeEnter: [isNotAuthenticatedGuard],
    component: () => import("../views/AuthPage.vue"),
  },
  {
    name: "profile",
    path: "/profile",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/ProfilePage.vue"),
    props: true,
  },
  {
    name: "Ads",
    path: "/ads",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/AdsPage.vue"),
  },
  {
    name: "AdDetails",
    path: "/ads/:ad",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/AdDetailsPage.vue"),
  },
  {
    name: "CreateAd",
    path: "/create-ad",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/CreateAd.vue"),
  },
  {
    name: "UserAds",
    path: "/user-ads",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/UserAdsPage.vue"),
  },
  {
    name: "UserAdsDetails",
    path: "/user-ads/:id",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/UserAdsDetailsPage.vue"),
  },
  {
    name: "Favorites",
    path: "/favorites",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/FavoritePage.vue"),
  },
  {
    name: "FavoritesDetails",
    path: "/favorites/:ad",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/FavoritesDetailsPage.vue"),
  },
  {
    path: "/:notfound(.*)*",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async () => {
  if (!store.state.loaded && router.currentRoute.path === "/ads") {
    await store.dispatch("fetchCurrentUser");
  }
});

export default router;
