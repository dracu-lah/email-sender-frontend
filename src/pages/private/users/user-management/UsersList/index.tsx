import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ManageUserModal from "./components/ManageUserModal";
import ManageRoleModal from "./components/ManageRoleModal";

const UsersList = ({ users }) => {
  function UserCard({ userName, id, email, phoneNumber, userRole }) {
    return (
      <Card className="flex md:flex-row w-full items-center justify-between p-4">
        <div className="flex  items-start justify-center gap-x-4">
          <Avatar className="size-16">
            <AvatarImage src="https://i0.wp.com/www.miwatj.com.au/wp-content/uploads/placeholder-person.png?w=1024&ssl=1" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="p-2 text-left">
            <h1>{userName}</h1>
            <p className="text-sm opacity-70 ">
              <span className="font-medium">Email:</span> {email}
            </p>
            <p className="text-sm opacity-70 ">
              <span className="font-medium">Phone:</span> {phoneNumber}
            </p>
            <p className="text-sm opacity-70 ">
              <span className="font-medium">Role:</span> {userRole}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <ManageUserModal userName={userName} id={id} />
          <ManageRoleModal userName={userName} roleName={userRole} />
        </div>
      </Card>
    );
  }

  return (
    <div className="grid w-full grid-cols-1 items-center justify-center gap-4 lg:grid-cols-2">
      {users.map((user) => (
        <UserCard key={user.userId} {...user} />
      ))}
    </div>
  );
};

export default UsersList;
