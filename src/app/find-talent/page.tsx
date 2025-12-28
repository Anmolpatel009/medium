import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import FreelancerList from '@/components/freelancer-list';

export default function FindTalentPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 container py-12">
        <h1 className="text-4xl font-bold font-headline mb-4">Find Talent</h1>
        <p className="text-lg text-muted-foreground mb-8">Discover and connect with skilled freelancers for your projects.</p>
        <FreelancerList />
      </main>
      <Footer />
    </div>
  );
}
