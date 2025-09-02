import { AddProductDialog } from "@/components/product/add-product-dialog";
import { columns } from "@/components/product/columns";
import { DataTable } from "@/components/product/data-table";
import { PageHeader } from "@/components/page-header";
import { type Product } from "@/lib/types";

// Mock data
const products: Product[] = [
  { id: "PRO-001", name: "Wireless Headphones", image: "https://picsum.photos/200/200?a=1", category: "Electronics", price: 99.99, stock: 120, status: "in-stock" },
  { id: "PRO-002", name: "Leather Backpack", image: "https://picsum.photos/200/200?a=2", category: "Bags", price: 79.50, stock: 80, status: "in-stock" },
  { id: "PRO-003", name: "Smartwatch", image: "https://picsum.photos/200/200?a=3", category: "Electronics", price: 199.99, stock: 50, status: "in-stock" },
  { id: "PRO-004", name: "Yoga Mat", image: "https://picsum.photos/200/200?a=4", category: "Sports", price: 25.00, stock: 200, status: "in-stock" },
  { id: "PRO-005", name: "Ceramic Mug", image: "https://picsum.photos/200/200?a=5", category: "Home Goods", price: 15.00, stock: 5, status: "low-stock" },
  { id: "PRO-006", name: "Running Shoes", image: "https://picsum.photos/200/200?a=6", category: "Footwear", price: 120.00, stock: 0, status: "out-of-stock" },
  { id: "PRO-007", name: "Bluetooth Speaker", image: "https://picsum.photos/200/200?a=7", category: "Electronics", price: 45.99, stock: 95, status: "in-stock" },
  { id: "PRO-008", name: "Stainless Steel Water Bottle", image: "https://picsum.photos/200/200?a=8", category: "Accessories", price: 20.00, stock: 150, status: "in-stock" },
];

export default function ProductsPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Products"
        description="Manage your products and inventory."
        actions={<AddProductDialog />}
      />
      <DataTable columns={columns} data={products} />
    </div>
  );
}
