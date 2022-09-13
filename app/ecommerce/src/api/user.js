import axios from "axios";

const getProfile = (id) => {
  return axios.get(`${process.env.VUE_APP_API_URL}/user/${id}`);
};

export default {
  getProfile,
};
