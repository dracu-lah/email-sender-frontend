import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CSVButton from "@/components/CSVButton";
import TableSkeleton from "@/components/TableSkeleton";
import PaginationButtons from "../PaginationButtons";
import ExcelButton from "./components/ExcelButton";

export const GenericTableComponent = ({
  apiFn, // The API function to call
  excelApiEndpoint,
  queryKey, // Base query key for React Query
  columns, // Array of column configurations
  filters = {}, // Additional filter components to render
  initialFilters = {}, // Initial filter values
  dataPath = "data", // Path to the data array in the API response
  totalPagesPath = "data.totalPages", // Path to total pages in the API response
  totalPageSizePath = "data.totalRecords", // Path to  pages size in the API response
  csvFileName = "export", // Name for the CSV file
  emptyMessage = "No data available.", // Message to show when no data
  errorMessage = "Error loading data.", // Message to show on error
}) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Get all search params with default values
  const currentFilters = {
    ...initialFilters,
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
  };

  // Extract values from nested objects (for data and totalPages)
  const getNestedValue = (obj, path) => {
    return path
      .split(".")
      .reduce(
        (o, key) => (o && o[key] !== undefined ? o[key] : undefined),
        obj,
      );
  };

  let {
    data: responseData,
    error,
    isLoading,
  } = useQuery({
    queryKey: [queryKey, currentFilters],
    queryFn: () =>
      apiFn({ ...currentFilters, pageNumber: currentFilters.page }),
  });

  // Get the data array from the response
  const tableData = getNestedValue(responseData, dataPath) || [];
  const totalPages = getNestedValue(responseData, totalPagesPath) || 1;
  const totalPageSize = getNestedValue(responseData, totalPageSizePath) || 1;

  // Function to handle filter changes
  const handleFilterChange = (filterName, value) => {
    const newFilters = new URLSearchParams(searchParams);
    if (value) {
      newFilters.set(filterName, value.toString());
    } else {
      newFilters.delete(filterName);
    }
    // Reset to page 1 when filters change, except when changing page number
    if (filterName !== "page") {
      newFilters.set("page", "1");
    }
    setSearchParams(newFilters);
  };

  // Generate CSV data from columns configuration
  const generateCsvData = (data) => {
    return data.map((item, index) => {
      const row = {};
      columns.forEach((column) => {
        if (column.accessorKey) {
          // Get raw value or use accessor function if provided
          const value = column.accessor
            ? column.accessor(item)
            : getNestedValue(item, column.accessorKey);

          // Use csvValue function if provided, otherwise use the raw value
          row[column.accessorKey] = column.csvValue
            ? column.csvValue(value, item, index)
            : value;
        }
      });
      return row;
    });
  };

  // Generate CSV mapping from columns configuration
  const generateCsvMapping = () => {
    const mapping = {};
    columns.forEach((column) => {
      if (column.accessorKey) {
        mapping[column.accessorKey] = column.header;
      }
    });
    return mapping;
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="">
        {excelApiEndpoint ? (
          <ExcelButton
            filters={{ ...currentFilters, pageSize: null, page: null }}
            endpoint={excelApiEndpoint}
          />
        ) : (
          <CSVButton
            disabled={isLoading}
            fileName={csvFileName}
            data={generateCsvData(tableData)}
            mapping={generateCsvMapping()}
          />
        )}
      </div>

      {/* Filter Form */}
      {Object.keys(filters).length > 0 && (
        <Card className="p-4">
          <div className="">
            {Object.entries(filters).map(([key, FilterComponent]) => (
              <div key={key} className="">
                {FilterComponent}
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Table */}
      <Card className="w-full p-4">
        {isLoading ? (
          <TableSkeleton tableHeaders={columns.map((col) => col.header)} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="w-full text-center text-2xl text-black/40 dark:text-white/40">
                      {emptyMessage}
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {error && (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className="w-full text-center text-black/40 dark:text-white/40">
                      {errorMessage}
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {tableData.map((item, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, cellIndex) => (
                    <TableCell key={cellIndex}>
                      {column.cell
                        ? column.cell(item, rowIndex)
                        : column.accessorKey
                          ? getNestedValue(item, column.accessorKey)
                          : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Pagination */}
      <div className="flex  items-end justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Items per page:
          </span>
          <Select
            value={currentFilters.pageSize.toString()}
            onValueChange={(value) => {
              handleFilterChange("pageSize", Number(value));
            }}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 50, totalPageSize].map((size) => (
                <SelectItem key={size} value={size.toString()}>
                  {size} {size === totalPageSize && "(Max)"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <PaginationButtons pageCount={totalPages} />
      </div>
    </div>
  );
};

export default GenericTableComponent;
