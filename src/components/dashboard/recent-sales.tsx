import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const sales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", avatar: "https://picsum.photos/100?a=1", fallback: "OM" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", avatar: "https://picsum.photos/100?a=2", fallback: "JL" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", avatar: "https://picsum.photos/100?a=3", fallback: "IN" },
  { name: "William Kim", email: "will@email.com", amount: "+$99.00", avatar: "https://picsum.photos/100?a=4", fallback: "WK" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", avatar: "https://picsum.photos/100?a=5", fallback: "SD" },
];

export function RecentSales() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Sales</CardTitle>
        <CardDescription>You made 265 sales this month.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {sales.map((sale, i) => (
          <div key={i} className="flex items-center gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage src={sale.avatar} alt="Avatar" data-ai-hint="person" />
              <AvatarFallback>{sale.fallback}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium leading-none">{sale.name}</p>
              <p className="text-sm text-muted-foreground">{sale.email}</p>
            </div>
            <div className="text-sm font-medium">{sale.amount}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
