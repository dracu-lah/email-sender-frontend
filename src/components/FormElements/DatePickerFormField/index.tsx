import { useFormContext, FieldValues, Path } from "react-hook-form";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { useState } from "react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DatePickerV2 } from "@/components/DatePickerV2";

interface DatePickerFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  placeholder?: string;
  label?: string;
  required?: boolean;
  description?: string;
  className?: string;
  modal?: boolean;
  disabled?: boolean;
}

export default function DatePickerFormField<T extends FieldValues>({
  name,
  placeholder = "Pick a date",
  label,
  required,
  description,
  className = "w-[240px]",
  modal = true,
  disabled,
}: DatePickerFormFieldProps<T>) {
  const { control } = useFormContext<T>();
  const [open, setOpen] = useState(false);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <Popover open={open} onOpenChange={setOpen} modal={modal}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant="outline"
                  className={cn(
                    `${className} pl-3 text-left font-normal`,
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <DatePickerV2
                selected={field.value}
                onSelect={(date) => {
                  field.onChange(date);
                  setOpen(false);
                }}
                mode="single"
                captionLayout="dropdown-buttons"
                fromYear={1960}
                toYear={2030}
              />
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
