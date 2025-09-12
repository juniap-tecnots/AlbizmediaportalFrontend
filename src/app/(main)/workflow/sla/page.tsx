
'use client'

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { selectAllSlaSettings, selectAllEscalationRules, updateSlaSettings, updateEscalationRules, SlaSetting, EscalationRule } from "@/lib/redux/slices/slaSlice";
import type { RootState } from "@/lib/redux/store";

export default function SlaPage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const initialSlaSettings = useSelector(selectAllSlaSettings);
    const initialEscalationRules = useSelector(selectAllEscalationRules);

    const [slaSettings, setSlaSettings] = useState<SlaSetting[]>([]);
    const [escalationRules, setEscalationRules] = useState<EscalationRule[]>([]);

    useEffect(() => {
        setSlaSettings(initialSlaSettings);
    }, [initialSlaSettings]);

    useEffect(() => {
        setEscalationRules(initialEscalationRules);
    }, [initialEscalationRules]);

    const handleSlaChange = (stage: string, hours: number) => {
        setSlaSettings(currentSettings =>
            currentSettings.map(setting =>
                setting.stage === stage ? { ...setting, hours } : setting
            )
        );
    };

    const handleRuleChange = (id: string, field: keyof EscalationRule, value: any) => {
        setEscalationRules(currentRules =>
            currentRules.map(rule =>
                rule.id === id ? { ...rule, [field]: value } : rule
            )
        );
    };

    const handleSaveChanges = () => {
        dispatch(updateSlaSettings(slaSettings));
        dispatch(updateEscalationRules(escalationRules));
        toast({
            title: "Settings Saved",
            description: "Your SLA and escalation settings have been updated.",
        });
    };
    
    const getStageSla = (stage: string) => slaSettings.find(s => s.stage === stage)?.hours || 0;

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
                                <Input id="editorial-sla" type="number" value={getStageSla('Editorial Review')} onChange={e => handleSlaChange('Editorial Review', parseInt(e.target.value))} className="w-20" />
                                <span>hours</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="expert-sla">Expert Review</Label>
                             <div className="flex items-center gap-2">
                                <Input id="expert-sla" type="number" value={getStageSla('Expert Review')} onChange={e => handleSlaChange('Expert Review', parseInt(e.target.value))} className="w-20" />
                                <span>hours</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <Label htmlFor="legal-sla">Legal Review</Label>
                             <div className="flex items-center gap-2">
                                <Input id="legal-sla" type="number" value={getStageSla('Legal Review')} onChange={e => handleSlaChange('Legal Review', parseInt(e.target.value))} className="w-20" />
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
                        {escalationRules.map(rule => (
                            <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                               <div>
                                    <h4 className="font-semibold">{rule.stage} Escalation</h4>
                                    <p className="text-sm text-muted-foreground">If a task is overdue by {rule.overdueHours} hours...</p>
                               </div>
                               <div className="flex items-center gap-4">
                                   <Select value={rule.action} onValueChange={(value) => handleRuleChange(rule.id, 'action', value)}>
                                       <SelectTrigger className="w-[200px]">
                                           <SelectValue placeholder="Select Action" />
                                       </SelectTrigger>
                                       <SelectContent>
                                           <SelectItem value="notify-manager">Notify Manager</SelectItem>
                                           <SelectItem value="reassign-team">Reassign to Team Pool</SelectItem>
                                           <SelectItem value="auto-reject">Auto-reject</SelectItem>
                                           <SelectItem value="notify-head">Notify Head of Legal</SelectItem>
                                           <SelectItem value="block-content">Block Content</SelectItem>
                                       </SelectContent>
                                   </Select>
                                   <Switch checked={rule.enabled} onCheckedChange={(checked) => handleRuleChange(rule.id, 'enabled', checked)} />
                               </div>
                            </div>
                        ))}

                         <div className="text-right">
                             <Button onClick={handleSaveChanges}>Save Changes</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
