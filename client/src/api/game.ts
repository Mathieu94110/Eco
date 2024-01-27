import { apiURL } from "@/constants";
import axios from "./axios";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const fetchAsyncGames = async (page = 1) => {
  const { data } = await axios.get(`${apiURL.gamesURL}?key=${API_KEY}&page=${page}`);
  return data;
};

export const fetchAsyncGameDetails = async (id) => {
  const { data } = await axios.get(`${apiURL.gamesURL}/${id}?key=${API_KEY}`);
  return data;
};
