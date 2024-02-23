import { authAxios } from "./useAxios";

export const createShortUrl = async (short_url, original_url) => {
  const response = await authAxios.post("/shortened-urls/", {
    short_url,
    original_url,
  });
  return response;
};

export const getUrls = async () => {
  const response = await authAxios.get("/shortened-urls");
  return response;
};

export const deleteUrl = async (short_url) => {
  const response = await authAxios.delete("/shortened-urls/", {
    data: { short_url },
  });
  return response;
};
