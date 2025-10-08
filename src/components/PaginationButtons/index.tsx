import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const PaginationButtons = ({ pageCount = 0 }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get("page")) || 1;
  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleClick = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > pageCount) return;

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", pageNumber);
    setSearchParams(newParams);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    // Only allow numbers
    if (value === "" || /^\d+$/.test(value)) {
      setInputValue(value);
      setInputError(false);
    }
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();

    if (!inputValue) return;

    const pageNum = parseInt(inputValue);

    if (pageNum >= 1 && pageNum <= pageCount) {
      handleClick(pageNum);
      setInputValue("");
      setInputError(false);
    } else {
      setInputError(true);
    }
  };

  useEffect(() => {
    if (!searchParams.has("page")) {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.set("page", 1);
      setSearchParams(newParams);
    }
  }, [searchParams, setSearchParams]);

  // Logic to determine which page buttons to show
  const getPageNumbers = () => {
    const maxVisibleButtons = 5;
    let pages = [];

    // Always show first page
    pages.push(1);

    if (pageCount <= maxVisibleButtons) {
      // If we have few pages, show all of them
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }

    // Show current page and neighbors
    const leftNeighbor = Math.max(2, currentPage - 1);
    const rightNeighbor = Math.min(pageCount - 1, currentPage + 1);

    // Add ellipsis if needed before current page
    if (leftNeighbor > 2) {
      pages.push("...");
    }

    // Add pages around current page
    for (let i = leftNeighbor; i <= rightNeighbor; i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Add ellipsis if needed after current page
    if (rightNeighbor < pageCount - 1) {
      pages.push("...");
    }

    // Always show last page
    if (!pages.includes(pageCount)) {
      pages.push(pageCount);
    }

    return pages;
  };

  return (
    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
      {/* First page button */}
      <Button
        onClick={() => handleClick(1)}
        disabled={currentPage === 1}
        variant="outline"
        size="icon"
        className="h-8 w-8"
        title="First page"
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>

      {/* Previous button */}
      <Button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1}
        variant="outline"
        size="icon"
        className="h-8 w-8"
        title="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* Page numbers */}
      <div className="flex gap-2">
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="flex items-center px-1">
              ...
            </span>
          ) : (
            <Button
              key={`page-${page}`}
              onClick={() => handleClick(page)}
              className={
                currentPage !== page
                  ? "h-8 w-8 border-2 border-primary bg-background p-0 font-bold text-primary hover:bg-primary/60 hover:text-white"
                  : "h-8 w-8 border-2 p-0 font-bold text-white"
              }
            >
              {page}
            </Button>
          ),
        )}
      </div>

      {/* Next button */}
      <Button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === pageCount}
        variant="outline"
        size="icon"
        className="h-8 w-8"
        title="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {/* Last page button */}
      <Button
        onClick={() => handleClick(pageCount)}
        disabled={currentPage === pageCount}
        variant="outline"
        size="icon"
        className="h-8 w-8"
        title="Last page"
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>

      {/* Page input form */}
      <form
        onSubmit={handleInputSubmit}
        className="ml-2 flex items-center gap-2"
      >
        <span className="text-sm">Go to:</span>
        <div className="relative">
          <Input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className={`h-8 w-16 px-2 text-center ${inputError ? "border-red-500" : ""}`}
            placeholder={`1-${pageCount}`}
            aria-label="Go to page"
          />
          {inputError && (
            <div className="absolute -bottom-6 left-0 whitespace-nowrap text-xs text-red-500">
              Enter a valid page (1-{pageCount})
            </div>
          )}
        </div>
        <Button type="submit" size="sm" className="h-8">
          Go
        </Button>
      </form>

      {/* Page info */}
      <div className="ml-2 text-sm text-gray-500">
        Page {currentPage} of {pageCount}
      </div>
    </div>
  );
};

export default PaginationButtons;
