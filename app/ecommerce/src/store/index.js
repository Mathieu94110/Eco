import { createStore } from "vuex";

const axios = require("axios");

const userInstance = axios.create({
  baseURL: "http://localhost:3000/api/user",
});
const postInstance = axios.create({
  baseURL: "http://localhost:3000/api/posts",
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
  } catch (ex) {
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
    async getProfile({ commit }) {
      commit("profile_request");
      let res = await axios.get(`${userInstance}/infos`);
      return res;
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
      commit("profile_request");
      let res = await axios.get("/api/posts");
      commit("user_profile", res.data.user);
      return res;
    },

    async resetForm({ commit }, formValues) {
      commit("resetPost", formValues);
    },
  },
});

export default store;
