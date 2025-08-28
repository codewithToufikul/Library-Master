// src/pages/AddBook.tsx
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCreateBookMutation } from "@/redux/api/rtkApi";
import type { IBook } from "@/types";
import toast from "react-hot-toast";

const AddBook = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();

  const { register, handleSubmit, reset } = useForm<IBook>({
    defaultValues: {
      title: "",
      author: "",
      genre: undefined,
      isbn: "",
      description: "",
      copies: 0,
      available: true,
    },
  });

  const onSubmit = async (formData: IBook) => {
    try {
      await createBook(formData).unwrap();
      toast.success("Book Added Successfully!");
      reset();
      navigate("/all-books");
    } catch (error) {
      console.error("Failed to add book:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Book</h2>
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
          <select
            {...register("genre", { required: true })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Genre</option>
            <option value="FICTION">Fiction</option>
            <option value="NON_FICTION">Non-Fiction</option>
            <option value="SCIENCE">Science</option>
            <option value="HISTORY">History</option>
            <option value="BIOGRAPHY">Biography</option>
            <option value="FANTASY">Fantasy</option>
          </select>
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
          disabled={isLoading}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          {isLoading ? "Adding..." : "Add Book"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
