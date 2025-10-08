import EmojiPicker from "emoji-picker-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SmilePlusIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";
import { useState } from "react";
function EmojiPickerFormField({ pushTo = "" }) {
  const [open, setOpen] = useState(false);
  const { control, watch, setValue } = useFormContext();
  return (
    <Popover modal open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm">
          <SmilePlusIcon className="text-yellow-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <EmojiPicker
          onEmojiClick={({ emoji }) => {
            const currentValue = watch(pushTo);

            setValue(pushTo, `${currentValue || ""}${emoji}`);
            // setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  );
}
export default EmojiPickerFormField;
