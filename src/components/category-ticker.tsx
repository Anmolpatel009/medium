
'use client';

import { Gem, Code, Palette, PenTool, Database, Cloud, BarChart2, Shield, Bot, Video, Mic, Gamepad2, ShoppingCart, MessageSquare, Briefcase, Users, FileText, DollarSign, Calendar, Star } from 'lucide-react';

const categories = [
  { name: 'Web Development', icon: Code },
  { name: 'Graphic Design', icon: Palette },
  { name: 'Content Writing', icon: PenTool },
  { name: 'Database Management', icon: Database },
  { name: 'Cloud Services', icon: Cloud },
  { name: 'Data Analytics', icon: BarChart2 },
  { name: 'Cybersecurity', icon: Shield },
  { name: 'AI & Machine Learning', icon: Bot },
  { name: 'Video Editing', icon: Video },
  { name: 'Voice Over', icon: Mic },
  { name: 'Game Development', icon: Gamepad2 },
  { name: 'E-commerce Solutions', icon: ShoppingCart },
  { name: 'Social Media Management', icon: Users },
  { name: 'Project Management', icon: Briefcase },
  { name: 'Mobile App Development', icon: Gem },
  { name: 'UI/UX Design', icon: Palette },
  { name: 'SEO Optimization', icon: Star },
  { name: 'Legal Services', icon: FileText },
  { name: 'Financial Consulting', icon: DollarSign },
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
