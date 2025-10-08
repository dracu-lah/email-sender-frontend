import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Accordion } from "@/components/ui/accordion";
import MenuItem from "./MenuItem";

const PermissionsTab = ({ menuItems, onPermissionChange }) => {
  return (
    <Card className="mb-16 shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Permissions</CardTitle>
        <CardDescription>
          Set detailed permissions for pages and elements.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {menuItems.map((item) => (
            <MenuItem
              key={item.key}
              item={item}
              onPermissionChange={onPermissionChange}
            />
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
};
export default PermissionsTab;
