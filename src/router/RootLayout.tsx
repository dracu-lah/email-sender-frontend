import { Outlet } from "react-router";
import Header from "@/components/Header";
import { Suspense } from "react";
import PageLoader from "@/components/loaders/PageLoader";
import Sidebar from "@/components/SideMenu/SideBar";
import ScrollToTop from "./ScrollToTop";
import useAuthStore from "@/store/useAuthStore";

const RootLayout = () => {
  const { accessToken } = useAuthStore();
  return (
    <main className="flex min-h-screen flex-col justify-between bg-background font-sans">
      <Header />
      <div className="flex flex-1">
        {/* {accessToken && <Sidebar />} */}
        <Suspense fallback={<PageLoader />}>
          <div className=" flex-1 ">
            <Outlet />
          </div>
        </Suspense>
      </div>
      <ScrollToTop />
    </main>
  );
};
export default RootLayout;
