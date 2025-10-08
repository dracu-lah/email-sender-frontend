import { format, parse } from "date-fns";

export const mergeDateAndTime = (date, time) => {
  if (!date || !time) return null;

  try {
    // Parse the date and time
    const parsedDate = parse(date, "yyyy-MM-dd", new Date());
    const parsedTime = parse(time, "HH:mm", new Date());

    // Combine date and time
    const combinedDateTime = new Date(
      parsedDate.getFullYear(),
      parsedDate.getMonth(),
      parsedDate.getDate(),
      parsedTime.getHours(),
      parsedTime.getMinutes(),
    );

    // Format the combined date and time as specified
    return format(combinedDateTime, "dd-MM-yyyy hh:mm a");
  } catch (error) {
    console.error("Error merging date and time:", error);
    return null;
  }
};
