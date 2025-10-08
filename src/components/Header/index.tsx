import Logo from "./Logo";
import { SideSheet } from "../SideMenu/SideSheet";
import { isTesting } from "@/utils/constants";
import RouteSearch from "./RouteSearch";
import { ModeToggle } from "../Theme/mode-toggle";
import useAuthStore from "@/store/useAuthStore";
import UserProfileDropdown from "./UserProfileDropDown";
function AuthenticatedNavLinks() {
  return (
    <div className="flex items-center gap-x-2 md:gap-x-4">
      {/* <RouteSearch /> */}
      <UserProfileDropdown />
    </div>
  );
}
const Header = () => {
  const { accessToken } = useAuthStore();

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur-lg">
      <div className="flex items-center justify-between px-4 pt-4 sm:py-2 md:px-8">
        <div className="flex items-center justify-center gap-x-2">
          {accessToken && <SideSheet />}
          <Logo />
        </div>
        <div className="flex gap-4 items-center">
          {isTesting && (
            <h1 className="hidden sm:block text-xl font-semibold  text-red-700">
              Test Instance
            </h1>
          )}
          {accessToken && <AuthenticatedNavLinks />}
          <ModeToggle />
        </div>
      </div>
      {isTesting && (
        <h1 className="text-sm text-center mb-1 sm:hidden  text-red-700">
          Test Instance
        </h1>
      )}
    </header>
  );
};

export default Header;
