import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function FindTalentPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold font-headline mb-4">Find Talent</h1>
        <p className="text-lg text-muted-foreground">This is a placeholder page for finding talent. Search for freelancers here.</p>
      </main>
      <Footer />
    </div>
  );
}
