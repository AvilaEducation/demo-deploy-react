import { useEffect, useState } from "react";
import { Product } from "./interfaces/Product";
import { ExceptionDTO } from "./interfaces/ExceptionDTO";
import { ProductService } from "./services/ProductService";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductSearch from "./components/ProductSearch";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | undefined>();

  useEffect(() => {
    ProductService.getAll()
      .then(setProducts)
      .catch(handleError);
  }, []);

  const handleError = (err: ExceptionDTO) => {
    alert(`${err.title}: ${err.message}`);
  };

  const handleSearch = (name: string) => {
    if (name.trim() === "") {
      ProductService.getAll().then(setProducts).catch(handleError);
    } else {
      ProductService.searchByName(name).then(setProducts).catch(handleError);
    }
  };

  const handleSave = (product: Product) => {
    const action = product.id ? ProductService.update : ProductService.create;
    action(product)
      .then((saved) => {
        setProducts((prev) => {
          const exists = prev.some((p) => p.id === saved.id);
          return exists
            ? prev.map((p) => (p.id === saved.id ? saved : p))
            : [...prev, saved];
        });
        setEditing(undefined);
      })
      .catch(handleError);
  };

  const handleDelete = (id: number) => {
    ProductService.delete(id)
      .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)))
      .catch(handleError);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Product Manager - Techlab</h1>
      <ProductForm onSave={handleSave} product={editing} />

      <ProductSearch onSearch={handleSearch} />

      <ProductList products={products} onEdit={setEditing} onDelete={handleDelete} />
    </div>
  );
}

export default App;