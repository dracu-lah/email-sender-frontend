import { useMenuConfig } from "@/hooks/usePagePermisssions";
import MenuItem from "./MenuItem";
import { menuConfig, reduceMenuItems } from "./menuConfig";
import { Skeleton } from "@/components/ui/skeleton";
import { devMode, permissionBased } from "@/utils/constants";

const MenuItems = () => {
  const { data: menuConfigData, isLoading, error } = useMenuConfig();
  if (isLoading) {
    return (
      <div className="w-full space-y-2">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="flex items-center gap-4 px-3 py-2">
            <Skeleton className="h-8 w-12 rounded-md" />
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    console.error("Error loading menu configuration:", error);
    return (
      <div className="w-full p-4 text-red-500">Error loading menu items</div>
    );
  }

  const filteredMenuItems = () => {
    if (permissionBased) {
      return menuConfig
        .map((item) => reduceMenuItems(item, menuConfigData.data))
        .filter(Boolean);
    } else {
      console.log("menuConfig", menuConfig);
      return menuConfig;
    }
  };
  return (
    <div className="w-full space-y-1">
      {filteredMenuItems().map((item, index) => (
        <MenuItem index={index} item={item} key={item.key || index} />
      ))}
    </div>
  );
};

export default MenuItems;
