import axios from 'axios';
import http from './index';

const getProfile = (id) => axios.get(`${process.env.VUE_APP_API_URL}/user/${id}`);

const updateUserInfos = (data) => {
  const id = data._id;
  return http.put(`/user/${id}`, data);
};

export default {
  getProfile,
  updateUserInfos,
};
