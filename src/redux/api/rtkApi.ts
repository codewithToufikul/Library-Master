import type { IBook } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface BorrowResponse {
  message: string;
  success: boolean;
}

interface BorrowSummary {
  title: string;
  isbn: string;
  totalBorrowed: number;
}

// যখন API `{ data: IBook }` ফরম্যাটে ফেরত দেয়
interface BookResponse {
  data: IBook;
}

// যখন API `{ data: IBook[], meta: {...} }` ফরম্যাটে ফেরত দেয়
interface BooksResponse {
  data: IBook[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://library-api-black.vercel.app/api" }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
    // ✅ Get All Books
    getBooks: builder.query<BooksResponse, { page?: number; limit?: number } | void>({
      query: (params) => {
        const q = params
          ? `?page=${params.page || 1}&limit=${params.limit || 20}`
          : "";
        return `/books${q}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ _id }) => ({
                type: "Books" as const,
                id: _id,
              })),
              { type: "Books", id: "LIST" },
            ]
          : [{ type: "Books", id: "LIST" }],
    }),

    // ✅ Get Single Book
    getBook: builder.query<BookResponse, string>({
      query: (id) => `/books/${id}`,
      providesTags: (_, __, id) => [{ type: "Books", id }],
    }),

    // ✅ Create Book
    createBook: builder.mutation<BookResponse, Partial<IBook>>({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),

    // ✅ Update Book
    updateBook: builder.mutation<BookResponse, { id: string; body: Partial<IBook> }>({
      query: ({ id, body }) => ({ url: `/books/${id}`, method: "PUT", body }),
      invalidatesTags: (_, __, { id }) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),

    // ✅ Delete Book
    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_, __, id) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),

    // ✅ Borrow Book
    borrowBook: builder.mutation<
      BorrowResponse,
      { bookId: string; quantity: number; dueDate: string }
    >({
      query: ({ bookId, quantity, dueDate }) => ({
        url: `/borrow`,
        method: "POST",
        body: { quantity, dueDate, bookId },
      }),
      invalidatesTags: [
        { type: "Books", id: "LIST" },
        { type: "Borrows", id: "SUMMARY" },
      ],
    }),

    // ✅ Borrow Summary
    getBorrowSummary: builder.query<BorrowSummary[], void>({
      query: () => `/borrow`,
      providesTags: [{ type: "Borrows", id: "SUMMARY" }],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useBorrowBookMutation,
  useGetBorrowSummaryQuery,
} = rtkApi;
