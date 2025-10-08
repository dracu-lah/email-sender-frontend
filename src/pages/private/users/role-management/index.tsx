import RolesList from "./RolesList";
import CreateRoleDialog from "./CreateRoleDialog";
import SearchBar from "@/components/SearchBar";
import { GetRolesAPI } from "@/services/api";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { withPageAccess } from "@/hooks/usePagePermisssions";
import menuKeys from "@/utils/constants/menuKeys";

const roles = {
  status: "Success",
  totalRows: 19, // Still include the total count for context
  data: [
    {
      id: 1,
      roleName: "admin",
      description: "Full system access", // Added a potential description field
      createdAt: "2023-10-27T10:00:00Z", // Added a timestamp
    },
    {
      id: 2,
      roleName: "user",
      description: "Standard user privileges",
      createdAt: "2023-10-27T10:05:00Z",
    },
    {
      id: 9,
      roleName: "Merchant",
      description: "Access to merchant specific functions",
      createdAt: "2023-10-27T10:15:00Z",
    },
    {
      id: 11,
      roleName: "Manager",
      description: "Manages teams and operations",
      createdAt: "2023-10-27T10:20:00Z",
    },
  ],
  // Potentially add pagination information
  pagination: {
    currentPage: 1,
    itemsPerPage: 4,
  },
};
const RoleManagementPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = searchParams.get("filter");
  // const {
  //   data: roles,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["GetRolesAPI", filter],
  //   queryFn: () => GetRolesAPI({ filter }),
  // });

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex justify-between p-8">
          <h1 className="text-2xl font-semibold">Roles</h1>
          <SearchBar />
          <CreateRoleDialog />
        </div>
      </div>
      <div className="my-4 mb-24 space-y-2 px-4">
        {roles && <RolesList roles={roles.data} />}
      </div>
    </div>
  );
};

export default withPageAccess(RoleManagementPage, menuKeys.ROLE_MANAGEMENT);
// export default RoleManagementPage;
