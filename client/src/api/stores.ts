import { apiURL } from "@/constants";
import axios from "./axios";
const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

export const fetchAsyncStores = async () => {
  const { data } = await axios.get(`${apiURL.storesURL}?key=${API_KEY}`);
  return data;
};

export const fetchAsyncStoreDetails = async (id) => {
  const { data } = await axios.get(`${apiURL.storesURL}/${id}?key=${API_KEY}`);
  return data;
};
