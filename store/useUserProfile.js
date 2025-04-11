import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserProfile = create(
  persist(
    (set) => ({
      profile: null,
      loading: false,
      fetchProfile: async () => {
        set({ loading: true });
        try {
          const res = await fetch("/api/auth/profile", {
            method: "GET",
          });
          const result = await res.json();
          if (!res.ok) {
            if (res.status === 401 || res.status === 404) {
              set({ profile: null });
              return;
            }
            throw new Error(result.error || "Failed to fetch profile");
          }
          set({ profile: result.profile });
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          set({ loading: false });
        }
      },
      deleteProfile: () => {
        set({ profile: null });
      },
    }),
    {
      name: "user-profile-storage", // 🔒 localStorage key
      partialize: (state) => ({ profile: state.profile }), // ✅ only persist profile, not loading
    }
  )
);
