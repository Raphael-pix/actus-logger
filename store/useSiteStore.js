// store/useSiteStore.ts
import { create } from "zustand";



export const useSiteStore = create((set, get) => ({
  sites: [],
  fetched: false,
  fetchSites: async () => {
    if (get().fetched) return; // Don't fetch again if already done

    try {
      const res = await fetch("/api/sites-data");
      const data = await res.json();
      set({ sites: data.locations, fetched: true });
    } catch (err) {
      console.error("Failed to fetch sites:", err);
    }
  },
}));
