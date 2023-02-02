const userApi = "http://localhost:3000/api/user";

export const getProfile = async (id: string) => await fetch(`${userApi}/${id}`);

export const updateUserInfos = async (data: any) => {

  await fetch(
    `${userApi}/${data._id}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
};
