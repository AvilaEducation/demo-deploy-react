import React, { useEffect, useState } from "react";
import { Product } from "../interfaces/Product";
import { ProductService } from "../services/ProductService";
import { ExceptionDTO } from "../interfaces/ExceptionDTO";

type Props = {
  productId: number;
  onClose: () => void;
  onError: (err: ExceptionDTO) => void;
};

const ProductDetailModal: React.FC<Props> = ({ productId, onClose, onError }) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if(productId !== 0){
        ProductService.searchById(productId).then(setProduct).catch(onError);
    }else{
        setProduct(null)
    }
  }, [productId]);

  if (!product) return null;

return (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
    <div className="bg-gray-900 p-6 rounded-xl w-96 shadow-lg relative text-white">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
        aria-label="Cerrar"
      >
        ✕
      </button>

      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4 border border-gray-700"
      />

      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-300 mb-2">{product.description}</p>
      <p className="text-blue-400 font-semibold mb-1">
        Precio: ${product.price.toFixed(2)}
      </p>
      <p className="text-gray-300">Stock: {product.stock}</p>
      <p className="text-gray-500 text-sm mt-2">Categoría: {product.category}</p>
    </div>
  </div>
);

};

export default ProductDetailModal;