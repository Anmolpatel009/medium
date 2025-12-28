
'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@/types';
import FreelancerCard from '@/components/freelancer-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Terminal, MapPin, LocateFixed } from 'lucide-react';

// Haversine distance calculation
function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

export default function FreelancerList() {
  const [freelancers, setFreelancers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [detectingLocation, setDetectingLocation] = useState(false);
  const [locationRequested, setLocationRequested] = useState(false);

  const requestLocation = () => {
    if (navigator.geolocation) {
      setDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setUserLocation({ lat, lng });
          setDetectingLocation(false);
          setLocationRequested(true);
        },
        (error) => {
          console.error('Geolocation error:', error);
          setDetectingLocation(false);
          alert('Could not access your location. Please allow location permissions and try again.');
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  useEffect(() => {
    const fetchFreelancers = async () => {
      try {
        const { data, error: err } = await supabase
          .from('users')
          .select('*')
          .eq('role', 'freelancer')
          .order('created_at', { ascending: false });

        if (err) throw err;

        let sortedFreelancers = data as User[];

        // Sort by distance if user location is available
        if (userLocation) {
          sortedFreelancers = sortedFreelancers
            .filter(freelancer => freelancer.location_lat && freelancer.location_lng)
            .map(freelancer => ({
              ...freelancer,
              distance: calculateDistance(
                userLocation.lat,
                userLocation.lng,
                freelancer.location_lat!,
                freelancer.location_lng!
              )
            }))
            .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
        }

        setFreelancers(sortedFreelancers);
        setError(null);
      } catch (err: any) {
        console.error("Error fetching freelancers: ", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (locationRequested) {
      fetchFreelancers();
    }
  }, [userLocation, locationRequested]);

  // Show location input if not requested yet
  if (!locationRequested) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <MapPin className="h-5 w-5" />
            Find Nearby Freelancers
          </CardTitle>
          <p className="text-muted-foreground">Allow location access to find freelancers near you</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={requestLocation} className="w-full" disabled={detectingLocation}>
            {detectingLocation ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full mr-2" />
                Detecting Location...
              </>
            ) : (
              <>
                <LocateFixed className="mr-2 h-4 w-4" />
                Allow Location Access
              </>
            )}
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            We'll use your location to show the nearest freelancers to you.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg space-y-4">
             <div className="flex items-center gap-4">
               <Skeleton className="h-16 w-16 rounded-full" />
               <div className="space-y-2">
                 <Skeleton className="h-6 w-32" />
                 <Skeleton className="h-4 w-24" />
               </div>
             </div>
             <Skeleton className="h-4 w-full" />
             <Skeleton className="h-4 w-3/4" />
             <Skeleton className="h-10 w-full" />
           </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Database Access Error</AlertTitle>
        <AlertDescription>
            <p className="font-semibold">Unable to load freelancers due to database permissions.</p>
            <p className="mt-2">This is likely due to Row Level Security (RLS) policies in Supabase.</p>
            <p className="mt-2">To fix this, run the following SQL in your Supabase SQL Editor:</p>
            <pre className="bg-muted p-2 rounded mt-2 text-sm overflow-x-auto">
              {`CREATE POLICY "Anyone can view freelancer profiles" ON users FOR SELECT USING (role = 'freelancer');`}
            </pre>
            <p className="mt-2">After running this, refresh the page.</p>
            <p className="mt-2 text-xs text-muted-foreground">Error: {error}</p>
        </AlertDescription>
      </Alert>
    );
  }

  if (freelancers.length === 0) {
    return (
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>No Freelancers Found</AlertTitle>
        <AlertDescription>
            <p>No freelancers have signed up yet. Be the first to join!</p>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {userLocation && (
        <div className="text-center">
          <p className="text-muted-foreground">
            Showing freelancers near your location (sorted by distance)
          </p>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {freelancers.map((freelancer) => (
          <FreelancerCard
            key={freelancer.id}
            freelancer={freelancer}
            distance={(freelancer as any).distance}
          />
        ))}
      </div>
    </div>
  );
}
