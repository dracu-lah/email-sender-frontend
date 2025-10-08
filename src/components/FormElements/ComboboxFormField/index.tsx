"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useFormContext, Path, FieldValues } from "react-hook-form";
import { useState, useMemo } from "react";

interface SubLabel {
  key: string;
  value: string;
}

interface ComboboxItem {
  label: string;
  value: string;
  subLabels?: SubLabel[];
}

interface ComboboxFormFieldProps<T extends FieldValues> {
  name: Path<T>;
  items: ComboboxItem[];
  label?: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  truncateText?: boolean;
}

export default function ComboboxFormField<T extends FieldValues>({
  name,
  items,
  label,
  placeholder = "Select an option...",
  description,
  disabled = false,
  required = false,
  className = "w-[300px]",
  truncateText = true,
}: ComboboxFormFieldProps<T>) {
  const form = useFormContext<T>();
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const filteredItems = useMemo(
    () =>
      items.filter((item) =>
        item.label.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [items, searchValue],
  );

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          {label && (
            <FormLabel>
              {label} {required && <span className="text-destructive">*</span>}
            </FormLabel>
          )}
          <Popover modal open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  disabled={disabled}
                  className={cn(
                    className,
                    "justify-between",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <span className={cn(truncateText && "truncate")}>
                    {field.value
                      ? items.find((item) => item.value === field.value)?.label
                      : placeholder}
                  </span>
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className={cn(className, "p-0")}>
              <Command>
                <CommandInput
                  placeholder={`Search ${label ?? ""}...`}
                  value={searchValue}
                  onValueChange={setSearchValue}
                />
                <CommandList>
                  <CommandEmpty>No items found.</CommandEmpty>
                  <CommandGroup>
                    {filteredItems.map((item) => (
                      <CommandItem
                        key={item.value}
                        value={item.label}
                        onSelect={() => {
                          form.setValue(name, item.value as any); // cast for generic safety
                          setSearchValue("");
                          setOpen(false);
                        }}
                      >
                        <span className={cn(truncateText && "truncate")}>
                          <h1>{item.label}</h1>
                          <div>
                            {item?.subLabels?.map((s) => (
                              <p
                                key={s.key + s.value}
                                className="opacity-70 text-xs"
                              >
                                {s.key}: {s.value}
                              </p>
                            ))}
                          </div>
                        </span>
                        <Check
                          className={cn(
                            "ml-auto",
                            item.value === field.value
                              ? "opacity-100"
                              : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
