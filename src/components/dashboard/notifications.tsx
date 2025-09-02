import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function Notifications() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Your latest alerts and messages.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center h-48">
            <p className="text-muted-foreground">No new notifications.</p>
        </div>
      </CardContent>
    </Card>
  )
}
