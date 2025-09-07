
'use client'

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Check, Clock, X, Eye } from 'lucide-react';

const workflowSteps = [
    { id: 1, name: 'Editorial Review' },
    { id: 2, name: 'Publishing' },
    { id: 3, name: 'Live' }
];

const articlesInQueue = [
    { id: 1, title: 'The Future of AI in Journalism', author: 'Jane Doe', submitted: '2024-05-10', status: 'Pending' },
    { id: 2, title: 'City Council Approves New Budget', author: 'John Smith', submitted: '2024-05-09', status: 'Approved' },
    { id: 3, title: 'Tech Stocks Rally on Positive News', author: 'Emily White', submitted: '2024-05-08', status: 'Rejected' },
];


export default function WorkflowPage() {
    const [activeStep, setActiveStep] = useState(1);

    const handleNext = () => {
        setActiveStep(prev => Math.min(prev + 1, workflowSteps.length));
    };

    const handlePrev = () => {
        setActiveStep(prev => Math.max(prev - 1, 1));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Content Publishing Workflow</CardTitle>
                <CardDescription>Manage and visualize your content pipeline from draft to publication.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                <div>
                    <div className="flex items-center justify-between">
                        {workflowSteps.map((step, index) => (
                            <React.Fragment key={step.id}>
                                <div className="flex flex-col items-center">
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeStep >= step.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                                        {activeStep > step.id ? <Check size={16} /> : step.id}
                                    </div>
                                    <p className={`mt-2 text-sm font-medium ${activeStep >= step.id ? 'text-primary' : 'text-muted-foreground'}`}>{step.name}</p>
                                </div>
                                {index < workflowSteps.length - 1 && (
                                    <div className={`flex-1 h-0.5 ${activeStep > index + 1 ? 'bg-primary' : 'bg-muted'}`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center gap-4">
                    <Button onClick={handlePrev} disabled={activeStep === 1}>Previous Step</Button>
                    <Button onClick={handleNext} disabled={activeStep === workflowSteps.length}>Next Stage</Button>
                </div>
                
                <div>
                    <h3 className="text-lg font-semibold mb-2">Current Stage: {workflowSteps.find(s => s.id === activeStep)?.name}</h3>
                    <p className="text-muted-foreground mb-4">Responsible Role: Editor</p>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Article Title</TableHead>
                                <TableHead>Author</TableHead>
                                <TableHead>Submitted</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {articlesInQueue.map(article => (
                                <TableRow key={article.id}>
                                    <TableCell>{article.title}</TableCell>
                                    <TableCell>{article.author}</TableCell>
                                    <TableCell>{article.submitted}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            article.status === 'Approved' ? 'default' :
                                            article.status === 'Rejected' ? 'destructive' :
                                            'secondary'
                                        } className="flex items-center w-fit">
                                            {article.status === 'Approved' && <Check className="mr-1 h-3 w-3" />}
                                            {article.status === 'Rejected' && <X className="mr-1 h-3 w-3" />}
                                            {article.status === 'Pending' && <Clock className="mr-1 h-3 w-3" />}
                                            {article.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Button variant="outline" size="icon">
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600">
                                            <Check className="h-4 w-4" />
                                        </Button>
                                        <Button variant="outline" size="icon" className="text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600">
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
