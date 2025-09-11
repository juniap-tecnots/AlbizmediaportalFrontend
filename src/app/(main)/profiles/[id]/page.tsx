

'use client'

import { useParams, useRouter } from 'next/navigation'
import { useSelector } from "react-redux"
import { selectProfileCardById } from "@/lib/redux/slices/profileCardsSlice"
import type { RootState } from "@/lib/redux/store"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Twitter, Linkedin, Facebook, Instagram, MessageSquare, Repeat, Heart, BarChart2, Upload, CheckCircle2, Briefcase, Phone, ArrowLeft } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const InfoRow = ({ label, value }: { label: string, value?: string }) => {
    if (!value) return null;
    return (
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium">{value}</p>
        </div>
    )
};


export default function ProfileDetailPage() {
    const params = useParams();
    const router = useRouter();
    const profileId = params.id as string;
    const profile = useSelector((state: RootState) => selectProfileCardById(state, profileId));

    if (!profile) {
        return <div className="text-center p-12">Profile not found.</div>
    }

    const { fullName, profileImage, title, bio, customUrlSlug, location, contactInfo, company, industry, role, experienceLevel } = profile.profileData;
    const { verificationLevel } = profile;
    const isVerified = verificationLevel !== 'unverified';

    return (
        <div className="p-6 md:p-8">
             <Button variant="outline" size="sm" className="mb-4" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profiles
            </Button>
            <div className="relative">
                <Image
                    src="https://picsum.photos/seed/cover/1200/300"
                    alt="Cover photo"
                    width={1200}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                    data-ai-hint="cover photo"
                />
                <div className="absolute top-32 left-8">
                    <Avatar className="w-32 h-32 border-4 border-background">
                        <AvatarImage src={profileImage} alt={fullName} />
                        <AvatarFallback>{fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                </div>
            </div>

            <Card className="rounded-t-none pt-20 pb-6 px-8">
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-2xl font-bold">{fullName}</h1>
                        <p className="text-muted-foreground">@{customUrlSlug || fullName.toLowerCase().replace(' ', '')}</p>
                        <p className="mt-2 text-sm max-w-prose">{bio || 'Edit your profile to add a description.'}</p>
                        <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <span>{title}</span>
                            </div>
                             <div className="flex items-center gap-2">
                                <Phone className="h-4 w-4" />
                                <span>{contactInfo || 'Not available'}</span>
                            </div>
                        </div>
                         <div className="flex gap-4 mt-4">
                            <Twitter className="text-blue-500 cursor-pointer" />
                            <Linkedin className="text-blue-700 cursor-pointer" />
                            <Facebook className="text-blue-800 cursor-pointer" />
                            <Instagram className="text-pink-600 cursor-pointer" />
                        </div>
                    </div>
                     {isVerified ? (
                        <Badge className="bg-green-100 text-green-800 border-green-200 text-sm">
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Verified
                        </Badge>
                    ) : (
                         <Badge variant="outline" className="text-sm">
                            Not Verified
                        </Badge>
                    )}
                </div>
            </Card>

            <div className="mt-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4">
                                <Avatar>
                                <AvatarImage src={profileImage} alt={fullName} />
                                <AvatarFallback>{fullName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="flex items-center gap-2 text-sm">
                                    <span className="font-bold">{fullName}</span>
                                    <span className="text-muted-foreground">@{customUrlSlug || fullName.toLowerCase().replace(' ', '')} · 2h</span>
                                </div>
                                <p>Starship is ready for launch!</p>
                                <div className="flex justify-between text-muted-foreground mt-4 text-sm w-full max-w-md">
                                    <div className="flex items-center gap-2"><MessageSquare size={16}/><span>2.1K</span></div>
                                    <div className="flex items-center gap-2"><Repeat size={16}/><span>5.8K</span></div>
                                    <div className="flex items-center gap-2"><Heart size={16}/><span>34K</span></div>
                                    <div className="flex items-center gap-2"><BarChart2 size={16}/><span>1.2M</span></div>
                                    <div className="flex items-center gap-2"><Upload size={16}/></div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                        <CardHeader>
                        <CardTitle>Professional Information</CardTitle>
                        <CardDescription>An overview of the user's professional background.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <InfoRow label="Company/Organization" value={company} />
                            <InfoRow label="Industry" value={industry} />
                            <InfoRow label="Role/Position" value={role} />
                            <InfoRow label="Experience Level" value={experienceLevel} />
                        </div>
                         <div>
                            <p className="text-sm text-muted-foreground">Bio/About Section</p>
                            <p className="font-medium pt-1">{bio || 'Not provided.'}</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Net Worth</CardTitle></CardHeader>
                    <CardContent><p className="text-2xl font-bold">N/A</p></CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>Industry</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground">{industry || 'Not specified'}</p></CardContent>
                </Card>
            </div>
        </div>
    )
}
