import {
  useRef,
  useState,
  useCallback,
  useMemo,
  useEffect,
  type ChangeEvent,
  type DragEvent,
} from "react";
import { Image, Loader2 } from "lucide-react";
import { formatAspectRatio } from "../utils/formatAspectRatio";

type ImageUploaderProps = {
  setImage: (dataUrl: string) => void;
  maxUploadSize: number; // in MB
  aspect: number;
};

const ImageUploader = ({
  setImage,
  maxUploadSize,
  aspect,
}: ImageUploaderProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [previewURL, setPreviewURL] = useState<string | null>(null);

  const formattedAspect = useMemo(() => formatAspectRatio(aspect), [aspect]);

  useEffect(() => {
    return () => {
      if (previewURL) URL.revokeObjectURL(previewURL);
    };
  }, [previewURL]);

  const openFileDialog = useCallback(() => {
    setError("");
    inputRef.current?.click();
  }, []);

  const validateAndLoad = useCallback(
    (file: File) => {
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > maxUploadSize) {
        setError(`File exceeds the upload limit of ${maxUploadSize}MB`);
        return;
      }
      if (!file.type.startsWith("image/")) {
        setError("Please upload a valid image file.");
        return;
      }

      setIsLoading(true);
      const objectUrl = URL.createObjectURL(file);
      if (previewURL) URL.revokeObjectURL(previewURL);
      setPreviewURL(objectUrl);
      setImage(objectUrl);
      setError("");
      setIsLoading(false);
    },
    [setImage, maxUploadSize, previewURL],
  );

  const handleFileChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) validateAndLoad(file);
    },
    [validateAndLoad],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const file = e.dataTransfer.files?.[0];
      if (file) validateAndLoad(file);
    },
    [validateAndLoad],
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  return (
    <div
      className="relative flex size-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 bg-background dark:border-gray-600"
      onClick={openFileDialog}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="absolute left-2 top-2 flex gap-2">
        <div className="rounded-md border px-2 py-1 font-mono text-xs">
          Aspect: {formattedAspect}
        </div>
        <div className="rounded-md border px-2 py-1 font-mono text-xs">
          Limit: {maxUploadSize}MB
        </div>
      </div>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleFileChange}
      />

      {isLoading ? (
        <div className="flex flex-col items-center gap-2 opacity-60">
          <Loader2 className="animate-spin" size={48} strokeWidth={1.5} />
          <p className="font-mono text-xl">Loading the image...</p>
        </div>
      ) : (
        <>
          <Image className="opacity-40" size={64} strokeWidth={1.5} />
          <p className="select-none text-center font-mono text-2xl font-bold opacity-40">
            Drag & Drop Image or <span className="underline">Browse</span>
          </p>
        </>
      )}

      {error && (
        <div className="mt-2 rounded border border-red-400 bg-red-50 px-3 py-1 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
