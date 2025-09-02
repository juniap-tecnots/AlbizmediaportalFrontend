import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { RecentSales } from "./recent-sales"

export function ActivityFeed() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>A log of recent actions and events.</CardDescription>
      </CardHeader>
      <CardContent>
        <RecentSales />
      </CardContent>
    </Card>
  )
}
