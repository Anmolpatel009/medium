
'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import type { User } from '@/types';

interface InterestModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  taskId: string;
  user: User | null;
  onInterestSubmitted: () => void;
}

export default function InterestModal({ isOpen, onOpenChange, taskId, user, onInterestSubmitted }: InterestModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'You must be logged in to show interest.' });
      return;
    }

    setIsSubmitting(true);
    try {
      // Check if already interested
      const { data: existingInterest, error: checkError } = await supabase
        .from('interests')
        .select('*')
        .eq('task_id', taskId)
        .eq('freelancer_id', user.id)
        .single();

      if (existingInterest && !checkError) {
        toast({
          variant: 'destructive',
          title: 'Already Interested',
          description: 'You have already shown interest in this task.',
        });
        setIsSubmitting(false);
        onOpenChange(false);
        return;
      }

      // Get task data
      const { data: taskData, error: taskError } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskId)
        .single();

      if (taskError || !taskData) throw new Error('Task not found');

      // Insert interest
      const { error: insertError } = await supabase
        .from('interests')
        .insert([{
          task_id: taskId,
          task_title: taskData.title,
          freelancer_id: user.id,
          interested_at: new Date().toISOString(),
        }]);

      if (insertError) throw insertError;

      // Update task interested count
      const newInterestedCount = (taskData.interested_count || 0) + 1;
      const { error: updateTaskError } = await supabase
        .from('tasks')
        .update({ interested_count: newInterestedCount })
        .eq('id', taskId);

      if (updateTaskError) throw updateTaskError;

      // Update user tasks_applied count
      const { data: userData, error: getUserError } = await supabase
        .from('users')
        .select('tasks_applied')
        .eq('id', user.id)
        .single();

      if (getUserError) throw getUserError;

      const newTasksAppliedCount = (userData?.tasks_applied || 0) + 1;
      const { error: updateUserError } = await supabase
        .from('users')
        .update({ tasks_applied: newTasksAppliedCount })
        .eq('id', user.id);

      if (updateUserError) throw updateUserError;

      toast({ title: 'Success!', description: 'Your interest has been recorded.' });
      onInterestSubmitted();

    } catch (error) {
      console.error('Interest submission error:', error);
      toast({ variant: 'destructive', title: 'Error', description: 'Failed to record interest. Please try again.' });
    } finally {
      setIsSubmitting(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-headline">Confirm Your Interest</DialogTitle>
          <DialogDescription>
            Are you sure you want to show interest in this task? The poster will be notified.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>Cancel</Button>
          <Button type="button" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Yes, I'm Interested
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
