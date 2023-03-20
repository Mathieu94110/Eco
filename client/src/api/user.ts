import type { UserForm } from "@/shared/interfaces";

const userApi = "http://localhost:80/api/user";

export const login = async (loginForm: UserForm): Promise<UserForm> => {
  const response = await fetch(`${userApi}/login`, {
    method: "POST",
    body: JSON.stringify(loginForm),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw await response.json();
  }
};

export const getProfile = async (id: string) => await fetch(`${userApi}/${id}`);

export const fetchCurrentUser = async (): Promise<UserForm | null> => {
  return await (await fetch(`${userApi}/current`)).json();
};

export const logout = async () => {
  await fetch(userApi, {
    method: "DELETE",
  });
};

export const createUser = async (newUser: UserForm) => {
  try {
    const response = await fetch(`${userApi}/signup`, {
      method: "POST",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      return response.json();
    } else {
      throw await response.json();
    }
  } catch (e) {
    throw e;
  }
};

export const updateUserInfos = async (data: UserForm) => {
  await fetch(`${userApi}/${data._id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};
