import type { FakeAddInterface, UserInterface, UserAddInterface } from "@/shared/interfaces";
const apiUrl = "http://localhost:3000/api";

const dummyRequest = async <TResponse>(url: string): Promise<TResponse> => {
  const response = await fetch(url);
  const JSONresponse = await response.json();
  return JSONresponse.products;
};
const getUserRequest = async <TResponse>(url: string, id: string): Promise<TResponse> => {
  const data = await fetch(`${url}/posts/${id}`);
  const response = await data.json();
  return response;
};
const userAddsRequest = async <TResponse>(url: string, body: object): Promise<TResponse> => {
  const data = await fetch(url, body);
  const response = await data.json();
  return response.posts;
};
const userFavoritesRequest = async <TResponse>(url: string, body: object): Promise<TResponse> => {
  const data = await fetch(url, body);
  const response = await data.json();
  return response.posts;
};

const dummyApi = {
  get: <TResponse>(url: string) => dummyRequest<TResponse>(url),
};
const userApi = {
  getUserAddById: <TResponse>(url: string, id: string) => getUserRequest<TResponse>(url, id),
};
const UserAddsApi = {
  getAdds: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    userAddsRequest<TResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  updateAdd: <TResponse>(url: string, body: UserAddInterface) =>
    userAddsRequest<TResponse>(`${url}/${body._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  deleteFromAdds: <TResponse>(url: string, body: UserAddInterface) =>
    userAddsRequest<TResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
};
const UserFavoritesApi = {
  getFavorites: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    userFavoritesRequest<TResponse>(`${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }),

  deleteFromFavorites: <TResponse>(url: string, body: UserAddInterface) =>
    userAddsRequest<TResponse>(`${url}/removeFromFavorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
};

export const getFakeAdds = await dummyApi.get<FakeAddInterface[]>("https://dummyjson.com/products?limit=50");
export const getUserAddById = async (id: string): Promise<UserInterface> => await userApi.getUserAddById<UserAddInterface>(apiUrl, id);
export const getUserAdds = async (variable: { userFrom: string }): Promise<UserAddInterface[]> => await UserAddsApi.getAdds(`${apiUrl}/posts`, variable);
export const updateUserAdd = async (variable: UserAddInterface): Promise<void> => await UserAddsApi.updateAdd(`${apiUrl}/posts`, variable);
export const deleteUserAdd = async (variables: Partial<UserAddInterface>): Promise<void> => await UserAddsApi.deleteFromAdds(`${apiUrl}/posts/removeAdd`, variables);
export const getFavorites = async (variable: { userFrom: string }): Promise<FakeAddInterface[]> => await UserFavoritesApi.getFavorites(`${apiUrl}/favorites`, variable);
export const removeFromFavorites = async (variables: Partial<UserAddInterface>): Promise<void> => await UserFavoritesApi.deleteFromFavorites(`${apiUrl}/favorites`, variables);
