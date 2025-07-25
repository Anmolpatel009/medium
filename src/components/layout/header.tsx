
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, Briefcase, Users, DollarSign, Calendar, Star, Construction, FileText, UserCheck, MessageSquare } from 'lucide-react';
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


export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();

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
          <span className="font-bold text-2xl font-headline text-primary">
            TalentFlow
          </span>
        </Link>
        
        {renderNavLinks()}

        <div className="hidden lg:flex items-center space-x-2">
           <AuthButtons />
        </div>

        <div className="lg:hidden flex items-center gap-2">
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
                            <span className="font-bold text-2xl font-headline text-primary">TalentFlow</span>
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
