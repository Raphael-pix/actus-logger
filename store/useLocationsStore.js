import { create } from "zustand";
import { jwtDecode } from "jwt-decode";

function getUserIdFromToken(token) {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return  decoded?.id || null;
  } catch (err) {
    console.error("Failed to decode token:", err);
    return null;
  }
}

export const useLocationsStore = create((set, get) => ({
  sites: [],
  fetched: false,
  fetchSites: async (token) => {
    if (get().fetched) return;

    const userId = getUserIdFromToken(token);
    if (!userId) {
      console.warn("No user ID found in token.");
      return;
    }

    try {
      const res = await fetch(`/api/users/get-locations/${userId}`);
      const data = await res.json();
      set({ sites: data, fetched: true });
    } catch (err) {
      console.error("Failed to fetch sites:", err);
    }
  },
}));
