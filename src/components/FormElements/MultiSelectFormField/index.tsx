import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { MultiSelect } from "@/components/MultiSelect";
import { useFormContext } from "react-hook-form";

const MultiSelectFormField = ({
  name,
  label,
  required,
  placeholder = "Select options",
  items = [],
  description,
  disabled = false,
  maxCount,
  variant = "default",
  modalPopover,
}) => {
  const { control, setValue } = useFormContext();

  return (
    <FormField
      key={name}
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <MultiSelect
              modalPopover={modalPopover}
              options={items}
              onValueChange={(value) => setValue(name, value)}
              defaultValue={field.value}
              placeholder={placeholder}
              disabled={disabled}
              maxCount={maxCount}
              variant={variant}
              animation={0}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MultiSelectFormField;
