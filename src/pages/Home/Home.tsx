import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/api/rtkApi";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export const Home = () => {
  const { data, isLoading } = useGetBooksQuery();
  const [deleteBook] = useDeleteBookMutation();

  if (isLoading) return <p>Loading...</p>;

  const handleDeleteBook = async (bookId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deleteBook(bookId).unwrap();
        Swal.fire("Deleted!", "Book has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete the book.", "error");
      }
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Author</TableHead>
            <TableHead>Genre</TableHead>
            <TableHead>ISBN</TableHead>
            <TableHead>Copies</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.isbn}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>{book.available ? "Available" : "Not Available"}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button className="bg-red-400 hover:bg-red-700">Action</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link to={`/book/${book._id}`}>
                      <DropdownMenuItem>View Book</DropdownMenuItem>
                    </Link>
                    <Link to={`/edit-book/${book._id}`}>
                      <DropdownMenuItem>Edit Book</DropdownMenuItem>
                    </Link>
                    <Link to={`/borrow/${book._id}`}>
                      <DropdownMenuItem>Borrow Book</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => handleDeleteBook(book._id)}>Delete Book</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
