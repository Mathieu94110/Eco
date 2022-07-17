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
    currentPost: {},
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
      console.log("post =", post);
      state.currentPost = post;
      console.log("fsdfs", this.state.currentPost);
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
            console.log("login response data =", response.data);
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
      console.log(userInfos);
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
      console.log(res);
    },

    createPost: ({ commit }, postInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        postInstance
          .post("/postInfos", postInfos)
          .then((response) => {
            console.log("postInfos response=", response);
            commit("setPost", response.config.data);
            console.log("postInfos response data =", response.config.data);
            resolve(response.config.data);
          })
          .catch(function (error) {
            commit("setStatus", "error_login");
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
  },
});

export default store;
