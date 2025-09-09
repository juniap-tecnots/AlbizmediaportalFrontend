
'use client'

import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CalendarDateRangePicker } from "@/components/date-range-picker";
import { useSelector } from "react-redux";
import { selectAllWorkflowAudits } from "@/lib/redux/slices/workflowAuditSlice";
import { format } from "date-fns";

export default function AuditTrailPage() {
    const auditLogs = useSelector(selectAllWorkflowAudits);

    return (
        <div className="p-6 md:p-8">
            <PageHeader
                title="Workflow Audit Trail"
                description="An immutable log of all workflow actions for compliance and historical review."
            />
            <Card>
                <CardHeader>
                    <CardTitle>Audit Logs</CardTitle>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <p>Search and filter through all recorded actions.</p>
                        <div className="flex items-center gap-2">
                            <Input placeholder="Filter by content, user, stage..." className="w-64" />
                            <CalendarDateRangePicker />
                            <Button>Search</Button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Timestamp</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Action</TableHead>
                                <TableHead>Stage</TableHead>
                                <TableHead>Instance ID</TableHead>
                                <TableHead>Comments</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {auditLogs.map(log => (
                                <TableRow key={log.id}>
                                    <TableCell className="font-mono text-xs">{format(new Date(log.createdAt), 'yyyy-MM-dd HH:mm:ss')}</TableCell>
                                    <TableCell className="font-medium">{log.user}</TableCell>
                                    <TableCell>{log.action}</TableCell>
                                    <TableCell>{log.stage}</TableCell>
                                    <TableCell className="font-mono text-xs">{log.instanceId}</TableCell>
                                    <TableCell className="text-muted-foreground">{log.payload.comment || '-'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
