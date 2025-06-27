import { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";

type Props = {
  onSave: (product: Product) => void;
  product?: Product;
};

export default function ProductForm({ onSave, product }: Props) {
  const defaultProduct: Product = {
    id: 0,
    name: "",
    price: 0,
    description: "",
    image: ""
  };
  const [form, setForm] = useState<Product>(defaultProduct);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (product) {
      setForm(product);
      setIsOpen(true)
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
    setIsOpen(false)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md w-full max-w-xl mx-auto text-gray-800 dark:text-white"
    >
      {/* Encabezado del acordeón */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left text-2xl font-bold mb-4 flex items-center justify-between text-gray-800 dark:text-white"
      >
        {product ? "Editar Producto" : "Crear Producto"}
        <span className={`transform transition-transform ${isOpen ? "rotate-90" : "rotate-0"}`}>
          ▶
        </span>
      </button>

      {/* Contenido del acordeón */}
      {isOpen && (
        <div className="space-y-4 transition-all duration-300 ease-in-out">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium">Nombre</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre del producto"
              required
              className="mt-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-sm font-medium">Precio</label>
            <input
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="Precio"
              required
              className="mt-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="description" className="text-sm font-medium">Descripción</label>
            <input
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción"
              className="mt-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm font-medium">URL de la Imagen</label>
            <input
              id="image"
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="https://..."
              className="mt-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="stock" className="text-sm font-medium">Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={form.stock ?? ""}
              onChange={handleChange}
              placeholder="Cantidad en stock"
              className="mt-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="category" className="text-sm font-medium">Categoría</label>
            <input
              id="category"
              name="category"
              value={form.category ?? ""}
              onChange={handleChange}
              placeholder="Categoría"
              className="mt-1 p-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition"
          >
            {product ? "Actualizar" : "Crear"}
          </button>
        </div>
      )}
    </form>
  );


}