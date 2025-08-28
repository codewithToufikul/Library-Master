import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/rtkApi";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Book, Calendar, Hash, ArrowLeft, Loader2 } from "lucide-react";

const BorrowPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const { data, isLoading: isLoadingBook } = useGetBookQuery(bookId || "");
  const [borrow, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  if (!bookId) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No Book Selected
          </h2>
          <p className="text-gray-600 mb-4">Please select a book to borrow.</p>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </button>
        </div>
      </div>
    );
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const book = data?.data; // ✅ safe access

    if (!book) {
      return toast.error("Book details not found");
    }

    if (quantity > book.copies) {
      return toast.error("Quantity exceeds available copies");
    }

    try {
      await borrow({ bookId, quantity, dueDate }).unwrap();
      toast.success("Book borrowed successfully!");
      navigate("/borrow-summary");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("Failed to borrow book");
      }
    }
  };

  if (isLoadingBook) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-lg text-gray-600">Loading book details...</span>
        </div>
      </div>
    );
  }

  const book = data?.data; // ✅ use this safely

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Borrow Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Quantity Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="relative">
                <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  min="1"
                  max={book?.copies || 1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter quantity"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Maximum available: {book?.copies ?? 0}
              </p>
            </div>

            {/* Due Date Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Due Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Select when you plan to return the book
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading || !dueDate || quantity < 1}
                className="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Book className="h-4 w-4 mr-2" />
                    Borrow Book
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BorrowPage;
