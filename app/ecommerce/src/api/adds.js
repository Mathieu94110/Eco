import axios from "axios";
import { http } from "./index";

export const getPosts = () => {
  return axios.get("/api/posts");
};

export const getPostId = (id) => {
  return axios.get(`${process.env.VUE_APP_API_URL}/posts/${id}`);
};

export const getUserAdds = () => {
  return http.get("/posts");
};

export const postAdds = () => {
  return http.post("/posts/postInfos");
};

export const getFakeAdds = () => {
  return axios.get("https://dummyjson.com/products");
};
// export const getUserAdd = ({ id }) => {
//   return http.get(`/`);
// };

export default {
  getFakeAdds,
  getUserAdds,
  getPostId,
};
