import { useAuthStore } from "../store/auth";
import axios from "axios";
import * as jwt_decode from "jwt-decode";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export const logout = () => {
  useAuthStore.getState().logout();
  window.location.href = "/login";
};

export const axi = axios.create({
  baseURL,
});

export const authAxios = axios.create({
  baseURL,
  withCredentials: true,
});

authAxios.interceptors.request.use(async (request) => {
  const token = useAuthStore.getState().access;
  request.headers = {
    Authorization: `Bearer ${token}`,
  };

  const tokenDecoded = jwt_decode(token);
  const expiration = new Date(tokenDecoded.exp * 1000);
  const now = new Date();
  const fiveMin = 1000 * 60 * 5;

  if (expiration.getTime() - now.getTime() < fiveMin) {
    try {
      const response = await axi.post("/users/refresh/", {
        refresh: useAuthStore.getState().refresh,
      });

      useAuthStore
        .getState()
        .setToken(response.data.access, response.data.refresh);
      return response;
    } catch (error) {
      logout();
    }
  }
  return request;
});
