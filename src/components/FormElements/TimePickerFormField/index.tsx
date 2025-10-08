import TimePicker from "@/components/TimePicker";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import { useFormContext } from "react-hook-form";

export default function TimePickerFormField({
  name,
  placeholder,
  label,
  required,
  className,
  disabled = false,
}) {
  const { control } = useFormContext();
  return (
    <FormField
      name={name}
      disabled={disabled}
      control={control}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <TimePicker disabled={disabled} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
