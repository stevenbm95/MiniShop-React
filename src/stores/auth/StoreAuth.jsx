import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { jwtDecode } from "jwt-decode";

const useSotreAuth = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isRegister: false,
      setToken: (token) => {
        const decoded = jwtDecode(token);
        set({ token, user: decoded.user });
      },
      logout: () => set({ token: null, user: null }),
      isAuthenticated: () => {
        return {
          isAuth: !!get().token,
          user: get().user,
        };
      },
      setIsRegister: (state) => set({ isRegister: state }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useSotreAuth;
