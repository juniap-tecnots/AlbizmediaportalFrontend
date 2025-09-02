export type Product = {
  id: string;
  name: string;
  image: string;
  category: string;
  price: number;
  stock: number;
  status: 'in-stock' | 'out-of-stock' | 'low-stock';
}
