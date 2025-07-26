
'use client';

import { Gem, Code, Palette, PenTool, Database, Cloud, BarChart2, Shield, Bot, Video, Mic, Gamepad2, ShoppingCart, MessageSquare, Briefcase, Users, FileText, DollarSign, Calendar, Star, Home, Wrench, Zap, Scissors, Dumbbell, Camera, BookOpen, ChefHat, Dog } from 'lucide-react';

const categories = [
  { name: 'Web Development', icon: Code },
  { name: 'Graphic Design', icon: Palette },
  { name: 'Home Cleaning', icon: Home },
  { name: 'Content Writing', icon: PenTool },
  { name: 'Plumbing Services', icon: Wrench },
  { name: 'AI & Machine Learning', icon: Bot },
  { name: 'Electrician', icon: Zap },
  { name: 'Haircut & Styling', icon: Scissors },
  { name: 'Video Editing', icon: Video },
  { name: 'Personal Training', icon: Dumbbell },
  { name: 'Photography', icon: Camera },
  { name: 'E-commerce Solutions', icon: ShoppingCart },
  { name: 'Tutoring', icon: BookOpen },
  { name: 'Social Media Management', icon: Users },
  { name: 'Cooking & Catering', icon: ChefHat },
  { name: 'Mobile App Development', icon: Gem },
  { name: 'UI/UX Design', icon: Palette },
  { name: 'SEO Optimization', icon: Star },
  { name: 'Pet Services', icon: Dog },
  { name: 'Virtual Assistance', icon: Calendar },
];

export default function CategoryTicker() {
  return (
    <div className="w-full overflow-hidden bg-secondary/50 border-b">
      <div className="scrolling-ticker-container flex">
        <div className="scrolling-ticker">
          {[...categories, ...categories].map((category, index) => (
            <div key={index} className="flex items-center gap-2 px-6 py-2 text-sm text-muted-foreground whitespace-nowrap">
              <category.icon className="h-4 w-4" />
              <span>{category.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
