import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/rtkApi";
import type { IBook } from "@/types";

const EditBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();

  const { data: book, isLoading } = useGetBookQuery(bookId!);
  const [updateBook, { isLoading: isUpdating }] = useUpdateBookMutation();

  const { register, handleSubmit, reset } = useForm<IBook>();

  useEffect(() => {
    if (book) {
      reset(book.data);
    }
  }, [book, reset]);

  const onSubmit = async (formData: IBook) => {
    try {
      await updateBook({ id: bookId!, body: formData }).unwrap();
      navigate("/all-books");
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  if (isLoading) return <p className="text-center">Loading book details...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Edit Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            {...register("title", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Author</label>
          <input
            type="text"
            {...register("author", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Genre</label>
          <input
            type="text"
            {...register("genre", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">ISBN</label>
          <input
            type="text"
            {...register("isbn", { required: true })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Description</label>
          <textarea
            {...register("description")}
            className="w-full border px-3 py-2 rounded"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1">Copies</label>
          <input
            type="number"
            {...register("copies", { required: true, min: 0 })}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register("available")} />
          <label>Available</label>
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isUpdating ? "Updating..." : "Update Book"}
        </button>
      </form>
    </div>
  );
};

export default EditBook;
