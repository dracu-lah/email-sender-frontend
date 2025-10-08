import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

interface SwitchFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function SwitchFormField<T extends FieldValues>({
  name,
  disabled = false,
  label,
  required,
  className,
}: SwitchFormFieldProps<T>) {
  const { control } = useFormContext<T>();

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
            <Switch
              className={className}
              disabled={disabled}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
