
'use client';

import { useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, doc, runTransaction, updateDoc } from 'firebase/firestore';
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
      const interestQuery = query(collection(db, 'intrested'), where('taskId', '==', taskId), where('freelancerId', '==', user.id));
      const existingInterest = await getDocs(interestQuery);

      if (!existingInterest.empty) {
        toast({
          variant: 'destructive',
          title: 'Already Interested',
          description: 'You have already shown interest in this task.',
        });
        setIsSubmitting(false);
        onOpenChange(false);
        return;
      }
      
      const taskRef = doc(db, 'tasks', taskId);
      const userRef = doc(db, 'users', user.id);

      await runTransaction(db, async (transaction) => {
        const taskDoc = await transaction.get(taskRef);
        const userDoc = await transaction.get(userRef);

        if (!taskDoc.exists() || !userDoc.exists()) {
          throw new Error("Task or User does not exist!");
        }

        const newInterestedCount = (taskDoc.data().interestedCount || 0) + 1;
        transaction.update(taskRef, { interestedCount: newInterestedCount });

        const newTasksAppliedCount = (userDoc.data().tasksApplied || 0) + 1;
        transaction.update(userRef, { tasksApplied: newTasksAppliedCount });
        
        const interestRef = doc(collection(db, 'intrested'));
        transaction.set(interestRef, {
            taskId: taskId,
            taskTitle: taskDoc.data().title, // Store task title for easy display
            freelancerId: user.id,
            freelancer: userDoc.data(),
            interestedAt: serverTimestamp(),
        });
      });

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
