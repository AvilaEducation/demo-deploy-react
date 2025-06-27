import { Product } from "../interfaces/Product";
import box from "/box.jpg?url";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onSelectProduct: (id: number) => void;
};

export default function ProductList({ products, onEdit, onDelete, onSelectProduct }: Props) {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              {p.name}
            </h3>

            <img
              src={p.image || box}
              alt={p.name}
              className="w-full h-40 object-cover rounded-md mb-3 cursor-pointer border border-gray-300 dark:border-gray-600"
              onClick={() => onSelectProduct(p.id)}
            />

            <p className="text-md font-semibold text-blue-600 dark:text-blue-400 mb-4">
              ${p.price?.toFixed(2)}
            </p>

            <div className="flex justify-between gap-2">
              <button
                onClick={() => onEdit(p)}
                className="flex-1 px-3 py-2 text-sm bg-yellow-500 hover:bg-yellow-600 text-white rounded-md transition"
              >
                Editar
              </button>
              <button
                onClick={() => p.id && onDelete(p.id)}
                className="flex-1 px-3 py-2 text-sm bg-red-600 hover:bg-red-700 text-white rounded-md transition"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

}
