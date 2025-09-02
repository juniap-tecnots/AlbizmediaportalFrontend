import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/page-header"
import { Overview } from "@/components/dashboard/overview"
import { RecentSales } from "@/components/dashboard/recent-sales"
import { CalendarDateRangePicker } from "@/components/date-range-picker"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Activity, Bell, Bolt, HeartPulse } from "lucide-react"
import { SystemHealth } from "@/components/dashboard/system-health"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Notifications } from "@/components/dashboard/notifications"
import { ActivityFeed } from "@/components/dashboard/activity-feed"

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Dashboard" description="Here's a snapshot of your store's performance." />
        <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button>Download Report</Button>
        </div>
      </div>
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">
            <LayoutDashboard className="mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="activity">
            <Activity className="mr-2" />
            Activity Feed
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="actions">
            <Bolt className="mr-2" />
            Quick Actions
          </TabsTrigger>
          <TabsTrigger value="health">
            <HeartPulse className="mr-2" />
            System Health
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Overview />
        </TabsContent>
        <TabsContent value="activity">
          <ActivityFeed />
        </TabsContent>
        <TabsContent value="notifications">
          <Notifications />
        </TabsContent>
        <TabsContent value="actions">
          <QuickActions />
        </TabsContent>
        <TabsContent value="health">
          <SystemHealth />
        </TabsContent>
      </Tabs>
    </div>
  );
}
import { LayoutDashboard } from "lucide-react"
