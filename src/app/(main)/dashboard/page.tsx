
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
import { Activity, Bell, Bolt, HeartPulse, Newspaper, PenSquare, PlusCircle, Settings, LayoutDashboard } from "lucide-react"
import { SystemHealth } from "@/components/dashboard/system-health"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Notifications } from "@/components/dashboard/notifications"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between">
        <PageHeader title="Dashboard" description="Here's a snapshot of your store's performance." />
        <div className="flex items-center space-x-2">
            <CalendarDateRangePicker />
            <Button variant="accent">Download Report</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
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
        <TabsContent value="overview" className="space-y-4">
          <Overview />
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="col-span-4">
                    <RecentSales />
                </div>
                <div className="col-span-3">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Articles</CardTitle>
                            <CardDescription>
                                A quick look at the latest content.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-foreground hover:text-primary cursor-pointer">The Future of AI in Journalism</p>
                                        <p className="text-sm text-muted-foreground">Published 2 hours ago</p>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-foreground hover:text-primary cursor-pointer">City Council Approves New Budget</p>
                                        <p className="text-sm text-muted-foreground">Published yesterday</p>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="font-semibold text-foreground hover:text-primary cursor-pointer">Tech Stocks Rally on Positive News</p>
                                        <p className="text-sm text-muted-foreground">Published 3 days ago</p>
                                    </div>
                                    <Button variant="ghost" size="sm">View</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </TabsContent>
        <TabsContent value="activity">
          <ActivityFeed />
        </TabsContent>
        <TabsContent value="notifications">
          <Notifications />
        </TabsContent>
        <TabsContent value="actions">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Newspaper className="text-primary"/> Create a New Article</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Start writing and publish a new article for your audience.</p>
                        <Link href="/content/articles/new">
                            <Button variant="secondary">
                                <PlusCircle className="mr-2" />
                                Add New Article
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><PenSquare className="text-primary"/> Manage Content</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Edit, review, and organize your existing articles and media.</p>
                        <Link href="/content/articles/all">
                            <Button variant="secondary">Manage Articles</Button>
                        </Link>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Settings className="text-primary"/> Configure Settings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground mb-4">Customize your dashboard and application settings.</p>
                        <Link href="/settings">
                            <Button variant="secondary">Go to Settings</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </TabsContent>
        <TabsContent value="health">
          <SystemHealth />
        </TabsContent>
      </Tabs>
    </div>
  );
}
