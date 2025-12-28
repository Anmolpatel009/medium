
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import type { User as AuthUser } from '@supabase/supabase-js';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!supabase) {
      console.error('Supabase client not available');
      setLoading(false);
      return;
    }

    // Check current user on mount
    supabase.auth.getUser().then(({ data: { user }, error }) => {
      if (error) {
        console.error('Error getting user on mount:', error);
        // Don't show toast for session missing, as it's expected when not logged in
        if (error.message !== 'Auth session missing!') {
          toast({
            variant: 'destructive',
            title: 'Authentication Error',
            description: 'Failed to retrieve user session. Please check your connection.',
          });
        }
      }
      setUser(user);
      setLoading(false);
    }).catch((err) => {
      console.error('Unexpected error in getUser:', err);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase!.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', event, session ? 'session present' : 'no session');
      if (event === 'SIGNED_OUT' || !session) {
        setUser(null);
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [toast]);

  const logout = async () => {
    if (!supabase) {
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'Database connection not available.',
      });
      return;
    }

    try {
      await supabase.auth.signOut();
      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out.',
      });
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast({
        variant: 'destructive',
        title: 'Logout Failed',
        description: 'An error occurred while logging out. Please try again.',
      });
    }
  };

  return { user, loading, logout };
}
