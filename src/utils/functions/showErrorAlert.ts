import { toast } from "sonner";

const showErrorAlert = (errorResponse) => {
  // Check if errors is an object with field-specific errors
  if (errorResponse?.errors && typeof errorResponse.errors === "object") {
    const errors = errorResponse.errors;
    for (const [field, messages] of Object.entries(errors)) {
      const fieldName = field;
      const message = Array.isArray(messages) ? messages[0] : messages;
      const alertMessage = `${fieldName}: ${message}`;
      toast.error(alertMessage);
    }
  }
  // Check for a simple error message string
  else if (typeof errorResponse === "string") {
    toast.error(errorResponse);
  }
  // Check for a message property in the error response
  else if (errorResponse?.message) {
    if (errorResponse.statusDescription) {
      toast.error(
        errorResponse.message + ": " + errorResponse.statusDescription,
      );
    } else {
      toast.error(errorResponse.message);
    }
  }
  // Fallback for completely unknown errors
  else {
    toast.error("An unknown error occurred.");
  }
};

export default showErrorAlert;
