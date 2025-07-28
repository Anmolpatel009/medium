
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, Zap } from 'lucide-react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function SelectionPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
            What brings you to TalentFlow?
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 mb-12">
            Choose your path. Are you looking for professional projects and long-term collaborations, or do you need quick, everyday tasks done fast?
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/professional" className="block">
              <div className="p-8 border bg-background rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center justify-center">
                <Briefcase className="h-12 w-12 text-primary mb-4" />
                <h2 className="text-2xl font-bold font-headline mb-2">Professional Work</h2>
                <p className="text-muted-foreground mb-6">
                  Find skilled freelancers, collaborate on complex projects, and build your next big idea.
                </p>
                <Button size="lg" className="w-full">Enter Professional Hub</Button>
              </div>
            </Link>
            <Link href="/quick-jobs" className="block">
              <div className="p-8 border bg-background rounded-lg shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full flex flex-col items-center justify-center">
                 <Zap className="h-12 w-12 text-amber-500 mb-4" />
                 <h2 className="text-2xl font-bold font-headline mb-2">Quick Jobs & Tasks</h2>
                 <p className="text-muted-foreground mb-6">
                    Need a hand with everyday tasks? Find local help for cleaning, errands, repairs, and more.
                 </p>
                 <Button size="lg" className="w-full" variant="secondary">Explore Quick Jobs</Button>
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
