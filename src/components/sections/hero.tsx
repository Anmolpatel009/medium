
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="animated-hero-bg text-foreground py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-center">
          
          <div className="text-center md:text-left md:col-span-2">
            <h1 className="text-4xl md:text-5xl font-serif-display font-bold mb-6 text-foreground leading-tight">
              Instantly connect with skilled local freelancers.
            </h1>
            <p className="text-lg md:text-xl max-w-xl mx-auto md:mx-0 mb-8 text-muted-foreground">
             From house cleaning to high-tech, post a task and get instant notifications from top-rated talent in your area. Meet, collaborate, and get the job done faster.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                <Button asChild size="lg">
                    <Link href="/signup">Join Now</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/showall">Show All</Link>
                </Button>
                 <Button asChild size="lg" variant="outline">
                  <Link href="/nearby">Show Nearby</Link>
                </Button>
            </div>
             <p className="text-sm text-muted-foreground mt-4 text-center md:text-left">
                Free estimate &nbsp;•&nbsp; No obligation to hire &nbsp;•&nbsp; 100% risk-free
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-full w-full md:col-span-3">
              {/* Rotating Earth */}
              <div className="relative h-80 w-80">
                  <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg">
                    <div className="h-full w-full earth-bg animate-spin-slow"></div>
                  </div>

                  {/* Skill Nodes */}
                  <div className="absolute top-[20%] left-[50%] h-2 w-2 rounded-full bg-cyan-400 animate-ping-slow"></div>
                  <div className="absolute top-[50%] left-[20%] h-3 w-3 rounded-full bg-red-500 animate-ping-slow animation-delay-300"></div>
                  <div className="absolute top-[70%] left-[70%] h-2 w-2 rounded-full bg-yellow-400 animate-ping-slow animation-delay-500"></div>
                  <div className="absolute top-[30%] left-[80%] h-2 w-2 rounded-full bg-green-400 animate-ping-slow animation-delay-700"></div>
                  <div className="absolute bottom-[15%] right-[40%] h-3 w-3 rounded-full bg-purple-500 animate-ping-slow animation-delay-900"></div>
                   {/* Rotating Text Strip */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-reverse-slow">
                        <defs>
                          <path id="circle" d="M 50, 50 m -46, 0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0"></path>
                        </defs>
                        <text>
                          <textPath xlinkHref="#circle" className="fill-primary-foreground dark:fill-primary font-bold text-[6px] tracking-widest uppercase">
                            Connect with talent across the globe •
                          </textPath>
                        </text>
                      </svg>
                    </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
