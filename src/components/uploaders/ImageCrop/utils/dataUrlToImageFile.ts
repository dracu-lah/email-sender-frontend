type Params = {
  croppedImageDataURL: string;
  imageName: string;
};

/**
 * Converts a base64 Data URL to a File object.
 */
export const dataUrlToImageFile = ({
  croppedImageDataURL,
  imageName,
}: Params): File | null => {
  if (!croppedImageDataURL) return null;

  const base64Data = croppedImageDataURL.split(",")[1];
  const byteCharacters = atob(base64Data);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const mimeType =
    croppedImageDataURL.match(/data:(image\/\w+);base64,/)?.[1] || "image/jpeg";
  const extension = mimeType.split("/")[1];
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: mimeType });

  return new File([blob], `${imageName}.${extension}`, { type: mimeType });
};
