import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router";
import routePath from "@/router/routePath";

const RolesList = ({ roles }) => {
  function RoleCard({ roleName, description, id }) {
    const navigate = useNavigate();
    return (
      <Card
        onClick={() => navigate(routePath.roleManagement + "/" + roleName)}
        className="flex w-[280px] cursor-pointer flex-col items-center justify-between p-4 transition-colors duration-300 hover:bg-gray-600/20"
      >
        <div className="flex flex-col items-center justify-center gap-x-4">
          <Avatar className="size-16">
            <AvatarImage src="https://via.placeholder.com/150" />
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <div className="p-2 text-center">
            <h1>{roleName}</h1>
            <p className="text-sm text-black/50">{description}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4"></div>
      </Card>
    );
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {roles.map((role) => (
        <RoleCard key={role.id} {...role} />
      ))}
    </div>
  );
};

export default RolesList;
