
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Task } from '@/types';
import TaskCard from '@/components/task-card';
import { Skeleton } from '@/components/ui/skeleton';

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching tasks:', error);
        setLoading(false);
        return;
      }

      setTasks(data as Task[]);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="bg-card rounded-lg p-4 h-[300px]">
            <Skeleton className="h-full w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 border-2 border-dashed rounded-lg col-span-full">
        <h3 className="text-xl font-semibold text-muted-foreground">No tasks posted yet.</h3>
        <p className="text-muted-foreground mt-2">Be the first to post a task!</p>
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
