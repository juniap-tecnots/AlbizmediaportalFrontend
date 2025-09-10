

'use client'

import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { addProfileCard, ManagementType, SubscriptionTier, VerificationLevel, ApprovalStatus } from "@/lib/redux/slices/profileCardsSlice";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";

export default function NewProfileCardPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();
    const profileImageInputRef = useRef<HTMLInputElement>(null);

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
    const [linkedin, setLinkedin] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [otherLinks, setOtherLinks] = useState('');
    const [networkSize, setNetworkSize] = useState('');

    const [expertise, setExpertise] = useState('');
    const [topics, setTopics] = useState('');
    const [mediaMentions, setMediaMentions] = useState('');
    const [portfolio, setPortfolio] = useState('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

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
            managementType: 'self_managed' as ManagementType,
            subscriptionTier: 'free' as SubscriptionTier,
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
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Profile Card</h1>
                    <p className="text-sm text-muted-foreground mt-1">Fill in the details to create a new universal profile card.</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-3 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="flex items-center gap-6">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src={profileImage} alt={fullName} />
                                    <AvatarFallback>{fullName ? fullName.split(' ').map(n => n[0]).join('') : 'IMG'}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                     <Button variant="outline" onClick={() => profileImageInputRef.current?.click()}>
                                        Upload Profile Image
                                    </Button>
                                    <p className="text-xs text-muted-foreground">For best results, upload a square image.</p>
                                    <input
                                        type="file"
                                        ref={profileImageInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                </div>
                            </div>
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
                                <Input id="topics" placeholder="e.g., Machine Learning, SaaS, Media Trends" value={topics} onChange={(e) => setTopics(e.g.t.value)} />
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
            </div>
             <div className="mt-8 flex justify-end">
                <Button onClick={handleSubmit} size="lg">Create Profile Card</Button>
            </div>
        </div>
    );
}
