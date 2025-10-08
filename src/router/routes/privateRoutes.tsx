import { lazy } from "react";
import routePath from "../routePath";
import { ProtectedRoute } from "../ProtectedRoute";

const HomePage = lazy(() => import("@/pages/private/home"));
const UserManagementPage = lazy(
  () => import("@/pages/private/users/user-management"),
);
const RolePage = lazy(() => import("@/pages/private/users/role-management"));
const ManageRolePage = lazy(
  () => import("@/pages/private/users/role-management/slug"),
);

// Private routes definition
export const privateRoutes = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: routePath.userManagement,
        children: [
          {
            index: true,
            element: <UserManagementPage />,
          },
        ],
      },
      {
        path: routePath.roleManagement,
        children: [
          {
            index: true,
            element: <RolePage />,
          },
          {
            path: ":id",
            element: <ManageRolePage />,
          },
        ],
      },
    ],
  },
];
