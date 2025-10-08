import { create } from "zustand";
import api from "@/configs/axios";
import {
  decryptFromStorage,
  encryptForStorage,
} from "@/utils/functions/cryptoUtils";

/**
 * Zustand store for authentication.
 */
const useAuthStore = create((set) => ({
  /** JWT access token */
  accessToken: localStorage.getItem("accessToken"),

  /** JWT refresh token */
  refreshToken: localStorage.getItem("refreshToken"),

  /** User data (decrypted) */
  data: localStorage.getItem("data")
    ? decryptFromStorage(localStorage.getItem("data"))
    : null,

  /**
   * Sets authentication tokens and user data (encrypted).
   * @param {Object} payload - The auth data.
   */
  setToken: ({ accessToken, refreshToken, data = {} }) => {
    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("data", encryptForStorage(JSON.stringify(data))); // Encrypt user data
    set({ accessToken, refreshToken, data });
  },

  /**
   * Clears authentication tokens and user data.
   */
  clearToken: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("data");
    set({ accessToken: null, refreshToken: null, data: null });
  },
}));

export default useAuthStore;
