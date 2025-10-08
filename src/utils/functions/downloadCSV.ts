/**
 * File export utility for downloading data as CSV
 * @module csvExport
 */

/**
 * Creates and triggers a file download
 * @param {Blob} blob - File content as a Blob
 * @param {string} filename - Name of the file to download
 */
function downloadFile(blob, filename) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);

  document.body.appendChild(link);
  link.click();

  link.parentNode.removeChild(link);
  window.URL.revokeObjectURL(url);
}

/**
 * Formats data according to mapping
 * @param {Array<Object>} data - Source data
 * @param {Object|null} mapping - Key-to-header mapping
 * @returns {Array<Object>} Formatted data
 */
function formatData(data, mapping) {
  if (!mapping) return data;

  return data.map((item) => {
    const result = {};
    for (const [key, header] of Object.entries(mapping)) {
      if (key in item) {
        result[header] = item[key];
      }
    }
    return result;
  });
}

/**
 * Creates a CSV string from structured data
 * @param {Array<Object>} data - Data to convert
 * @param {string} [delimiter=","] - CSV delimiter
 * @returns {string} CSV content
 */
function createCSV(data, delimiter = ",") {
  if (!data.length) return "";

  const headers = Object.keys(data[0]);
  let csvContent = headers.join(delimiter) + "\n";

  data.forEach((row) => {
    const values = headers.map((header) => {
      const cell = row[header] ?? "";
      return typeof cell === "string" &&
        (cell.includes(delimiter) || cell.includes('"') || cell.includes("\n"))
        ? `"${cell.replace(/"/g, '""')}"`
        : cell;
    });
    csvContent += values.join(delimiter) + "\n";
  });

  return csvContent;
}

/**
 * Download data as CSV file
 * @param {Object} options - Configuration options
 * @param {Array<Object>} options.data - Data to export
 * @param {Object} [options.mapping] - Optional field-to-header mapping
 * @param {string} [options.fileName="Export"] - Filename without extension
 * @param {string} [options.delimiter=","] - CSV delimiter
 * @param {Function} [options.onSuccess] - Success callback
 * @param {Function} [options.onError] - Error callback
 */
function downloadCSV({
  data = [],
  mapping = null,
  fileName = "Export",
  delimiter = ",",
  onSuccess = () => {},
  onError = (err) => console.error(err),
}) {
  if (!data.length) {
    onError(new Error("No data available"));
    return;
  }

  try {
    const formattedData = formatData(data, mapping);
    const csvContent = createCSV(formattedData, delimiter);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    downloadFile(blob, `${fileName}.csv`);
    onSuccess(`${fileName}.csv`);
  } catch (error) {
    onError(error);
  }
}

export default downloadCSV;
