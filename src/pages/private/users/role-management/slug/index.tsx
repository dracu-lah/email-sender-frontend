// UserRoleSettingsPage.jsx
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { AlertCircle, Save, X } from "lucide-react";
import GeneralTab from "./GeneralTab";
import PermissionsTab from "./PermissionsTab";
import menuKeys from "@/utils/constants/menuKeys";
import { useMenuConfig, withPageAccess } from "@/hooks/usePagePermisssions";
import { GetPermissionsAPI, UpdatePermissionsAPI } from "@/services/api";
import showErrorAlert from "@/utils/functions/showErrorAlert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuthStore from "@/store/useAuthStore";
import { useParams } from "react-router";
import { toast } from "sonner";

const UserRoleSettingsPage = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: authData } = useAuthStore();
  const {
    data: menuConfig,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["GetPermissionsAPI", id],
    queryFn: () => GetPermissionsAPI({ RoleName: id }),
  });
  const [changes, setChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("permissions");
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [initialState, setInitialState] = useState({
    roleName: "",
    roleDescription: "",
    menuItems: [],
  });

  // Initialize menuItems when menuConfig loads
  useEffect(() => {
    if (menuConfig?.data) {
      const initialMenuItems = JSON.parse(JSON.stringify(menuConfig.data));
      setMenuItems(initialMenuItems);
      setInitialState((prev) => ({
        ...prev,
        menuItems: initialMenuItems,
      }));
    }
  }, [menuConfig]);

  const handleChange = () => setChanges(true);

  const handleGeneralChange = (field, value) => {
    if (field === "roleName") setRoleName(value);
    if (field === "roleDescription") setRoleDescription(value);
    handleChange();
  };

  const handlePermissionChange = (key, newAssigned, isEnabled = null) => {
    setMenuItems((prev) => {
      const updateItem = (items) => {
        return items.map((item) => {
          if (item.key === key) {
            const updatedItem = { ...item };
            if (isEnabled !== null) {
              updatedItem.isEnabled = isEnabled;
              if (!isEnabled && updatedItem.permissions) {
                updatedItem.permissions = [];
              }
            } else if (newAssigned !== undefined) {
              updatedItem.permissions = newAssigned;
            }
            return updatedItem;
          }
          if (item.submenus?.length) {
            return { ...item, submenus: updateItem(item.submenus) };
          }
          return item;
        });
      };
      return updateItem(prev);
    });
    handleChange();
  };

  const mutation = useMutation({
    mutationFn: UpdatePermissionsAPI,
    onSuccess: () => {
      // Assuming toast is available in the scope
      toast.success("Updated Successfully");
      queryClient.invalidateQueries(["GetPermissionsAPI"]);
      setChanges(false);
      setInitialState({
        roleName,
        roleDescription,
        menuItems: JSON.parse(JSON.stringify(menuItems)),
      });
    },
    onError: ({ response }) => {
      showErrorAlert(response.data);
    },
  });

  const handleApply = () => {
    if (!id) return;
    mutation.mutate({
      data: menuItems,
      RoleName: id,
      Status: "",
    });
  };

  const handleCancel = () => {
    setRoleName(initialState.roleName);
    setRoleDescription(initialState.roleDescription);
    setMenuItems(JSON.parse(JSON.stringify(initialState.menuItems)));
    setChanges(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading menu configuration</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold">User Role Settings - {id}</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 hidden space-x-4">
          <TabsTrigger
            value="general"
            className="px-4 py-2 text-sm font-medium"
          >
            General
          </TabsTrigger>
          <TabsTrigger
            value="permissions"
            className="px-4 py-2 text-sm font-medium"
          >
            Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <GeneralTab
            roleName={roleName}
            roleDescription={roleDescription}
            onChange={handleGeneralChange}
          />
        </TabsContent>

        <TabsContent value="permissions">
          <PermissionsTab
            menuItems={menuItems}
            onPermissionChange={handlePermissionChange}
          />
        </TabsContent>
      </Tabs>

      {changes && (
        <div className="fixed bottom-0 left-0 right-0 flex items-center justify-between border-t border-gray-200 bg-background p-4 shadow-lg">
          <div className="flex items-center">
            <AlertCircle className="mr-2 text-yellow-500" />
            <span className="text-sm text-gray-700">
              You have unsaved changes
            </span>
          </div>
          <div className="flex">
            <Button
              onClick={handleCancel}
              variant="outline"
              className="mr-3 flex items-center"
            >
              <X className="mr-2 h-4 w-4" /> Cancel
            </Button>
            <Button
              onClick={handleApply}
              className="flex items-center"
              disabled={mutation.isPending}
            >
              <Save className="mr-2 h-4 w-4" />
              {mutation.isPending ? "Saving..." : "Apply Changes"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default withPageAccess(UserRoleSettingsPage, menuKeys.ROLE_MANAGEMENT);
