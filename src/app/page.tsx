
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
import { Construction, Home, Wrench, Package, PawPrint, Search, User, Calendar, CheckCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';

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

const quickJobCategories = [
    { name: 'Handyman', icon: Wrench },
    { name: 'Cleaning', icon: Home },
    { name: 'Moving Help', icon: Package },
    { name: 'Pet Care', icon: PawPrint },
    { name: 'Gardening', icon: Wrench },
    { name: 'Assembly', icon: Wrench },
]

function QuickJobsView() {
    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 lg:py-24 text-center hero-bg-layered">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">Your to-do list, done.</h1>
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Find trusted local help for everyday tasks. From cleaning to handyman jobs, get it done quickly and easily.
                    </p>
                    <div className="flex max-w-xl mx-auto">
                        <div className="relative flex-grow">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                             <Input placeholder="Search for a service, e.g. 'house cleaning'" className="h-12 pl-10 text-base" />
                        </div>
                        <Button size="lg" className="h-12">Search</Button>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 lg:py-24 bg-secondary/50">
                <div className="container">
                    <h2 className="text-3xl font-bold font-headline text-center mb-10">Popular services</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                        {quickJobCategories.map(category => (
                            <Card key={category.name} className="group text-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer hover:-translate-y-1">
                                <CardHeader className="p-6">
                                    <category.icon className="h-10 w-10 mx-auto mb-3 text-primary group-hover:text-primary-foreground transition-colors" />
                                    <CardTitle className="font-headline text-lg">{category.name}</CardTitle>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* How It Works Section */}
            <section className="py-16 lg:py-24">
                <div className="container">
                     <h2 className="text-3xl font-bold font-headline text-center mb-12">How it works</h2>
                     <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                             <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 border-2 border-primary/20">
                                <User className="h-10 w-10 text-primary" />
                             </div>
                             <h3 className="text-xl font-bold font-headline mb-2">1. Describe Your Task</h3>
                             <p className="text-muted-foreground">Post your task with details like location, time, and budget.</p>
                        </div>
                         <div className="flex flex-col items-center">
                             <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 border-2 border-primary/20">
                                <Calendar className="h-10 w-10 text-primary" />
                             </div>
                             <h3 className="text-xl font-bold font-headline mb-2">2. Get Matched</h3>
                             <p className="text-muted-foreground">We instantly notify nearby, qualified freelancers who can help.</p>
                        </div>
                         <div className="flex flex-col items-center">
                             <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 border-2 border-primary/20">
                                <CheckCircle className="h-10 w-10 text-primary" />
                             </div>
                             <h3 className="text-xl font-bold font-headline mb-2">3. Get it Done</h3>
                             <p className="text-muted-foreground">Chat, hire your chosen freelancer, and get your task completed.</p>
                        </div>
                     </div>
                </div>
            </section>
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
