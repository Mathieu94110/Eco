import { createStore } from "vuex";
import { addToAds, fetchCurrentUser, getFavorites, login, logout, createUser } from "@/api";
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
    isUserLogged: false,
    currentPost: {
      userFrom: "",
      image: "",
      title: "",
      description: "",
      price: null,
      category: "",
    },
    currentFavorites: null,
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
    windowWidth: window.innerWidth,
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
  },
  getters: {
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
  },
  actions: {
    async login({ commit }, userInfos) {
      commit("setStatus", "loading");
      try {
        const response = (await login(userInfos)) as any;
        commit("logUser", response);
        commit("setStatus", "");
      } catch (e) {
        commit("setStatus", "error_login");
        setTimeout(() => {
          store.commit("setStatus", "");
        }, 2000);
        console.error(e);
      }
    },

    createAccount: async ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      try {
        const response = (await createUser(userInfos)) as any;
        commit("setStatus", "");
        return response;
      } catch (e) {
        console.error(e);
      }
    },

    createPost: ({ commit }, postInfos) => {
      commit("setPost", postInfos);
    },

    sendPost: async ({ state, commit }) => {
      commit("setStatus", "loading");
      try {
        await addToAds(state.currentPost);
        commit("setStatus", "");
      } catch {
        commit("setStatus", "error_post");
      }
    },

    sendAdDetails: ({ commit }, AdInfo) => {
      commit("setAdData", AdInfo);
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
  },
});

export default store;
