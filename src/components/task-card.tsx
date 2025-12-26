
'use client';

import { useState, useEffect } from 'react';
import type { Task, User } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Mail, Phone, ThumbsUp, ThumbsDown, Users, Zap, Trash2, UserCheck, Milestone } from 'lucide-react';
import InterestModal from '@/components/interest-modal';
import ViewInterestedModal from './view-interested-modal';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


interface TaskCardProps {
  task: Task;
  viewContext?: 'public' | 'client';
}

// Haversine formula to calculate distance between two lat/lng points
function getDistanceInKm(point1: number[], point2: number[]) {
    if (!point1 || !point2) return null;

    const [lng1, lat1] = point1;
    const [lng2, lat2] = point2;

    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lng2 - lng1) * (Math.PI / 180);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
}


export default function TaskCard({ task, viewContext = 'public' }: TaskCardProps) {
  const [taskState, setTaskState] = useState(task);
  const [interestedCount, setInterestedCount] = useState(taskState.interested_count || 0);
  const [feedback, setFeedback] = useState<'interested' | 'not-interested' | null>(null);
  const [isInterestModalOpen, setIsInterestModalOpen] = useState(false);
  const [isViewInterestedModalOpen, setIsViewInterestedModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAccepting, setIsAccepting] = useState(false);
  const [distance, setDistance] = useState<number | null>(null);

  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data: { user: authUser } } = await supabase.auth.getUser();
        if (authUser) {
          const { data: userData, error } = await supabase
            .from('users')
            .select('*')
            .eq('uid', authUser.id)
            .single();

          if (!error && userData) {
            setCurrentUser(userData as User);
          } else {
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Error fetching current user:', err);
        setCurrentUser(null);
      } finally {
        setAuthLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const calculateDistance = async () => {
        if (currentUser?.role === 'freelancer' && taskState.client_id) {
            try {
                const { data: posterData, error } = await supabase
                  .from('users')
                  .select('location')
                  .eq('id', taskState.client_id)
                  .single();

                if (!error && posterData?.location && currentUser.location) {
                    const dist = getDistanceInKm(
                      currentUser.location.coordinates,
                      posterData.location.coordinates
                    );
                    if (dist !== null) {
                        setDistance(dist);
                    }
                }
            } catch (error) {
                console.error("Error calculating distance:", error);
            }
        }
    };
    if (!authLoading && currentUser) {
        calculateDistance();
    }
  }, [currentUser, taskState.client_id, authLoading]);


  const handleViewInterestedClick = () => {
    if (authLoading) return;
    if (currentUser) {
      setIsViewInterestedModalOpen(true);
    } else {
      toast({
        title: "Login Required",
        description: "Please log in or sign up to view interested freelancers.",
      });
      router.push('/login');
    }
  };

  const handleInterestedClick = () => {
    if (authLoading) return;

    if (!currentUser) {
       toast({
        title: "Login Required",
        description: "Please log in to show interest.",
      });
      router.push('/login');
      return;
    }
    
    if (currentUser.role !== 'freelancer') {
        toast({
          variant: 'destructive',
          title: 'Action Not Allowed',
          description: 'Only users registered as freelancers can show interest in tasks.',
        });
        return;
    }

    setIsInterestModalOpen(true);
  };
  
  const onInterestSubmitted = () => {
    setInterestedCount(prev => prev + 1);
    setFeedback('interested');
    setIsInterestModalOpen(false);
  }

  const handleNotInterested = () => {
      setFeedback('not-interested');
  };

  const handleAcceptTask = async () => {
    setIsAccepting(true);
    if (authLoading) {
      setIsAccepting(false);
      return;
    }

    if (!currentUser) {
      toast({ title: "Login Required", description: "You must be logged in to accept a task." });
      router.push('/login');
      setIsAccepting(false);
      return;
    }

    if (currentUser.role !== 'freelancer') {
      toast({ variant: 'destructive', title: 'Action Not Allowed', description: 'Only freelancers can accept tasks.' });
      setIsAccepting(false);
      return;
    }

    try {
      // Get latest task data
      const { data: taskData, error: taskError } = await supabase
        .from('tasks')
        .select('*')
        .eq('id', taskState.id)
        .single();

      if (taskError || !taskData || taskData.status !== 'open') {
        throw new Error("This task is no longer available.");
      }

      // Get freelancer data
      const { data: freelancerData, error: freelancerError } = await supabase
        .from('users')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      if (freelancerError || !freelancerData) {
        throw new Error("Freelancer user not found.");
      }

      // Get client data
      const { data: clientData, error: clientError } = await supabase
        .from('users')
        .select('*')
        .eq('id', taskData.client_id)
        .single();

      if (clientError || !clientData) {
        throw new Error("Client user not found.");
      }

      // Update task
      const { error: updateTaskError } = await supabase
        .from('tasks')
        .update({
          status: 'assigned',
          assigned_to: currentUser.id,
          assigned_to_name: currentUser.name || 'Anonymous',
        })
        .eq('id', taskState.id);

      if (updateTaskError) throw updateTaskError;

      // Update freelancer active projects
      const { error: updateFreelancerError } = await supabase
        .from('users')
        .update({ active_projects: (freelancerData.active_projects || 0) + 1 })
        .eq('id', currentUser.id);

      if (updateFreelancerError) throw updateFreelancerError;

      // Update client active projects
      const { error: updateClientError } = await supabase
        .from('users')
        .update({ active_projects: (clientData.active_projects || 0) + 1 })
        .eq('id', taskData.client_id);

      if (updateClientError) throw updateClientError;

      toast({ title: 'Task Accepted!', description: "The task has been added to your active projects." });
      setTaskState(prev => ({ 
        ...prev, 
        status: 'assigned', 
        assigned_to: currentUser.id,
        assigned_to_name: currentUser.name,
      }));
    } catch (error: any) {
      console.error("Error accepting task:", error);
      toast({ variant: 'destructive', title: 'Error', description: error.message || 'Could not accept the task. Please try again.' });
    } finally {
      setIsAccepting(false);
    }
  }
  
  const handleDeleteTask = async () => {
      try {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('id', taskState.id);

        if (error) throw error;

        toast({ title: "Task Deleted", description: "The task has been successfully removed." });
      } catch (error) {
        console.error("Error deleting task:", error);
        toast({ variant: 'destructive', title: "Error", description: "Could not delete the task. Please try again." });
      }
  }

  const renderPublicButtons = () => {
    if (taskState.status !== 'open') return null;

    if (taskState.task_type === 'instant') {
      return (
        <Button size="sm" onClick={handleAcceptTask} disabled={isAccepting || authLoading}>
          {isAccepting ? <><Zap className="mr-2 h-4 w-4 animate-spin" /> Accepting...</> : <><Zap className="mr-2 h-4 w-4" /> Accept Task</>}
        </Button>
      );
    }
    if (taskState.task_type === 'discuss') {
      return (
        <div className="flex flex-col items-start gap-2">
            <div className="flex flex-wrap items-center gap-2">
                <Button size="sm" variant={feedback === 'interested' ? 'default' : 'outline'} onClick={handleInterestedClick} disabled={!!feedback || authLoading}>
                    <ThumbsUp className="mr-2 h-4 w-4" /> Interested
                </Button>
                <Button size="sm" variant={feedback === 'not-interested' ? 'destructive' : 'outline'} onClick={handleNotInterested} disabled={!!feedback}>
                    <ThumbsDown className="mr-2 h-4 w-4" /> Not Interested
                </Button>
            </div>
             {interestedCount > 0 && (
                 <Button size="sm" variant="link" className="h-auto py-1 px-2 text-muted-foreground" onClick={handleViewInterestedClick}>
                    <Users className="mr-2 h-4 w-4" /> {interestedCount} interested. View
                </Button>
             )}
        </div>
      );
    }
    return null;
  };

  const renderClientButtons = () => {
      return (
        <div className="flex flex-col items-start gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">
                    <Trash2 className="mr-2 h-4 w-4" /> Delete Task
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this task
                    and remove it from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteTask}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            {taskState.interested_count > 0 && (
                 <Button size="sm" variant="outline" className="h-auto py-1 px-2" onClick={handleViewInterestedClick}>
                    <Users className="mr-2 h-4 w-4" /> {taskState.interested_count} interested. View
                </Button>
            )}
        </div>
      )
  }

  return (
    <>
        <Card className="flex flex-col h-full bg-card hover:shadow-xl transition-shadow duration-300 w-full">
            <CardHeader>
              <div className="flex justify-between items-start gap-2">
                <CardTitle className="font-headline text-lg md:text-xl line-clamp-2">{taskState.title}</CardTitle>
                <Badge variant={taskState.status === 'open' ? 'secondary' : 'default'} className="capitalize shrink-0">
                  {taskState.status}
                </Badge>
              </div>
              <CardDescription className="text-lg font-semibold text-primary pt-1">Budget: ₹{Number(taskState.poster_will_pay).toLocaleString('en-IN') || 'Not specified'}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {taskState.location}</span>
                    {distance !== null && currentUser?.role === 'freelancer' && (
                         <span className="flex items-center gap-1.5 text-primary font-medium">
                            <Milestone className="w-4 h-4" /> Approx. {distance.toFixed(1)} km away
                         </span>
                    )}
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {taskState.timeframe}</span>
                     {taskState.status === 'assigned' && taskState.assigned_to_name && (
                        <span className="flex items-center gap-1.5 text-green-500 font-medium"><UserCheck className="w-4 h-4" /> Assigned to {taskState.assigned_to_name.split(' ')[0]}</span>
                    )}
                </div>
                <p className="text-sm text-foreground/80 line-clamp-3 mb-4">{taskState.description}</p>
                
                {viewContext === 'public' && renderPublicButtons()}
                {viewContext === 'client' && renderClientButtons()}

            </CardContent>
            <CardFooter className="bg-muted/50 p-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarFallback>{taskState.poster_name?.charAt(0).toUpperCase() || 'P'}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-sm">{taskState.poster_name}</p>
                        <p className="text-xs text-muted-foreground">Task Poster</p>
                    </div>
                </div>
                { taskState.status === 'open' && (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" asChild>
                            <a href={`mailto:${taskState.poster_email}`}><Mail className="h-4 w-4" /></a>
                        </Button>
                        <Button variant="outline" size="icon" asChild>
                            <a href={`tel:${taskState.poster_phone}`}><Phone className="h-4 w-4" /></a>
                        </Button>
                    </div>
                )}
            </CardFooter>
      </Card>

      {currentUser && <InterestModal 
        isOpen={isInterestModalOpen} 
        onOpenChange={setIsInterestModalOpen}
        taskId={taskState.id}
        user={currentUser}
        onInterestSubmitted={onInterestSubmitted}
      />}
      <ViewInterestedModal
        isOpen={isViewInterestedModalOpen}
        onOpenChange={setIsViewInterestedModalOpen}
        taskId={taskState.id}
      />
    </>
  );
}
