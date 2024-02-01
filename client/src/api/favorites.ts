import type { FakeAdInterface, UserAdInterface, FavoritesFetchResponseInterface } from "@/shared/interfaces";
const apiUrl = "http://localhost:84/api";

const userFavoritesRequest = async <TResponse>(url: string, body?: object): Promise<TResponse> => {
  const data = await fetch(url, body);
  const response = await data.json();
  if (response.posts) {
    return response.posts;
  } else if (response.favorites) {
    return response.favorites;
  } else {
    return response;
  }
};

const UserFavoritesApi = {
  getUserFavorites: <TResponse>(url: string) => userFavoritesRequest<TResponse>(`${url}`),

  addToUserFavorites: <TResponse>(url: string, body: UserAdInterface) =>
    userFavoritesRequest<TResponse>(`${url}/addToFavorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),

  removeFromUserFavorites: <TResponse>(url: string, body: UserAdInterface) =>
    userFavoritesRequest<TResponse>(`${url}/removeFromFavorites`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
};

export const getFavorites = async (userFrom: string): Promise<FakeAdInterface[]> =>
  await UserFavoritesApi.getUserFavorites(`${apiUrl}/favorites/getFavoredAds/` + userFrom);
  
export const removeFromFavorites = async (
  variables: Partial<UserAdInterface>,
): Promise<FavoritesFetchResponseInterface> =>
  await UserFavoritesApi.removeFromUserFavorites(`${apiUrl}/favorites`, variables);
export const addToFavorites = async (variables: Partial<UserAdInterface>): Promise<void> =>
  await UserFavoritesApi.addToUserFavorites(`${apiUrl}/favorites`, variables);
