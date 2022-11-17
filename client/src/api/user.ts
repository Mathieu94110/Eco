import axios from "axios";
import http from "./index";
const apiUrl = "http://localhost:3000/api";

const getProfile = (id) => axios.get(`${apiUrl}/user/${id}`);

const updateUserInfos = (data) => {
  const id = data._id;
  return http.put(`/user/${id}`, data);
};

export default {
  getProfile,
  updateUserInfos,
};
