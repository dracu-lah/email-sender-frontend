import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const GeneralTab = ({ roleName, roleDescription, onChange }) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">General Settings</CardTitle>
        <CardDescription>Manage basic role settings here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6">
          <div className="flex flex-col">
            <Label htmlFor="roleName" className="mb-1">
              Role Name
            </Label>
            <Input
              id="roleName"
              value={roleName}
              onChange={(e) => onChange("roleName", e.target.value)}
              placeholder="Enter role name"
              className="w-full"
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="roleDescription" className="mb-1">
              Role Description
            </Label>
            <Input
              id="roleDescription"
              value={roleDescription}
              onChange={(e) => onChange("roleDescription", e.target.value)}
              placeholder="Enter role description"
              className="w-full"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default GeneralTab;
