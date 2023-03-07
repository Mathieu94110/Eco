import { createStore } from "vuex";
import axios from "axios";

const apiUrl = "http://localhost:3000/api";

const userInstance = axios.create({
  baseURL: `${apiUrl}/user`,
});
const postInstance = axios.create({
  baseURL: `${apiUrl}/posts`,
});
const favoriteInstance = axios.create({
  baseURL: `${apiUrl}/favorites`,
});

const store = createStore({
  state: {
    status: "",
    user: {},
    isUserLogged: false,
    currentPost: {
      userFrom: "",
      image: "",
      title: "",
      description: "",
      price: null,
      category: "",
    },
    userInfos: {
      userName: "",
      firstName: "",
      lastName: "",
      email: "",
      image: null,
      phone: null,
      address: "",
      zip: "",
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
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos(state, userInfos) {
      state.userInfos = userInfos;
    },
    loginStatus(state, loginStatus) {
      state.isUserLogged = loginStatus;
    },
    logOut(state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
    setFavoriteData(state, favoriteInfo) {
      state.favoriteDetails = favoriteInfo.favorite;
    },
    setWindowWidth(state) {
      state.windowWidth = window.innerWidth;
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.isUserLogged;
    },

    getCurrentPost: (state) => state.currentPost,
    getFavoriteDetails: (state) => state.favoriteDetails,
    getUserInfos: (state) => state.userInfos,
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
          .catch((error) => {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
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

    // return new Promise((resolve, reject) => {
    //   commit;
    //   userInstance
    //     .post("/signup", userInfos)
    //     .then((response) => {
    //       commit("setStatus", "created");
    //       resolve(response);
    //       commit("userInfos", userInfos);
    //     })
    //     .catch((error) => {
    //       commit("setStatus", "error-signup");
    //       console.error("HERE =", error);
    //       reject(error);
    //     });
    // });
    // },

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
          .catch((error) => {
            console.log(error);
            commit("setStatus", "error_post");
            reject(error);
          });
      });
    },

    async getPosts({ commit }) {
      const res = await axios.get("/api/posts");
      commit("user_profile", res.data.user);
      return res;
    },

    async resetForm({ commit }, data) {
      commit("resetPost", data);
    },

    sendFavorite: ({ commit }, variables) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        favoriteInstance
          .post("/addToFavorites", variables)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            commit("setStatus", "error_post");
            reject(error);
          });
      });
    },

    sendFavoriteDetails: ({ commit }, FavoriteInfo) => {
      commit("setFavoriteData", FavoriteInfo);
    },
  },
});

const userData = localStorage.getItem("user");
if (!userData) {
  store.state.user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    const user = JSON.parse(userData);
    userInstance.defaults.headers.common.Authorization = user.token;
  } catch (err) {
    store.state.user = {
      userId: -1,
      token: "",
    };
  }
}

export default store;
