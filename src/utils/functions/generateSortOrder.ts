export const generateSortOrder = (length) => {
  return Array.from({ length }, (_, index) => {
    const value = (index + 1).toString();
    return { value, label: value };
  });
};
