import { useEffect, useRef, useState } from "react";
import { Product } from "./interfaces/Product";
import { ExceptionDTO } from "./interfaces/ExceptionDTO";
import { ProductService } from "./services/ProductService";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import ProductSearch from "./components/ProductSearch";
import ProductDetailModal from "./components/ProductDetailModal";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | undefined>();
  const [productSelected, setProductSelected] = useState<number>(0);
  const targetRef = useRef<HTMLDivElement>(null);

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
        alert(`Producto ${product.name} fue ${product.id ? "Actuazlizado" : "Creado"} con exito!`);
      })
      .catch(handleError);
  };

  const handleDelete = (id: number) => {
    ProductService.delete(id)
      .then(() => setProducts((prev) => prev.filter((p) => p.id !== id)))
      .catch(handleError);
  };

  const handleEdit = (product: Product) => {
    setEditing(product)
    targetRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const handleCloseModal = () => {
    setProductSelected(0)
  }

  return (
    <div className="min-h-screen max-w-[1200px] mx-auto p-4 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white p-6">
      <div className="max-w-6xl mx-auto space-y-4">
        <header className="text-center">
          <h1 className="text-1xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            Product Manager <span className="text-sm text-gray-500 dark:text-gray-400">
            by Techlab
          </span>
          </h1>
        </header>

        <section ref={targetRef} className="min-w-[1024px] min-h-[85vh] bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 space-y-4">
          {/* Formulario de producto */}
          <ProductForm onSave={handleSave} product={editing} />

          {/* Buscador */}
          <ProductSearch onSearch={handleSearch} />

          {/* Listado de productos */}
          <ProductList
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onSelectProduct={setProductSelected}
          />
        </section>

        {/* Modal de detalles */}
        <ProductDetailModal
          onError={handleError}
          productId={productSelected}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );

}

export default App;