import { toast } from "sonner";
import { Button } from "../ui/button";
import downloadCSV from "@/utils/functions/downloadCSV";
import { FileSpreadsheetIcon } from "lucide-react";

const CSVButton = ({ fileName, disabled = false, data, mapping }) => {
  return (
    <Button
      disabled={disabled}
      className="flex items-center justify-between gap-2 bg-green-600 font-semibold text-white hover:bg-green-500"
      onClick={() =>
        downloadCSV({
          data,
          mapping,
          fileName,
          onSuccess: (file) => toast.success(`${file} downloaded successfully`),
          onError: (err) => toast.error(`Export failed: ${err.message}`),
        })
      }
    >
      <FileSpreadsheetIcon />
      Export
    </Button>
  );
};

export default CSVButton;
