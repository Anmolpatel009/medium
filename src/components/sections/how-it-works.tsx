
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Users, FileText, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: FileText,
    title: '1. Post Your Project',
    description: "Describe your project, set your budget, and post it for our community of skilled professionals to see.",
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'woman writing'
  },
  {
    icon: Users,
    title: '2. Receive Quality Bids',
    description: "Get proposals from top-tier freelancers. Review their profiles, portfolios, and past work to find the perfect match.",
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'team meeting'
  },
  {
    icon: CheckCircle,
    title: '3. Collaborate & Complete',
    description: "Work with your chosen freelancer, manage milestones, and release payment only when you're 100% satisfied.",
    image: 'https://picsum.photos/600/400',
    dataAiHint: 'handshake deal'
  },
];


export default function HowItWorks() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-headline">How It Works</h2>
          <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
            Get your projects done with a simple, transparent, and secure process.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="group flex flex-col items-center text-center p-6 bg-background rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2">
                <div className="relative w-full h-48 mb-6 overflow-hidden rounded-lg">
                    <Image 
                        data-ai-hint={step.dataAiHint}
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="bg-primary/10 p-4 rounded-full mb-4">
                    <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
