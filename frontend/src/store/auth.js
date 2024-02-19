import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      access: "",
      refresh: "",
      isAuth: false,
      setToken: (access, refresh) =>
        set(() => ({
          access,
          refresh,
          isAuth: !!access && !!refresh,
        })),
      logout: () => set(() => ({ access: "", refresh: "", isAuth: false })),
    }),
    {
      name: "auth",
    }
  )
);
