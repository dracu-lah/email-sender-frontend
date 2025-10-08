import { useFormContext } from "react-hook-form";
import {
  FormField,
  FormLabel,
  FormControl,
  FormItem,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import QuillEditor from "./components/QuillEditor"; // Import the separated QuillEditor

const RichTextEditor = ({
  name,
  placeholder,
  className,
  label,
  description,
}) => {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <QuillEditor
              placeholder={placeholder}
              className={className}
              value={field.value}
              onChange={field.onChange}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RichTextEditor;
