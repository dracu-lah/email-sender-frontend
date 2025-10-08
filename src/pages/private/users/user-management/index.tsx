import UsersList from "./UsersList";
import CreateUserDialog from "./CreateUserDialog";
import { GetUsersAPI } from "@/services/api";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { withPageAccess } from "@/hooks/usePagePermisssions";
import menuKeys from "@/utils/constants/menuKeys";
import PaginationButtons from "@/components/PaginationButtons";
import SearchBar from "@/components/SearchBar";
const UserManagementPage = () => {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const page = searchParams.get("page");
  // const filter = searchParams.get("filter");
  // const {
  //   data: users,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["GetUsersAPI", filter, page],
  //   queryFn: () => GetUsersAPI({ filter, PageNumber: page }),
  // });

  const users = {
    status: "Success",
    totalRows: 150, // Hypothetical total number of users
    data: [
      {
        id: 101,
        username: "johndoe",
        email: "john.doe@example.com",
        role: "admin", // Assuming a role is associated with a user
        isActive: true,
        lastLogin: "2025-05-22T10:30:00Z", // Added login timestamp
        createdAt: "2024-01-15T09:00:00Z",
      },
      {
        id: 102,
        username: "janedoe",
        email: "jane.doe@example.com",
        role: "user",
        isActive: true,
        lastLogin: "2025-05-21T15:45:00Z",
        createdAt: "2024-02-20T11:30:00Z",
      },
      {
        id: 105,
        username: "merch_user_1",
        email: "merchant1@example.com",
        role: "Merchant",
        isActive: true,
        lastLogin: "2025-05-22T09:00:00Z",
        createdAt: "2024-03-10T14:00:00Z",
      },
      {
        id: 120,
        username: "training_account",
        email: "training@example.com",
        role: "CMSTraining",
        isActive: false, // Example of an inactive user
        lastLogin: null, // Or a past date if they logged in before becoming inactive
        createdAt: "2024-04-05T16:00:00Z",
      },
    ],
    pagination: {
      currentPage: 1,
      itemsPerPage: 4,
    },
    // Could also include filtering or sorting information if applicable
    // filters: {
    //   role: "admin"
    // },
    // sortBy: "createdAt",
    // sortOrder: "desc"
  };

  return (
    <div className="min-h-screen">
      <div>
        <div className="flex justify-between p-8">
          <h1 className="text-2xl font-semibold">Users</h1>
          <SearchBar />
          <CreateUserDialog />
        </div>
      </div>
      <div className="my-4 mb-24 space-y-2 px-4">
        {users && <UsersList users={users.data} />}
      </div>
      <div className="bottom-0 items-end self-center pb-5">
        {users && users.numberOfPages !== 0 && (
          <PaginationButtons pageCount={users.numberOfPages} />
        )}
      </div>
    </div>
  );
};

// export default withPageAccess(UserManagementPage, menuKeys.USER_MANAGEMENT);
export default UserManagementPage;
