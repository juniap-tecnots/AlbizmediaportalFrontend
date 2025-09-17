

'use client'

import React, { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { addProfileCard, ManagementType, SubscriptionTier, VerificationLevel, ApprovalStatus } from "@/lib/redux/slices/profileCardsSlice";
import { PageHeader } from "@/components/page-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, ArrowRight, Check, Upload, Link, Mail, Phone, Globe, Award, Shield, Star, Camera, FileText, Users, Building, MapPin, Briefcase, DollarSign, Calendar, Target, Image, Video, FileImage, ExternalLink } from "lucide-react";

export default function NewProfileCardPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { toast } = useToast();
    const profileImageInputRef = useRef<HTMLInputElement>(null);

    // Step Management
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 6;
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);

    // Form State - Basic Information
    const [fullName, setFullName] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [customUrlSlug, setCustomUrlSlug] = useState('');
    
    // Professional Details
    const [bio, setBio] = useState('');
    const [netWorth, setNetWorth] = useState('');
    const [yearsExperience, setYearsExperience] = useState('');
    const [keyAchievements, setKeyAchievements] = useState('');
    const [areasOfExpertise, setAreasOfExpertise] = useState('');

    // Social Media Integration
    const [websiteUrl, setWebsiteUrl] = useState('');
    const [linkedin, setLinkedin] = useState('');
    const [twitter, setTwitter] = useState('');
    const [instagram, setInstagram] = useState('');
    const [facebook, setFacebook] = useState('');
    const [otherSocialLinks, setOtherSocialLinks] = useState('');

    // Content & Media
    const [portfolio, setPortfolio] = useState('');
    const [publishedArticles, setPublishedArticles] = useState('');
    const [mediaMentions, setMediaMentions] = useState('');
    const [videoContent, setVideoContent] = useState('');
    const [photoGallery, setPhotoGallery] = useState('');
    const [brandingMaterials, setBrandingMaterials] = useState('');

    // Verification & Credibility
    const [verificationStatus, setVerificationStatus] = useState('unverified');
    const [trustScore, setTrustScore] = useState(0);
    const [platformEndorsements, setPlatformEndorsements] = useState('');
    const [certifications, setCertifications] = useState('');

    // Step validation functions
    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1: // Basic Information
                return !!(fullName && title && profileImage);
            case 2: // Professional Details
                return !!(bio && yearsExperience);
            case 3: // Social Media Integration
                return true; // Optional step
            case 4: // Content & Media
                return true; // Optional step
            case 5: // Verification & Credibility
                return true; // Optional step
            case 6: // Review & Submit
                return true;
            default:
                return false;
        }
    };

    const getStepProgress = (): number => {
        return Math.round((completedSteps.length / totalSteps) * 100);
    };

    const handleNextStep = () => {
        if (validateStep(currentStep)) {
            if (!completedSteps.includes(currentStep)) {
                setCompletedSteps([...completedSteps, currentStep]);
            }
            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            }
        } else {
            toast({
                title: "Please complete required fields",
                description: "Please fill in all required fields before proceeding.",
                variant: "destructive",
            });
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

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

    // Auto-generate slug from full name
    useEffect(() => {
        if (fullName && !customUrlSlug) {
            const slug = fullName
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setCustomUrlSlug(slug);
        }
    }, [fullName, customUrlSlug]);

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
            userId: 'temp-user-id',
            managementType: 'self_managed' as ManagementType,
            subscriptionTier: 'free' as SubscriptionTier,
            profileData: {
                fullName,
                profileImage,
                title,
                company,
                industry,
                location,
                email,
                phone,
                customUrlSlug,
                bio,
                netWorth,
                yearsExperience,
                keyAchievements,
                areasOfExpertise,
                websiteUrl,
                linkedin,
                twitter,
                instagram,
                facebook,
                otherSocialLinks,
                portfolio,
                publishedArticles,
                mediaMentions,
                videoContent,
                photoGallery,
                brandingMaterials,
                verificationStatus,
                trustScore,
                platformEndorsements,
                certifications,
            },
            verificationLevel: 'unverified' as VerificationLevel,
            approvalStatus: 'draft' as ApprovalStatus,
            isPublic: false,
        };

        dispatch(addProfileCard(newProfileCard as any));
        
        toast({
            title: "Profile Card Created Successfully!",
            description: `The profile for "${fullName}" has been saved and is ready for verification.`,
        });

        router.push('/profiles/all');
    };

    // Memoized event handlers to prevent re-renders
    const handleFullNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFullName(e.target.value);
    }, []);

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }, []);

    const handleCompanyChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCompany(e.target.value);
    }, []);

    const handleIndustryChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setIndustry(e.target.value);
    }, []);

    const handleLocationChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    }, []);

    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }, []);

    const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    }, []);

    const handleSlugChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setCustomUrlSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
    }, []);

    const handleBioChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBio(e.target.value);
    }, []);

    const handleYearsExperienceChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setYearsExperience(e.target.value);
    }, []);

    const handleNetWorthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setNetWorth(e.target.value);
    }, []);

    const handleKeyAchievementsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setKeyAchievements(e.target.value);
    }, []);

    const handleAreasOfExpertiseChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setAreasOfExpertise(e.target.value);
    }, []);

    const handleWebsiteUrlChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setWebsiteUrl(e.target.value);
    }, []);

    const handleLinkedinChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLinkedin(e.target.value);
    }, []);

    const handleTwitterChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTwitter(e.target.value);
    }, []);

    const handleInstagramChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setInstagram(e.target.value);
    }, []);

    const handleFacebookChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setFacebook(e.target.value);
    }, []);

    const handleOtherSocialLinksChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setOtherSocialLinks(e.target.value);
    }, []);

    const handlePortfolioChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPortfolio(e.target.value);
    }, []);

    const handlePublishedArticlesChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPublishedArticles(e.target.value);
    }, []);

    const handleMediaMentionsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMediaMentions(e.target.value);
    }, []);

    const handleVideoContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setVideoContent(e.target.value);
    }, []);

    const handlePhotoGalleryChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPhotoGallery(e.target.value);
    }, []);

    const handleBrandingMaterialsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setBrandingMaterials(e.target.value);
    }, []);

    const handlePlatformEndorsementsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPlatformEndorsements(e.target.value);
    }, []);

    const handleCertificationsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCertifications(e.target.value);
    }, []);

    // Step components
    const StepIndicator = () => (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Step {currentStep} of {totalSteps}</h2>
                <Badge variant="outline">{getStepProgress()}% Complete</Badge>
            </div>
            <Progress value={getStepProgress()} className="h-2" />
            <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                {['Basic Info', 'Professional', 'Social Media', 'Content', 'Verification', 'Review'].map((label, index) => (
                    <span key={index} className={index + 1 <= currentStep ? 'text-primary font-medium' : ''}>
                        {label}
                    </span>
                ))}
                </div>
            </div>
    );

    const BasicInformationStep = () => (
                    <Card>
                        <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Basic Information
                </CardTitle>
                <CardDescription>Tell us about yourself - this information will be visible on your profile.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="flex items-center gap-6">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src={profileImage} alt={fullName} />
                                    <AvatarFallback>{fullName ? fullName.split(' ').map(n => n[0]).join('') : 'IMG'}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2">
                                     <Button variant="outline" onClick={() => profileImageInputRef.current?.click()}>
                            <Upload className="h-4 w-4 mr-2" />
                                        Upload Profile Image
                                    </Button>
                        <p className="text-xs text-muted-foreground">For best results, upload a square image (1:1 ratio).</p>
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
                        <Label htmlFor="fullName" className="flex items-center gap-1">
                            Full Name <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                            id="fullName" 
                            placeholder="e.g., Jane Doe" 
                            value={fullName} 
                            onChange={handleFullNameChange} 
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="title" className="flex items-center gap-1">
                            Title/Designation <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                            id="title" 
                            placeholder="e.g., Senior Journalist" 
                            value={title} 
                            onChange={handleTitleChange} 
                        />
                    </div>
                </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input 
                            id="company" 
                            placeholder="e.g., Albiz Media" 
                            value={company} 
                            onChange={handleCompanyChange} 
                        />
                                </div>
                                <div className="space-y-2">
                        <Label htmlFor="industry">Industry</Label>
                        <Input 
                            id="industry" 
                            placeholder="e.g., Media & Journalism" 
                            value={industry} 
                            onChange={handleIndustryChange} 
                        />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="location">Location</Label>
                        <Input 
                            id="location" 
                            placeholder="e.g., New York, NY" 
                            value={location} 
                            onChange={handleLocationChange} 
                        />
                                </div>
                                <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                            id="email" 
                            type="email"
                            placeholder="e.g., jane@example.com" 
                            value={email} 
                            onChange={handleEmailChange} 
                        />
                                </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                            id="phone" 
                            type="tel"
                            placeholder="e.g., +1 (555) 123-4567" 
                            value={phone} 
                            onChange={handlePhoneChange} 
                        />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="customUrlSlug">Custom URL Slug</Label>
                        <Input 
                            id="customUrlSlug" 
                            placeholder="e.g., jane-doe" 
                            value={customUrlSlug} 
                            onChange={handleSlugChange} 
                        />
                        <p className="text-sm text-muted-foreground">This will be used for your profile URL (e.g., albizmedia.com/@your-slug).</p>
                    </div>
                            </div>
                        </CardContent>
                    </Card>
    );

    const ProfessionalDetailsStep = () => (
                     <Card>
                        <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Professional Details
                </CardTitle>
                <CardDescription>Share your professional background, achievements, and expertise.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="bio" className="flex items-center gap-1">
                        Bio/About Section <span className="text-red-500">*</span>
                    </Label>
                    <Textarea 
                        id="bio" 
                        placeholder="Tell us about yourself, your background, and what makes you unique..."
                        value={bio} 
                        onChange={handleBioChange} 
                        rows={6} 
                    />
                    <p className="text-sm text-muted-foreground">This will be the main description on your profile.</p>
                </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                        <Label htmlFor="yearsExperience" className="flex items-center gap-1">
                            Years of Experience <span className="text-red-500">*</span>
                        </Label>
                        <Input 
                            id="yearsExperience" 
                            type="number"
                            placeholder="e.g., 5" 
                            value={yearsExperience} 
                            onChange={handleYearsExperienceChange} 
                        />
                                </div>
                                <div className="space-y-2">
                        <Label htmlFor="netWorth">Net Worth (Optional)</Label>
                        <Input 
                            id="netWorth" 
                            placeholder="e.g., $1M - $5M" 
                            value={netWorth} 
                            onChange={handleNetWorthChange} 
                        />
                        <p className="text-sm text-muted-foreground">For business leaders and investors only.</p>
                                </div>
                            </div>

                                <div className="space-y-2">
                    <Label htmlFor="keyAchievements">Key Achievements/Milestones</Label>
                    <Textarea 
                        id="keyAchievements" 
                        placeholder="List your major accomplishments, awards, or milestones..."
                        value={keyAchievements} 
                        onChange={handleKeyAchievementsChange} 
                        rows={4} 
                    />
                                </div>

                                <div className="space-y-2">
                    <Label htmlFor="areasOfExpertise">Areas of Expertise/Interests</Label>
                    <Input 
                        id="areasOfExpertise" 
                        placeholder="e.g., Technology, Journalism, AI Ethics, Digital Marketing"
                        value={areasOfExpertise} 
                        onChange={handleAreasOfExpertiseChange} 
                    />
                    <p className="text-sm text-muted-foreground">Separate topics with commas.</p>
                            </div>
                        </CardContent>
                    </Card>
    );
                    
    const SocialMediaStep = () => (
                    <Card>
                        <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Social Media Integration
                </CardTitle>
                <CardDescription>Connect your social media profiles and online presence.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="websiteUrl">Website URL</Label>
                        <Input 
                            id="websiteUrl" 
                            placeholder="https://yourwebsite.com" 
                            value={websiteUrl} 
                            onChange={handleWebsiteUrlChange} 
                        />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="linkedin">LinkedIn Profile</Label>
                        <Input 
                            id="linkedin" 
                            placeholder="https://linkedin.com/in/yourprofile" 
                            value={linkedin} 
                            onChange={handleLinkedinChange} 
                        />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="twitter">Twitter Handle</Label>
                        <Input 
                            id="twitter" 
                            placeholder="@yourhandle" 
                            value={twitter} 
                            onChange={handleTwitterChange} 
                        />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="instagram">Instagram Profile</Label>
                        <Input 
                            id="instagram" 
                            placeholder="@yourhandle" 
                            value={instagram} 
                            onChange={handleInstagramChange} 
                        />
                                </div>
                            </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                        <Label htmlFor="facebook">Facebook Page</Label>
                        <Input 
                            id="facebook" 
                            placeholder="https://facebook.com/yourpage" 
                            value={facebook} 
                            onChange={handleFacebookChange} 
                        />
                            </div>
                            <div className="space-y-2">
                        <Label htmlFor="otherSocialLinks">Other Social Links</Label>
                        <Input 
                            id="otherSocialLinks" 
                            placeholder="YouTube, TikTok, etc." 
                            value={otherSocialLinks} 
                            onChange={handleOtherSocialLinksChange} 
                        />
                    </div>
                            </div>
                        </CardContent>
                    </Card>
    );

    const ContentMediaStep = () => (
                    <Card>
                        <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Content & Media
                </CardTitle>
                <CardDescription>Showcase your work, publications, and media presence.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <div className="space-y-2">
                    <Label htmlFor="portfolio">Portfolio/Work Samples</Label>
                    <Textarea 
                        id="portfolio" 
                        placeholder="Links to your portfolio, GitHub, or other work samples..."
                        value={portfolio} 
                        onChange={handlePortfolioChange} 
                        rows={3} 
                    />
                            </div>

                            <div className="space-y-2">
                    <Label htmlFor="publishedArticles">Published Articles</Label>
                    <Textarea 
                        id="publishedArticles" 
                        placeholder="Links to articles you've written or been featured in..."
                        value={publishedArticles} 
                        onChange={handlePublishedArticlesChange} 
                        rows={3} 
                    />
                    <p className="text-sm text-muted-foreground">These will be auto-linked from our platform.</p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="mediaMentions">Media Mentions</Label>
                    <Textarea 
                        id="mediaMentions" 
                        placeholder="Links to articles or media where you've been mentioned..."
                        value={mediaMentions} 
                        onChange={handleMediaMentionsChange} 
                        rows={3} 
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="videoContent">Video Content</Label>
                        <Textarea 
                            id="videoContent" 
                            placeholder="Links to videos, interviews, or presentations..."
                            value={videoContent} 
                            onChange={handleVideoContentChange} 
                            rows={3} 
                        />
                            </div>
                             <div className="space-y-2">
                        <Label htmlFor="photoGallery">Photo Gallery</Label>
                        <Textarea 
                            id="photoGallery" 
                            placeholder="Links to photo galleries or image collections..."
                            value={photoGallery} 
                            onChange={handlePhotoGalleryChange} 
                            rows={3} 
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="brandingMaterials">Company/Personal Branding Materials</Label>
                    <Textarea 
                        id="brandingMaterials" 
                        placeholder="Links to logos, brand assets, or marketing materials..."
                        value={brandingMaterials} 
                        onChange={handleBrandingMaterialsChange} 
                        rows={3} 
                    />
                </div>
            </CardContent>
        </Card>
    );

    const VerificationStep = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Verification & Credibility
                </CardTitle>
                <CardDescription>Build trust and credibility for your profile.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="verificationStatus">Verification Status</Label>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline">Unverified</Badge>
                        <span className="text-sm text-muted-foreground">Verification will begin after profile creation</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="trustScore">Trust Score</Label>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span className="text-sm font-medium">0/100</span>
                        </div>
                        <span className="text-sm text-muted-foreground">Score will be calculated based on verification and activity</span>
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="platformEndorsements">Platform Endorsements</Label>
                    <Textarea 
                        id="platformEndorsements" 
                        placeholder="List any endorsements or recommendations you've received..."
                        value={platformEndorsements} 
                        onChange={handlePlatformEndorsementsChange} 
                        rows={3} 
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="certifications">Third-party Certifications</Label>
                    <Textarea 
                        id="certifications" 
                        placeholder="List any professional certifications, licenses, or credentials..."
                        value={certifications} 
                        onChange={handleCertificationsChange} 
                        rows={3} 
                    />
                </div>
            </CardContent>
        </Card>
    );

    const ReviewStep = () => (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Check className="h-5 w-5" />
                    Review & Submit
                </CardTitle>
                <CardDescription>Review your profile information before submitting.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">Basic Information</h4>
                            <div className="text-sm space-y-1">
                                <p><strong>Name:</strong> {fullName || 'Not provided'}</p>
                                <p><strong>Title:</strong> {title || 'Not provided'}</p>
                                <p><strong>Company:</strong> {company || 'Not provided'}</p>
                                <p><strong>Location:</strong> {location || 'Not provided'}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Contact</h4>
                            <div className="text-sm space-y-1">
                                <p><strong>Email:</strong> {email || 'Not provided'}</p>
                                <p><strong>Phone:</strong> {phone || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-medium mb-2">Professional</h4>
                            <div className="text-sm space-y-1">
                                <p><strong>Experience:</strong> {yearsExperience ? `${yearsExperience} years` : 'Not provided'}</p>
                                <p><strong>Bio:</strong> {bio ? `${bio.substring(0, 100)}...` : 'Not provided'}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">Social Media</h4>
                            <div className="text-sm space-y-1">
                                <p><strong>Website:</strong> {websiteUrl || 'Not provided'}</p>
                                <p><strong>LinkedIn:</strong> {linkedin || 'Not provided'}</p>
                                <p><strong>Twitter:</strong> {twitter || 'Not provided'}</p>
                            </div>
                        </div>
                    </div>
                            </div>
                        </CardContent>
                    </Card>
    ));

    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1: return <BasicInformationStep />;
            case 2: return <ProfessionalDetailsStep />;
            case 3: return <SocialMediaStep />;
            case 4: return <ContentMediaStep />;
            case 5: return <VerificationStep />;
            case 6: return <ReviewStep />;
            default: return <BasicInformationStep />;
        }
    };

    return (
        <div className="p-6 md:p-8">
            <div className="flex items-center gap-4 mb-8">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Create New Profile Card</h1>
                    <p className="text-sm text-muted-foreground mt-1">Build your professional profile step by step.</p>
                </div>
            </div>

            <StepIndicator />
            
            <div className="max-w-4xl mx-auto">
                {renderCurrentStep()}
            </div>

            <div className="mt-8 flex justify-between max-w-4xl mx-auto">
                <Button 
                    variant="outline" 
                    onClick={handlePrevStep}
                    disabled={currentStep === 1}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Previous
                </Button>
                
                {currentStep < totalSteps ? (
                    <Button onClick={handleNextStep}>
                        Next
                        <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                ) : (
                    <Button onClick={handleSubmit} size="lg">
                        <Check className="h-4 w-4 mr-2" />
                        Create Profile Card
                    </Button>
                )}
            </div>
        </div>
    );
}



