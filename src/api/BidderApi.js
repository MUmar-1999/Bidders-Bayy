import axios from "axios";
import { getItemAsync } from "expo-secure-store";

export const BASE_URL = "https://api.biddersbay.online";

export default BidderApi = axios.create({
  baseURL: BASE_URL,
});

BidderApi.interceptors.request.use(async function (config) {
  const token = await getItemAsync("token");
  if (!token) return config;

  config.headers["Authorization"] = JSON.parse(token);

  return config;
});
