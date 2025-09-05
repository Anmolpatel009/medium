
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Zap, BrainCircuit } from 'lucide-react';

export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">Find Help in Seconds. For Any Task.</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Our platform is built for two kinds of needs. Whether it's a complex project or an urgent errand, getting help is as easy as booking a ride.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-primary/10 rounded-full">
                         <Briefcase className="h-7 w-7 text-primary" />
                       </div>
                        <CardTitle className="font-headline text-2xl">Professional Gigs</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        For when you need a specific skillset. Find experienced freelancers for tech, creative, and business projects.
                    </p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Website Development & IT</li>
                        <li>Graphic Design & Branding</li>
                        <li>Content Writing & Marketing</li>
                        <li>Consulting & Business Services</li>
                    </ul>
                </CardContent>
            </Card>
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
                 <CardHeader>
                    <div className="flex items-center gap-4">
                       <div className="p-3 bg-accent/10 rounded-full">
                         <Zap className="h-7 w-7 text-accent" />
                       </div>
                        <CardTitle className="font-headline text-2xl">Quick Jobs</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        For everyday tasks you need done now. Get immediate help from trusted locals for urgent, on-demand needs.
                    </p>
                     <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        <li>Urgent house cleaning for Diwali</li>
                        <li>Help with a school project</li>
                        <li>Studio setup for a YouTube channel</li>
                        <li>Any kind of local errand or assistance</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
        
        <div className="mt-16 text-center bg-background/80 p-8 rounded-lg border border-primary/20 shadow-sm">
            <BrainCircuit className="h-10 w-10 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-headline mb-2">Powered by Smart Matching</h3>
            <p className="text-muted-foreground max-w-4xl mx-auto">
                Our algorithm goes beyond simple location searches. We match you based on multiple parameters—including real-time availability, specific skills, and a freelancer's readiness to meet in person—to find the perfect person for your job, faster than ever.
            </p>
        </div>

      </div>
    </section>
  );
}
