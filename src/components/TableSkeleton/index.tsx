import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const TableSkeleton = ({ tableHeaders = [], rowLength = 15 }) => {
  const rows = Array.from({ length: rowLength }, (_, index) => index + 1);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeaders.map((header, index) => (
            <TableHead>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row}>
            {Array.from({ length: tableHeaders.length }).map((_, cellIndex) => (
              <TableCell key={cellIndex}>
                <Skeleton className="h-4 w-full" />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableSkeleton;
