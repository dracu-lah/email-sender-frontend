export const handleKeyDown = (event, ref) => {
  // Check if the combination of keys is Ctrl + K

  if (event.ctrlKey && event.key === "/") {
    // Prevent the default behavior of the key combination

    event.preventDefault();

    // Focus on the search input

    ref.current.focus();
  }

  // Check if the key is Escape

  if (event.key === "Escape") {
    // Blur (lose focus) from the search input

    ref.current.blur();
  }
};
