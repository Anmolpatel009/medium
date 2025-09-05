
'use client';

import type { User } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Mail, Phone, Briefcase, MapPin, Star, MessageSquare } from 'lucide-react';

interface FreelancerCardProps {
  freelancer: User;
  context?: 'directory' | 'task-interest' | 'featured';
}

function getInitials(name?: string) {
    if (!name) return 'A';
    const parts = name.split(' ');
    if (parts.length > 1) {
        return (parts[0][0] + (parts[parts.length - 1][0] || '')).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
}


export default function FreelancerCard({ freelancer, context = 'directory' }: FreelancerCardProps) {
    const profile = freelancer.freelancerProfile || {};

    const skillsArray = Array.isArray(profile.skills) 
      ? profile.skills 
      : typeof profile.skills === 'string' ? profile.skills.split(',').map(s => s.trim()) : [];
      
    const allSkills = skillsArray.filter(value => value);

    if (context === 'featured') {
         return (
            <Card className="flex flex-col transition-all hover:shadow-lg w-full max-w-[220px]">
                <CardContent className="p-4 flex flex-col items-center text-center">
                     <Avatar className="h-24 w-24 text-3xl mb-4 border-2 border-primary/20">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${freelancer.id}`} alt={freelancer.name} />
                        <AvatarFallback>{getInitials(freelancer.name)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="font-headline text-lg">{freelancer.name || 'Anonymous Freelancer'}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{allSkills[0] || 'Top-rated Freelancer'}</p>
                    <Button size="sm" className="mt-4 w-full">View Profile</Button>
                </CardContent>
            </Card>
         )
    }

  return (
    <Card className="flex flex-col transition-all hover:shadow-lg">
      <CardHeader className="bg-muted/50">
        <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 text-xl">
                <AvatarImage src={`https://i.pravatar.cc/150?u=${freelancer.id}`} alt={freelancer.name} />
                <AvatarFallback>{getInitials(freelancer.name)}</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle className="font-headline text-xl">{freelancer.name || 'Anonymous Freelancer'}</CardTitle>
                <CardDescription className="flex items-center gap-1.5 pt-1 text-primary">
                    <Star className="w-4 h-4" /> Top Rated
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow pt-6">
        <div className="space-y-4">
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><Briefcase className="w-4 h-4" /> Experience</span>
                <span className="font-semibold">{profile?.experience || 0} years</span>
            </div>
            <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</span>
                <span className="font-semibold text-right">{freelancer.address || 'Not specified'}</span>
            </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Hourly Rate</span>
                <span className="font-bold text-lg text-primary">₹{Number(profile?.hourlyRate || 0).toLocaleString('en-IN')}</span>
            </div>
        </div>

        <div className="mt-6">
            <h4 className="font-semibold mb-3">Skills & Services</h4>
            <div className="flex flex-wrap gap-2">
                {allSkills.slice(0, 5).map(skill => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
                {allSkills.length > 5 && <Badge variant="outline">+{allSkills.length - 5} more</Badge>}
            </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 bg-muted/50 py-3 px-4">
        {context === 'directory' && (
            <>
                <Button variant="outline" size="sm" asChild>
                    <a href={`mailto:${freelancer.email}`}>
                        <Mail className="mr-2 h-4 w-4" /> Message
                    </a>
                </Button>
                 <Button size="sm" asChild>
                     <a href={`https://wa.me/${freelancer.phone}`}>
                        <Phone className="mr-2 h-4 w-4" /> Hire Now
                    </a>
                </Button>
            </>
        )}
        {context === 'task-interest' && (
            <Button size="sm">
                <MessageSquare className="mr-2 h-4 w-4" /> Chat to Discuss
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
