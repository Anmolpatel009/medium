

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Briefcase, Users, DollarSign, Calendar, Star, Construction, FileText, UserCheck, MessageSquare, Sun, Moon, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';


const navLinks = [
  { href: '/find-work', label: 'Find Work' },
  { href: '/find-talent', label: 'Find Talent' },
  { href: '/why-talentflow', label: 'Why TalentFlow' },
  { href: '/one-percent-club', label: 'The 1% Club' },
  { href: '/build-together', label: 'Build Together' },
];

const freelancerNav = [
  { href: '/find-work', label: 'Find Jobs & Projects', icon: Briefcase },
  { href: '#', label: 'My Clients', icon: Users },
  { href: '#', label: 'My Projects', icon: FileText },
  { href: '#', label: 'Payments', icon: DollarSign },
  { href: '#', label: 'Schedules', icon: Calendar },
  { href: '/one-percent-club', label: 'The 1% Club', icon: Star },
  { href: '/build-together', label: 'Build Together', icon: Construction },
];

const clientNav = [
  { href: '/dashboard', label: 'My Tasks', icon: FileText },
  { href: '#', label: 'My Freelancers', icon: UserCheck },
  { href: '#', label: 'Payments', icon: DollarSign },
  { href: '#', label: 'Meetups', icon: MessageSquare },
];


const NavLink = ({ href, label, hasDropdown = false, children, onLinkClick }: { href?: string, label: string, hasDropdown?: boolean, children?: React.ReactNode, onLinkClick?: () => void }) => {
    if (href) {
        return (
            <Link href={href} className="group nav-btn flex items-center gap-1 transition-colors hover:text-primary text-foreground/80" onClick={onLinkClick}>
                {label}
            </Link>
        );
    }
    return (
         <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="group nav-btn flex items-center gap-1 transition-colors hover:text-primary text-foreground/80 outline-none">
                    {label}
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
                {children}
            </DropdownMenuContent>
        </DropdownMenu>
    )
};

