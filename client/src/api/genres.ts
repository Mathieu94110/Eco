import { apiURL } from "@/constants";
import axios from "./axios";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const fetchAsyncGenres = async (page = 1) => {
  const { data } = await axios.get(`${apiURL.genresURL}?key=${API_KEY}&page=${page}`);
  return data;
};
