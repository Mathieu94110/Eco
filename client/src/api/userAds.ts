import type { UserInterface, UserAdInterface } from "@/shared/interfaces";
const apiUrl = "http://localhost:3000/api";

const userAdsRequest = async <TResponse>(url: string, body: object): Promise<TResponse> => {
  const data = await fetch(url, body);
  const response = await data.json();
  return response.posts;
};

const userAdsRequestById = async <TResponse>(url: string, id: string): Promise<TResponse> => {
  const data = await fetch(`${url}/posts/${id}`);
  const response = await data.json();
  return response;
};

const UserAdsApi = {
  getUserAds: <TResponse>(url: string, body: { userFrom: string }) =>
    userAdsRequest<TResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),

  AddToUserAds: <TResponse>(url: string, body: Partial<UserAdInterface>) =>
    userAdsRequest<TResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),

  updateUserAd: <TResponse>(url: string, body: Partial<UserAdInterface>) =>
    userAdsRequest<TResponse>(`${url}/${body._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  deleteUserAd: <TResponse>(url: string, body: Partial<UserAdInterface>) =>
    userAdsRequest<TResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  getUserAdById: <TResponse>(url: string, id: string) => userAdsRequestById<TResponse>(url, id),
};

export const getAds = async (variable: { userFrom: string }): Promise<UserAdInterface[]> =>
  await UserAdsApi.getUserAds(`${apiUrl}/posts`, variable);
export const getAdById = async (id: string): Promise<UserInterface> =>
  await UserAdsApi.getUserAdById<UserAdInterface>(apiUrl, id);
export const updateAd = async (variable: UserAdInterface): Promise<void> =>
  await UserAdsApi.updateUserAd(`${apiUrl}/posts`, variable);
export const deleteAd = async (variables: Partial<UserAdInterface>): Promise<void> =>
  await UserAdsApi.deleteUserAd(`${apiUrl}/posts/removeAd`, variables);
export const addToAds = async (variables: Partial<UserAdInterface>): Promise<void> =>
  await UserAdsApi.AddToUserAds(`${apiUrl}/posts/postInfos`, variables);
