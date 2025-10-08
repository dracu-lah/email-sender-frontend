import { useState, useEffect } from "react";
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
import countriesData from "@/assets/countries.json";
import { Label } from "../ui/label";

export function CountryCodePicker({
  value,
  onChange,
  className,
  nationality,
  setNationality = () => null,
  placeholder = "Select country code...",
  label,
  required,
  error,
}) {
  const [open, setOpen] = useState(false);
  const [codes, setCodes] = useState([]);

  // Initialize nationality if there's a default value
  useEffect(() => {
    if (value && !nationality) {
      const matchingCountry = countriesData.find((country) =>
        country.idd.suffixes.some(
          (suffix) => `${country.idd.root}${suffix}` === value,
        ),
      );
      if (matchingCountry) {
        setNationality(matchingCountry);
      }
    }
  }, [value, nationality, setNationality]);

  // Generate codes based on nationality or all countries
  useEffect(() => {
    const generateCodes = () => {
      if (nationality) {
        const fullCodes = nationality.idd.suffixes.map(
          (suffix) => `${nationality.idd.root}${suffix}`,
        );
        setCodes(fullCodes);
      } else {
        const allCodes = countriesData.flatMap((country) =>
          country.idd.suffixes.map((suffix) => ({
            code: `${country.idd.root}${suffix}`,
            country: country,
          })),
        );

        // Remove duplicates while preserving country information
        const uniqueCodes = Array.from(
          new Map(allCodes.map((item) => [item.code, item])).values(),
        );

        setCodes(uniqueCodes);
      }
    };

    generateCodes();
  }, [nationality]);

  // Handle code selection
  const handleSelect = (selectedCode) => {
    onChange(selectedCode);
    setOpen(false);

    // Find the country that matches the selected code
    const matchingCountry = countriesData.find((country) =>
      country.idd.suffixes.some(
        (suffix) => `${country.idd.root}${suffix}` === selectedCode,
      ),
    );

    if (matchingCountry) {
      setNationality(matchingCountry);
    }
  };

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
            className={cn("w-full justify-between", className)}
          >
            {value || placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput
              placeholder="Search country code..."
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>No country code found.</CommandEmpty>
              <CommandGroup>
                {nationality
                  ? codes.map((code) => (
                      <CommandItem
                        key={code}
                        value={code}
                        onSelect={() => handleSelect(code)}
                      >
                        {code}
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === code ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))
                  : codes.map((item) => (
                      <CommandItem
                        key={item.code}
                        value={item.code}
                        onSelect={() => handleSelect(item.code)}
                      >
                        <span>{item.code}</span>
                        <span className="ml-2 text-gray-500">
                          ({item.country.name.common})
                        </span>
                        <Check
                          className={cn(
                            "ml-auto h-4 w-4",
                            value === item.code ? "opacity-100" : "opacity-0",
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

export default CountryCodePicker;
