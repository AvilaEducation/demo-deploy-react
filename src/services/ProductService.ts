import { Product } from "../interfaces/Product";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API_URL = API_BASE_URL + "/products"

console.log(API_BASE_URL)

export class ProductService {
  static async getAll(): Promise<Product[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw await res.json();
    return await res.json();
  }

  static async searchByName(name: string): Promise<Product[]> {
    const res = await fetch(`${API_URL}/search?queryName=${encodeURIComponent(name)}`);
    if (!res.ok) throw await res.json();
    return await res.json();
  }

  static async create(product: Product): Promise<Product> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw await res.json();
    return await res.json();
  }

  static async update(product: Product): Promise<Product> {
    const res = await fetch(`${API_URL}/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw await res.json();
    return await res.json();
  }

  static async delete(id: number): Promise<void> {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw await res.json();
  }
}