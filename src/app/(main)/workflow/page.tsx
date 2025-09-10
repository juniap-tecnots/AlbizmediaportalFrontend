
'use client'

import React, { useState, useRef } from 'react';
import { Plus, Edit3, Trash2, Copy, Play, Pause, BarChart3, Users, Clock, AlertCircle, CheckCircle, ArrowRight, Settings, Filter, Search } from 'lucide-react';
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelector, useDispatch } from 'react-redux';
import { selectAllWorkflowTemplates, WorkflowTemplate, addTemplate } from "@/lib/redux/slices/workflowTemplatesSlice";
import { format } from "date-fns";
import type { RootState } from '@/lib/redux/store';
import { useToast } from '@/hooks/use-toast';


const WorkflowManagementSystem = () => {
  const [currentView, setCurrentView] = useState('list');
  const dispatch = useDispatch();
  const { toast } = useToast();
  
  const templates = useSelector(selectAllWorkflowTemplates);
  
  const [workflowBuilder, setWorkflowBuilder] = useState({
    name: '',
    description: '',
    contentType: [] as string[],
    priority: 'Medium',
    autoActivate: false,
    stages: [] as any[]
  });

  const [selectedStage, setSelectedStage] = useState<any>(null);
  const [showStageModal, setShowStageModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  const stageTypes = [
    { id: 'creator', name: 'Content Creator', color: 'bg-blue-500' },
    { id: 'editor', name: 'Editorial Review', color: 'bg-green-500' },
    { id: 'legal', name: 'Legal Review', color: 'bg-yellow-500' },
    { id: 'approver', name: 'Final Approver', color: 'bg-purple-500' }
  ];

  const handleDragStart = (e: React.DragEvent, stageType: any) => {
    e.dataTransfer.setData('stageType', JSON.stringify(stageType));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const stageType = JSON.parse(e.dataTransfer.getData('stageType'));
    const newStage = {
      id: Date.now(),
      ...stageType,
      config: {
        reviewers: [],
        sla: 24,
        escalation: null,
        actions: ['approve', 'reject', 'request_changes']
      }
    };
    setWorkflowBuilder(prev => ({
      ...prev,
      stages: [...prev.stages, newStage]
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleSaveWorkflow = () => {
    if (!workflowBuilder.name) {
      toast({
        title: "Workflow Name Required",
        description: "Please provide a name for the workflow.",
        variant: "destructive",
      });
      return;
    }
    
    const newTemplate: Omit<WorkflowTemplate, 'id'> = {
        name: workflowBuilder.name,
        contentType: workflowBuilder.contentType,
        version: 1,
        lastModified: new Date().toISOString(),
        stages: workflowBuilder.stages.map(s => ({
            id: s.id.toString(),
            name: s.name,
            assignedRoles: s.config.reviewers,
            slaHours: s.config.sla
        })),
    };

    dispatch(addTemplate(newTemplate));

    toast({
      title: "Workflow Saved",
      description: `The "${workflowBuilder.name}" workflow has been created.`,
    });
    
    // Reset builder state
    setWorkflowBuilder({
        name: '',
        description: '',
        contentType: [],
        priority: 'Medium',
        autoActivate: false,
        stages: []
    });

    setCurrentView('list');
  };


  const WorkflowList = () => (
    <div className="space-y-6">
      <PageHeader 
        title="Workflow Management"
        description="Manage content approval workflows"
        actions={
            <Button onClick={() => setCurrentView('create')}>
              <Plus className="w-5 h-5 mr-2" />
              Create New Workflow
            </Button>
        }
      />
      
      <div className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <Select onValueChange={setFilterStatus} defaultValue="All">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="All">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
            </Select>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input type="text" placeholder="Search workflows..." className="pl-8" />
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Workflow Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Stages</TableHead>
              <TableHead>Last Modified</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {templates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>{Array.isArray(template.contentType) ? template.contentType.join(', ') : template.contentType}</TableCell>
                <TableCell>
                  <Badge variant={'outline'} className="bg-green-100 text-green-800 border-green-200">
                      Active
                  </Badge>
                </TableCell>
                <TableCell>{template.stages.length} stages</TableCell>
                <TableCell>{format(new Date(template.lastModified), 'dd-MMM-yyyy')}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-1">
                    <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800">
                      <Edit3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-800">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-green-600 hover:text-green-800">
                      <BarChart3 className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );

  const WorkflowBuilderView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Workflow Builder</h1>
          <p className="text-gray-600 mt-2">Create and configure your workflow</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setCurrentView('list')}>
            Back to List
          </Button>
          <Button onClick={handleSaveWorkflow}>
            Save Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Workflow Name</label>
              <Input
                type="text"
                value={workflowBuilder.name}
                onChange={(e) => setWorkflowBuilder(prev => ({...prev, name: e.target.value}))}
                placeholder="Content Review Process"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <Textarea
                value={workflowBuilder.description}
                onChange={(e) => setWorkflowBuilder(prev => ({...prev, description: e.target.value}))}
                placeholder="Multi-stage content approval flow"
                className="h-20 resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
              <div className="space-y-2">
                {['Articles', 'Profiles', 'News', 'Features'].map(type => (
                  <div key={type} className="flex items-center">
                    <Checkbox
                      id={`type-${type}`}
                      checked={workflowBuilder.contentType.includes(type)}
                      onCheckedChange={(checked) => {
                         const isChecked = !!checked;
                        if (isChecked) {
                          setWorkflowBuilder(prev => ({...prev, contentType: [...prev.contentType, type]}));
                        } else {
                          setWorkflowBuilder(prev => ({...prev, contentType: prev.contentType.filter(t => t !== type)}));
                        }
                      }}
                    />
                    <label htmlFor={`type-${type}`} className="ml-2 text-sm text-gray-700">{type}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Priority Level</label>
              <Select
                onValueChange={(value) => setWorkflowBuilder(prev => ({...prev, priority: value}))}
                defaultValue={workflowBuilder.priority}
              >
                  <SelectTrigger><SelectValue/></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                  </SelectContent>
              </Select>
            </div>
            <div className="flex items-center">
                <Checkbox
                  id="autoActivate"
                  checked={workflowBuilder.autoActivate}
                  onCheckedChange={(checked) => setWorkflowBuilder(prev => ({...prev, autoActivate: !!checked}))}
                />
                <label htmlFor="autoActivate" className="ml-2 text-sm text-gray-700">Auto-activate workflow</label>
            </div>
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>Stage Components</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                {stageTypes.map(stage => (
                <div
                    key={stage.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, stage)}
                    className="flex items-center p-3 border-2 border-dashed border-gray-200 rounded-lg cursor-move hover:border-blue-300 hover:bg-blue-50 transition-colors"
                >
                    <div>
                    <div className="font-medium text-gray-900">{stage.name}</div>
                    <div className="text-xs text-gray-500">Drag to canvas</div>
                    </div>
                </div>
                ))}
            </CardContent>
        </Card>

        <div className="lg:col-span-2">
            <Card>
                 <CardHeader>
                    <CardTitle>Workflow Canvas</CardTitle>
                </CardHeader>
                 <CardContent>
                     <div
                        className="min-h-96 border-2 border-dashed border-gray-300 rounded-lg p-4"
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                    >
                        {workflowBuilder.stages.length === 0 ? (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <div className="text-center">
                            <div className="text-4xl mb-2">🎯</div>
                            <div>Drag stages here to build your workflow</div>
                            </div>
                        </div>
                        ) : (
                        <div className="flex items-center space-x-4 flex-wrap gap-y-4">
                            <div className="bg-gray-100 px-4 py-2 rounded-lg font-medium">START</div>
                            {workflowBuilder.stages.map((stage, index) => (
                            <React.Fragment key={stage.id}>
                                <ArrowRight className="w-5 h-5 text-gray-400" />
                                <div
                                className={`${stage.color} text-white px-4 py-2 rounded-lg cursor-pointer hover:opacity-90 transition-opacity flex items-center space-x-2`}
                                onClick={() => {
                                    setSelectedStage(stage);
                                    setShowStageModal(true);
                                }}
                                >
                                <span className="font-medium">{stage.name}</span>
                                <Settings className="w-4 h-4" />
                                </div>
                            </React.Fragment>
                            ))}
                            <ArrowRight className="w-5 h-5 text-gray-400" />
                            <div className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium">PUBLISH</div>
                        </div>
                        )}
                    </div>
                 </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );

  const StageConfigModal = () => {
    if (!showStageModal || !selectedStage) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Configure {selectedStage.name}</h3>
            <button
              onClick={() => setShowStageModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stage Name</label>
              <Input
                type="text"
                defaultValue={selectedStage.name}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Role</label>
              <Select>
                  <SelectTrigger><SelectValue placeholder="Select a role" /></SelectTrigger>
                  <SelectContent>
                      <SelectItem value="creator">Content Creator</SelectItem>
                      <SelectItem value="editor">Editor</SelectItem>
                      <SelectItem value="legal">Legal Team</SelectItem>
                      <SelectItem value="senior">Senior Editor</SelectItem>
                  </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SLA (hours)</label>
                <Input
                  type="number"
                  defaultValue={selectedStage.config?.sla || 24}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Escalation (hours)</label>
                <Input
                  type="number"
                  defaultValue={48}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Available Actions</label>
              <div className="space-y-2">
                {['Approve', 'Reject', 'Request Changes', 'Escalate'].map(action => (
                  <div key={action} className="flex items-center">
                    <Checkbox
                      id={`action-${action}`}
                      defaultChecked={['Approve', 'Reject', 'Request Changes'].includes(action)}
                    />
                    <label htmlFor={`action-${action}`} className="ml-2 text-sm text-gray-700">{action}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button variant="outline" onClick={() => setShowStageModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowStageModal(false)}>
              Save Configuration
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 md:p-8">
        {currentView === 'list' && <WorkflowList />}
        {currentView === 'create' && <WorkflowBuilderView />}
        <StageConfigModal />
    </div>
  );
};

export default WorkflowManagementSystem;
