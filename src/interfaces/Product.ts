export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    stock?: number;
    category?: string;
    description?: string;
}