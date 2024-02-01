import { apiURL } from "@/constants";
import axios from "./axios";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const fetchAsyncCreators = async (page: number) => {
  const { data } = await axios.get(`${apiURL.creatorsURL}?key=${API_KEY}&page=${page}`);
  return data;
};
