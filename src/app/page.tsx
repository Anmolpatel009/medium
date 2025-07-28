
'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import TaskList from '@/components/task-list';
import AiRecommender from '@/components/sections/ai-recommender';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Hero from '@/components/sections/hero';
import ViewSwitcher from '@/components/view-switcher';
import { Construction, Home, Wrench, Package, PawPrint, Search, User, Calendar, CheckCircle, CookingPot, ShoppingBasket, Shirt, Paintbrush, Utensils } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
    { name: 'Home Cleaning', icon: Home },
    { name: 'Moving Help', icon: Package },
    { name: 'Tiffin/Home Chef', icon: Utensils },
    { name: 'Shopping', icon: ShoppingBasket },
    { name: 'Home Painting', icon: Paintbrush },
    { name: 'Cooking', icon: CookingPot },
    { name: 'Furniture Assembly', icon: Construction },
];

const exampleTasks = [
    "Deep clean my house for Diwali",
    "Get my AC serviced before summer",
    "Find a plumber for a leaking tap",
    "Help moving furniture to a new flat",
    "Get groceries from the local market",
    "Need a cook for a dinner party",
];

function AnimatedHeadline() {
    const [index, setIndex] = useState(0);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false); // Start fade out
            setTimeout(() => {
                setIndex((prevIndex) => (prevIndex + 1) % exampleTasks.length);
                setFade(true); // Start fade in
            }, 500); // Time for fade out animation
        }, 3000); // Change task every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-24 md:h-32 flex items-center justify-center">
             <h1 className={`text-4xl md:text-5xl font-bold font-headline mb-4 text-center transition-opacity duration-500 ${fade ? 'animate-fade-in-down' : 'animate-fade-out-up'}`}>
                {exampleTasks[index]}
            </h1>
        </div>
    )
}

function QuickJobsView() {
    return (
        <div className="bg-background">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-16 lg:py-24 text-center hero-bg-layered">
                <div className="container">
                    <AnimatedHeadline />
                    <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                        Connect with trusted local Taskers for everything from cleaning to handyman jobs. Fast, reliable help is just around the corner.
                    </p>
                    <div className="flex max-w-xl mx-auto">
                        <div className="relative flex-grow">
                             <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                             <Input placeholder="What do you need help with today?" className="h-12 pl-10 text-base" />
                        </div>
                        <Button size="lg" className="h-12">Search Tasks</Button>
                    </div>
                </div>
            </section>

            {/* Categories Section */}
            <section className="py-16 lg:py-24 bg-secondary/50">
                <div className="container">
                    <h2 className="text-3xl font-bold font-headline text-center mb-10">Popular quick jobs</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
                        {quickJobCategories.map(category => (
                            <Card key={category.name} className="group text-center hover:bg-primary hover:text-primary-foreground transition-all duration-300 cursor-pointer hover:-translate-y-1 shadow-md hover:shadow-lg">
                                <CardHeader className="p-6">
                                    <category.icon className="h-10 w-10 mx-auto mb-4 text-primary group-hover:text-primary-foreground transition-colors" />
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
                     <h2 className="text-3xl font-bold font-headline text-center mb-12">Get it done in 3 simple steps</h2>
                     <div className="grid md:grid-cols-3 gap-12 text-center">
                        <div className="flex flex-col items-center">
                             <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 border-2 border-primary/20">
                                <User className="h-10 w-10 text-primary" />
                             </div>
                             <h3 className="text-xl font-bold font-headline mb-2">1. Post Your Task</h3>
                             <p className="text-muted-foreground">Describe what you need done, and set your location and budget.</p>
                        </div>
                         <div className="flex flex-col items-center">
                             <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 border-2 border-primary/20">
                                <Calendar className="h-10 w-10 text-primary" />
                             </div>
                             <h3 className="text-xl font-bold font-headline mb-2">2. Match with a Tasker</h3>
                             <p className="text-muted-foreground">Our algorithm instantly notifies qualified and available Taskers near you.</p>
                        </div>
                         <div className="flex flex-col items-center">
                             <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4 border-2 border-primary/20">
                                <CheckCircle className="h-10 w-10 text-primary" />
                             </div>
                             <h3 className="text-xl font-bold font-headline mb-2">3. Task Completed</h3>
                             <p className="text-muted-foreground">Choose the best Tasker for the job, get it done, and pay securely.</p>
                        </div>
                     </div>
                </div>
            </section>

             {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-primary text-primary-foreground">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">Ready to get started?</h2>
                    <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                        Post a task and get help in minutes, or sign up to earn money on your own schedule.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" asChild>
                            <Link href="/signup?role=client">Post a Task</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary" asChild>
                            <Link href="/signup?role=freelancer">Become a Tasker</Link>
                        </Button>
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
