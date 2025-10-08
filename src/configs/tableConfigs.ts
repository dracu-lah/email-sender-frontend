import TableIcons from "@/utils/assets";

export const tableConfigsMap = {
  // "hexagon-6": {
  //   icon: TableIcons.TableHexagon6Icon,
  //   label: "Hexagon 6",
  //   color: "bg-amber-700",
  //   shape: "rounded-full",
  //   width: 36,
  //   height: 36,
  // },
  // "oval-6": {
  //   icon: TableIcons.TableOval6Icon,
  //   label: "Oval 6",
  //   color: "bg-purple-600",
  //   shape: "rounded-full",
  //   width: 48,
  //   height: 32,
  // },
  // "oval-8": {
  //   icon: TableIcons.TableOval8Icon,
  //   label: "Oval 8",
  //   color: "bg-purple-600",
  //   shape: "rounded-full",
  //   width: 56,
  //   height: 36,
  // },
  "rectangle-2": {
    icon: TableIcons.TableRectangle2Icon,
    label: "Rectangle 2",
    color: "bg-green-600",
    shape: "rounded-md",
    width: 44,
    height: 64,
    capacity: 2,
  },
  "rectangle-6": {
    icon: TableIcons.TableRectangle6Icon,
    label: "Rectangle 6",
    color: "bg-green-600",
    shape: "rounded-md",
    width: 48,
    height: 32,
    capacity: 6,
  },
  "round-6": {
    icon: TableIcons.TableRound6Icon,
    label: "Round 6",
    color: "bg-amber-700",
    shape: "rounded-full",
    width: 36,
    height: 36,
    capacity: 6,
  },
  "round-8": {
    icon: TableIcons.TableRound8Icon,
    label: "Round 8",
    color: "bg-amber-700",
    shape: "rounded-full",
    width: 40,
    height: 40,
    capacity: 8,
  },
  "square-4": {
    icon: TableIcons.TableSquare4Icon,
    label: "Square 4",
    color: "bg-blue-600",
    shape: "rounded-md",
    width: 32,
    height: 32,
    capacity: 4,
  },
};

export const tableConfigs = Object.entries(tableConfigsMap).map(
  ([type, cfg]) => ({
    type,
    ...cfg,
  }),
);

export const getTableConfigByType = (type) => {
  return (
    tableConfigsMap[type] || {
      color: "bg-amber-700",
      shape: "rounded-full",
      width: 32,
      height: 32,
    }
  );
};
