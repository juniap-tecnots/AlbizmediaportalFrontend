
'use client'

import { useParams } from 'next/navigation'
import { useSelector } from "react-redux"
import { selectProfileCardById } from "@/lib/redux/slices/profileCardsSlice"
import type { RootState } from "@/lib/redux/store"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Twitter, Linkedin, Facebook, Instagram, Car, Rocket, BrainCircuit, X, MessageSquare, Repeat, Heart, BarChart2, Upload } from "lucide-react"

export default function ProfileDetailPage() {
    const params = useParams();
    const profileId = params.id as string;
    const profile = useSelector((state: RootState) => selectProfileCardById(state, profileId));

    if (!profile) {
        return <div className="text-center p-12">Profile not found.</div>
    }

    const { fullName, profileImage, title, bio, customUrlSlug } = profile.profileData;

    return (
        <div className="p-6 md:p-8">
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
                        <div className="flex gap-4 mt-2 text-sm">
                            <p><span className="font-bold">0</span> Following</p>
                            <p><span className="font-bold">0</span> Followers</p>
                        </div>
                    </div>
                    <Button>Follow</Button>
                </div>
            </Card>

            <div className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
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
                                <CardTitle>Companies</CardTitle>
                                <CardDescription>Associated ventures and organizations.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-4 items-start">
                                    <div className="bg-muted p-3 rounded-lg"><Car /></div>
                                    <div>
                                        <p className="font-semibold">Tesla</p>
                                        <p className="text-sm text-muted-foreground">Electric vehicles, energy generation and storage systems.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="bg-muted p-3 rounded-lg"><Rocket /></div>
                                    <div>
                                        <p className="font-semibold">SpaceX</p>
                                        <p className="text-sm text-muted-foreground">Designs, manufactures and launches advanced rockets and spacecraft.</p>
                                    </div>
                                </div>
                                 <div className="flex gap-4 items-start">
                                    <div className="bg-muted p-3 rounded-lg"><X /></div>
                                    <div>
                                        <p className="font-semibold">X</p>
                                        <p className="text-sm text-muted-foreground">The everything app.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="bg-muted p-3 rounded-lg"><BrainCircuit /></div>
                                    <div>
                                        <p className="font-semibold">Neuralink</p>
                                        <p className="text-sm text-muted-foreground">Developing ultra-high bandwidth brain-machine interfaces.</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="space-y-6">
                        <Card>
                            <CardHeader><CardTitle>Net Worth</CardTitle></CardHeader>
                            <CardContent><p className="text-2xl font-bold">N/A</p></CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Industry</CardTitle></CardHeader>
                            <CardContent><p className="text-muted-foreground">Not specified</p></CardContent>
                        </Card>
                         <Card>
                            <CardHeader><CardTitle>Socials</CardTitle></CardHeader>
                            <CardContent className="flex gap-4">
                                <Twitter className="text-blue-500" />
                                <Linkedin className="text-blue-700" />
                                <Facebook className="text-blue-800" />
                                <Instagram className="text-pink-600" />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
