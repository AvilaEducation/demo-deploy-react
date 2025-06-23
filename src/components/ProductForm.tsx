import { useState } from "react";
import { Product } from "../interfaces/Product";

type Props = {
  onSave: (product: Product) => void;
  product?: Product;
};

export default function ProductForm({ onSave, product }: Props) {
  const [form, setForm] = useState<Product>(
    product || { name: "", price: "", description: "", img: "" }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setForm({ name: "", price: "", description: "", img: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <input name="img" value={form.img} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">{product ? "Update" : "Create"}</button>
    </form>
  );
}