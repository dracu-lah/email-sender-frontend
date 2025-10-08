// MenuItem.jsx

import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const MenuItem = ({ item, onPermissionChange, parentEnabled = true }) => {
  const handlePermissionToggle = (permission) => {
    const currentAssigned = item.permissions || [];
    const newAssigned = currentAssigned.includes(permission)
      ? currentAssigned.filter((p) => p !== permission)
      : [...currentAssigned, permission];

    onPermissionChange(item.key, newAssigned);
  };

  const renderPermissions = () => {
    if (!item.permissions || !item.availablePermissions) return null;

    return (
      <div className="ml-6 mt-4 space-y-2">
        {item.availablePermissions.map((permission) => (
          <div key={permission} className="flex items-center space-x-3">
            <Checkbox
              id={`${item.key}-${permission}`}
              checked={item.permissions?.includes(permission) || false}
              onCheckedChange={() => handlePermissionToggle(permission)}
              disabled={!item.isEnabled || !parentEnabled}
            />
            <Label
              htmlFor={`${item.key}-${permission}`}
              className={
                !item.isEnabled || !parentEnabled ? "text-gray-400" : ""
              }
            >
              {permission}
            </Label>
          </div>
        ))}
      </div>
    );
  };

  const renderSubmenus = () => {
    if (!item.submenus?.length) return null;

    return (
      <div className="ml-6 mt-4 space-y-4">
        {item.submenus.map((submenu) => (
          <MenuItem
            key={submenu.key}
            item={submenu}
            onPermissionChange={onPermissionChange}
            parentEnabled={item.isEnabled && parentEnabled}
          />
        ))}
      </div>
    );
  };

  return (
    <AccordionItem value={item.key}>
      <AccordionTrigger>
        <div className="flex w-full items-center justify-between">
          <span
            className={`text-lg font-medium ${!item.isEnabled || !parentEnabled ? "text-gray-400" : ""}`}
          >
            {item.routeName}
          </span>
          <Switch
            checked={item.isEnabled}
            onCheckedChange={(checked) =>
              onPermissionChange(item.key, item.permissions || [], checked)
            }
            disabled={!parentEnabled}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </AccordionTrigger>
      <AccordionContent>
        {renderPermissions()}
        {renderSubmenus()}
      </AccordionContent>
    </AccordionItem>
  );
};

export default MenuItem;
