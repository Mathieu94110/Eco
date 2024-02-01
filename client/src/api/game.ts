import { apiURL } from "@/constants";
import axios from "./axios";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const fetchAsyncGames = async (page: number) => {
  const { data } = await axios.get(`${apiURL.gamesURL}?key=${API_KEY}&page=${page}`);
  return data;
};

export const fetchAsyncGameDetails = async (id:any) => {
  const { data } = await axios.get(`${apiURL.gamesURL}/${id}?key=${API_KEY}`);
  return data;
};
