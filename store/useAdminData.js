import { create } from "zustand";

export const useAdminStore = create((set) => ({
  data: null,
  loading: false,
  fetchData: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/admin-data");
      const result = await res.json();
      set({ data: result });
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      set({ loading: false });
    }
  },
}));
