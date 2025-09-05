
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Zap, Bot, Users, Rocket, MapPin, CheckCircle, FileText, MessageSquare } from 'lucide-react';

const professionalFeatures = [
    { icon: FileText, text: "Post a detailed project brief." },
    { icon: Users, text: "Vet proposals from top-tier freelancers." },
    { icon: Rocket, text: "Collaborate, manage milestones, and build." },
];

const quickFeatures = [
    { icon: Zap, text: "Post any task in seconds." },
    { icon: MapPin, text: "Get instant offers from local, available Taskers." },
    { icon: CheckCircle, text: "Task done, pay securely, rate your experience." },
];

export default function PlatformFeatures() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">The Right Talent, Right Now</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            As easy as booking a ride. Whether you need a pro for a big project or a local hand for a quick task, we've got you covered.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Professional Card */}
            <Card className="bg-background shadow-lg border-primary/20 border-2 flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-full">
                            <Briefcase className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-2xl">For Professional Gigs</CardTitle>
                            <p className="text-muted-foreground">Tech, Creative, Marketing & More</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                    {professionalFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="bg-primary/10 p-2 rounded-full">
                                <feature.icon className="w-5 h-5 text-primary" />
                            </div>
                            <span className="font-medium text-foreground/90">{feature.text}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Quick Jobs Card */}
            <Card className="bg-background shadow-lg border-accent/20 border-2 flex flex-col">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-accent/10 rounded-full">
                            <Zap className="w-8 h-8 text-accent" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-2xl">For Quick, Local Tasks</CardTitle>
                            <p className="text-muted-foreground">Repairs, Errands, Cleaning, Events...</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 flex-grow">
                     {quickFeatures.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="bg-accent/10 p-2 rounded-full">
                                <feature.icon className="w-5 h-5 text-accent" />
                            </div>
                            <span className="font-medium text-foreground/90">{feature.text}</span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        {/* Algorithm Section */}
        <div className="mt-12 text-center bg-background/80 p-8 rounded-2xl border-2 border-dashed">
            <div className="flex justify-center items-center gap-4 mb-4">
                <Bot className="w-10 h-10 text-primary" />
                <h3 className="text-2xl font-bold font-headline">Our Smarter Matching Engine</h3>
            </div>
            <p className="text-muted-foreground max-w-4xl mx-auto">
                We go beyond just location. Our algorithm considers freelancer **availability, specific skills, proximity, and readiness to meet,** connecting you with the perfect person who can get the job done when you need it. No more endless scrolling.
            </p>
        </div>
      </div>
    </section>
  );
}
