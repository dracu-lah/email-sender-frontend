import { toast } from "sonner";

const showFormErrors = (errors) => {
  const errorMessages = [];

  // Recursively collect all error messages
  const collectErrors = (errors, parentField = "") => {
    Object.entries(errors).forEach(([field, error]) => {
      const fieldPath = parentField ? `${parentField}.${field}` : field;

      if (error?.message) {
        errorMessages.push(`${fieldPath}: ${error.message}`);
      } else if (error && typeof error === "object") {
        collectErrors(error, fieldPath);
      }
    });
  };

  collectErrors(errors);

  // Show errors in toast
  if (errorMessages.length > 0) {
    toast.error("Form Validation", {
      icon: <div></div>,
      description: (
        <ul className="list-disc pl-4">
          {errorMessages.map((message, index) => (
            <li key={index} className="text-sm">
              {message}
            </li>
          ))}
        </ul>
      ),
      duration: 5000,
    });
  }
};

export default showFormErrors;
