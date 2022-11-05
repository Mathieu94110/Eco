import axios from 'axios';
import { http } from './index';

export const getPosts = () => axios.get('/api/posts');
export const getFavorites = () => http.get('/favorites');

export const getPostId = (id) => axios.get(`${process.env.VUE_APP_API_URL}/posts/${id}`);

export const getUserAdds = () => http.get('/posts');

export const postAdds = () => http.post('/posts/postInfos');

export const getFakeAdds = () => axios.get('https://dummyjson.com/products?limit=100');

export const deleteAdds = (id) => http.delete(`/posts/${id}`);

export const deleteFavorite = (id) => http.delete(`/favorites/${id}`);

export const updateAdds = (data) => {
  const id = data._id;
  return http.put(`/posts/${id}`, data);
};

export default {
  getFakeAdds,
  getUserAdds,
  getPostId,
  deleteAdds,
  updateAdds,
  getFavorites,
};
