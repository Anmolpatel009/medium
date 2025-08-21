'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { recommendServicesAction } from '@/app/actions';
import type { RecommendServicesInput } from '@/ai/flows/smart-service-recommender';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  prompt: z.string().min(10, { message: "Please describe what you're looking for in at least 10 characters." }),
});

export default function AiRecommender() {
  const [recommendation, setRecommendation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setRecommendation('');
    try {
      const input: RecommendServicesInput = { prompt: values.prompt };
      const result = await recommendServicesAction(input);
      setRecommendation(result.recommendation);
    } catch (error) {
      console.error('AI recommendation error:', error);
      toast({
        variant: 'destructive',
        title: 'An error occurred',
        description: 'Could not get a recommendation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container">
        <Card className="max-w-3xl mx-auto shadow-lg">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 text-accent">
                <Sparkles className="h-8 w-8" />
                <CardTitle className="font-headline text-3xl">Smart Service Recommender</CardTitle>
            </div>
            <CardDescription className="text-lg">
              Let our AI help you find the perfect service, task, or freelancer.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="prompt"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="e.g., 'a skilled React developer for a short-term project'"
                          {...field}
                          className="text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Getting Recommendation...
                    </>
                  ) : (
                    'Recommend'
                  )}
                </Button>
              </form>
            </Form>

            {(isLoading || recommendation) && (
              <div className="mt-6 border-t pt-6">
                <h3 className="font-semibold text-lg mb-2">Our Recommendation:</h3>
                {isLoading && (
                    <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-3/4 animate-pulse"></div>
                        <div className="h-4 bg-muted rounded w-1/2 animate-pulse"></div>
                    </div>
                )}
                {recommendation && <p className="text-muted-foreground bg-muted/50 p-4 rounded-md">{recommendation}</p>}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
