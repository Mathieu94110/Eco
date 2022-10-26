import axios from "axios";
import { http } from "./index";

const getProfile = (id) => {
  return axios.get(`${process.env.VUE_APP_API_URL}/user/${id}`);
};
const updateUserInfos = (id, data) => {
  return http.post("/user/edit/" + id, data);
};

export default {
  getProfile,
  updateUserInfos,
};
