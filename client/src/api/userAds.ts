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
  getAds: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    userAdsRequest<TResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  updateAd: <TResponse>(url: string, body: UserAdInterface) =>
    userAdsRequest<TResponse>(`${url}/${body._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  deleteFromAds: <TResponse>(url: string, body: UserAdInterface) =>
    userAdsRequest<TResponse>(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }),
  getAdById: <TResponse>(url: string, id: string) => userAdsRequestById<TResponse>(url, id),
};

export const getUserAds = async (variable: { userFrom: string }): Promise<UserAdInterface[]> =>
  await UserAdsApi.getAds(`${apiUrl}/posts`, variable);
export const getUserAdById = async (id: string): Promise<UserInterface> =>
  await UserAdsApi.getAdById<UserAdInterface>(apiUrl, id);
export const updateUserAd = async (variable: UserAdInterface): Promise<void> =>
  await UserAdsApi.updateAd(`${apiUrl}/posts`, variable);
export const deleteUserAd = async (variables: Partial<UserAdInterface>): Promise<void> =>
  await UserAdsApi.deleteFromAds(`${apiUrl}/posts/removeAd`, variables);
