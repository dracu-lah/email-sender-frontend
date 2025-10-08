import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { clsx } from "clsx";
import { useFormContext, type FieldValues, type Path } from "react-hook-form";
import ImageCrop from "@/components/uploaders/ImageCrop";
import type { ImageCropProps } from "@/components/uploaders/ImageCrop";

export type ImageCropFormFieldProps<T extends FieldValues> = {
  name: Path<T>;
  label?: string;
  required?: boolean;
  className?: string;
  disabled?: boolean;
  removeButtonText?: string;
  imageAlt?: string;
  imageClassName?: string;
} & Omit<ImageCropProps, "onUploadResponse">;

export default function ImageCropFormField<T extends FieldValues>({
  name,
  label,
  required,
  className,
  disabled = false,
  apiFn,
  width,
  height,
  removeButtonText = "Remove Image",
  imageAlt = "Uploaded Image",
  imageClassName = "h-20 w-20 rounded object-cover",
  ...rest
}: ImageCropFormFieldProps<T>) {
  const { control, setValue, watch } = useFormContext<T>();
  const currentValue = watch(name);

  return (
    <FormField
      name={name}
      control={control}
      render={() => (
        <FormItem className={clsx("flex flex-col space-y-2", className)}>
          {label && (
            <FormLabel>
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <div aria-disabled={disabled}>
              <ImageCrop
                apiFn={apiFn}
                width={width}
                height={height}
                onUploadResponse={(response) => {
                  setValue(name, response.data.url, {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                }}
                {...rest}
              />
            </div>
          </FormControl>

          {currentValue && (
            <div className="flex items-center gap-2">
              <img
                src={currentValue}
                alt={imageAlt}
                className={imageClassName}
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                disabled={disabled}
                onClick={() => setValue(name, "" as any)}
              >
                {removeButtonText}
              </Button>
            </div>
          )}

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
