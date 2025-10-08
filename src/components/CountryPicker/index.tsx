import { useState } from "react";

import { ChevronsUpDown, Check } from "lucide-react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import countriesData from "@/assets/countries.json"; // Import the JSON data
import { Label } from "../ui/label";

export function CountryPicker({
  value,
  onChange,
  placeholder = "Select country...",
  label,
  required,
  error,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <Label className={cn(error && "text-red-500")}>
          {label} {required && <span className="text-red-500">*</span>}
        </Label>
      )}
      <Popover modal={true} open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn("w-full justify-between")}
          >
            {value ? `${value.name.common} ${value.flag}` : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search country..." className="h-9" />
            <CommandList>
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countriesData.map((country) => (
                  <CommandItem
                    key={country.name.common}
                    value={country.name.common}
                    onSelect={() => {
                      onChange(country);
                      setOpen(false);
                    }}
                  >
                    <span className="mr-2">{country.flag}</span>
                    {country.name.common}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        value?.name.common === country.name.common
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
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
