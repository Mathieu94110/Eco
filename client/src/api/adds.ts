import axios from "axios";
import http from "./index";

const getFavorites = () => http.get("/favorites");
const getPostId = (id) => axios.get(`http://localhost:3000/api/posts/${id}`);
const getUserAdds = () => http.get("/posts");
const postAdds = () => http.post("/posts/postInfos");
const getFakeAdds = () => axios.get("https://dummyjson.com/products?limit=100");
const deleteAdds = (id) => http.delete(`/posts/${id}`);
const deleteFavorite = (id) => http.delete(`/favorites/${id}`);
const updateAdds = (data) => {
  const id = data._id;
  return http.put(`/posts/${id}`, data);
};

export default {
  getFavorites,
  getPostId,
  getUserAdds,
  postAdds,
  getFakeAdds,
  deleteAdds,
  deleteFavorite,
  updateAdds,
};
