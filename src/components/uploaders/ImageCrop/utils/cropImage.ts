type CroppedArea = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/**
 * Crops the given base64 image based on the cropped area pixels.
 * @param image - The base64 image data URL.
 * @param croppedAreaPixels - The pixel coordinates to crop.
 * @returns A Promise that resolves to the cropped base64 image.
 */
export const cropImage = async (
  image: string,
  croppedAreaPixels: CroppedArea,
): Promise<string | undefined> => {
  if (!image || !croppedAreaPixels) return;

  const imageElement = new Image();
  imageElement.src = image;

  await new Promise<void>((resolve, reject) => {
    imageElement.onload = () => resolve();
    imageElement.onerror = () => reject(new Error("Image load error"));
  });

  const scaleX = imageElement.naturalWidth / imageElement.width;
  const scaleY = imageElement.naturalHeight / imageElement.height;

  const canvas = document.createElement("canvas");
  canvas.width = croppedAreaPixels.width;
  canvas.height = croppedAreaPixels.height;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  ctx.drawImage(
    imageElement,
    croppedAreaPixels.x * scaleX,
    croppedAreaPixels.y * scaleY,
    croppedAreaPixels.width * scaleX,
    croppedAreaPixels.height * scaleY,
    0,
    0,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
  );

  const mimeType =
    image.match(/^data:(image\/\w+);base64,/)?.[1] || "image/jpeg";

  return canvas.toDataURL(mimeType);
};
