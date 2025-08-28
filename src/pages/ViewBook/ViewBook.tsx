import { useGetBookQuery } from "@/redux/api/rtkApi";
import type { IBook } from "@/types";
import { useParams } from "react-router";

const ViewBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { data: response, isLoading, isError } = useGetBookQuery(bookId!);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Error / Not found state
  if (isError || !response?.data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600 mb-2">Book Not Found</h2>
          <p className="text-gray-500">The requested book could not be found.</p>
        </div>
      </div>
    );
  }

  const book: IBook = response.data;

const formattedCreatedAt = book.createdAt
  ? new Date(book.createdAt).toLocaleDateString()
  : "N/A";

const formattedUpdatedAt = book.updatedAt
  ? new Date(book.updatedAt).toLocaleDateString()
  : "N/A";

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{book.title}</h1>
        <p className="text-xl text-gray-600 mb-4">by {book.author}</p>

        {/* Availability Status */}
        <div className="flex items-center gap-4 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              book.available ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
            }`}
          >
            {book.available ? "Available" : "Not Available"}
          </span>
          <span className="text-sm text-gray-500">
            {book.copies} {book.copies === 1 ? "copy" : "copies"} available
          </span>
        </div>

        {/* Genre Badge */}
        <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          {book.genre}
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Book Details */}
        <div className="md:col-span-2 space-y-6">
          {/* Description */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{book.description}</p>
          </div>

          {/* Book Information */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Book Information</h2>
            <div className="bg-gray-50 rounded-lg p-6">
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">ISBN</dt>
                  <dd className="mt-1 text-sm text-gray-900 font-mono">{book.isbn}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Genre</dt>
                  <dd className="mt-1 text-sm text-gray-900">{book.genre}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Author</dt>
                  <dd className="mt-1 text-sm text-gray-900">{book.author}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Copies Available</dt>
                  <dd className="mt-1 text-sm text-gray-900">{book.copies}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Date Added</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formattedCreatedAt}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500 uppercase tracking-wide">Last Updated</dt>
                  <dd className="mt-1 text-sm text-gray-900">{formattedUpdatedAt}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
