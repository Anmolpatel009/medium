import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, BookOpen, Search, Library } from 'lucide-react';

export default function WhyIndexesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-secondary/50">
      <Header />
      <main className="flex-1">
        <section className="container py-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4">What Are Database Indexes?</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              And why were they so important for fixing the "Show All Freelancers" page? Let's break it down.
            </p>
        </section>
        
        <section className="container pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <Card className="bg-background shadow-lg">
                    <CardHeader>
                        <div className="flex items-center gap-4">
                           <div className="bg-primary/10 p-3 rounded-full">
                                <Library className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-2xl">The Library Analogy</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                        <p>Imagine your database is a massive, unorganized library with millions of books. If you need to find "all the red books written in 2023," you'd have to check every single book on every shelf. This is incredibly slow.</p>
                        <p>A **database index** is like creating a special, pre-sorted card catalog for that library.</p>
                        <p>You could have one catalog sorted by **Color** and another by **Publication Year**. Now, if you ask for "all the red books," you just go to the "Color" catalog, look up "Red," and get a list of all the right shelf locations. It's lightning fast.</p>
                    </CardContent>
                </Card>
                 <Card className="bg-background shadow-lg">
                    <CardHeader>
                         <div className="flex items-center gap-4">
                           <div className="bg-primary/10 p-3 rounded-full">
                                <Search className="w-6 h-6 text-primary" />
                            </div>
                            <CardTitle className="font-headline text-2xl">Why Indexes Matter for Firestore</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                       <div className="flex items-start gap-4">
                            <Zap className="w-8 h-8 text-green-500 mt-1 shrink-0" />
                            <div>
                                <h3 className="font-bold text-foreground">1. Blazing Speed</h3>
                                <p>For large databases, indexes are the difference between a query taking milliseconds and a query taking minutes (or even timing out). They allow the database to find the data you want without scanning every single document.</p>
                            </div>
                       </div>
                        <div className="flex items-start gap-4">
                            <BookOpen className="w-8 h-8 text-blue-500 mt-1 shrink-0" />
                            <div>
                                <h3 className="font-bold text-foreground">2. Enabling Complex Queries</h3>
                                <p>This was the exact issue you ran into. When you want to **filter** by one field (like `role == 'freelancer'`) and **sort** by another (like `createdAt`), Firestore needs a special "composite index"—like a card catalog sorted first by color, and then by year. Without this specific index, Firestore refuses to run the query to avoid a slow operation that could degrade database performance.</p>
                            </div>
                       </div>
                    </CardContent>
                </Card>
            </div>
             <div className="mt-8 text-center bg-background/80 p-6 rounded-lg border">
                <h3 className="text-2xl font-bold font-headline mb-2">How This Fixed Your App</h3>
                <p className="text-muted-foreground max-w-4xl mx-auto">
                    Your "Show All Freelancers" page needed to find users where `role` is `'freelancer'` and sort them by `createdAt`. Before you created the index, Firestore was essentially saying, "I don't have a pre-made list for that specific request, and I won't search the whole library from scratch because it's too slow." By creating the composite index, you gave Firestore that pre-sorted list, allowing it to fulfill the request instantly and display the freelancers.
                </p>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
