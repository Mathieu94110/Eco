import { createStore } from "vuex";
import {
  addToAds,
  fetchCurrentUser,
  getFavorites,
  login,
  logout as apiLogout,
  createUser,
  fetchAsyncGames,
  fetchAsyncGameDetails,
  fetchAsyncCreators,
  removeFromFavorites,
  addToFavorites,
  fetchAsyncStores,
  fetchAsyncStoreDetails,
  fetchAsyncGenres,
  fetchAsyncSearchedGames,
} from "@/api";
import axios from "axios";
import type { FakeAdInterface } from "@/types";
const BASE_URI = import.meta.env.VITE_APP_BASE_URI;

const userInstance = axios.create({
  baseURL: `${BASE_URI}/api/user`,
});

const store = createStore({
  state: {
    status: "",
    user: null,
    gameDetails: null,
    isUserLogged: false,
    currentPost: {
      userFrom: "",
      image: "",
      title: "",
      description: "",
      price: null,
      category: "",
    },
    currentFavorites: [],
    favoriteDetails: {
      _id: "",
      id: null,
      brand: "",
      category: "",
      description: "",
      discountPercentage: null,
      images: null,
      price: null,
      rating: null,
      stock: null,
      thumbnail: "",
      title: "",
    },
    adDetails: {
      id: null,
      brand: "",
      category: "",
      description: "",
      discountPercentage: null,
      images: null,
      price: null,
      rating: null,
      stock: null,
      thumbnail: "",
      title: "",
    },
    games: [],
    creators: [],
    stores: [],
    storeDetails: [],
    genres: [],
    searchedGames: [],
    windowWidth: window.innerWidth,
  },
  actions: {
    //user
    async login({ commit }, userInfos) {
      commit("setStatus", "loading");
      try {
        const response = (await login(userInfos)) as any;
        commit("logUser", response);
        commit("setUserLogged", true);
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
    async logout({ commit }) {
      try {
        commit("clearUser");
        await apiLogout();
      } catch (e) {
        console.error("Logout failed", e);
      }
    },
    async fetchCurrentUser() {
      store.state.user = (await fetchCurrentUser()) as any;
      store.state.isUserLogged = true;
    },

    async fetchUserFavorites({ commit }) {
      if (store.state.user) {
        const userId = store.state.user._id;
        const response = (await getFavorites(userId)) as FakeAdInterface[];
        commit("userFavorites", response);
      }
    },
    //
    createPost: ({ commit }, postInfos) => {
      commit("setPost", postInfos);
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

    sendAdDetails: ({ commit }, AdInfo) => {
      commit("setAdData", AdInfo);
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

    async resetForm({ commit }, data) {
      commit("resetPost", data);
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
    async fetchGenres({ commit }, page = 1) {
      commit("setStatus", "loading");
      try {
        const res = await fetchAsyncGenres(page);
        commit("setGenres", res);
      } catch (e) {
        commit("setStatus", "error-genres");
        console.error(e);
      } finally {
        commit("setStatus", "");
      }
    },
    // games and genres in one
    async fetchGamesAndGenres({ commit }, page = 1) {
      try {
        commit("setStatus", "loading");
        const fetchGames = await fetchAsyncGames(page);
        const fetchGenres = await fetchAsyncGenres(page);
        const [games, genres] = await Promise.all([fetchGames, fetchGenres]);
        commit("setCurrentGames", games);
        commit("setGenres", genres);
        commit("setStatus", "");
      } catch (error: unknown) {
        commit("setStatus", error instanceof Error ? error.message : "error-games-and-genres");
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
    async fetchSearchedGames({ commit }, game) {
      commit("setStatus", "loading");
      try {
        const res = await fetchAsyncSearchedGames(game);
        commit("setSearchedGame", res);
      } catch (e) {
        commit("setStatus", "error-searched-game");
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
    setUserLogged(state, status) {
      state.isUserLogged = status;
    },
    setPost(state, post) {
      state.currentPost = post;
    },
    clearUser() {
      store.state.user = null;
      store.state.isUserLogged = false;
    },
    resetPost(state, post) {
      state.currentPost = post;
    },

    userFavorites(state, favorites) {
      state.currentFavorites = favorites;
    },
    logUser(state, user) {
      userInstance.defaults.headers.common.Authorization = user.token;
      state.user = user;
    },
    setAdData(state, adInfo) {
      state.adDetails = adInfo.ad;
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
    setGenres(state, genres) {
      state.genres = genres;
    },
    setSearchedGame(state, games) {
      state.searchedGames = games;
    },
  },
  getters: {
    authStatus(state) {
      return state.status;
    },
    isAuthenticated(state): boolean {
      return !!state.user && state.isUserLogged;
    },
    getCurrentPost: (state) => state.currentPost,
    getFavorites: (state) => state.currentFavorites,
    getFavoriteDetails: (state) => state.favoriteDetails,
    getAdDetails: (state) => state.adDetails,
    getStatus: (state) => state.status,
    getGameDetails: (state) => state.gameDetails,
  },
});

export default store;
