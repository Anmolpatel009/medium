
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Task, Interest } from '@/types';
import TaskCard from '@/components/task-card';
import { Skeleton } from '@/components/ui/skeleton';

interface MyInterestedTasksProps {
  freelancerId: string;
}

export default function MyInterestedTasks({ freelancerId }: MyInterestedTasksProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!freelancerId) return;

    const fetchInterestedTasks = async () => {
      try {
        const { data: interests, error: interestsError } = await supabase
          .from('interests')
          .select('*')
          .eq('freelancer_id', freelancerId)
          .order('interested_at', { ascending: false });

        if (interestsError) throw interestsError;

        if (!interests || interests.length === 0) {
          setTasks([]);
          setLoading(false);
          return;
        }

        const taskIds = interests.map((interest: Interest) => interest.task_id);

        const { data: tasksData, error: tasksError } = await supabase
          .from('tasks')
          .select('*')
          .in('id', taskIds);

        if (tasksError) throw tasksError;

        const sortedTasks = (tasksData as Task[]).sort((a, b) => {
          const indexA = taskIds.indexOf(a.id);
          const indexB = taskIds.indexOf(b.id);
          return indexA - indexB;
        });

        setTasks(sortedTasks);
      } catch (error) {
        console.error("Error fetching interested tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterestedTasks();
  }, [freelancerId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
           <div key={i} className="bg-card rounded-lg p-4 h-[300px]">
             <Skeleton className="h-full w-full" />
           </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg bg-background">
        <h3 className="text-xl font-semibold text-muted-foreground">You haven't shown interest in any tasks yet.</h3>
        <p className="text-muted-foreground mt-2">Browse tasks and show interest to see them here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
