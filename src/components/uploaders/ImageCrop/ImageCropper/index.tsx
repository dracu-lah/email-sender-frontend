import { useState, useCallback, useEffect, useRef } from "react";
import Cropper from "react-easy-crop";
import { cropImage } from "../utils/cropImage";
import { Squircle, XIcon } from "lucide-react";

const ImageCropper = ({
  enableZoom,
  image,
  handleClearImage,
  setCroppedImageDataURL,
  aspect,
}: {
  image: string | null;
  enableZoom: Boolean;
  aspect: number;
  handleClearImage: () => void;
  setCroppedImageDataURL: (url: string | null) => void;
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [debouncedZoom, setDebouncedZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const rafRef = useRef<number | null>(null);

  const onCropComplete = useCallback(
    async (_: any, croppedAreaPixels: any) => {
      if (!image) return;
      const croppedImage = await cropImage(image, croppedAreaPixels);
      setCroppedImageDataURL(croppedImage ?? null);
    },
    [image, setCroppedImageDataURL],
  );

  // Debounce zoom to reduce lag
  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setDebouncedZoom(zoom);
    });
  }, [zoom]);

  useEffect(() => {
    if (!image) setCroppedImageDataURL(null);
  }, [image, setCroppedImageDataURL]);

  if (!image) return null;

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center flex-col">
      <button
        onClick={handleClearImage}
        className="absolute left-2 top-2 z-20 w-8 h-8 rounded-sm bg-red-600 text-white font-bold flex items-center justify-center hover:bg-red-700 shadow"
        title="Clear image"
      >
        <XIcon />
      </button>

      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="w-full h-full bg-background rounded-md flex items-center justify-center border-2 border-zinc-600">
            <Squircle className="size-6 text-foreground/40 animate-bounce" />
          </div>
        </div>
      )}

      <Cropper
        image={image}
        crop={crop}
        zoom={debouncedZoom}
        aspect={aspect}
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
        onMediaLoaded={() => setTimeout(() => setLoading(false), 300)} // shorter delay
        classes={{
          containerClassName: "rounded-md border-2 border-zinc-500",
        }}
      />

      {/* Zoom Slider */}
      {enableZoom && (
        <div className="absolute bottom-6 z-20 w-64 flex items-center gap-3 bg-muted px-4 py-2 rounded-md border text-muted-foreground shadow-md backdrop-blur">
          <label className="text-sm">Zoom</label>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            disabled={loading}
            className="w-full accent-primary"
          />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;
