
'use client';

import { useState, useEffect } from 'react';
import type { Interest, User, Task } from '@/types';
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import FreelancerCard from './freelancer-card';
import { useToast } from '@/hooks/use-toast';

interface ViewInterestedModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  taskId: string;
}

export default function ViewInterestedModal({ isOpen, onOpenChange, taskId }: ViewInterestedModalProps) {
  const [interestedFreelancers, setInterestedFreelancers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && taskId) {
      const fetchInterested = async () => {
        setLoading(true);
        try {
          const { data: interests, error } = await supabase
            .from('interests')
            .select('*')
            .eq('task_id', taskId);

          if (error) throw error;

          // Get freelancer IDs from interests
          const freelancerIds = interests.map((interest: Interest) => interest.freelancer_id);

          if (freelancerIds.length === 0) {
            setInterestedFreelancers([]);
            return;
          }

          // Fetch user details for each freelancer
          const { data: freelancers, error: freelancersError } = await supabase
            .from('users')
            .select('*')
            .in('id', freelancerIds);

          if (freelancersError) throw freelancersError;

          setInterestedFreelancers(freelancers as User[]);
        } catch (error) {
          console.error("Error fetching interested freelancers:", error);
          toast({ variant: 'destructive', title: "Error", description: "Could not load interested freelancers." });
        } finally {
          setLoading(false);
        }
      };
      
      fetchInterested();
    }
  }, [isOpen, taskId, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Interested Freelancers</DialogTitle>
          <DialogDescription>These freelancers have shown interest in this task. Start a chat to discuss details.</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(2)].map((_, i) => (
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
                </div>
              ))}
            </div>
          ) : interestedFreelancers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interestedFreelancers.map(freelancer => (
                <FreelancerCard key={freelancer.id} freelancer={freelancer} context="task-interest" />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-muted-foreground">No interest yet.</h3>
                <p className="text-muted-foreground mt-2">No freelancers have shown interest in this task.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
