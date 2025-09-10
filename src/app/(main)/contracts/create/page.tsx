
'use client'

import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, UploadCloud, File as FileIcon, X } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { addContract, ContractStatus, ContractType } from "@/lib/redux/slices/contractsSlice";
import { PageHeader } from "@/components/page-header";
import { selectAllUsers } from "@/lib/redux/slices/usersSlice";

export default function CreateContractPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const allUsers = useSelector(selectAllUsers);

    const [title, setTitle] = useState('');
    const [type, setType] = useState<ContractType>('Author Agreement');
    const [partyName, setPartyName] = useState('');
    const [effectiveDate, setEffectiveDate] = useState<Date | undefined>();
    const [expiryDate, setExpiryDate] = useState<Date | undefined>();
    const [terms, setTerms] = useState('');
    const [status, setStatus] = useState<ContractStatus>('Draft');
    const [attachments, setAttachments] = useState<File[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setAttachments(prev => [...prev, ...Array.from(files)]);
        }
    };
    
    const handleRemoveFile = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    }

    const handleSubmit = () => {
        if (!title || !partyName || !effectiveDate || !expiryDate) {
            toast({
                title: "Missing Fields",
                description: "Please fill out all required contract fields.",
                variant: "destructive",
            });
            return;
        }

        const newContract = {
            title,
            partyName,
            type,
            status,
            startDate: effectiveDate.toISOString(),
            endDate: expiryDate.toISOString(),
            lastModified: new Date().toISOString(),
            terms,
        };

        dispatch(addContract(newContract as any));
        
        toast({
            title: "Contract Created",
            description: `Contract "${title}" has been successfully created as a draft.`,
        });

        router.push('/contracts/list');
    };

    return (
        <div className="p-6 md:p-8">
            <PageHeader
                title="Create New Contract"
                description="Fill in the details to create a new contract."
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Contract Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="title">Contract Title</Label>
                                <Input id="title" placeholder="e.g., Annual Contributor Agreement" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Contract Type</Label>
                                    <Select onValueChange={(value: ContractType) => setType(value)} defaultValue={type}>
                                        <SelectTrigger id="type">
                                            <SelectValue placeholder="Select a type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Author Agreement">Author Agreement</SelectItem>
                                            <SelectItem value="NDA">NDA</SelectItem>
                                            <SelectItem value="Sponsorship">Sponsorship</SelectItem>
                                            <SelectItem value="Vendor">Vendor</SelectItem>
                                            <SelectItem value="Custom">Custom</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="partyName">Party Name</Label>
                                    <Select onValueChange={setPartyName} value={partyName}>
                                        <SelectTrigger id="partyName">
                                            <SelectValue placeholder="Select a user" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allUsers.map(user => (
                                                <SelectItem key={user.id} value={`${user.firstName} ${user.lastName}`}>
                                                    {user.firstName} {user.lastName}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Effective Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !effectiveDate && "text-muted-foreground")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {effectiveDate ? format(effectiveDate, 'PPP') : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={effectiveDate} onSelect={setEffectiveDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                 <div className="space-y-2">
                                    <Label>Expiry Date</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !expiryDate && "text-muted-foreground")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {expiryDate ? format(expiryDate, 'PPP') : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0">
                                            <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="terms">Terms & Conditions</Label>
                                <Textarea id="terms" placeholder="Enter contract terms, or upload a document." value={terms} onChange={(e) => setTerms(e.target.value)} rows={8} />
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Status</Label>
                                    <Select onValueChange={(value: ContractStatus) => setStatus(value)} defaultValue={status}>
                                        <SelectTrigger id="status">
                                            <SelectValue placeholder="Set initial status" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Draft">Draft</SelectItem>
                                            <SelectItem value="Pending">Pending Signature</SelectItem>
                                            <SelectItem value="Active">Active</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Attachments</CardTitle>
                            <CardDescription>Upload relevant documents.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div 
                                className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer"
                                onClick={() => fileInputRef.current?.click()}
                            >
                                <UploadCloud className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground mb-2">Drag 'n' drop files here, or click to select</p>
                                <Button variant="outline" size="sm" type="button">Select Files</Button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    multiple
                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                />
                            </div>
                            {attachments.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <h4 className="font-medium text-sm">Uploaded Files:</h4>
                                    {attachments.map((file, index) => (
                                        <div key={index} className="flex items-center justify-between text-sm p-2 bg-muted rounded-md">
                                            <div className="flex items-center gap-2 truncate">
                                                <FileIcon className="h-4 w-4 shrink-0" />
                                                <span className="truncate">{file.name}</span>
                                            </div>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-destructive" onClick={() => handleRemoveFile(index)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
             <div className="mt-8 flex justify-end">
                <Button onClick={handleSubmit} size="lg">Create Contract</Button>
            </div>
        </div>
    );
}
