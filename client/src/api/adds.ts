import type { FakeAddInterface, UserAddInterface } from "@/shared/interfaces";
import axios, { type AxiosPromise } from "axios";
import http from "./index";

const getFakeAdds = async (): AxiosPromise<any> =>
  axios.get("https://dummyjson.com/products?limit=50");

const getUserAddById = async (id: string): AxiosPromise<FakeAddInterface> =>
  axios.get(`http://localhost:3000/api/posts/${id}`);

const getUserAdds = async (variable: any): Promise<any> => {
  try {
    let response = await axios.post(
      'http://localhost:3000/api/posts',
      variable
    );
    return response;
  } catch (err) {
    return "Erreur lors de vos annonces";
  }
};

const deleteUserAdd = async (variables: any): Promise<any> => {
  try {
    let response = await axios.post(
      'http://localhost:3000/api/posts/removeAdd',
      variables
    );
    return response;
  } catch (err) {
    return 'Erreur lors de la suppression du cocktail de vos favoris';
  }
};

const updateUserAdd = async (data: UserAddInterface): Promise<UserAddInterface> => {
  const id = data._id;
  return http.put(`/posts/${id}`, data);
};

const getFavorites = async (variable: any): Promise<any> => {
  try {
    let response = await axios.post(
      'http://localhost:3000/api/favorites',
      variable
    );
    return response;
  } catch (err) {
    return "Erreur lors de l'ajout du cocktail à vos favoris";
  }
};

const removeFromFavorites = async (variables: any): Promise<any> => {
  try {
    let response = await axios.post(
      'http://localhost:3000/api/favorites/removeFromFavorites',
      variables
    );
    return response;
  } catch (err) {
    return 'Erreur lors de la suppression du cocktail de vos favoris';
  }
};

export default {
  getFakeAdds,
  getUserAddById,
  getUserAdds,
  deleteUserAdd,
  updateUserAdd,
  getFavorites,
  removeFromFavorites,
};
