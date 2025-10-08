import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useFormContext, FieldValues, Path } from "react-hook-form";
import { TextareaHTMLAttributes } from "react";

interface TextAreaFormFieldProps<T extends FieldValues>
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
}

export default function TextAreaFormField<T extends FieldValues>({
  name,
  placeholder,
  label,
  required,
  className,
  disabled = false,
  ...rest
}: TextAreaFormFieldProps<T>) {
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
            <Textarea
              {...field}
              {...rest}
              placeholder={placeholder}
              className={className}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
