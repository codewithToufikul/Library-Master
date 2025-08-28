import { useGetBorrowSummaryQuery } from "@/redux/api/rtkApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const BorrowSummary = () => {
  const { data: response, isLoading, isError } = useGetBorrowSummaryQuery();
  const data = response?.data;

  if (isLoading) return <p className="text-center py-4">Loading borrow summary...</p>;
  if (isError) return <p className="text-center py-4 text-red-500">Failed to load borrow summary.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Borrow Summary</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Book Title</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Total Borrowed</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.book.title}</TableCell>
              <TableCell>{item.book.isbn}</TableCell>
              <TableCell>{item.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BorrowSummary;
