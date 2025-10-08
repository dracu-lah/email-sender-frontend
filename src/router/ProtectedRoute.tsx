import { Navigate, Outlet } from "react-router";
import useAuthStore from "@/store/useAuthStore";
import useIdleLogout from "@/hooks/useIdleLogout";

export const ProtectedRoute = () => {
  const { accessToken } = useAuthStore();

  useIdleLogout();

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};
