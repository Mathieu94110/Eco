import { createStore } from 'vuex';

const axios = require('axios');

const userInstance = axios.create({
  baseURL: `${process.env.VUE_APP_API_URL}/user`,
});

const store = createStore({
  state() {
    return {
      status: '',
      user: {},
      isUserLogged: false,
      currentPost: {
        author: '',
        image: '',
        title: '',
        description: '',
        price: null,
        category: '',
      },
      userInfos: {
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        image: null,
        phone: null,
        address: '',
        zip: '',
      },
      favoriteDetails: {
        _id: '',
        id: null,
        brand: '',
        category: '',
        description: '',
        discountPercentage: null,
        images: null,
        price: null,
        rating: null,
        stock: null,
        thumbnail: '',
        title: '',
      },
      windowWidth: window.innerWidth,
    };
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
      localStorage.setItem('user', JSON.stringify(user));
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
        token: '',
      };
      localStorage.removeItem('user');
    },
    setFavoriteData(state, favoriteInfo) {
      state.favoriteDetails = favoriteInfo.favorite;
    },
    setWindowWidth(state) {
      state.windowWidth = window.innerWidth;
    },
  },
});

test('logUser should update store state and localStorage user object', () => {
  const userInfos = {
    expiresIn: 3600,
    token: 'eyJhbGciOiJIUzI...',
    userId: '631f8g98b899f92dfa0f28a4',
  };
  jest.spyOn(Storage.prototype, 'setItem');
  Storage.prototype.setItem = jest.fn();
  store.commit('logUser', userInfos);
  expect(localStorage.setItem).toHaveBeenCalled();
  expect(store.state.user).toStrictEqual({
    expiresIn: 3600,
    token: 'eyJhbGciOiJIUzI...',
    userId: '631f8g98b899f92dfa0f28a4',
  });
});

test('logOut should remove userId and token from store and remove user data on localStorage', () => {
  jest.spyOn(Storage.prototype, 'removeItem');
  Storage.prototype.removeItem = jest.fn();
  store.commit('logOut');
  expect(store.state.user.userId).toBe(-1);
  expect(store.state.user.token).toBe('');
  expect(localStorage.removeItem).toHaveBeenCalled();
});

test('posts should update', () => {
  const newPost = {
    author: 'mathieu',
    image: 'mgpgkdkqsn.png',
    title: 'coco chanel',
    description: 'parfum neuf jamais déballé',
    price: 50,
    category: 'cosmétiques',
  };
  store.commit('setPost', newPost);
  expect(localStorage.removeItem).toHaveBeenCalled();
  expect(store.state.currentPost).toStrictEqual({
    author: 'mathieu',
    image: 'mgpgkdkqsn.png',
    title: 'coco chanel',
    description: 'parfum neuf jamais déballé',
    price: 50,
    category: 'cosmétiques',
  });
  console.log(store.state.currentPost);
});
