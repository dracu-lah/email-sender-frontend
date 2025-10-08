import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MenuItems from "../menuItems";
import { MenuIcon } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";

export function SideSheet() {
  const [open, setOpen] = useState(false);

  const location = useLocation();
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon className="cursor-pointer duration-300 hover:text-primary lg:hidden" />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="no-scrollbar px-4 w-[60vw] space-y-2 overflow-y-auto pt-20 md:w-[40vw]"
      >
        <MenuItems />
      </SheetContent>
    </Sheet>
  );
}
