
'use client'

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UploadCloud, File as FileIcon, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { addProfileCard, ManagementType, SubscriptionTier, VerificationLevel, ApprovalStatus } from "@/lib/redux/slices/profileCardsSlice";
import { PageHeader } from "@/components/page-header";
import { Separator } from "@/components/ui/separator";

export default function NewProfileCardPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();
    const verificationFileInputRef = useRef<HTMLInputElement>(null);

    // Form State
    const [fullName, setFullName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [contactInfo, setContactInfo] = useState('');
    
    const [company, setCompany] = useState('');
    const [industry, setIndustry] = useState('');
    const [role, setRole] = useState('');
    const [experienceLevel, setExperienceLevel] = useState('');
    const [bio, setBio] = useState('');

    const [websiteUrl, setWebsiteUrl] = useState('');
    const [linkedin, setLinkedin] =useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [otherLinks, setOtherLinks] = useState('');
    const [networkSize, setNetworkSize] = useState('');

    const [expertise, setExpertise] = useState('');
    const [topics, setTopics] = useState('');
    const [mediaMentions, setMediaMentions] = useState('');
    const [portfolio, setPortfolio] = useState('');

    const [verificationDocs, setVerificationDocs] = useState<File[]>([]);
    
    const [managementType, setManagementType] = useState<ManagementType>('self_managed');
    const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('free');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            setVerificationDocs(prev => [...prev, ...Array.from(files)]);
        }
    };
    
    const handleRemoveFile = (index: number) => {
        setVerificationDocs(prev => prev.filter((_, i) => i !== index));
    }


    const handleSubmit = () => {
        if (!fullName || !title) {
            toast({
                title: "Missing Required Fields",
                description: "Full Name and Title are required.",
                variant: "destructive",
            });
            return;
        }

        const newProfileCard = {
            userId: 'temp-user-id', // This should be replaced with the actual logged-in user's ID
            managementType,
            subscriptionTier,
            profileData: {
                fullName,
                profileImage,
                title,
                location,
                contactInfo,
                company,
                industry,
                role,
                experienceLevel,
                bio,
                websiteUrl,
                linkedin,
                twitter,
                instagram,
                otherLinks,
                networkSize,
                expertise,
                topics,
                mediaMentions,
                portfolio
            },
            verificationLevel: 'unverified' as VerificationLevel,
            approvalStatus: 'draft' as ApprovalStatus,
            isPublic: false,
        };

        dispatch(addProfileCard(newProfileCard as any));
        
        toast({
            title: "Profile Card Created",
            description: `The profile for "${fullName}" has been saved as a draft.`,
        });

        router.push('/profiles/all');
    };

    return (
        <div className="p-6 md:p-8">
            <PageHeader
                title="Create New Profile Card"
                description="Fill in the details to create a new universal profile card."
            />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input id="fullName" placeholder="e.g., Jane Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title/Designation</Label>
                                    <Input id="title" placeholder="e.g., Senior Journalist" value={title} onChange={(e) => setTitle(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                                    <Input id="location" placeholder="e.g., New York, NY" value={location} onChange={(e) => setLocation(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contactInfo">Contact Information</Label>
                                    <Input id="contactInfo" placeholder="e.g., email or phone" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="profileImage">Profile Image URL</Label>
                                <Input id="profileImage" placeholder="https://example.com/image.png" value={profileImage} onChange={(e) => setProfileImage(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Professional Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="company">Company/Organization</Label>
                                    <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="industry">Industry</Label>
                                    <Input id="industry" value={industry} onChange={(e) => setIndustry(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="role">Role/Position</Label>
                                    <Input id="role" value={role} onChange={(e) => setRole(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="experienceLevel">Experience Level</Label>
                                    <Input id="experienceLevel" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bio">Bio/About Section</Label>
                                <Textarea id="bio" value={bio} onChange={(e) => setBio(e.target.value)} rows={6} />
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Social & Network Links</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="websiteUrl">Website URL</Label>
                                    <Input id="websiteUrl" value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                                    <Input id="linkedin" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="twitter">Twitter Handle</Label>
                                    <Input id="twitter" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instagram">Instagram Profile</Label>
                                    <Input id="instagram" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
                                </div>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="otherLinks">Other Social Links</Label>
                                <Input id="otherLinks" value={otherLinks} onChange={(e) => setOtherLinks(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="networkSize">Professional Network Size</Label>
                                <Input id="networkSize" type="number" value={networkSize} onChange={(e) => setNetworkSize(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Content & Expertise</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="space-y-2">
                                <Label htmlFor="expertise">Areas of Interest/Expertise</Label>
                                <Input id="expertise" placeholder="e.g., Technology, Journalism, AI Ethics" value={expertise} onChange={(e) => setExpertise(e.target.value)} />
                                <p className="text-sm text-muted-foreground">Separate topics with commas.</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="topics">Topics of Interest</Label>
                                <Input id="topics" placeholder="e.g., Machine Learning, SaaS, Media Trends" value={topics} onChange={(e) => setTopics(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mediaMentions">Media Mentions</Label>
                                <Textarea id="mediaMentions" placeholder="Links to articles or media where you've been mentioned." value={mediaMentions} onChange={(e) => setMediaMentions(e.target.value)} />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="portfolio">Portfolio/Work Samples</Label>
                                <Textarea id="portfolio" placeholder="Links to your portfolio, GitHub, or other work samples." value={portfolio} onChange={(e) => setPortfolio(e.target.value)} />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8 lg:sticky top-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Verification Documents</CardTitle>
                            <CardDescription>Optional: Upload documents for verification.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div 
                                className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer"
                                onClick={() => verificationFileInputRef.current?.click()}
                            >
                                <UploadCloud className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                <p className="text-muted-foreground mb-2">Drag 'n' drop files or click to select</p>
                                <Button variant="outline" size="sm" type="button">Select Files</Button>
                                <input
                                    type="file"
                                    ref={verificationFileInputRef}
                                    onChange={handleFileChange}
                                    className="hidden"
                                    multiple
                                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                />
                            </div>
                            {verificationDocs.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <h4 className="font-medium text-sm">Uploaded Files:</h4>
                                    {verificationDocs.map((file, index) => (
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
                <Button onClick={handleSubmit} size="lg">Create Profile Card</Button>
            </div>
        </div>
    );
}
