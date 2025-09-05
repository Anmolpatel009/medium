'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User } from '@/types';
import FreelancerCard from '@/components/freelancer-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function FreelancerList() {
  const [freelancers, setFreelancers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This query now includes an orderBy clause. If an index is missing, 
    // Firestore will provide a console error with a link to create it.
    const q = query(
        collection(db, 'users'), 
        where('role', '==', 'freelancer'),
        orderBy('createdAt', 'desc')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const freelancersData: User[] = [];
      querySnapshot.forEach((doc) => {
        freelancersData.push({ id: doc.id, ...doc.data() } as User);
      });
      setFreelancers(freelancersData);
      setLoading(false);
    }, (error) => {
        console.error("Error fetching freelancers: ", error);
        // The error message in the browser console will contain the link to create the necessary index.
        setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
           <div key={i} className="p-4 border rounded-lg space-y-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (freelancers.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg">
        <h3 className="text-xl font-semibold text-muted-foreground">No freelancers found.</h3>
        <p className="text-muted-foreground mt-2">Looks like no one has signed up as a freelancer yet, or the required Firestore index has not been created.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {freelancers.map((freelancer) => (
        <FreelancerCard key={freelancer.id} freelancer={freelancer} />
      ))}
    </div>
  );
}
