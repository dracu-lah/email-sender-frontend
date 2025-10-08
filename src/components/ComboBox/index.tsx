import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { SearchIcon, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/PopoverDialog";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const ComboBox = ({
  value,
  onChange,
  items,
  placeholder,
  disabled = false,
  truncateText = true, // Prop to enable truncation
  customButtonClassName = "", // Custom class for button
  customInputClassName = "", // Custom class for input field
}) => {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleSelect = (selectedValue) => {
    onChange(selectedValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={disabled}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", customButtonClassName)}
        >
          <span
            className={cn(
              truncateText && "truncate", // Apply truncation
              customInputClassName,
            )}
          >
            {items?.find((item) => item.id === value)?.name || placeholder}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <div className="flex items-center border-b border-black/10">
          <div className="py-3 pl-2">
            <SearchIcon className="size-4 text-black/20" />
          </div>
          <input
            placeholder="Search..."
            className="w-full px-2 outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
        <Command>
          <CommandList>
            <CommandEmpty>No items found.</CommandEmpty>
            <CommandGroup>
              {items
                .filter((item) =>
                  item.name.toLowerCase().includes(searchValue.toLowerCase()),
                )
                .map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSelect(item.id)}
                  >
                    <span
                      className={cn(
                        truncateText && "truncate", // Apply truncation
                      )}
                    >
                      {item.name}
                    </span>
                    <Check className="ml-auto opacity-0" />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
