import { useState, useMemo, useEffect, useCallback, Fragment } from "react";
import { Search, X, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { menuConfig, reduceMenuItems } from "../SideMenu/menuConfig";
import { useMenuConfig } from "@/hooks/usePagePermisssions";
import { Skeleton } from "../ui/skeleton";
import { permissionBased } from "@/utils/constants";

// RouteItem Component
const RouteItem = ({ route, index, selectedIndex, onClick }) => (
  <Button
    key={route.route}
    id={`route-item-${index}`}
    variant="ghost"
    className={`w-full justify-start text-left ${
      index === selectedIndex ? "bg-gray-100 dark:bg-white/10" : ""
    } flex items-center rounded-md p-2 transition-colors`}
    onClick={() => onClick(route)}
    role="option"
    aria-selected={index === selectedIndex}
  >
    {route.icon && <route.icon className="mr-2 h-5 w-5 text-gray-500" />}
    <span className="flex-1">{route.label}</span>
    <ArrowRight className="h-4 w-4 text-gray-400" />
  </Button>
);

// Loading state component
const RouteSearchLoading = () => (
  <div className="w-full space-y-2">
    {Array.from({ length: 6 }).map((_, index) => (
      <div key={index} className="flex items-center gap-4 px-3 py-2">
        <Skeleton className="h-8 w-12 rounded-md" />
        <Skeleton className="h-8 w-full" />
      </div>
    ))}
  </div>
);

// Helper function to flatten menu items
const flattenMenuItems = (items) => {
  const flattened = [];

  const processItem = (item) => {
    // Add direct routes
    if (item.route) {
      flattened.push({
        label: item.label,
        route: item.route,
        icon: item.icon,
      });
    }

    // Process first level submenus
    if (item.subMenu) {
      item.subMenu.forEach((subItem) => {
        if (subItem.route) {
          flattened.push({
            label: `${item.label} > ${subItem.label}`,
            route: subItem.route,
            icon: item.icon,
          });
        }

        // Process second level submenus
        if (subItem.subMenu) {
          subItem.subMenu.forEach((nestedItem) => {
            if (nestedItem.route) {
              flattened.push({
                label: `${item.label} > ${subItem.label} > ${nestedItem.label}`,
                route: nestedItem.route,
                icon: item.icon,
              });
            }
          });
        }
      });
    }
  };

  items.forEach(processItem);
  return flattened;
};

// Main RouteSearch Component
export const RouteSearch = () => {
  const { data: menuConfigData, isLoading, error } = useMenuConfig();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Process menu items based on permissions
  const filteredMenuItems = useMemo(() => {
    if (!menuConfigData?.data) return [];

    if (permissionBased) {
      return menuConfig
        .map((item) => reduceMenuItems(item, menuConfigData.data))
        .filter(Boolean);
    } else {
      return menuConfig;
    }
  }, [menuConfigData?.data]);

  // Flatten menu items
  const flattenedRoutes = useMemo(
    () => flattenMenuItems(filteredMenuItems),
    [filteredMenuItems],
  );

  // Filter routes based on search term
  const filteredRoutes = useMemo(() => {
    if (!searchTerm) return flattenedRoutes.slice(0, 10); // Show top 10 by default

    return flattenedRoutes.filter((route) =>
      route.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, flattenedRoutes]);

  // Handle navigation
  const navigateToRoute = useCallback((route) => {
    if (route) {
      window.location.href = route.route;
      setIsSearchOpen(false);
    }
  }, []);

  // Toggle search dialog
  const handleSearchToggle = useCallback(() => {
    setIsSearchOpen((prev) => !prev);
    if (isSearchOpen) {
      setSearchTerm("");
      setSelectedIndex(0);
    }
  }, [isSearchOpen]);

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (event) => {
      // Open search with Ctrl+K
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        setIsSearchOpen(true);
        return;
      }

      if (!isSearchOpen) return;

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, filteredRoutes.length - 1),
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          if (filteredRoutes[selectedIndex]) {
            event.preventDefault();
            navigateToRoute(filteredRoutes[selectedIndex]);
          }
          break;
        case "Escape":
          event.preventDefault();
          handleSearchToggle();
          break;
        default:
          break;
      }
    },
    [
      isSearchOpen,
      filteredRoutes,
      selectedIndex,
      navigateToRoute,
      handleSearchToggle,
    ],
  );

  // Set up keyboard event listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // If initial loading, show a button with loading state
  if (isLoading && !isSearchOpen) {
    return (
      <Button
        variant="ghost"
        size="icon"
        disabled
        aria-label="Loading routes"
        title="Loading routes"
      >
        <Skeleton className="h-5 w-5 rounded-full" />
      </Button>
    );
  }

  return (
    <Fragment>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleSearchToggle}
        aria-label="Search Routes (Ctrl+K)"
        title="Search Routes (Ctrl+K)"
      >
        <Search className="h-5 w-5" />
      </Button>

      <Dialog open={isSearchOpen} onOpenChange={handleSearchToggle}>
        <DialogContent
          className="sm:max-w-[600px]"
          aria-describedby="route-search-description"
        >
          <DialogHeader>
            <DialogTitle>Search Routes</DialogTitle>
            <p id="route-search-description" className="text-sm text-gray-500">
              Navigate quickly through the application. Use arrow keys to
              navigate, Enter to select, Esc to close.
            </p>
          </DialogHeader>

          {isLoading ? (
            <RouteSearchLoading />
          ) : error ? (
            <div className="p-4 text-red-500">Error loading menu items</div>
          ) : (
            <>
              <div className="flex items-center space-x-2">
                <Search className="text-gray-400" />
                <Input
                  placeholder="Search routes..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setSelectedIndex(0);
                  }}
                  className="flex-1"
                  aria-autocomplete="list"
                  aria-controls="route-list"
                  aria-activedescendant={`route-item-${selectedIndex}`}
                  autoFocus
                />
                {searchTerm && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSearchTerm("")}
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <ScrollArea
                id="route-list"
                className="mt-4 max-h-[300px] overflow-y-auto"
                role="listbox"
              >
                {filteredRoutes.length > 0 ? (
                  filteredRoutes.map((route, index) => (
                    <RouteItem
                      key={`${route.route}-${index}`}
                      route={route}
                      index={index}
                      selectedIndex={selectedIndex}
                      onClick={navigateToRoute}
                    />
                  ))
                ) : (
                  <div className="mt-4 text-center text-gray-500" role="alert">
                    No routes found
                  </div>
                )}
              </ScrollArea>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

export default RouteSearch;
