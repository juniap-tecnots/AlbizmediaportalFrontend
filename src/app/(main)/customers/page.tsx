import { PageHeader } from "@/components/page-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const customers = [
  { name: "Liam Johnson", email: "liam@example.com", totalSpent: 1250.00, lastOrder: "2023-10-01", avatar: "https://picsum.photos/100?c=1", fallback: "LJ" },
  { name: "Olivia Smith", email: "olivia@example.com", totalSpent: 850.75, lastOrder: "2023-09-15", avatar: "https://picsum.photos/100?c=2", fallback: "OS" },
  { name: "Noah Williams", email: "noah@example.com", totalSpent: 2350.00, lastOrder: "2023-10-05", avatar: "https://picsum.photos/100?c=3", fallback: "NW" },
  { name: "Emma Brown", email: "emma@example.com", totalSpent: 575.00, lastOrder: "2023-08-20", avatar: "https://picsum.photos/100?c=4", fallback: "EB" },
  { name: "Oliver Jones", email: "oliver@example.com", totalSpent: 3450.50, lastOrder: "2023-10-10", avatar: "https://picsum.photos/100?c=5", fallback: "OJ" },
];

export default function CustomersPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Customers"
        description="View and manage your customer base."
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Last Order</TableHead>
              <TableHead className="text-right">Total Spent</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={customer.avatar} alt={customer.name} data-ai-hint="person" />
                      <AvatarFallback>{customer.fallback}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{customer.name}</span>
                  </div>
                </TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.lastOrder}</TableCell>
                <TableCell className="text-right">${customer.totalSpent.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
