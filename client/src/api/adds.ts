import type { UserAddInterface } from "@/shared/interfaces";

const api = "http://localhost:3000/api";

export const getFakeAdds = async (): Promise<any> => await fetch("https://dummyjson.com/products?limit=50");

export const getUserAddById = async (id: string): Promise<any> => await fetch(`http://localhost:3000/api/posts/${id}`)

export const getUserAdds = async (variable: any): Promise<any> => await fetch(`${api}/posts`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(variable)
});

export const deleteUserAdd = async (variables: any): Promise<any> =>
  await fetch(`${api}/posts/removeAdd`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(variables)
  });

export const updateUserAdd = async (data: UserAddInterface): Promise<any> =>
  await fetch(
    `${api}/posts/${data._id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

export const getFavorites = async (variable: any): Promise<any> =>
  await fetch(`${api}/favorites`, {
    method: "POST",
    body: JSON.stringify(variable),
    headers: {
      "Content-Type": "application/json"
    },
  });

export const removeFromFavorites = async (variables: any): Promise<any> =>
  await fetch(`${api}/favorites/removeFromFavorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(variables)
  });