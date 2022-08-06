import { http } from "./index";

export const getProfile = () => {
  return http.get("/user/infos");
};

export default {
  getProfile,
};
