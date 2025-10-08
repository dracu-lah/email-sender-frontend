import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { clsx } from "clsx";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { InputHTMLAttributes } from "react";

interface BasicFormFieldProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function BasicFormField<T extends FieldValues>({
  name,
  placeholder,
  label,
  required,
  type = "text",
  className,
  disabled = false,
  ...rest
}: BasicFormFieldProps<T>) {
  const { control } = useFormContext<T>();

  return (
    <FormField
      key={name}
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
            <Input
              {...field}
              {...rest}
              type={type}
              placeholder={placeholder}
              className={clsx(className)}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
