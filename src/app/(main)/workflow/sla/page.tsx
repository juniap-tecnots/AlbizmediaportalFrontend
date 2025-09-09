
'use client'

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SlaPage() {
    return (
        <div className="p-6 md:p-8">
            <PageHeader
                title="SLA & Escalations"
                description="Configure service-level agreements and escalation rules for your workflows."
            />
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Default SLA Configuration</CardTitle>
                        <CardDescription>Set default completion times for each workflow stage.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="editorial-sla">Editorial Review</Label>
                            <div className="flex items-center gap-2">
                                <Input id="editorial-sla" type="number" defaultValue="24" className="w-20" />
                                <span>hours</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="expert-sla">Expert Review</Label>
                             <div className="flex items-center gap-2">
                                <Input id="expert-sla" type="number" defaultValue="48" className="w-20" />
                                <span>hours</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="legal-sla">Legal Review</Label>
                             <div className="flex items-center gap-2">
                                <Input id="legal-sla" type="number" defaultValue="72" className="w-20" />
                                <span>hours</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Escalation Rules</CardTitle>
                        <CardDescription>Define what happens when an SLA is breached.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                           <div>
                                <h4 className="font-semibold">Editorial Escalation</h4>
                                <p className="text-sm text-muted-foreground">If an editorial task is overdue by 4 hours...</p>
                           </div>
                           <div className="flex items-center gap-4">
                               <Select defaultValue="notify-manager">
                                   <SelectTrigger className="w-[200px]">
                                       <SelectValue placeholder="Select Action" />
                                   </SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="notify-manager">Notify Manager</SelectItem>
                                       <SelectItem value="reassign-team">Reassign to Team Pool</SelectItem>
                                       <SelectItem value="auto-reject">Auto-reject</SelectItem>
                                   </SelectContent>
                               </Select>
                               <Switch defaultChecked />
                           </div>
                        </div>
                         <div className="flex items-center justify-between p-4 border rounded-lg">
                           <div>
                                <h4 className="font-semibold">Legal Escalation</h4>
                                <p className="text-sm text-muted-foreground">If a legal task is overdue by 12 hours...</p>
                           </div>
                           <div className="flex items-center gap-4">
                               <Select defaultValue="notify-head">
                                   <SelectTrigger className="w-[200px]">
                                       <SelectValue placeholder="Select Action" />
                                   </SelectTrigger>
                                   <SelectContent>
                                       <SelectItem value="notify-head">Notify Head of Legal</SelectItem>
                                       <SelectItem value="block-content">Block Content</SelectItem>
                                   </SelectContent>
                               </Select>
                               <Switch defaultChecked/>
                           </div>
                        </div>
                         <div className="text-right">
                             <Button>Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
