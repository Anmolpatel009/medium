
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types';
import TaskCard from '@/components/task-card';
import { Skeleton } from '@/components/ui/skeleton';

interface ActiveTasksListProps {
    freelancerId: string;
}

export default function ActiveTasksList({ freelancerId }: ActiveTasksListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!freelancerId) {
        setLoading(false);
        return;
    }
    
    const fetchActiveTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('assigned_to', freelancerId)
          .eq('status', 'assigned')
          .order('created_at', { ascending: false });

        if (error) throw error;

        setTasks(data as Task[]);
      } catch (error) {
        console.error("Error fetching active tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchActiveTasks();
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
        <h3 className="text-xl font-semibold text-muted-foreground">No active tasks.</h3>
        <p className="text-muted-foreground mt-2">Tasks you're assigned to will appear here.</p>
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
