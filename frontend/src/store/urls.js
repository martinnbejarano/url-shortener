import { create } from "zustand";
import { createShortUrl } from "../api/urls";
import { toast } from "react-toastify";
import { deleteUrl } from "../api/urls";

export const useUrlsStore = create((set) => ({
  urls: [],

  setUrls: (newUrls) => set({ urls: newUrls }),

  createShortLink: async (shortUrl, originalUrl) => {
    try {
      const response = await createShortUrl(shortUrl, originalUrl);
      console.log(response);
      set((state) => ({
        urls: [...state.urls, response.data],
      }));
      toast.success("URL created successfully");
    } catch (e) {
      toast.error(e.response?.data?.error || "An error occurred");
    }
  },

  deleteShortLink: async (shortUrlToDelete) => {
    try {
      await deleteUrl(shortUrlToDelete);

      set((state) => ({
        urls: state.urls.filter((url) => url.short_url !== shortUrlToDelete),
      }));

      toast.info("URL deleted successfully");
    } catch (e) {
      toast.error(e.message);
      console.log(e);
    }
  },
}));
