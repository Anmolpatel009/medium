
'use client';

import { useState } from 'react';
import Header from '@/components/layout/header';
import TaskList from '@/components/task-list';
import AiRecommender from '@/components/sections/ai-recommender';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Hero from '@/components/sections/hero';
import ViewSwitcher from '@/components/view-switcher';
import { Construction } from 'lucide-react';

function ProfessionalView() {
  return (
    <>
      <Hero />
      <section className="py-16 lg:py-24 bg-secondary">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold font-headline">Latest Tasks</h2>
              <p className="text-lg text-muted-foreground mt-2">Find your next opportunity from the latest posted tasks.</p>
            </div>
            <div className="mt-4 md:mt-0 flex gap-2">
              <Button asChild>
                <Link href="/signup?role=client">Post a Task</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/find-work">View All Tasks</Link>
              </Button>
            </div>
          </div>
          <TaskList />
        </div>
      </section>
      <AiRecommender />
    </>
  );
}

function QuickJobsView() {
    return (
        <div className="container py-16 lg:py-24 text-center flex flex-col items-center justify-center min-h-[calc(100vh-20rem)]">
            <Construction className="h-16 w-16 text-amber-500 mb-6" />
            <h1 className="text-4xl font-bold font-headline mb-4">Quick Jobs Hub is Under Construction</h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            We're working hard to bring you a dedicated space for local, everyday tasks. Soon you'll be able to find help for cleaning, errands, repairs, and more, instantly.
            </p>
        </div>
    )
}

export default function ProfessionalHome() {
  const [activeView, setActiveView] = useState<'professional' | 'quick-jobs'>('professional');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <ViewSwitcher activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1">
        {activeView === 'professional' ? <ProfessionalView /> : <QuickJobsView />}
      </main>
      <Footer />
    </div>
  );
}
