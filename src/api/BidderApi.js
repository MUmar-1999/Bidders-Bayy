import axios from "axios";
import { getItemAsync } from "expo-secure-store";

export default BidderApi = axios.create({
  baseURL: "http://192.168.10.9",
});

BidderApi.interceptors.request.use(async function (config) {
  const token = await getItemAsync("token");
  if (!token) return config;

  config.headers["Authorization"] = token;

  return config;
});
