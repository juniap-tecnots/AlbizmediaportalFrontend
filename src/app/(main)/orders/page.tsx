import { PageHeader } from "@/components/page-header"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const orders = [
  { id: "ORD-001", customer: "Liam Johnson", date: "2023-10-23", status: "Fulfilled", total: 250.00 },
  { id: "ORD-002", customer: "Olivia Smith", date: "2023-10-22", status: "Fulfilled", total: 150.75 },
  { id: "ORD-003", customer: "Noah Williams", date: "2023-10-21", status: "Pending", total: 350.00 },
  { id: "ORD-004", customer: "Emma Brown", date: "2023-10-20", status: "Cancelled", total: 75.00 },
  { id: "ORD-005", customer: "Oliver Jones", date: "2023-10-19", status: "Fulfilled", total: 450.50 },
  { id: "ORD-006", customer: "Ava Garcia", date: "2023-10-18", status: "Fulfilled", total: 55.00 },
];

export default function OrdersPage() {
  return (
    <div className="p-6 md:p-8">
      <PageHeader
        title="Orders"
        description="View and manage your store's orders."
      />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant={
                    order.status === 'Fulfilled' ? 'default' :
                    order.status === 'Pending' ? 'secondary' : 'destructive'
                  }>{order.status}</Badge>
                </TableCell>
                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
