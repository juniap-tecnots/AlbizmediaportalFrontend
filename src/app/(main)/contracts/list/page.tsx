
'use client'

import { useState } from "react";
import { useSelector } from "react-redux";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Edit, Trash2, Search } from "lucide-react";
import { selectAllContracts, Contract, ContractStatus } from "@/lib/redux/slices/contractsSlice";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { format } from "date-fns";

export default function ContractsList() {
    const allContracts = useSelector(selectAllContracts);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<ContractStatus | 'All'>('All');

    const getStatusBadgeClass = (status: ContractStatus) => {
        switch (status) {
            case 'Active': return 'bg-green-100 text-green-800 border-green-200';
            case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Draft': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'Expired': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'Terminated': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-secondary';
        }
    };
    
    const filteredContracts = allContracts.filter(contract => {
        const matchesStatus = statusFilter === 'All' || contract.status === statusFilter;
        const matchesSearch = contract.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              contract.partyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              contract.id.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="p-6 md:p-8">
            <PageHeader
                title="All Contracts"
                description="Manage all your contracts from one place."
                actions={(
                     <Link href="/contracts/create">
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Create Contract
                        </Button>
                    </Link>
                )}
            />
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <Select onValueChange={(value: ContractStatus | 'All') => setStatusFilter(value)} defaultValue="All">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All">All Statuses</SelectItem>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Draft">Draft</SelectItem>
                            <SelectItem value="Expired">Expired</SelectItem>
                            <SelectItem value="Terminated">Terminated</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Search contracts..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Contract ID</TableHead>
                            <TableHead>Contract Title</TableHead>
                            <TableHead>Party Name</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Last Modified</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredContracts.map(contract => (
                            <TableRow key={contract.id}>
                                <TableCell className="font-mono text-xs">{contract.id}</TableCell>
                                <TableCell className="font-medium">{contract.title}</TableCell>
                                <TableCell>{contract.partyName}</TableCell>
                                <TableCell>{contract.type}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn('font-semibold', getStatusBadgeClass(contract.status))}>{contract.status}</Badge>
                                </TableCell>
                                <TableCell>{format(new Date(contract.lastModified), 'dd-MMM-yyyy')}</TableCell>
                                <TableCell className="text-right space-x-2">
                                     <Button variant="outline" size="icon" className="h-8 w-8 text-green-500 border-green-500 bg-green-500/10 hover:bg-green-500/20 hover:text-green-600">
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="outline" size="icon" className="h-8 w-8 text-red-500 border-red-500 bg-red-500/10 hover:bg-red-500/20 hover:text-red-600">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
             {filteredContracts.length === 0 && (
                <div className="text-center p-12 text-muted-foreground">
                    No contracts found.
                </div>
            )}
        </div>
    );
}
