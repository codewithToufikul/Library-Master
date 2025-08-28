import Main from "@/Main/Main";
import AddBook from "@/pages/AddBook/AddBook";
import BorrowPage from "@/pages/BorrowPage/BorrowPage";
import BorrowSummary from "@/pages/BorrowSummery/BorrowSummery";
import EditBook from "@/pages/EditBook/EditBook";
import { Home } from "@/pages/Home/Home";
import ViewBook from "@/pages/ViewBook/ViewBook";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/all-books",
        element: <Home />,
      },
      {
        path: "/borrow/:bookId",
        element: <BorrowPage/>
      },
      {
        path: "/book/:bookId",
        element: <ViewBook/>
      },
      {
        path: "/edit-book/:bookId",
        element: <EditBook/>
      },
      {
        path: "/add-book",
        element: <AddBook/>
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary/>
      }
    ],
  },
]);
