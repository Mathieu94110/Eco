// import { http } from "./index";
import axios from "axios";
export const getProfile = (id) => {
  return axios.get(`${process.env.VUE_APP_API_URL}/user/${id}`);
};
// export const getProfile = (id) => {
//   return axios.get(`${process.env.VUE_APP_API_URL}/infos/${id}`);
// };

export default {
  getProfile,
};
