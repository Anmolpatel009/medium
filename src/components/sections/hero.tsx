
'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-background text-foreground py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="text-center md:text-left">
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

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-full w-full">
              {/* Rotating Earth */}
              <div className="relative h-80 w-80">
                  <div className="absolute inset-0 rounded-full overflow-hidden shadow-lg">
                    <div className="section-banner"></div>
                  </div>

                  {/* Stars for Earth */}
                   <div>
                    <div id="star-1">
                      <div className="curved-corner-star">
                        <div id="curved-corner-bottomright"></div>
                        <div id="curved-corner-bottomleft"></div>
                      </div>
                      <div className="curved-corner-star">
                        <div id="curved-corner-topright"></div>
                        <div id="curved-corner-topleft"></div>
                      </div>
                    </div>

                    <div id="star-2">
                      <div className="curved-corner-star">
                        <div id="curved-corner-bottomright"></div>
                        <div id="curved-corner-bottomleft"></div>
                      </div>
                      <div className="curved-corner-star">
                        <div id="curved-corner-topright"></div>
                        <div id="curved-corner-topleft"></div>
                      </div>
                    </div>

                    <div id="star-3">
                      <div className="curved-corner-star">
                        <div id="curved-corner-bottomright"></div>
                        <div id="curved-corner-bottomleft"></div>
                      </div>
                      <div className="curved-corner-star">
                        <div id="curved-corner-topright"></div>
                        <div id="curved-corner-topleft"></div>
                      </div>
                    </div>

                    <div id="star-4">
                      <div className="curved-corner-star">
                        <div id="curved-corner-bottomright"></div>
                        <div id="curved-corner-bottomleft"></div>
                      </div>
                      <div className="curved-corner-star">
                        <div id="curved-corner-topright"></div>
                        <div id="curved-corner-topleft"></div>
                      </div>
                    </div>

                    <div id="star-5">
                      <div className="curved-corner-star">
                        <div id="curved-corner-bottomright"></div>
                        <div id="curved-corner-bottomleft"></div>
                      </div>
                      <div className="curved-corner-star">
                        <div id="curved-corner-topright"></div>
                        <div id="curved-corner-topleft"></div>
                      </div>
                    </div>

                    <div id="star-6">
                      <div className="curved-corner-star">
                        <div id="curved-corner-bottomright"></div>
                        <div id="curved-corner-bottomleft"></div>
                      </div>
                      <div className="curved-corner-star">
                        <div id="curved-corner-topright"></div>
                        <div id="curved-corner-topleft"></div>
                      </div>
                    </div>

                    <div id="star-7">
                      <div className="curved-corner-star">
                        <div id="curved-corner-bottomright"></div>
                        <div id="curved-corner-bottomleft"></div>
                      </div>
                      <div className="curved-corner-star">
                        <div id="curved-corner-topright"></div>
                        <div id="curved-corner-topleft"></div>
                      </div>
                    </div>
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
              
              {/* Shaking Notification Card */}
              <div className="hero-card animate-tilt-shaking">
                  <div className="notification">
                    <div className="notification-header">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="notification-logo text-blue-400">
                          <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071l9 9a.75.75 0 001.071-1.071l-9-9zM12 3a9 9 0 100 18 9 9 0 000-18zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                      </svg>
                      <span>TalentFlow • now</span>
                    </div>
                    <p className="notification-title">New Task Posted</p>
                    <p className="notification-body">"I need a logo designed for my new coffee shop brand..."</p>
                  </div>
                  <div className="notification payment">
                      <div className="notification-header">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="notification-logo text-green-400">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                        </svg>
                       <span>TalentFlow Payments • 1m ago</span>
                    </div>
                    <p className="notification-title">Payment Received</p>
                    <p className="notification-body">+ ₹12,500.00</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  );
}
