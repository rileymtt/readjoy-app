import asyncStorage from "@/helpers/async-storage";
import { ACCESS_TOKEN_KEY } from "@/settings";

export const isLoggedIn = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY) != null;
};

export const logout = () => {
  asyncStorage.remove(ACCESS_TOKEN_KEY);
};

export const setAccessToken = async (accessToken: string) => {
  await asyncStorage.set(ACCESS_TOKEN_KEY, accessToken);
};

export const getAccessToken = async () => {
  const accessToken = await asyncStorage.get(ACCESS_TOKEN_KEY);
  if (!accessToken) return null;
  return accessToken;
};
