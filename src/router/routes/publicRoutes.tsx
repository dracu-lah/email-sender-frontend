import { lazy } from "react";
import routePath from "../routePath";

const AboutPage = lazy(() => import("@/pages/public/about"));

export const publicRoutes = [
  {
    path: "/",
    children: [
      {
        path: routePath.aboutUs,
        element: <AboutPage />,
      },
    ],
  },
];
