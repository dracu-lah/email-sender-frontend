import { useEffect, useState } from "react";

const MultiCheckboxSelect = ({
  items,
  selectedItems,
  onChange,
  label,
  hasSelectAll,
}) => {
  const [localSelectedItems, setLocalSelectedItems] = useState(
    selectedItems || [],
  );

  // Toggle selection of a single item
  const handleToggle = (value) => {
    const isSelected = localSelectedItems.includes(value);
    const newSelection = isSelected
      ? localSelectedItems.filter((item) => item !== value)
      : [...localSelectedItems, value];
    setLocalSelectedItems(newSelection);
  };

  // Handle the "Select All" toggle
  const handleSelectAll = () => {
    if (localSelectedItems.length === items.length) {
      setLocalSelectedItems([]); // Deselect all
    } else {
      setLocalSelectedItems(items.map((item) => item.value)); // Select all
    }
  };

  // Update the external `onChange` when `localSelectedItems` changes
  useEffect(() => {
    onChange(localSelectedItems);
  }, [localSelectedItems, onChange]);

  return (
    <div className="multi-checkbox-select">
      <label className="font-semibold">{label}</label>
      <div className="mt-2 flex flex-col gap-2">
        {hasSelectAll && (
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={localSelectedItems.length === items.length}
              onChange={handleSelectAll}
              className="mr-2"
            />
            Select All
          </label>
        )}

        {items.map(({ label, value }) => (
          <label key={value} className="flex items-center">
            <input
              type="checkbox"
              value={value}
              checked={localSelectedItems.includes(value)}
              onChange={() => handleToggle(value)}
              className="mr-2"
            />
            {label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultiCheckboxSelect;
