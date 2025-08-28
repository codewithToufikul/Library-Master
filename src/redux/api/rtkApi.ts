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

export const rtkApi = createApi({
  reducerPath: "rtkApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://library-api-black.vercel.app/api" }),
  tagTypes: ["Books", "Borrows"],
  endpoints: (builder) => ({
    getBooks: builder.query<
      { data: IBook[]; meta: any },
      { page?: number; limit?: number } | void
    >({
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

    getBook: builder.query<IBook, string>({
      query: (id) => `/books/${id}`,
      providesTags: (result, error, id) => [{ type: "Books", id }],
    }),

    createBook: builder.mutation<IBook, Partial<IBook>>({
      query: (body) => ({
        url: "/books",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Books", id: "LIST" }],
    }),

    updateBook: builder.mutation<IBook, { id: string; body: Partial<IBook> }>({
      query: ({ id, body }) => ({ url: `/books/${id}`, method: "PUT", body }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),

    deleteBook: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "Books", id },
        { type: "Books", id: "LIST" },
      ],
    }),

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
