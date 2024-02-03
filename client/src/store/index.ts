import { createStore } from "vuex";
import {
  addToAds,
  fetchCurrentUser,
  getFavorites,
  login,
  logout,
  createUser,
  fetchAsyncGames,
  fetchAsyncGameDetails,
  fetchAsyncCreators,
  removeFromFavorites,
  addToFavorites,
  fetchAsyncStores,
  fetchAsyncStoreDetails,
} from "@/api";
import axios from "axios";
import type { FakeAdInterface } from "@/types";
const userInstance = axios.create({
  baseURL: "http://localhost:84/api/user",
});

const store = createStore({
  state: {
    status: "",
    loaded: false,
    user: null,
    gameDetails: null,
    isUserLogged: false,
    currentPost: [],
    currentFavorites: [],
    games: [],
    creators: [],
    stores: [],
    storeDetails: [],
    windowWidth: window.innerWidth,
  },
  actions: {
    async login({ commit }, userInfos) {
      commit("setStatus", "loading");
      try {
        const response = (await login(userInfos)) as any;
        commit("logUser", response);
        commit("setStatus", "");
      } catch (e) {
        commit("setStatus", "error-login");
        console.error(e);
      }
    },
    createAccount: async ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      try {
        const response = (await createUser(userInfos)) as any;
        return response;
      } catch (e) {
        commit("setStatus", e);
      } finally {
        setTimeout(() => {
          commit("setStatus", "");
        }, 2000);
      }
    },
    async logout() {
      await logout();
      store.state.user = null;
    },
    async fetchCurrentUser() {
      store.state.user = (await fetchCurrentUser()) as any;
      store.state.loaded = true;
    },
    async fetchUserFavorites({ commit }) {
      if (store.state.user) {
        const userId = store.state.user._id;
        const response = (await getFavorites(userId)) as FakeAdInterface[];
        commit("userFavorites", response);
      }
    },
    sendPost: async ({ state, commit }) => {
      commit("setStatus", "loading");
      try {
        await addToAds(state.currentPost);
        commit("setStatus", "");
      } catch {
        commit("setStatus", "error-post");
      }
    },
    addFavorite: async ({ state, commit }, game): Promise<void> => {
      const userId = state?.user?._id;
      const userFavorite = { ...game, userFrom: userId };
      try {
        await addToFavorites(userFavorite);
        commit("userFavorites", [...state.currentFavorites, { ...game }]);
      } catch (e) {
        console.error(e);
      }
    },
    removeFavorite: async ({ state, commit }, game): Promise<void> => {
      const userId = state?.user?._id;
      const variables = {
        id: game.id,
        userFrom: userId,
      };
      try {
        const oldFavorites = state.currentFavorites;
        await removeFromFavorites(variables);
        const newFavorites = oldFavorites.filter((favorite: FakeAdInterface) => favorite.id !== game.id);
        commit("userFavorites", newFavorites);
      } catch (e) {
        console.error(e);
      }
    },
    sendFavoriteDetails: ({ commit }, FavoriteInfo) => {
      commit("setFavoriteData", FavoriteInfo);
    },
    async getPosts({ commit }) {
      const res = await axios.get("/api/posts");
      commit("user_profile", res.data.user);
      return res;
    },
    async userFavorites({ commit }, data) {
      commit("userFavorites", data);
    },
    // games
    async fetchGames({ commit }, page = 1) {
      commit("setStatus", "loading");
      try {
        const res = await fetchAsyncGames(page);
        commit("setCurrentGames", res);
      } catch (e) {
        commit("setStatus", "error-games");
        console.error(e);
      } finally {
        commit("setStatus", "");
      }
    },
    async fetchGameDetails({ commit }, gameId) {
      commit("setStatus", "loading");
      try {
        const details = await fetchAsyncGameDetails(gameId);
        commit("setGameDetails", details);
      } catch (e) {
        commit("setStatus", "error-game-details");
        console.error(e);
      } finally {
        commit("setStatus", "");
      }
    },
    async fetchCreators({ commit }, page = 1) {
      commit("setStatus", "loading");
      try {
        const res = await fetchAsyncCreators(page);
        commit("setCreators", res);
      } catch (e) {
        commit("setStatus", "error-creators");
        console.error(e);
      } finally {
        commit("setStatus", "");
      }
    },
    async fetchStores({ commit }) {
      commit("setStatus", "loading");
      try {
        const res = await fetchAsyncStores();
        commit("setStores", res);
      } catch (e) {
        commit("setStatus", "error-stores");
        console.error(e);
      } finally {
        commit("setStatus", "");
      }
    },
    async fetchStoreDetails({ commit }, storeId) {
      commit("setStatus", "loading");
      try {
        const res = await fetchAsyncStoreDetails(storeId);
        commit("setStoreDetails", res);
      } catch (e) {
        commit("setStatus", "error-store-details");
        console.error(e);
      } finally {
        commit("setStatus", "");
      }
    },
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    userFavorites(state, favorites) {
      state.currentFavorites = favorites;
    },
    logUser(state, user) {
      userInstance.defaults.headers.common.Authorization = user.token;
      state.user = user;
    },
    setFavoriteData(state, favoriteInfo) {
      state.favoriteDetails = favoriteInfo.favorite;
    },
    setWindowWidth(state) {
      state.windowWidth = window.innerWidth;
    },
    setCurrentGames(state, games) {
      state.games = games;
    },
    setGameDetails(state, gameDetails) {
      state.gameDetails = gameDetails;
    },
    setCreators(state, creators) {
      state.creators = creators;
    },
    setStores(state, stores) {
      state.stores = stores;
    },
    setStoreDetails(state, details) {
      state.storeDetails = details;
    },
  },
  getters: {
    authStatus(state) {
      return state.status;
    },
    isAuthenticated(state): boolean | null {
      if (state.user) {
        return true;
      } else if (!state.user && state.loaded) {
        return false;
      } else {
        return null;
      }
    },
    getCurrentPost: (state) => state.currentPost,
    getFavorites: (state) => state.currentFavorites,
    getFavoriteDetails: (state) => state.favoriteDetails,
    getStatus: (state) => state.status,
    getGameDetails: (state) => state.gameDetails,
  },
});

export default store;
