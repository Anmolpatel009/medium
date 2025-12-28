
'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LocateFixed } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';


const formSchema = z.object({
  role: z.enum(['freelancer', 'client'], { required_error: 'Please select a role.' }),
  name: z.string().min(2, 'Please enter a name.'),
  email: z.string().email('Invalid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  phone: z.string().regex(/^[0-9]{10,15}$/, 'Invalid phone number.').optional(),
  address: z.string().min(10, 'Please enter a valid address.').optional(),
  location: z.string().optional(),
  skills: z.string().optional(),
  services: z.string().optional(),
  experience: z.coerce.number().optional(),
  hourlyRate: z.coerce.number().optional(),
  companyName: z.string().optional(),
  industry: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

function SignupFormComponent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDetectingLocation, setIsDetectingLocation] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      name: '',
      role: undefined,
      phone: '',
      address: '',
      location: '',
      skills: '',
      services: '',
      experience: 0,
      hourlyRate: 0,
      companyName: '',
      industry: '',
    },
  });

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'client' || roleParam === 'freelancer') {
      form.setValue('role', roleParam);
    }
  }, [searchParams, form]);
  
  const userRole = form.watch('role');

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      setIsDetectingLocation(true);
      toast({ title: "Detecting Location...", description: "Please wait while we fetch your address." });
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          form.setValue('location', `${lat.toFixed(6)}, ${lng.toFixed(6)}`);

          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            if (data && data.display_name) {
              form.setValue('address', data.display_name);
              toast({ title: "Success", description: "Address automatically filled!" });
            } else {
               toast({ variant: 'destructive', title: "Error", description: "Could not fetch address details. Please enter manually." });
            }
          } catch (error) {
             toast({ variant: 'destructive', title: "Error", description: "Failed to fetch address. Please enter manually." });
          } finally {
            setIsDetectingLocation(false);
          }
        },
        () => {
          toast({ variant: 'destructive', title: "Error", description: "Could not detect location. Please grant permission or enter manually." });
          setIsDetectingLocation(false);
        },
        { enableHighAccuracy: true }
      );
    } else {
      toast({ variant: 'destructive', title: "Error", description: "Geolocation is not supported by your browser." });
    }
  };


  const onSubmit = async (values: FormData) => {
    setIsSubmitting(true);

    try {
      console.log('Starting signup with values:', values);

      // Create user with Supabase Auth
      console.log('Calling supabase.auth.signUp...');
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      });

      console.log('signUp response:', { data: authData, error: authError });

      if (authError) {
        console.error('Auth error:', authError);
        throw authError;
      }

      if (!authData.user) {
        console.error('No user in auth data');
        throw new Error('User creation failed');
      }

      if (!authData.user.id) {
        console.error('Auth user ID is null');
        throw new Error('Auth user ID is null or undefined');
      }

      console.log('Auth user created:', authData.user.id);

      const [lat, lng] = values.location ? values.location.split(',').map(coord => parseFloat(coord.trim())) : [null, null];
      console.log('Parsed location:', { lat, lng });

      const userData: any = {
         id: authData.user.id,
         uid: authData.user.id,
         email: values.email,
         name: values.name,
         phone: values.phone || '',
         address: values.address || '',
         role: values.role,
         active_projects: 0,
         completed_projects: 0,
         tasks_applied: 0,
         total_earnings: 0,
         unread_messages: 0,
         location_lat: lat,
         location_lng: lng,
       };

      if (values.role === 'freelancer') {
        userData.freelancer_profile = {
          fullName: values.name,
          skills: values.skills?.split(',').map(s => s.trim()) || [],
          services: values.services || '',
          experience: values.experience || 0,
          hourlyRate: values.hourlyRate || 0,
        };
      } else if (values.role === 'client') {
        userData.client_profile = {
          companyName: values.companyName || '',
          industry: values.industry || '',
        };
      }

      console.log('User data to insert:', userData);

      // Insert user data into users table
      console.log('Calling supabase.from(users).insert...');
      const { data: insertData, error: dbError } = await supabase
        .from('users')
        .insert([userData]);

      console.log('Insert response:', { data: insertData, error: dbError });

      if (dbError) {
        console.error('DB insert error:', dbError);
        throw dbError;
      }

      console.log('Signup successful');
      toast({
        title: 'Success!',
        description: 'Your account has been created. Please check your email for a verification link.',
        duration: 5000,
       });
      router.push('/login');

    } catch (error: any) {
      console.error('Signup error caught:', error);
      const prettyError = (() => {
        try {
          return JSON.stringify(error, Object.getOwnPropertyNames(error));
        } catch {
          return String(error);
        }
      })();
      console.error('Signup error (raw):', error, 'stringified:', prettyError);
      console.error('Error details:', {
        message: error?.message,
        code: error?.code,
        status: error?.status,
        fullError: prettyError
      });
      toast({ variant: 'destructive', title: 'Error', description: error?.message || error?.error_description || 'Failed to create account. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="font-headline text-2xl">Sign Up</CardTitle>
        <CardDescription>Create an account to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField control={form.control} name="role" render={({ field }) => (
              <FormItem>
                <FormLabel>You want to join as *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Select Role" /></SelectTrigger></FormControl>
                  <SelectContent position="item-aligned">
                    <SelectItem value="freelancer">Freelancer (Offer Services)</SelectItem>
                    <SelectItem value="client">Client (Post Tasks)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose **Client** to post tasks and hire. Choose **Freelancer** to offer services and find work.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="name" render={({ field }) => (
              <FormItem><FormLabel>Full Name *</FormLabel><FormControl><Input placeholder="John Doe" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem><FormLabel>Email *</FormLabel><FormControl><Input placeholder="you@example.com" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem><FormLabel>Password *</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} /></FormControl><FormMessage /></FormItem>
            )} />

            {userRole === 'freelancer' && (
              <div className="space-y-4 p-4 border rounded-md">
                 <h3 className="font-semibold">Freelancer Details</h3>
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="Your phone number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Address</FormLabel>
                            <Button type="button" variant="link" size="sm" className="h-auto p-0" onClick={handleDetectLocation} disabled={isDetectingLocation}>
                                 {isDetectingLocation ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <LocateFixed className="h-4 w-4 mr-1" />}
                                 Detect Address
                            </Button>
                        </div>
                        <FormControl><Textarea rows={3} placeholder="Your full address" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="location" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location (Latitude, Longitude)</FormLabel>
                      <FormControl><Input placeholder="e.g., 40.7128, -74.0060" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="skills" render={({ field }) => (
                    <FormItem><FormLabel>Skills</FormLabel><FormControl><Input placeholder="e.g., Web Development, Graphic Design" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="services" render={({ field }) => (
                    <FormItem><FormLabel>Services You Offer</FormLabel><FormControl><Textarea placeholder="Describe services you provide" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField control={form.control} name="experience" render={({ field }) => (
                      <FormItem><FormLabel>Years of Experience</FormLabel><FormControl><Input type="number" placeholder="e.g., 5" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="hourlyRate" render={({ field }) => (
                      <FormItem><FormLabel>Hourly Rate (₹)</FormLabel><FormControl><Input type="number" placeholder="e.g., 2500" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Join Our Freelancer Community</h3>
                    <Button asChild variant="outline" className="h-auto whitespace-normal">
                       <Link href="https://chat.whatsapp.com/KKNWoExT1E18vsHh4Hu6OT" target="_blank">
                          Join Workflow Freelancers on WhatsApp
                       </Link>
                    </Button>
                    <p className="text-sm text-muted-foreground mt-1">Required to receive task notifications</p>
                  </div>
              </div>
            )}
            
            {userRole === 'client' && (
              <div className="space-y-4 p-4 border rounded-md">
                <h3 className="font-semibold">Client Details</h3>
                <FormField control={form.control} name="companyName" render={({ field }) => (
                  <FormItem><FormLabel>Company/Organization Name</FormLabel><FormControl><Input placeholder="e.g., Acme Inc." {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="industry" render={({ field }) => (
                  <FormItem><FormLabel>Industry</FormLabel><FormControl><Input placeholder="e.g., Technology, Construction" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                 <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem><FormLabel>Phone Number</FormLabel><FormControl><Input type="tel" placeholder="Your phone number" {...field} /></FormControl><FormMessage /></FormItem>
                  )} />
                  <FormField control={form.control} name="address" render={({ field }) => (
                    <FormItem>
                        <div className="flex justify-between items-center">
                            <FormLabel>Address</FormLabel>
                            <Button type="button" variant="link" size="sm" className="h-auto p-0" onClick={handleDetectLocation} disabled={isDetectingLocation}>
                                 {isDetectingLocation ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <LocateFixed className="h-4 w-4 mr-1" />}
                                 Detect Address
                            </Button>
                        </div>
                        <FormControl><Textarea rows={3} placeholder="Your full address" {...field} /></FormControl>
                        <FormMessage />
                    </FormItem>
                  )} />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting || !userRole}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Complete Sign Up
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}


function SignupPageContent() {
  return (
    <React.Suspense fallback={
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle className="font-headline text-2xl text-center">Loading...</CardTitle>
            </CardHeader>
             <CardContent>
                <div className="space-y-4">
                    <div className="h-10 bg-muted rounded-md w-full animate-pulse"></div>
                    <div className="h-10 bg-muted rounded-md w-full animate-pulse"></div>
                    <div className="h-10 bg-muted rounded-md w-full animate-pulse"></div>
                    <div className="h-10 bg-muted rounded-md w-full animate-pulse"></div>
                </div>
            </CardContent>
        </Card>
    }>
      <SignupFormComponent />
    </React.Suspense>
  )
}

export default function SignupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 flex items-center justify-center bg-secondary">
        <SignupPageContent />
      </main>
      <Footer />
    </div>
  );
}

    