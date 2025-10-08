import { useState, useCallback } from "react";
import ImageUploader from "./ImageUploader";
import UploadImageButton from "./UploadImageButton";
import ImageCropper from "./ImageCropper";

/**
 * Props for the ImageCrop component.
 */
export interface ImageCropProps {
  /**
   * Async function to handle image upload.
   * It should accept a File and return a Promise.
   */
  apiFn: (file: File) => Promise<any>;

  /**
   * Optional callback invoked with the API response after successful upload.
   */
  onUploadResponse?: (res: any) => void;

  /**
   * Aspect ratio for cropping (default: 1 / 1).
   */
  aspect?: number;

  /**
   * Upload file size limit in MB (default: 4MB).
   */
  maxUploadSize?: number;

  /**
   * Default is false
   **/
  enableZoom?: Boolean;
  /**
   * Width of the crop container (default: 100%).
   */
  width?: string;

  /**
   * Height of the crop container (default: 320px).
   */
  height?: string;
}

/**
 * ImageCrop component allows image upload, crop, and upload functionality
 * with aspect ratio and size limit support.
 */
const ImageCrop = ({
  apiFn,
  onUploadResponse,
  enableZoom = false,
  aspect = 1 / 1,
  maxUploadSize = 4,
  width = "100%",
  height = "320px",
}: ImageCropProps) => {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImageDataURL, setCroppedImageDataURL] = useState<string | null>(
    null,
  );

  /**
   * Clears the current image and cropped preview.
   */
  const handleClearImage = useCallback(() => {
    setImage(null);
    setCroppedImageDataURL(null);
  }, []);

  return (
    <div
      className="relative transition-all rounded-md border border-dashed border-zinc-300 dark:border-zinc-700 overflow-hidden"
      style={{ width, height }}
    >
      {!image && (
        <ImageUploader
          aspect={aspect}
          setImage={setImage}
          maxUploadSize={maxUploadSize}
        />
      )}

      {image && (
        <ImageCropper
          enableZoom={enableZoom}
          aspect={aspect}
          image={image}
          handleClearImage={handleClearImage}
          setCroppedImageDataURL={setCroppedImageDataURL}
        />
      )}

      {image && croppedImageDataURL && (
        <UploadImageButton
          apiFn={apiFn}
          croppedImageDataURL={croppedImageDataURL}
          onUploadResponse={onUploadResponse}
          onClearImage={handleClearImage}
        />
      )}
    </div>
  );
};

export default ImageCrop;
