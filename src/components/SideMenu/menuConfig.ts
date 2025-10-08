import routePath from "@/router/routePath";
import { CircleUser, Home } from "lucide-react";

import menuKeys from "@/utils/constants/menuKeys";

export const menuConfig = [
  {
    key: menuKeys.HOME,
    icon: Home,
    label: "Home",
    route: routePath.home,
  },

  {
    key: menuKeys.USERS,
    icon: CircleUser,
    label: "Users",
    subMenu: [
      {
        key: menuKeys.ROLE_MANAGEMENT,
        label: "Manage Roles",
        route: routePath.roleManagement,
      },
      {
        key: menuKeys.USER_MANAGEMENT,
        label: "Manage Users",
        route: routePath.userManagement,
      },
    ],
  },
];

// Recursive function to find config item
const findConfigItem = (key, configArray) => {
  for (const config of configArray) {
    if (config.key === key) return config;
    if (config.submenus) {
      const found = findConfigItem(key, config.submenus);
      if (found) return found;
    }
  }
  return null;
};

// Reducer function to filter menu items based on config
export const reduceMenuItems = (menuItem, config) => {
  // Find corresponding config item
  const configItem = findConfigItem(menuItem.key, config);

  // If no config found or not enabled, filter out this item
  if (!configItem || !configItem.isEnabled) {
    return null;
  }

  // Handle submenu items
  if (menuItem.subMenu) {
    const filteredSubMenu = menuItem.subMenu
      .map((subItem) => reduceMenuItems(subItem, config))
      .filter(Boolean);

    // If no submenu items remain after filtering, filter out parent item
    if (filteredSubMenu.length === 0) {
      return null;
    }

    return {
      ...menuItem,
      subMenu: filteredSubMenu,
    };
  }

  // Return the item if it passes all checks
  return menuItem;
};
