import type { FakeAddInterface, UserAddInterface } from "@/shared/interfaces";
import axios, { type AxiosPromise } from "axios";
import http from "./index";

const getFavorites = async (): Promise<UserAddInterface[]> =>
  http.get("/favorites");
const getPostId = async (id: string): AxiosPromise<FakeAddInterface> =>
  axios.get(`http://localhost:3000/api/posts/${id}`);
const getUserAdds = async (): Promise<UserAddInterface[]> => http.get("/posts");
const getFakeAdds = async (): AxiosPromise<FakeAddInterface[]> =>
  axios.get("https://dummyjson.com/products?limit=100");
const deleteAdds = async (id: string): Promise<UserAddInterface> =>
  http.delete(`/posts/${id}`);
const deleteFavorite = async (id: string): Promise<FakeAddInterface> =>
  http.delete(`/favorites/${id}`);
const updateAdd = async (data: UserAddInterface): Promise<UserAddInterface> => {
  const id = data._id;
  return http.put(`/posts/${id}`, data);
};

export default {
  getFavorites,
  getPostId,
  getUserAdds,
  getFakeAdds,
  deleteAdds,
  deleteFavorite,
  updateAdd,
};
