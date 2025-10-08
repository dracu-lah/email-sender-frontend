export function imageUrlToBase64(imageUrl) {
  return new Promise((resolve, reject) => {
    // Create a new Image object
    const img = new Image();
    img.crossOrigin = "Anonymous"; // To avoid CORS issues if needed

    img.onload = () => {
      // Create a canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set canvas dimensions to the image size
      canvas.width = img.width;
      canvas.height = img.height;

      // Draw the image onto the canvas
      ctx.drawImage(img, 0, 0);

      // Get the base64 string from the canvas
      const base64String = canvas.toDataURL();
      resolve(base64String);
    };

    img.onerror = (error) => {
      reject("Error loading image: " + error);
    };

    // Set the image source to the URL
    img.src = imageUrl;
  });
}

// Example usage:
// const imageUrl = "https://example.com/path/to/your/image.jpg";
// imageUrlToBase64(imageUrl)
//   .then((base64String) => {
//     console.log(base64String);
//   })
//   .catch((error) => {
//     console.error(error);
//   });
