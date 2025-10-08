import { useLocation, NavLink } from "react-router";
import { useMemo } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import routePath from "@/router/routePath";

const SubMenuAccordion = ({ item, index, isItemActive }) => {
  // Check if any submenu or nested submenu is active
  const isActive = useMemo(() => {
    if (isItemActive(item)) return true;
    if (item.subMenu) {
      return item.subMenu.some(
        (subItem) =>
          isItemActive(subItem) || (subItem.subMenu && isItemActive(subItem)),
      );
    }
    return false;
  }, [item, isItemActive]);

  return (
    <Accordion
      key={index}
      type="single"
      collapsible
      defaultValue={isActive ? `item-${index}` : undefined}
    >
      <AccordionItem
        className="gap-x-2 rounded-lg border-none duration-300 hover:bg-primary/60 data-[state=open]:bg-primary/20 dark:hover:bg-primary/70 dark:data-[state=open]:bg-primary/40"
        value={`item-${index}`}
      >
        <AccordionTrigger className="px-4 dark:text-white">
          <div className="flex w-[200px] gap-x-2">
            {item.icon && (
              <item.icon strokeWidth={3} className="size-5 min-w-fit" />
            )}
            <span className="truncate font-semibold">{item.label}</span>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <ul className="mx-1 flex flex-col space-y-2 rounded-md">
            {item.subMenu.map((subItem, subIndex) => (
              <li key={subIndex}>
                {subItem.subMenu ? (
                  <SubMenuAccordion
                    item={subItem}
                    index={subIndex}
                    isItemActive={isItemActive}
                  />
                ) : (
                  <NavLink
                    key={subIndex}
                    to={subItem.route}
                    onClick={() => window.scroll(0, 0)}
                    className={`flex gap-x-2 rounded-lg px-4 py-4 font-semibold duration-300 hover:bg-primary/60 dark:hover:bg-primary/70 ${
                      isItemActive(subItem)
                        ? "bg-primary text-white dark:bg-primary/60 dark:text-white"
                        : "dark:text-gray-300"
                    }`}
                  >
                    {subItem.icon && (
                      <subItem.icon
                        strokeWidth={3}
                        className="size-5 min-w-fit"
                      />
                    )}
                    <span>{subItem.label}</span>
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const MenuItem = ({ item, index }) => {
  const location = useLocation();

  const isItemActive = (item) => {
    const isDashboard = item.route === routePath.home;
    const isCurrentRoute = location.pathname === item.route;
    const isCurrentSubRoute = location.pathname.startsWith(item.route);

    if (isDashboard && location.pathname === routePath.home) {
      return true;
    }

    return (
      (isCurrentRoute && !isDashboard) || (isCurrentSubRoute && !isDashboard)
    );
  };

  if (item.subMenu) {
    return (
      <SubMenuAccordion item={item} index={index} isItemActive={isItemActive} />
    );
  } else {
    return (
      <NavLink
        key={index}
        to={item.route}
        onClick={() => window.scroll(0, 0)}
        className={`flex min-w-fit gap-x-2 rounded-lg px-4 py-4 font-semibold duration-300 hover:bg-primary/60 dark:hover:bg-primary/70 ${
          isItemActive(item)
            ? "bg-primary text-white dark:bg-primary/60 dark:text-white"
            : "dark:text-gray-300"
        }`}
      >
        {item.icon && <item.icon strokeWidth={3} className="size-5" />}
        <span>{item.label}</span>
      </NavLink>
    );
  }
};

export default MenuItem;
