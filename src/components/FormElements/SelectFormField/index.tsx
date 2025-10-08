import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFormContext, FieldValues, Path } from "react-hook-form";

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  label?: string;
  required?: boolean;
  placeholder?: string;
  description?: string;
  className?: string;
  disabled?: boolean;
  items: SelectOption[];
}

export default function SelectFormField<T extends FieldValues>({
  name,
  label,
  required,
  placeholder,
  description,
  className = "w-[180px]",
  disabled = false,
  items,
}: SelectFormFieldProps<T>) {
  const { control, setValue } = useFormContext<T>();

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
            <Select
              disabled={disabled}
              onValueChange={(value) => setValue(name, value as any)}
              value={field.value}
            >
              <SelectTrigger className={className}>
                <SelectValue placeholder={placeholder}>
                  {field.value
                    ? items.find((item) => item.value === field.value)?.label
                    : placeholder}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{label}</SelectLabel>
                  {items.length > 0 ? (
                    items.map((item) => (
                      <SelectItem value={item.value} key={item.value}>
                        {item.label}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem disabled>No items to be selected</SelectItem>
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
