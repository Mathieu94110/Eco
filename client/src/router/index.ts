import { createWebHistory, createRouter } from "vue-router";
import { isAuthenticatedGuard, isNotAuthenticatedGuard } from "./auth.guards";
import store from "../store";

const routes = [
  {
    name: "Authentification",
    path: "/",
    beforeEnter: [isNotAuthenticatedGuard],
    component: () => import("../views/AuthPage.vue"),
  },
  {
    name: "Accueil",
    path: "/home",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/HomePage.vue"),
  },
  {
    name: "Vos informations",
    path: "/profile",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/ProfilePage.vue"),
    props: true,
  },
  {
    name: "Créer une annonce",
    path: "/create-ad",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/CreateAd.vue"),
  },
  {
    name: "Mes favoris",
    path: "/favorites",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/FavoritesPage.vue"),
  },
  {
    name: "Détails du favoris",
    path: "/favorites/:ad",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/FavoritesDetailsPage.vue"),
  },
  {
    name: "Createurs",
    path: "/creators",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/CreatorsPage.vue"),
  },
  {
    name: "Search",
    path: "/search",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/SearchGamePage.vue"),
  },
  {
    name: "Jeux",
    path: "/games",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/AllGamesPage.vue"),
  },
  {
    name: "Details du jeu",
    path: "/games/:gameId",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/GameDetailsPage.vue"),
  },
  {
    name: "Stores",
    path: "/stores",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/StoresPage.vue"),
  },
  {
    name: "Details du store",
    path: "/stores/:storeId",
    beforeEnter: [isAuthenticatedGuard],
    component: () => import("../views/StoreDetailsPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  if (!store.state.isUserLogged && to.path === "/home") {
    try {
      await store.dispatch("fetchCurrentUser");
    } catch (e) {
      console.error("Erreur de récupération user dans guard", e);
      // Ici, tu peux gérer une redirection si besoin
    }
  }
  next();
});

export default router;
