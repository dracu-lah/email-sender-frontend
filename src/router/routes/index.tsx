import { lazy } from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import ErrorPage from "@/pages/error-page";
import { privateRoutes } from "./privateRoutes";
import { publicRoutes } from "./publicRoutes";
import RootLayout from "../RootLayout";
import routePath from "../routePath";
import useAuthStore from "@/store/useAuthStore";

// Auth Page Import
const LoginPage = lazy(() => import("@/pages/auth/login"));

const Routes = () => {
  const { accessToken } = useAuthStore();

  // Define routes accessible only to non-authenticated users
  const authRoutes = [
    {
      path: routePath.login,
      element: <LoginPage />,
    },
  ].map((route) => ({
    ...route,
    element: accessToken ? <Navigate to={routePath.home} /> : route.element,
  }));
  // Combine and conditionally include routes based on authentication status
  const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: <RootLayout />,
      children: [...publicRoutes, ...authRoutes, ...privateRoutes],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
