import endPoint from "@/services/endPoint";
import axios from "axios";
export const BASE_URL = import.meta.env.VITE_API_URL;
// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
});

// Set initial token if available
const accessToken = localStorage.getItem("accessToken");
if (accessToken) {
  api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
}

// Token refresh implementation
let refreshTokenPromise = null;

const refreshToken = async () => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = (async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("accessToken");

        if (!refreshToken || !accessToken) throw new Error("No tokens found");

        const { data } = await api.post(endPoint.refresh, {
          refreshToken,
          accessToken,
        });

        localStorage.setItem("accessToken", data.accessToken);
        api.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`;
        return data.accessToken;
      } catch (error) {
        console.error(error);
        localStorage.clear();
        window.location.reload();
        return null;
      } finally {
        refreshTokenPromise = null;
      }
    })();
  }
  return refreshTokenPromise;
};

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Skip refresh if already retried or no response
    if (!error.response || originalRequest._retry) {
      return Promise.reject(error);
    }

    const isLoginOrRefresh =
      originalRequest.url.includes(endPoint.login) ||
      originalRequest.url.includes(endPoint.refresh);

    // Skip refresh logic for login or refresh endpoint
    if (error.response.status === 401 && !isLoginOrRefresh) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();

      if (newAccessToken && originalRequest.headers) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      }
    }

    if (error.response.status === 403) {
      localStorage.clear();
      window.location.reload();
    }

    return Promise.reject(error);
  },
);

export default api;
