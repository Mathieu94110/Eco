import axios from 'axios';
import baseURL from './index';

const getProfile = (id) => axios.get(`${process.env.VUE_APP_API_URL}/user/${id}`);
const updateUserInfos = (id, data) => baseURL.http.post(`/user/edit/${id}`, data);

export default {
  getProfile,
  updateUserInfos,
};
