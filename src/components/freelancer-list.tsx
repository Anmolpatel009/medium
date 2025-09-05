
'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { User } from '@/types';
import FreelancerCard from '@/components/freelancer-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

export default function FreelancerList() {
  const [freelancers, setFreelancers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // This query now includes an orderBy clause. If an index is missing, 
    // Firestore will provide a console error with a link to create it.
    const q = query(
        collection(db, 'users'), 
        where('role', '==', 'freelancer')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const freelancersData: User[] = [];
      querySnapshot.forEach((doc) => {
        freelancersData.push({ id: doc.id, ...doc.data() } as User);
      });
      setFreelancers(freelancersData);
      setError(null);
      setLoading(false);
    }, (err) => {
        console.error("Error fetching freelancers: ", err);
        setError(err.message);
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
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Action Required: Create a Firestore Index</AlertTitle>
        <AlertDescription>
            <p className="font-semibold">This page is not loading because a Firestore index is missing.</p>
            <p className="mt-2">To fix this, please follow these steps:</p>
            <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>Open your browser's developer tools (Right-click -> Inspect -> Console).</li>
                <li>Look for an error message from Firestore that starts with "FAILED_PRECONDITION".</li>
                <li>Click the link within that error message. It will take you to the Firebase console to create the necessary index.</li>
                <li>Click "Create Index". The creation process takes a few minutes.</li>
                <li>Once the index is built, refresh this page. The freelancers will appear.</li>
            </ol>
            <p className="mt-2 text-xs text-muted-foreground">If no freelancers have signed up yet, this message will also appear, but the console error is the most likely cause.</p>
        </AlertDescription>
      </Alert>
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
