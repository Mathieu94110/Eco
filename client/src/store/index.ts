import { createStore } from "vuex";
import { addToAds, fetchCurrentUser, login, logout } from "@/api";
import axios from "axios";

const userInstance = axios.create({
  baseURL: "http://localhost:3000/api/user",
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
    getFavoriteDetails: (state) => state.favoriteDetails,
  },
  actions: {
    async login({ commit }, userInfos) {
      commit("setStatus", "loading");
      try {
        commit("setStatus", "");
        const response = (await login(userInfos)) as any;
        commit("logUser", response);
      } catch (e) {
        commit("setStatus", "error_login");
        throw e;
      }
    },

    createAccount: async ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      try {
        const createUser = await userInstance.post("/signup", userInfos);
        commit("userInfos", userInfos);
        return createUser;
      } catch (err) {
        return err;
      }
    },

    createPost: ({ commit }, postInfos) => {
      commit("setPost", postInfos);
    },

    sendPost: async ({ state, commit }) => {
      commit("setStatus", "loading");
      try {
        await addToAds(state.currentPost);
      } catch {
        commit("setStatus", "error_post");
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
    async logout() {
      await logout();
      store.state.user = null;
    },
    async fetchCurrentUser() {
      store.state.user = (await fetchCurrentUser()) as any;
      store.state.loaded = true;
    },
  },
});

export default store;