function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setTheme('light')}
        className={cn('view-switcher-button view-switcher-button-sm', { active: theme === 'light' })}
      >
        <span>Light</span>
      </button>
      <button
        onClick={() => setTheme('dark')}
        className={cn('view-switcher-button view-switcher-button-sm', { active: theme === 'dark' })}
      >
        <span>Dark</span>
      </button>
    </div>
  );
}


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  const isDashboard = pathname.startsWith('/dashboard');

  const AuthButtons = () => {
    if (loading) {
      return (
        <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-20" />
            <Skeleton className="h-9 w-24" />
        </div>
      );
    }

    if (user) {
        return (
            <div className="flex items-center gap-2">
                 <Button variant="outline" size="sm" asChild>
                    <Link href="/dashboard"><LayoutDashboard className="h-4 w-4 mr-1" /> Dashboard</Link>
                </Button>
                <Button size="sm" onClick={logout}>
                    <LogOut className="h-4 w-4 mr-1" /> Log Out
                </Button>
            </div>
        )
    }

    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/signup">Join Now</Link>
            </Button>
        </div>
    )
  }

  const MobileMenuContent = () => {
    // This is a simplified check. In a real app, you might fetch user role.
    // For now, we assume if a user is logged in on the dashboard, we show role-based links.
    // A more robust solution would pass the user's role from the page.
    const navItems = user?.email?.includes('client') ? clientNav : freelancerNav;

    if (isDashboard && user) {
        return (
            <>
                <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium text-foreground/80 hover:bg-accent hover:text-primary"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <item.icon className="h-5 w-5" />
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
                <div className="mt-auto flex flex-col gap-2">
                     <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                        Log Out
                    </Button>
                </div>
            </>
        )
    }

    return (
        <>
            <nav className="flex flex-col gap-6">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-lg font-medium text-foreground/80 hover:text-primary"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {link.label}
                    </Link>
                ))}
                <Link href="/nearby" className="text-lg font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Nearby</Link>
                <Link href="/showall" className="text-lg font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Show All</Link>
                <Link href="/ai-skill-test" className="text-lg font-medium text-foreground/80 hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>AI Skill Test</Link>
            </nav>
            <div className="mt-auto flex flex-col gap-2">
               {loading && <Skeleton className="h-10 w-full" />}
               {!loading && !user && (
                    <>
                        <Button variant="outline" asChild><Link href="/login">Log In</Link></Button>
                        <Button asChild><Link href="/signup">Join Now</Link></Button>
                    </>
               )}
               {!loading && user && (
                    <>
                        <Button variant="outline" asChild><Link href="/dashboard">Dashboard</Link></Button>
                        <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }}>Log Out</Button>
                    </>
               )}
            </div>
        </>
    )
  }

  const renderNavLinks = () => {
    if (isDashboard && user) {
      // Assuming user role is determined by email for now
      const navItems = user.email?.includes('client') ? clientNav : freelancerNav;
      return (
        <nav className="hidden lg:flex items-center space-x-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="group nav-btn flex items-center gap-1 transition-colors hover:text-primary text-foreground/80"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      );
    } else if (!isDashboard) {
      return (
        <nav className="hidden lg:flex items-center space-x-2 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href} label={link.label} />
          ))}
          <NavLink label="Explore" hasDropdown>
            <DropdownMenuItem asChild>
              <Link href="/nearby">Nearby</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/showall">Show All</Link>
            </DropdownMenuItem>
             <DropdownMenuItem asChild>
              <Link href="/ai-skill-test">AI Skill Test</Link>
            </DropdownMenuItem>
          </NavLink>
        </nav>
      );
    }
    return null; // Render nothing if not on dashboard and no user, or other cases
  };

  return (
    <header className="bg-background w-full border-b sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary">
              <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071l9 9a.75.75 0 001.071-1.071l-9-9zM12 3a9 9 0 100 18 9 9 0 000-18zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
            </svg>
            <svg viewBox="0 0 461 103" height="28" className="fill-primary">
                <path d="M72.5 102.5c-2.2 0-4.3-.4-6.3-1.1-2.1-.8-3.9-1.9-5.4-3.5-1.5-1.5-2.7-3.3-3.5-5.4-.8-2-1.1-4.2-1.1-6.3V14.1c0-2.2.4-4.3 1.1-6.3.8-2.1 1.9-3.9 3.5-5.4s3.3-2.7 5.4-3.5c2-.8 4.2-1.1 6.3-1.1h13.2c2.2 0 4.3.4 6.3 1.1 2.1.8 3.9 1.9 5.4 3.5 1.5 1.5 2.7 3.3 3.5 5.4.8 2 1.1 4.2 1.1 6.3v8.8c0 1.9-.3 3.6-1 5.2-.6 1.6-1.5 3-2.6 4.3l17.8 40.2c.9 2.1 1.3 4.4 1.3 6.8v8.8c0 2.2-.4 4.3-1.1 6.3-.8 2.1-1.9 3.9-3.5 5.4-1.5 1.5-3.3 2.7-5.4 3.5-2 .8-4.2 1.1-6.3 1.1H72.5zm13.2-88.4c-1.1 0-2.1-.2-3-.5-.9-.4-1.7-.9-2.4-1.6s-1.2-.9-1.6-1.6c-.4-.8-.5-1.7-.5-2.7V1.8h-1.5v13.2c0 1-.2 2-.5 2.8-.4.9-.9 1.7-1.6 2.4-.7.7-1.6 1.2-2.5 1.6-.9.4-1.9.5-3 .5h-1.5v30.4h1.5c1.1 0 2.1.2 3 .5.9.4 1.7.9 2.4 1.6.7.7 1.2 1.5 1.6 2.5.4.9.5 1.9.5 3v13.2h1.5V52.5c0-1 .2-2 .5-3 .4-.9.9-1.7 1.6-2.4s1.5-1.2 2.4-1.6c.9-.4 1.9-.5 3-.5h1.5V14.1h-7.6zm-29.3 58c-.9 2.1-1.4 4.3-1.4 6.3v8.8c0 1.1.2 2.1.5 3 .4.9.9 1.7 1.6 2.4.7.7 1.5 1.2 2.4 1.6.9.4 1.9.5 3 .5h13.2c1.1 0 2.1-.2 3-.5s1.7-.9 2.4-1.6c.7-.7 1.2-1.5 1.6-2.4.4-.9.5-1.9.5-3v-8.8c0-2-.4-4.2-1.2-6.2l-14-31.6-13.1 29.5zm70.6-58h14.1v88.4H127V14.1zm41.5 0h14.1v88.4h-14.1V14.1zm60.7 44.2c-2.2 0-4.3-.4-6.3-1.1-2.1-.8-3.9-1.9-5.4-3.5-1.5-1.5-2.7-3.3-3.5-5.4-.8-2-1.1-4.2-1.1-6.3V14.1c0-2.2.4-4.3 1.1-6.3.8-2.1 1.9-3.9 3.5-5.4s3.3-2.7 5.4-3.5c2-.8 4.2-1.1 6.3-1.1h29.3c2.2 0 4.3.4 6.3 1.1 2.1.8 3.9 1.9 5.4 3.5 1.5 1.5 2.7 3.3 3.5 5.4.8 2 1.1 4.2 1.1 6.3v13.2h-14.1V29c0-1-.2-2-.5-3-.4-.9-.9-1.7-1.6-2.4-.7-.7-1.5-1.2-2.4-1.6-.9-.4-1.9-.5-3-.5h-13.2c-1.1 0-2.1.2-3 .5-.9.4-1.7.9-2.4 1.6-.7.7-1.2 1.5-1.6 2.4-.4.9-.5 2-.5 3v58c0 1 .2 2 .5 3 .4.9.9 1.7 1.6 2.4.7.7 1.5 1.2 2.4 1.6.9.4 1.9.5 3 .5h13.2c1.1 0 2.1-.2 3-.5.9-.4 1.7-.9 2.4-1.6.7-.7 1.2-1.5 1.6-2.4.4-.9.5-2 .5-3V72.4h14.1v13.2c0 2.2-.4 4.3-1.1 6.3-.8 2.1-1.9 3.9-3.5 5.4-1.5 1.5-3.3 2.7-5.4 3.5-2 .8-4.2 1.1-6.3 1.1h-29.3zm67.1-44.2h14.1v74.2h28.5V14.1h14.1v88.4h-42.6V14.1zM404.1 88.4h14.1V14.1h-14.1v74.2zm-285.4 0h14.1V14.1h-14.1v74.2zm218.4 0h14.1V14.1h-14.1v74.2zm-110.1-44.2c-2.2 0-4.3-.4-6.3-1.1-2.1-.8-3.9-1.9-5.4-3.5-1.5-1.5-2.7-3.3-3.5-5.4-.8-2-1.1-4.2-1.1-6.3V14.1c0-2.2.4-4.3 1.1-6.3.8-2.1 1.9-3.9 3.5-5.4C198.1 1.1 200 .4 202 .1c2-.8 4.2-1.1 6.3-1.1h29.3c2.2 0 4.3.4 6.3 1.1 2.1.8 3.9 1.9 5.4 3.5 1.5 1.5 2.7 3.3 3.5 5.4.8 2 1.1 4.2 1.1 6.3v74.2c0 2.2-.4 4.3-1.1 6.3-.8 2.1-1.9 3.9-3.5 5.4-1.5 1.5-3.3 2.7-5.4 3.5-2 .8-4.2 1.1-6.3 1.1h-29.3zm13.2-12.3c.9.4 1.7.9 2.4 1.6.7.7 1.2 1.5 1.6 2.4.4.9.5 2 .5 3V14.1h-1.5v58c0-1-.2-2-.5-3-.4-.9-.9-1.7-1.6-2.4s-1.5-1.2-2.4-1.6c-.9-.4-1.9-.5-3-.5h-13.2c-1.1 0-2.1.2-3 .5-.9.4-1.7.9-2.4 1.6-.7.7-1.2 1.5-1.6 2.4-.4.9-.5 2-.5 3V14.1h1.5v58c0-1 .2-2 .5-3 .4-.9.9-1.7 1.6-2.4s1.5-1.2 2.4-1.6c.9-.4 1.9-.5 3-.5h13.2zM0 102.5V1.8h14.1v86.6L44.2 1.8h17.9L28.3 88.4V102.5H0zm306.9 0V1.8h14.1v100.7h-14.1zm153.2-44.2c-2.2 0-4.3-.4-6.3-1.1-2.1-.8-3.9-1.9-5.4-3.5-1.5-1.5-2.7-3.3-3.5-5.4-.8-2-1.1-4.2-1.1-6.3V14.1c0-2.2.4-4.3 1.1-6.3.8-2.1 1.9-3.9 3.5-5.4 1.5-1.5 3.3-2.7 5.4-3.5 2-.8 4.2-1.1 6.3-1.1H480c2.2 0 4.3.4 6.3 1.1 2.1.8 3.9 1.9 5.4 3.5s2.7 3.3 3.5 5.4c.8 2 1.1 4.2 1.1 6.3v74.2c0 2.2-.4 4.3-1.1 6.3-.8 2.1-1.9 3.9-3.5 5.4s-3.3 2.7-5.4 3.5c-2 .8-4.2 1.1-6.3 1.1h-20.1zM473 76.1c.9-.4 1.7-.9 2.4-1.6.7-.7 1.2-1.5 1.6-2.4.4-.9.5-2 .5-3V14.1h-1.5v58c0 1-.2 2-.5 3-.4-.9-.9-1.7-1.6 2.4s-1.5 1.2-2.4 1.6c-.9-.4-1.9-.5-3 .5h-13.2c-1.1 0-2.1-.2-3 .5-.9.4-1.7.9-2.4 1.6-.7-.7-1.2-1.5-1.6-2.4-.4-.9-.5-2-.5-3V14.1h1.5v58c0 1 .2 2 .5 3 .4-.9.9-1.7 1.6 2.4s1.5 1.2 2.4 1.6c.9.4 1.9-.5 3 .5h13.2z"></path>
            </svg>
        </Link>
        
        {renderNavLinks()}

        <div className="hidden lg:flex items-center space-x-2">
           <AuthButtons />
           <ThemeToggle />
        </div>

        <div className="lg:hidden flex items-center gap-2">
            <div className="flex items-center">
              <button
                onClick={() => {
                  setTheme(theme === 'light' ? 'dark' : 'light');
                }}
                className="p-2 rounded-full hover:bg-accent"
              >
              <Sun className="h-5 w-5 block dark:hidden" />
              <Moon className="h-5 w-5 hidden dark:block" />
              </button>
            </div>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-full max-w-sm">
                 <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex flex-col h-full">
                    <div className="border-b pb-4">
                        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7 text-primary">
                                <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071 1.071l9 9a.75.75 0 001.071-1.071l-9-9zM12 3a9 9 0 100 18 9 9 0 000-18zM3.75 12a8.25 8.25 0 1116.5 0 8.25 8.25 0 01-16.5 0z" clipRule="evenodd" />
                            </svg>
                           <svg viewBox="0 0 461 103" height="28" className="fill-primary">
                                <path d="M72.5 102.5c-2.2 0-4.3-.4-6.3-1.1-2.1-.8-3.9-1.9-5.4-3.5-1.5-1.5-2.7-3.3-3.5-5.4-.8-2-1.1-4.2-1.1-6.3V14.1c0-2.2.4-4.3 1.1-6.3.8-2.1 1.9-3.9 3.5-5.4s3.3-2.7 5.4-3.5c2-.8 4.2-1.1 6.3-1.1h13.2c2.2 0 4.3.4 6.3 1.1 2.1.8 3.9 1.9 5.4 3.5 1.5 1.5 2.7 3.3 3.5 5.4.8 2 1.1 4.2 1.1 6.3v8.8c0 1.9-.3 3.6-1 5.2-.6 1.6-1.5 3-2.6 4.3l17.8 40.2c.9 2.1 1.3 4.4 1.3 6.8v8.8c0 2.2-.4 4.3-1.1 6.3-.8 2.1-1.9 3.9-3.5 5.4-1.5 1.5-3.3 2.7-5.4 3.5-2 .8-4.2 1.1-6.3 1.1H72.5zm13.2-88.4c-1.1 0-2.1-.2-3-.5-.9-.4-1.7-.9-2.4-1.6s-1.2-.9-1.6-1.6c-.4-.8-.5-1.7-.5-2.7V1.8h-1.5v13.2c0 1-.2 2-.5 2.8-.4.9-.9 1.7-1.6 2.4-.7.7-1.6 1.2-2.5 1.6-.9.4-1.9.5-3 .5h-1.5v30.4h1.5c1.1 0 2.1.2 3 .5.9.4 1.7.9 2.4 1.6.7.7 1.2 1.5 1.6 2.5.4.9.5 1.9.5 3v13.2h1.5V52.5c0-1 .2-2 .5-3 .4-.9.9-1.7 1.6-2.4s1.5-1.2 2.4-1.6c.9-.4 1.9-.5 3-.5h1.5V14.1h-7.6zm-29.3 58c-.9 2.1-1.4 4.3-1.4 6.3v8.8c0 1.1.2 2.1.5 3 .4.9.9 1.7 1.6 2.4.7.7 1.5 1.2 2.4 1.6.9.4 1.9.5 3 .5h13.2c1.1 0 2.1-.2 3-.5s1.7-.9 2.4-1.6c.7-.7 1.2-1.5 1.6-2.4.4-.9.5-1.9.5-3v-8.8c0-2-.4-4.2-1.2-6.2l-14-31.6-13.1 29.5zm70.6-58h14.1v88.4H127V14.1zm41.5 0h14.1v88.4h-14.1V14.1zm60.7 44.2c-2.2 0-4.3-.4-6.3-1.1-2.1-.8-3.9-1.9-5.4-3.5-1.5-1.5-2.7-3.3-3.5-5.4-.8-2-1.1-4.2-1.1-6.3V14.1c0-2.2.4-4.3 1.1-6.3.8-2.1 1.9-3.9 3.5-5.4s3.3-2.7 5.4-3.5c2-.8 4.2-1.1 6.3-1.1h29.3c2.2 0 4.3.4 6.3 1.1 2.1.8 3.9 1.9 5.4 3.5 1.5 1.5 2.7 3.3 3.5 5.4.8 2 1.1 4.2 1.1 6.3v13.2h-14.1V29c0-1-.2-2-.5-3-.4-.9-.9-1.7-1.6-2.4-.7-.7-1.5-1.2-2.4-1.6-.9-.4-1.9-.5-3-.5h-13.2c-1.1 0-2.1.2-3 .5-.9.4-1.7.9-2.4 1.6-.7.7-1.2 1.5-1.6 2.4-.4.9-.5 2-.5 3v58c0 1 .2 2 .5 3 .4.9.9 1.7 1.6 2.4.7.7 1.5 1.2 2.4 1.6.9.4 1.9.5 3 .5h13.2c1.1 0 2.1-.2 3-.5.9-.4 1.7-.9 2.4-1.6.7-.7 1.2-1.5 1.6-2.4.4-.9.5-2 .5-3V72.4h14.1v13.2c0 2.2-.4 4.3-1.1 6.3-.8 2.1-1.9 3.9-3.5 5.4-1.5 1.5-3.3 2.7-5.4 3.5-2 .8-4.2 1.1-6.3 1.1h-29.3zm67.1-44.2h14.1v74.2h28.5V14.1h14.1v88.4h-42.6V14.1zM404.1 88.4h14.1V14.1h-14.1v74.2zm-285.4 0h14.1V14.1h-14.1v74.2zm218.4 0h14.1V14.1h-14.1v74.2zm-110.1-44.2c-2.2 0-4.3-.4-6.3-1.1-2.1-.8-3.9-1.9-5.4-3.5-1.5-1.5-2.7-3.3-3.5-5.4-.8-2-1.1-4.2-1.1-6.3V14.1c0-2.2.4-4.3 1.1-6.3.8-2.1 1.9-3.9 3.5-5.4C198.1 1.1 200 .4 202 .1c2-.8 4.2-1.1 6.3-1.1h29.3c2.2 0 4.3.4 6.3 1.1 2.1.8 3.9 1.9 5.4 3.5 1.5 1.5 2.7 3.3 3.5 5.4.8 2 1.1 4.2 1.1 6.3v74.2c0 2.2-.4 4.3-1.1 6.3-.8 2.1-1.9 3.9-3.5 5.4-1.5 1.5-3.3 2.7-5.4 3.5-2 .8-4.2 1.1-6.3 1.1h-29.3zm13.2-12.3c.9.4 1.7.9 2.4 1.6.7.7 1.2 1.5 1.6 2.4.4.9.5 2 .5 3V14.1h-1.5v58c0-1-.2-2-.5-3-.4-.9-.9-1.7-1.6-2.4s-1.5-1.2-2.4-1.6c-.9-.4-1.9-.5-3-.5h-13.2c-1.1 0-2.1.2-3 .5-.9.4-1.7.9-2.4 1.6-.7.7-1.2 1.5-1.6 2.4-.4.9-.5 2-.5 3V14.1h1.5v58c0-1 .2-2 .5-3 .4-.9.9-1.7 1.6-2.4s1.5-1.2 2.4-1.6c.9-.4 1.9-.5 3-.5h13.2zM0 102.5V1.8h14.1v86.6L44.2 1.8h17.9L28.3 88.4V102.5H0zm306.9 0V1.8h14.1v100.7h-14.1zm153.2-44.2c-2.2 0-4.3-.4-6.3-1.1-2.1-.8-3.9-1.9-5.4-3.5-1.5-1.5-2.7-3.3-3.5-5.4-.8-2-1.1-4.2-1.1-6.3V14.1c0-2.2.4-4.3 1.1-6.3.8-2.1 1.9-3.9 3.5-5.4 1.5-1.5 3.3-2.7 5.4-3.5 2-.8 4.2-1.1 6.3-1.1H480c2.2 0 4.3.4 6.3 1.1 2.1.8 3.9 1.9 5.4 3.5s2.7 3.3 3.5 5.4c.8 2 1.1 4.2 1.1 6.3v74.2c0 2.2-.4 4.3-1.1 6.3-.8 2.1-1.9 3.9-3.5 5.4s-3.3 2.7-5.4 3.5c-2 .8-4.2 1.1-6.3 1.1h-20.1zM473 76.1c.9-.4 1.7-.9 2.4-1.6.7-.7 1.2-1.5 1.6-2.4.4-.9.5-2 .5-3V14.1h-1.5v58c0 1-.2 2-.5 3-.4-.9-.9-1.7-1.6 2.4s-1.5 1.2-2.4 1.6c-.9-.4-1.9-.5-3 .5h-13.2c-1.1 0-2.1-.2-3 .5-.9.4-1.7.9-2.4 1.6-.7-.7-1.2-1.5-1.6-2.4-.4-.9-.5-2-.5-3V14.1h1.5v58c0 1 .2 2 .5 3 .4-.9.9-1.7 1.6 2.4s1.5 1.2 2.4 1.6c.9-.4 1.9-.5 3 .5h13.2z"></path>
                           </svg>
                        </Link>
                    </div>
                    <MobileMenuContent />
                </div>
                </SheetContent>
            </Sheet>
        </div>
      </div>
    </header>
  );
}
