
'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Milestone, Sparkles, Mail, Phone } from 'lucide-react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, GeoPoint } from 'firebase/firestore';
import { app, db } from '@/lib/firebase';
import Image from 'next/image';

interface FlipFreelancerCardProps {
  freelancer: User;
}

function getInitials(name?: string) {
    if (!name) return 'A';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}

function getDistanceInKm(point1: GeoPoint, point2: GeoPoint) {
    if (!point1 || !point2) return null;
    const R = 6371; // Radius of the earth in km
    const dLat = (point2.latitude - point1.latitude) * (Math.PI / 180);
    const dLon = (point2.longitude - point1.longitude) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(point1.latitude * (Math.PI / 180)) * Math.cos(point2.latitude * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

export default function FlipFreelancerCard({ freelancer }: FlipFreelancerCardProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [distance, setDistance] = useState<number | null>(null);
    const auth = getAuth(app);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const userDocRef = doc(db, 'users', firebaseUser.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    setCurrentUser({ id: userDoc.id, ...userDoc.data() } as User);
                }
            } else {
                setCurrentUser(null);
            }
        });
        return () => unsubscribe();
    }, [auth]);

    useEffect(() => {
        if (currentUser?.location && freelancer?.location) {
            const dist = getDistanceInKm(currentUser.location, freelancer.location);
            setDistance(dist);
        }
    }, [currentUser, freelancer]);

    const profile = freelancer.freelancerProfile || {};
    const skills = profile.skills || [];

    return (
        <div className="flip-card-container">
            <div className="flip-card-inner">
                <div className="flip-card-front p-4 flex flex-col items-center justify-center space-y-3">
                    <Avatar className="h-24 w-24 text-3xl border-4 border-white/50">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${freelancer.id}`} alt={freelancer.name} />
                        <AvatarFallback>{getInitials(freelancer.name)}</AvatarFallback>
                    </Avatar>
                    <h3 className="title text-xl font-bold">{freelancer.name}</h3>
                    <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Phone className="h-4 w-4" />
                    </div>
                     <p className="text-sm font-semibold">Hover to see skills</p>
                </div>
                <div className="flip-card-back p-4 flex flex-col items-center justify-center space-y-3">
                    <h4 className="title text-xl font-bold">Skills</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {skills.slice(0, 4).map(skill => (
                            <Badge key={skill} variant="secondary" className="bg-white/30 text-white">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                    {distance !== null && (
                        <div className="mt-auto pt-2 text-center">
                            <p className="font-bold text-lg">{distance.toFixed(1)}</p>
                            <p className="text-xs">km away</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
