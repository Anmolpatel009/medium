
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Construction } from 'lucide-react';

export default function QuickJobsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container py-12 text-center flex flex-col items-center justify-center">
        <Construction className="h-16 w-16 text-amber-500 mb-6" />
        <h1 className="text-4xl font-bold font-headline mb-4">Quick Jobs Hub is Under Construction</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          We're working hard to bring you a dedicated space for local, everyday tasks. Soon you'll be able to find help for cleaning, errands, repairs, and more, instantly.
        </p>
         <Button size="lg" asChild>
            <a href="/professional">Explore Professional Work</a>
         </Button>
      </main>
      <Footer />
    </div>
  );
}
