import { useBorrowBookMutation, useGetBookQuery } from "@/redux/api/rtkApi";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast"

const BorrowPage: React.FC = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const { data } = useGetBookQuery(bookId  || "");
  const [borrow, { isLoading }] = useBorrowBookMutation();
  const navigate = useNavigate();

  if (!bookId) return <div>No book selected</div>;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (quantity > data!.copies) return toast.error("Quantity exceeds available copies");
    try {
      await borrow({ bookId, quantity, dueDate }).unwrap();
      toast.success("Borrowed successfully");
      navigate("/borrow-summary")
    } catch (err: any) {
      toast.error(err?.message || "Borrow failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Borrow: {data?.title}</h2>
      <form onSubmit={onSubmit} className="space-y-3">
        <label>Quantity
          <input type="number" onChange={e=>setQuantity(Number(e.target.value))} />
        </label>
        <label>Due Date
          <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} required />
        </label>
        <button disabled={isLoading} className="btn">Submit</button>
      </form>
    </div>
  );
};
export default BorrowPage;
