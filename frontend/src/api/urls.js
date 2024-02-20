import { authAxios } from "./useAxios";

export const createShortUrl = async (short_url, original_url) => {
  const response = await authAxios.post("shortened-urls/", {
    short_url,
    original_url,
  });
  return response;
};
