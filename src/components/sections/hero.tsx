
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Users, Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-secondary">
        <div className="container grid md:grid-cols-5 gap-8 items-center min-h-[calc(100vh-4rem)] py-12">
            <div className="space-y-6 text-center md:text-left animate-fade-in-up md:col-span-2">
                <Badge variant="outline" className="text-base">
                    Now in Beta!
                </Badge>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
                    Connect with Skilled Local Freelancers Instantly
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto md:mx-0">
                    From house cleaning to high-tech, post a task and get instant notifications from top-rated talent in your area. Meet, collaborate, and get the job done faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                    <Button size="lg" asChild>
                      <Link href="/showall">
                        <Users className="mr-2" /> Show All Freelancers
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/find-talent">
                        <Search className="mr-2" /> Find a Freelancer
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/find-work">
                          Browse All Work
                      </Link>
                    </Button>
                </div>
            </div>
            <div className="relative hidden md:flex items-center justify-end h-full animate-fade-in-down md:col-span-3">
                <div className="relative w-80 h-80 rounded-full earth-bg animate-spin-slow">
                </div>
            </div>
        </div>
    </section>
  );
}
