import { format, parse } from "date-fns";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  globalDateDisplayFormat,
  globalDateInputFormat,
} from "@/utils/constants";

const DatePicker = ({
  label = "Date",
  value = "",
  onChange,
  placeholder = "Pick a date",
  inputFormat = globalDateInputFormat,
  displayFormat = globalDateDisplayFormat,
}) => {
  const [open, setOpen] = useState(false);

  // Parse the date from the input format
  const parsedDate = value ? parse(value, inputFormat, new Date()) : undefined;

  const handleDateChange = (date) => {
    // Convert to the specified input format for storage
    onChange(date ? format(date, inputFormat) : "");
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium">{label}</label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "justify-start text-left font-normal",
              !value && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? (
              format(parsedDate, displayFormat)
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            captionLayout="dropdown-buttons"
            fromYear={1960}
            toYear={2030}
            mode="single"
            selected={parsedDate}
            onSelect={handleDateChange}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePicker;
