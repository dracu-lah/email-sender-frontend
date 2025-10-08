import AccessDisabled from "@/components/AcessDisabled";
import { GetPermissionsAPI } from "@/services/api";
import useAuthStore from "@/store/useAuthStore";
import { permissionBased } from "@/utils/constants";
import { useQuery } from "@tanstack/react-query";

// Helper function to find menu item and its permissions recursively
const findMenuItemAndPermissions = (key, items = []) => {
  for (const item of items) {
    if (item.key === key) {
      return {
        isEnabled: item.isEnabled,
        availablePermissions: item.availablePermissions || [],
        permissions: item.permissions || [],
      };
    }
    if (item.submenus?.length) {
      const found = findMenuItemAndPermissions(key, item.submenus);
      if (found) return found;
    }
  }
  return null;
};

// Custom hook to fetch and manage menu configuration
export const useMenuConfig = () => {
  const { data } = useAuthStore();
  return useQuery({
    queryKey: ["menuConfig"],
    queryFn: () => GetPermissionsAPI({ RoleName: data.roleName }),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    cacheTime: 30 * 60 * 1000, // Keep in cache for 30 minutes
  });
};

// Custom hook to get permissions for a specific page
export const usePagePermissions = (pageKey) => {
  const { data: menuConfig, isLoading, error } = useMenuConfig();

  if (isLoading) {
    return {
      isLoading,
      error: null,
      isEnabled: false,
      availablePermissions: [],
      permissions: [],
    };
  }

  if (error) {
    return {
      isLoading: false,
      error,
      isEnabled: false,
      availablePermissions: [],
      permissions: [],
    };
  }

  const menuItem = findMenuItemAndPermissions(pageKey, menuConfig.data);

  return {
    isLoading: false,
    error: null,
    isEnabled: menuItem?.isEnabled ?? false,
    availablePermissions: menuItem?.availablePermissions ?? [],
    permissions: menuItem?.permissions ?? [],
  };
};

// Loading component for when permissions are being fetched
const LoadingState = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Please wait while we check your access.
      </p>
    </div>
  </div>
);

// Error component for when permission fetching fails
const ErrorState = ({ error }) => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-red-700">Error</h2>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        {error?.message || "An error occurred while checking permissions."}
      </p>
    </div>
  </div>
);

// Wrapper component to handle page access
const PageAccessWrapper = ({ pageKey, children, NoAccessComponent }) => {
  const { isLoading, error, isEnabled } = usePagePermissions(pageKey);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (permissionBased)
    if (!isEnabled) {
      return NoAccessComponent ? <NoAccessComponent /> : <AccessDisabled />;
    }

  return children;
};
// HOC to wrap components with page access check
export const withPageAccess = (
  WrappedComponent,
  pageKey,
  NoAccessComponent = null,
) => {
  return function WithPageAccessComponent(props) {
    return (
      <PageAccessWrapper
        pageKey={pageKey}
        NoAccessComponent={NoAccessComponent}
      >
        <WrappedComponent {...props} />
      </PageAccessWrapper>
    );
  };
};
