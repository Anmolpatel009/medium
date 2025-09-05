
'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User } from '@/types';
import { Skeleton } from '@/components/ui/skeleton';
import FreelancerCard from '@/components/freelancer-card';

export default function FeaturedFreelancers() {
  const [freelancers, setFreelancers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('role', '==', 'freelancer'), limit(6));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const freelancersData: User[] = [];
      querySnapshot.forEach((doc) => {
        freelancersData.push({ id: doc.id, ...doc.data() } as User);
      });
      setFreelancers(freelancersData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching featured freelancers:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-16 lg:py-24 bg-background">
        <div className="container">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-headline">Meet Our Top Talent</h2>
                <p className="text-lg text-muted-foreground mt-2">Discover skilled freelancers ready to tackle your next project.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8">
                 {loading && 
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="w-full max-w-[220px] h-[280px] bg-muted rounded-lg p-4">
                            <Skeleton className="h-full w-full" />
                        </div>
                    ))
                 }
                 {!loading && freelancers.map((freelancer) => (
                    <FreelancerCard key={freelancer.id} freelancer={freelancer} context="featured" />
                ))}
            </div>

            { !loading && freelancers.length === 0 && (
                <div className="text-center py-12 border-2 border-dashed rounded-lg">
                    <h3 className="text-xl font-semibold text-muted-foreground">No freelancers found.</h3>
                    <p className="text-muted-foreground mt-2">Looks like no one has signed up as a freelancer yet.</p>
                </div>
            )}
        </div>
    </section>
  );
}
