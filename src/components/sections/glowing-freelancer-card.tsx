
'use client';

import { useEffect, useState } from 'react';
import type { User } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Milestone, Sparkles } from 'lucide-react';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, GeoPoint } from 'firebase/firestore';
import { app, db } from '@/lib/firebase';

interface GlowingFreelancerCardProps {
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

export default function GlowingFreelancerCard({ freelancer }: GlowingFreelancerCardProps) {
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
        <div className="glowing-card">
            <div className="content space-y-2">
                <Avatar className="h-16 w-16 text-xl border-2 border-purple-500">
                    <AvatarFallback>{getInitials(freelancer.name)}</AvatarFallback>
                </Avatar>
                <div className="text-center">
                    <p className="font-bold text-lg leading-tight truncate">{freelancer.name}</p>
                    {distance !== null && (
                        <p className="text-xs text-cyan-400 flex items-center justify-center gap-1">
                            <Milestone className="h-3 w-3" />
                            {distance.toFixed(1)} km away
                        </p>
                    )}
                </div>
                <div className="flex flex-wrap gap-1 justify-center">
                    {skills.slice(0, 3).map(skill => (
                        <Badge key={skill} variant="secondary" className="bg-gray-700 text-gray-200 border-gray-600 text-xs">
                            {skill}
                        </Badge>
                    ))}
                </div>
                 <p className="text-xs text-amber-400 flex items-center gap-1 pt-1">
                    <Sparkles className="h-3 w-3" />
                    Top Rated
                </p>
            </div>
        </div>
    );
}
