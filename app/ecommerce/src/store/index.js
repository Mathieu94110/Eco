import { createStore } from "vuex";
import userApi from "@/api/user";

const axios = require("axios");

const userInstance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/user`,
});
const postInstance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/posts`,
});
const favoriteInstance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/favorites`,
});

let user = localStorage.getItem("user");
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    userInstance.defaults.headers.common["Authorization"] = user.token;
  } catch (err) {
    user = {
      userId: -1,
      token: "",
    };
  }
}
const store = createStore({
  state: {
    status: "",
    user: user,
    isUserLogged: false,
    currentPost: {
      title: "",
      description: "",
      category: "",
      price: 0,
      currentImage: null,
    },
    userInfos: {
      firstName: "",
      lastName: "",
      email: "",
    },
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("user")) {
        state.isUserLogged = true;
      }
    },
    setStatus: function (state, status) {
      state.status = status;
    },
    setPost: function (state, post) {
      state.currentPost = post;
    },

    resetPost: function (state, post) {
      state.currentPost = post;
    },

    logUser: function (state, user) {
      userInstance.defaults.headers.common["Authorization"] = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    loginStatus: function (state, loginStatus) {
      state.isUserLogged = loginStatus;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.isUserLogged;
    },

    getCurrentPost: (state) => {
      return state.currentPost;
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        userInstance
          .post("/login", userInfos)
          .then((response) => {
            commit("setStatus", "");
            commit("logUser", response.data);
            commit("loginStatus", true);
            resolve(response.data);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    createAccount: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        userInstance
          .post("/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "created");
            resolve(response);
            commit("userInfos", userInfos);
          })
          .catch(function (error) {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    async getProfile() {
      const user = await axios.get(userApi.getProfile);
      return user;
    },

    createPost: ({ commit }, postInfos) => {
      commit("setPost", postInfos);
    },

    sendPost: ({ state, commit }) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        postInstance
          .post("/postInfos", state.currentPost)
          .then((response) => {
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
            commit("setStatus", "error_post");
            reject(error);
          });
      });
    },

    async getPosts({ commit }) {
      let res = await axios.get("/api/posts");
      commit("user_profile", res.data.user);
      return res;
    },

    async resetForm({ commit }, formValues) {
      commit("resetPost", formValues);
    },

    sendFavorite: ({ commit }, FavoriteData) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        favoriteInstance
          .post("/favoritesInfos", FavoriteData)
          .then((response) => {
            resolve(response.data);
          })
          .catch(function (error) {
            console.log(error);
            commit("setStatus", "error_post");
            reject(error);
          });
      });
    },
  },
});

export default store;
