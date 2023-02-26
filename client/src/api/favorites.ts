import type { FakeAdInterface, UserAdInterface } from "@/shared/interfaces";
const apiUrl = "http://localhost:3000/api";

const userFavoritesRequest = async <TResponse>(url: string, body: object): Promise<TResponse> => {
  const data = await fetch(url, body);
  const response = await data.json();
  return response.posts;
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

  deleteFromFavorites: <TResponse>(url: string, body: UserAdInterface) =>
    userFavoritesRequest<TResponse>(`${url}/removeFromFavorites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
};

export const getFavorites = async (variable: { userFrom: string }): Promise<FakeAdInterface[]> =>
  await UserFavoritesApi.getFavorites(`${apiUrl}/favorites`, variable);
export const removeFromFavorites = async (variables: Partial<UserAdInterface>): Promise<void> =>
  await UserFavoritesApi.deleteFromFavorites(`${apiUrl}/favorites`, variables);
