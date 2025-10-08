import { CheckboxTree } from "@/components/ui/checkbox-tree";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Fragment } from "react";
import { useFormContext } from "react-hook-form"; // Import useFormContext
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function CheckboxTreeFormField({
  name,
  label,
  required,
  disabled = false,
  initialTree,
}) {
  const { control } = useFormContext();

  return (
    <FormField
      disabled={disabled}
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <CheckboxTree
              tree={initialTree}
              renderNode={({ node, isChecked, onCheckedChange, children }) => (
                <Fragment key={node.id}>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id={node.id}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        onCheckedChange(checked);
                        field.onChange(checked);
                      }}
                    />
                    <Label htmlFor={node.id}>{node.label}</Label>
                  </div>
                  {children && <div className="ms-6 space-y-3">{children}</div>}
                </Fragment>
              )}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
