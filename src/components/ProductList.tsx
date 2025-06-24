import { Product } from "../interfaces/Product";
import box from "/box.jpg?url";

type Props = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
};

export default function ProductList({ products, onEdit, onDelete }: Props) {
  return (
    <div className="limit-container">
      {products.map((p) => (
        <div key={p.id} className="border p-2 mb-2">
          <h3>{p.name}</h3>
          <img src={p.img || box} alt={p.name} width={100} />
          <p>{p.description}</p>
          <p>{p.price}</p>
          <button onClick={() => onEdit(p)}>Edit</button>
          <button onClick={() => p.id && onDelete(p.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
