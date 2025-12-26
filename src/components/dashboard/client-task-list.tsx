
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types';
import TaskCard from '@/components/task-card';
import { Skeleton } from '@/components/ui/skeleton';

interface ClientTaskListProps {
    clientId: string;
}

export default function ClientTaskList({ clientId }: ClientTaskListProps) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      return;
    }
    
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('client_id', clientId)
          .order('created_at', { ascending: false });

        if (error) throw error;

        setTasks(data as Task[]);
      } catch (error) {
        console.error("Error fetching client tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [clientId]);

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-4">
            <Skeleton className="h-[250px] w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg bg-background">
        <h3 className="text-xl font-semibold text-muted-foreground">No tasks posted yet.</h3>
        <p className="text-muted-foreground mt-2">Your posted tasks will appear here once you create them.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} viewContext="client" />
      ))}
    </div>
  );
}
