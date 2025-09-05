

'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/layout/header';
import TaskList from '@/components/task-list';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Hero from '@/components/sections/hero';
import ViewSwitcher from '@/components/view-switcher';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import FeaturedFreelancers from '@/components/sections/featured-freelancers';
import PlatformFeatures from '@/components/sections/platform-features';

function ProfessionalView() {
  return (
    <>
      <Hero />
      <PlatformFeatures />
      <FeaturedFreelancers />
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
    </>
  );
}

const popularJobs = [
    "AC Repair", "Plumbing", "Home Cleaning", "Tiffin Service", "Makeup Artist", "Electrician", "Local Errands", "Event Photography", "Appliance Repair", "Furniture Assembly", "Home Painting", "Packers & Movers"
];

function QuickJobsView() {
    return (
        <div className="bg-gradient-to-br from-indigo-50 via-white to-rose-50 dark:from-gray-900 dark:via-black dark:to-indigo-950 text-gray-800 dark:text-gray-200">
            {/* Hero Section */}
            <section className="relative overflow-hidden py-12 lg:py-20">
                <div className="container grid md:grid-cols-3 items-center justify-center gap-8 text-center">
                    <div className="text-center md:text-right">
                        <h2 className="text-2xl md:text-3xl font-bold font-serif-display leading-tight text-gray-800 dark:text-gray-100">seconds to meet</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">the person you're looking for</p>
                        <Button size="lg" variant="outline" className="h-14 text-lg bg-transparent border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground" asChild>
                            <Link href="/signup?role=freelancer">Join as Service Provider</Link>
                        </Button>
                    </div>
                    <div className="flex justify-center">
                    </div>
                     <div className="text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold font-serif-display leading-tight text-gray-800 dark:text-gray-100">
 seconds remaining
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">to get hired</p>
                         <Button size="lg" className="h-14 text-lg" asChild>
                            <Link href="/signup?role=client">Join as a Service Seeker</Link>
                        </Button>
                    </div>
                </div>
            </section>
            
            {/* Ticker Section */}
            <div className="w-full overflow-hidden bg-secondary border-y border-border">
                <div className="scrolling-ticker-container">
                    <div className="scrolling-ticker">
                    {[...popularJobs, ...popularJobs].map((job, index) => (
                        <div key={index} className="flex items-center gap-2 px-8 py-3 text-sm font-medium text-secondary-foreground whitespace-nowrap">
                            <span>{job}</span>
                        </div>
                    ))}
                    </div>
                    <div className="scrolling-ticker">
                    {[...popularJobs, ...popularJobs].map((job, index) => (
                        <div key={index} className="flex items-center gap-2 px-8 py-3 text-sm font-medium text-secondary-foreground whitespace-nowrap">
                            <span>{job}</span>
                        </div>
                    ))}
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <section className="py-16 lg:py-24">
                 <div className="container">
                     <h2 className="text-3xl font-bold font-serif-display text-center mb-12">Your Hustle, Your Rules.</h2>
                     <div className="grid md:grid-cols-3 gap-8 text-center max-w-5xl mx-auto">
                        <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-gray-800/20 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                            <Image data-ai-hint="describe task" src="https://picsum.photos/400/300" alt="Describe your task" width={200} height={150} className="rounded-lg mb-4" />
                            <h3 className="text-xl font-bold font-headline mb-2">1. Describe the Gig</h3>
                            <p className="text-gray-600 dark:text-gray-300">Quickly post what you need done. Be it a small repair or a quick errand, just a few taps and you're set.</p>
                        </div>
                         <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-gray-800/20 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                            <Image data-ai-hint="local people" src="https://picsum.photos/400/300" alt="Get local offers" width={200} height={150} className="rounded-lg mb-4" />
                            <h3 className="text-xl font-bold font-headline mb-2">2. Get Local Offers</h3>
                            <p className="text-gray-600 dark:text-gray-300">Instantly, your task is sent to trusted Taskers in your neighborhood. No long waits, just fast responses.</p>
                        </div>
                         <div className="flex flex-col items-center p-6 bg-white/50 dark:bg-gray-800/20 rounded-2xl shadow-sm hover:shadow-lg transition-shadow">
                            <Image data-ai-hint="task done" src="https://picsum.photos/400/300" alt="Get it done" width={200} height={150} className="rounded-lg mb-4" />
                            <h3 className="text-xl font-bold font-headline mb-2">3. Done and Dusted!</h3>
                            <p className="text-gray-600 dark:text-gray-300">Choose your Tasker, get the job done, and pay securely through the app. Simple, safe, and satisfying.</p>
                        </div>
                     </div>
                </div>
            </section>

             {/* CTA Section */}
            <section className="py-16 lg:py-24 bg-white/80 dark:bg-gray-900/50">
                <div className="container text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif-display mb-4">Ready to Start?</h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                        Whether you need a helping hand or want to earn extra income, your community is waiting.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" className="h-14 text-lg" asChild>
                            <Link href="/signup?role=client">Post a Task</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="h-14 text-lg bg-transparent border-primary/50 text-primary hover:bg-primary hover:text-primary-foreground" asChild>
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
