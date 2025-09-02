import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

export function SystemHealth() {
  return (
    <Card className="mt-4">
      <CardHeader>
        <CardTitle>System Health</CardTitle>
        <CardDescription>An overview of your system's operational status.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="h-5 w-5" />
            <p className="font-semibold">All systems normal.</p>
        </div>
      </CardContent>
    </Card>
  )
}
