import { useEffect, useState } from "react";
import MenuItems from "../menuItems";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const SideBar = () => {
  const [enableSidebar, setEnableSidebar] = useState(true);

  // Ctrl + B to toggle sidebar
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === ";") {
        e.preventDefault();
        setEnableSidebar((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative hidden flex-col lg:flex">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className={`fixed bottom-4 z-50 rounded-full shadow-md duration-300 hover:opacity-90 ${
                enableSidebar ? "left-[225px]" : "left-4"
              }`}
              onClick={() => setEnableSidebar((prev) => !prev)}
            >
              {enableSidebar ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Toggle Sidebar (Ctrl + ;)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div
        className={`border-r-2 h-full transition-all duration-300 ease-in-out ${
          enableSidebar ? "w-[300px]" : "w-0"
        }`}
      >
        <ScrollArea className="h-[calc(100vh-6rem)]">
          <ul
            className={`sticky top-24 mt-8 flex flex-col gap-y-1 px-4 text-black ${
              enableSidebar ? "opacity-100" : "opacity-0"
            } transition-opacity duration-300`}
          >
            <MenuItems />
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
};

export default SideBar;
