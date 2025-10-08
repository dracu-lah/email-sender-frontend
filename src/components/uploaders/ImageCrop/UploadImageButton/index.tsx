import { useEffect, useState, useMemo } from "react";
import { dataUrlToImageFile } from "../utils/dataUrlToImageFile";
import { Upload, Check, Loader2, XCircle } from "lucide-react";

type UploadStatus = "idle" | "loading" | "success" | "error";

type UploadImageButtonProps = {
  onClearImage: () => void;
  apiFn: (file: File) => Promise<any>;
  croppedImageDataURL: string | null;
  onUploadResponse?: (response: any) => void;
};

const UploadImageButton = ({
  onClearImage,
  apiFn,
  croppedImageDataURL,
  onUploadResponse,
}: UploadImageButtonProps) => {
  const [status, setStatus] = useState<UploadStatus>("idle");

  const file = useMemo<File | null>(() => {
    if (!croppedImageDataURL) return null;
    return dataUrlToImageFile({
      croppedImageDataURL,
      imageName: "Image",
    });
  }, [croppedImageDataURL]);

  const handleUpload = async () => {
    if (!file || status === "loading") return;
    try {
      setStatus("loading");
      const response = await apiFn(file);
      setStatus("success");
      onUploadResponse?.(response);
    } catch (error: any) {
      console.error("Upload failed:", error.message);
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!croppedImageDataURL) {
      setStatus("idle");
    }
  }, [croppedImageDataURL]);

  useEffect(() => {
    if (status === "success") {
      const timer = setTimeout(onClearImage, 2000);
      return () => clearTimeout(timer);
    }
  }, [status, onClearImage]);

  const getIcon = () => {
    const iconBase = "size-6";
    switch (status) {
      case "loading":
        return (
          <Loader2 className={`${iconBase} text-yellow-400 animate-spin`} />
        );
      case "success":
        return <Check className={`${iconBase} text-green-400`} />;
      case "error":
        return <XCircle className={`${iconBase} text-red-400`} />;
      default:
        return <Upload className={`${iconBase} text-white`} />;
    }
  };

  if (!croppedImageDataURL) return null;

  return (
    <button
      onClick={handleUpload}
      disabled={!file || status === "loading"}
      title="Upload Image"
      className={`absolute right-2 bottom-2 z-20 flex h-10 w-10 items-center justify-center rounded-sm bg-zinc-800
        ${!file || status === "loading" ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      {getIcon()}
    </button>
  );
};

export default UploadImageButton;
