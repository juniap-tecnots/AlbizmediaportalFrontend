'use client'

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { selectAllProfileCards, updateProfileCard, ManagementType, SubscriptionTier, VerificationLevel, ApprovalStatus } from "@/lib/redux/slices/profileCardsSlice";
import { Settings, User, Shield, Bell, Globe, Save, Upload, Eye, EyeOff } from "lucide-react";

export default function ProfileSettingsPage() {
    const dispatch = useDispatch();
    const { toast } = useToast();
    const profiles = useSelector(selectAllProfileCards);
    
    // For demo purposes, we'll use the first profile
    const currentProfile = profiles[0];
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: currentProfile?.profileData.fullName || '',
        title: currentProfile?.profileData.title || '',
        bio: currentProfile?.profileData.bio || '',
        location: currentProfile?.profileData.location || '',
        contactInfo: currentProfile?.profileData.contactInfo || '',
        company: currentProfile?.profileData.company || '',
        industry: currentProfile?.profileData.industry || '',
        customUrlSlug: currentProfile?.profileData.customUrlSlug || '',
        managementType: currentProfile?.managementType || 'self_managed' as ManagementType,
        subscriptionTier: currentProfile?.subscriptionTier || 'free' as SubscriptionTier,
        isPublic: currentProfile?.isPublic || false,
    });

    const handleInputChange = (field: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSave = () => {
        if (!currentProfile) return;
        
        dispatch(updateProfileCard({
            id: currentProfile.id,
            profileData: {
                ...currentProfile.profileData,
                fullName: formData.fullName,
                title: formData.title,
                bio: formData.bio,
                location: formData.location,
                contactInfo: formData.contactInfo,
                company: formData.company,
                industry: formData.industry,
                customUrlSlug: formData.customUrlSlug,
            },
            managementType: formData.managementType,
            subscriptionTier: formData.subscriptionTier,
            isPublic: formData.isPublic,
        }));

        setIsEditing(false);
        toast({
            title: "Profile Updated",
            description: "Your profile settings have been saved successfully.",
        });
    };

    const handleCancel = () => {
        setFormData({
            fullName: currentProfile?.profileData.fullName || '',
            title: currentProfile?.profileData.title || '',
            bio: currentProfile?.profileData.bio || '',
            location: currentProfile?.profileData.location || '',
            contactInfo: currentProfile?.profileData.contactInfo || '',
            company: currentProfile?.profileData.company || '',
            industry: currentProfile?.profileData.industry || '',
            customUrlSlug: currentProfile?.profileData.customUrlSlug || '',
            managementType: currentProfile?.managementType || 'self_managed' as ManagementType,
            subscriptionTier: currentProfile?.subscriptionTier || 'free' as SubscriptionTier,
            isPublic: currentProfile?.isPublic || false,
        });
        setIsEditing(false);
    };

    if (!currentProfile) {
        return (
            <div className="flex items-center justify-center h-96 border rounded-lg">
                <p className="text-muted-foreground">No profile found. Please create a profile first.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Profile Overview */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profile Overview
                    </CardTitle>
                    <CardDescription>Your current profile information and status.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-start gap-6">
                        <Avatar className="w-20 h-20">
                            <AvatarImage src={currentProfile.profileData.profileImage} alt={currentProfile.profileData.fullName} />
                            <AvatarFallback>{currentProfile.profileData.fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-4">
                                <h3 className="text-xl font-semibold">{currentProfile.profileData.fullName}</h3>
                                <Badge variant="outline" className="capitalize">
                                    {currentProfile.approvalStatus}
                                </Badge>
                                <Badge variant="outline" className="capitalize">
                                    {currentProfile.verificationLevel.replace('_', ' ')}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground">{currentProfile.profileData.title}</p>
                            <p className="text-sm text-muted-foreground">
                                {currentProfile.isPublic ? 'Public Profile' : 'Private Profile'} • 
                                {currentProfile.subscriptionTier.charAt(0).toUpperCase() + currentProfile.subscriptionTier.slice(1)} Plan
                            </p>
                        </div>
                        <Button 
                            variant={isEditing ? "outline" : "default"} 
                            onClick={() => setIsEditing(!isEditing)}
                        >
                            {isEditing ? 'Cancel' : 'Edit Profile'}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Basic Information */}
            <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Update your personal and professional details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            <Input 
                                id="fullName" 
                                value={formData.fullName} 
                                onChange={(e) => handleInputChange('fullName', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="title">Title/Designation</Label>
                            <Input 
                                id="title" 
                                value={formData.title} 
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="bio">Bio/About Section</Label>
                        <Textarea 
                            id="bio" 
                            value={formData.bio} 
                            onChange={(e) => handleInputChange('bio', e.target.value)}
                            disabled={!isEditing}
                            rows={4}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input 
                                id="location" 
                                value={formData.location} 
                                onChange={(e) => handleInputChange('location', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="contactInfo">Contact Information</Label>
                            <Input 
                                id="contactInfo" 
                                value={formData.contactInfo} 
                                onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="company">Company/Organization</Label>
                            <Input 
                                id="company" 
                                value={formData.company} 
                                onChange={(e) => handleInputChange('company', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="industry">Industry</Label>
                            <Input 
                                id="industry" 
                                value={formData.industry} 
                                onChange={(e) => handleInputChange('industry', e.target.value)}
                                disabled={!isEditing}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="customUrlSlug">Custom URL Slug</Label>
                        <Input 
                            id="customUrlSlug" 
                            value={formData.customUrlSlug} 
                            onChange={(e) => handleInputChange('customUrlSlug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
                            disabled={!isEditing}
                        />
                        <p className="text-sm text-muted-foreground">This will be used for your profile URL (e.g., albizmedia.com/@your-slug).</p>
                    </div>
                </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5" />
                        Account Settings
                    </CardTitle>
                    <CardDescription>Manage your account preferences and visibility.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="managementType">Management Type</Label>
                            <Select 
                                value={formData.managementType} 
                                onValueChange={(value) => handleInputChange('managementType', value)}
                                disabled={!isEditing}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="self_managed">Self Managed</SelectItem>
                                    <SelectItem value="platform_managed">Platform Managed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="subscriptionTier">Subscription Tier</Label>
                            <Select 
                                value={formData.subscriptionTier} 
                                onValueChange={(value) => handleInputChange('subscriptionTier', value)}
                                disabled={!isEditing}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="free">Free</SelectItem>
                                    <SelectItem value="premium">Premium</SelectItem>
                                    <SelectItem value="managed">Managed</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <Label className="text-base">Public Profile</Label>
                            <p className="text-sm text-muted-foreground">
                                Make your profile visible to other users on the platform.
                            </p>
                        </div>
                        <Switch 
                            checked={formData.isPublic} 
                            onCheckedChange={(checked) => handleInputChange('isPublic', checked)}
                            disabled={!isEditing}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Verification Status */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Verification Status
                    </CardTitle>
                    <CardDescription>Your current verification level and trust score.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Verification Level</Label>
                            <div className="flex items-center gap-2">
                                <Badge variant="outline" className="capitalize">
                                    {currentProfile.verificationLevel.replace('_', ' ')}
                                </Badge>
                                <Button variant="outline" size="sm">
                                    Verify Identity
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Trust Score</Label>
                            <div className="flex items-center gap-2">
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                    <div 
                                        className="bg-green-500 h-2 rounded-full" 
                                        style={{ width: `${currentProfile.verificationLevel === 'professional_verified' ? 100 : 
                                                               currentProfile.verificationLevel === 'identity_verified' ? 75 : 
                                                               currentProfile.verificationLevel === 'email_verified' ? 50 : 25}%` }}
                                    ></div>
                                </div>
                                <span className="text-sm text-muted-foreground">
                                    {currentProfile.verificationLevel === 'professional_verified' ? '100' : 
                                     currentProfile.verificationLevel === 'identity_verified' ? '75' : 
                                     currentProfile.verificationLevel === 'email_verified' ? '50' : '25'}/100
                                </span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Save Actions */}
            {isEditing && (
                <div className="flex justify-end gap-4">
                    <Button variant="outline" onClick={handleCancel}>
                        Cancel
                    </Button>
                    <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            )}
        </div>
    );
}