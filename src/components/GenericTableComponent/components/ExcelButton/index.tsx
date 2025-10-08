import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import api from "@/configs/axios";
import { FileSpreadsheetIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ExcelButton component for downloading Excel files from loyalty API using Axios
 *
 * @param {Object} props
 * @param {String} props.endpoint - API endpoint for Excel export (default: loyalty transaction report endpoint)
 * @param {String} props.authToken - JWT authentication token
 * @param {String} props.fileName - Name for the downloaded file (defaults to server-provided filename)
 * @param {React.ReactNode} props.children - Button text/content
 * @param {Object} props.buttonProps - Additional props to pass to the button element
 */
const ExcelButton = ({
  endpoint = "",
  filters,
  fileName,
  children = "Export",
  buttonProps = {},
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const exportMutation = useMutation({
    mutationFn: async () => {
      try {
        const response = await api.get(endpoint, {
          params: filters,
          responseType: "arraybuffer",
        });

        // Extract filename from Content-Disposition header if not provided
        let downloadFileName = fileName;
        if (!downloadFileName) {
          const contentDisposition = response.headers["content-disposition"];
          if (contentDisposition) {
            const filenameMatch =
              contentDisposition.match(/filename=(.*?)(;|$)/);
            if (filenameMatch && filenameMatch[1]) {
              downloadFileName = filenameMatch[1].replace(/["']/g, "").trim();
            } else {
              // Try filename* format (RFC 5987)
              const filenameStarMatch = contentDisposition.match(
                /filename\*=UTF-8''(.*?)(;|$)/,
              );
              if (filenameStarMatch && filenameStarMatch[1]) {
                downloadFileName = decodeURIComponent(
                  filenameStarMatch[1].trim(),
                );
              }
            }
          }
        }

        // Default filename if still not found
        if (!downloadFileName) {
          downloadFileName = "Transactions.xlsx";
        }

        return {
          data: response.data,
          fileName: downloadFileName,
          contentType:
            response.headers["content-type"] ||
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          throw new Error(
            `Export failed: ${error.response?.status || "Unknown"} - ${error.message}`,
          );
        }
        throw error;
      }
    },
    onSuccess: (result) => {
      // Create a blob from the response data
      const blob = new Blob([result.data], { type: result.contentType });

      // Create a download link and trigger the download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", result.fileName);
      document.body.appendChild(link);
      link.click();

      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      setIsDownloading(false);
    },
    onError: (error) => {
      console.error("Excel download failed:", error);
      setIsDownloading(false);
      // You could add error handling here, such as displaying a toast notification
    },
  });

  const handleClick = () => {
    setIsDownloading(true);
    exportMutation.mutate();
  };

  return (
    <Button
      onClick={handleClick}
      disabled={isDownloading}
      className={`flex items-center justify-between gap-2 bg-green-600 font-semibold text-white hover:bg-green-500 ${isDownloading ? "opacity-70 cursor-not-allowed" : ""}`}
      {...buttonProps}
    >
      <FileSpreadsheetIcon />
      {isDownloading ? "Downloading..." : children}
    </Button>
  );
};

export default ExcelButton;
