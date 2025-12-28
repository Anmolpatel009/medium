
'use client';

import { useState, useEffect } from 'react';
import type { User } from '@/types';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import ClientDashboard from '@/components/dashboard/client-dashboard';
import FreelancerDashboard from '@/components/dashboard/freelancer-dashboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      if (!supabase) {
        console.error('Supabase client not available');
        router.push('/login');
        return;
      }

      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();

        if (!authUser) {
          router.push('/login');
          return;
        }

        const { data: userData, error } = await supabase
          .from('users')
          .select('*')
          .eq('uid', authUser.id)
          .single();

        if (error || !userData) {
          console.error("User document not found in database.");
          router.push('/login');
        } else {
          setUser(userData as User);
        }
      } catch (err) {
        console.error('Error fetching user:', err);
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-12">
            <div className="space-y-4">
                <Skeleton className="h-10 w-1/4" />
                <Skeleton className="h-6 w-1/2" />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
                <Skeleton className="h-64 w-full" />
            </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 container py-12 bg-secondary/30">
            {user?.role === 'client' && <ClientDashboard user={user} />}
            {user?.role === 'freelancer' && <FreelancerDashboard user={user} />}
        </main>
        <Footer />
    </div>
  );
}
