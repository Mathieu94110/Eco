import { createWebHistory, createRouter } from "vue-router";
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from "../shared/guards/auth.guards";
import store from "../store";

const routes = [
  {
    name: "Authentification",
    path: "/",
    beforeEnter: [isNotAuthenticatedGuard],
    component: () => import("../views/AuthPage.vue"),
  },
  {
    name: "Vos informations",
    path: "/profile",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/ProfilePage.vue"),
    props: true,
  },
  {
    name: "Annonces",
    path: "/ads",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/AdsPage.vue"),
  },
  {
    name: "Détails de l'annonce",
    path: "/ads/:ad",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/AdDetailsPage.vue"),
  },
  {
    name: "Créer une annonce",
    path: "/create-ad",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/CreateAd.vue"),
  },
  {
    name: "Mes annonces",
    path: "/user-ads",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/UserAdsPage.vue"),
  },
  {
    name: "Détails de votre annonce",
    path: "/user-ads/:id",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/UserAdsDetailsPage.vue"),
  },
  {
    name: "Mes favoris",
    path: "/favorites",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/FavoritePage.vue"),
  },
  {
    name: "Détails du favoris",
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
