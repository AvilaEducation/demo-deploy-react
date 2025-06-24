import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";

type Props = {
  onSave: (product: Product) => void;
  product?: Product;
};

export default function ProductForm({ onSave, product }: Props) {
  const defaultProduct: Product = {
    name: "",
    price: 0,
    description: "",
    img: ""
  };
  const [form, setForm] = useState<Product>(defaultProduct);

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    setForm(defaultProduct);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4 d-flex">
      <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
      <input name="price" value={form.price} onChange={handleChange} placeholder="Price" required />
      <input name="description" value={form.description} onChange={handleChange} placeholder="Description" required />
      <input name="img" value={form.img} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">{product ? "Update" : "Create"}</button>
    </form>
  );
}