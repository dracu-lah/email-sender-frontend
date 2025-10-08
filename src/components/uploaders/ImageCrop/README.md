# Example usage

```tsx
import { useState } from "react";
import ImageCrop from "./components/ImageCrop";
import { mockUpload } from "./api";

const App = () => {
  const [eventImages, setEventImages] = useState<string[]>([]);

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <label className="text-lg font-semibold">Event Images</label>

        <ImageCrop
          maxUploadSize={15}
          aspect={1 / 1}
          width="100%"
          height="320px"
          apiFn={mockUpload}
          onUploadResponse={(response) => {
            setEventImages((prev) => [...prev, response.url]);
          }}
        />

        <div className="mt-10 flex flex-wrap gap-4">
          {eventImages.map((url, idx) => (
            <img
              key={idx}
              src={url}
              alt={`Uploaded image ${idx + 1}`}
              className="w-46 rounded-lg border object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
```

---

## Example API call

```ts
/**
 * Simulates image upload API and shows local preview.
 * @param file The image file to upload
 */
export const mockUpload = (
  file: File,
): Promise<{ message: string; fileName: string; url: string }> => {
  return new Promise((resolve, _reject) => {
    const localURL = URL.createObjectURL(file);

    setTimeout(() => {
      resolve({
        message: "Upload successful",
        fileName: file.name,
        url: localURL, // Shows actual file
      });
    }, 1000);

    // To simulate an error:
    // reject(new Error("Upload failed due to network error"));
  });
};
```
