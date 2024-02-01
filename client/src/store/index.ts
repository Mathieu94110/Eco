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
} from "@/api";
import axios from "axios";
import type { FakeAdInterface } from "@/shared/interfaces";
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
    windowWidth: window.innerWidth,
  },
  actions: {
    //user
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

    toggleOnFavorites: async ({ state, commit }, game): Promise<void> => {
      const gameIsOnFavorite = state.currentFavorites.some((favorite: FakeAdInterface) => favorite.id === game.id);
      const userId = state?.user?._id;
      if (gameIsOnFavorite) {
        const variables = {
          id: game.id,
          userFrom: userId,
        };
        const oldFavorites = state.currentFavorites;
        await removeFromFavorites(variables);

        const newFavorites = oldFavorites.filter((favorite: FakeAdInterface) => favorite.id !== game.id);
        commit("userFavorites", newFavorites);
        // toast("L'annonce a été retirée de vos favoris !", "success");
      } else {
        const userFavorite = { ...game, userFrom: userId };
        try {
          await addToFavorites(userFavorite);
          commit("userFavorites", [...state.currentFavorites, { ...game }]);
          // toast("L'annonce a été ajoutée à vos favoris !", "success");
        } catch (e) {
          console.error(e);
        }
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
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    setPost(state, post) {
      state.currentPost = post;
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
    getAdDetails: (state) => state.adDetails,
    getStatus: (state) => state.status,
    getGameDetails: (state) => state.gameDetails,
  },
});

export default store;
