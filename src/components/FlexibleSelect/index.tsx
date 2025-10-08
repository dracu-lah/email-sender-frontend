import * as React from "react";
import { Check, ChevronsUpDown, SearchIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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
import { useQuery } from "@tanstack/react-query";
import PageLoader from "@/components/loaders/PageLoader";
import { useDebounce } from "@/utils/functions/useDebounce";
import { useState } from "react";

export default function FlexibleSelect({
  apiFunction,
  onSelect,
  placeholder = "Select...",
  displayKey = "name",
  searchKey = "filter",
  renderItem = (item) => item[displayKey],
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const debouncedValue = useDebounce(value, 300);

  const {
    data: items,
    error,
    isLoading,
  } = useQuery({
    queryKey: [apiFunction.name, debouncedValue],
    queryFn: () => apiFunction({ [searchKey]: debouncedValue }),
  });

  const handleSelect = (item) => {
    setValue(item[displayKey]);
    onSelect(item);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" className="justify-between">
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <div className="flex items-center border-b border-black/10">
          <div className="py-3 pl-2">
            <SearchIcon className="size-4 text-black/20" />
          </div>
          <input
            placeholder={`Search ${placeholder}...`}
            className="w-full px-2 outline-none"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <Command>
          {isLoading ? (
            <div className="my-4">
              <PageLoader size="6" />
            </div>
          ) : items?.data?.length === 0 ? (
            <CommandEmpty>No items found</CommandEmpty>
          ) : (
            <CommandList>
              <CommandGroup>
                {items?.data?.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item[displayKey]}
                    onSelect={() => handleSelect(item)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item[displayKey]
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    {renderItem(item)}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
