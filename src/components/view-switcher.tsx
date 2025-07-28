
'use client';

import { cn } from "@/lib/utils";

type ViewSwitcherProps = {
    activeView: 'professional' | 'quick-jobs';
    setActiveView: (view: 'professional' | 'quick-jobs') => void;
};

export default function ViewSwitcher({ activeView, setActiveView }: ViewSwitcherProps) {
  return (
    <div className="bg-secondary/30 py-4">
        <div className="container flex justify-center">
            <div className="inline-flex items-center bg-background p-1 rounded-xl border">
                 <button 
                    onClick={() => setActiveView('professional')}
                    className={cn(
                        "view-switcher-button",
                        { 'active': activeView === 'professional' }
                    )}
                 >
                    <span>Professional</span>
                </button>
                 <button 
                    onClick={() => setActiveView('quick-jobs')}
                    className={cn(
                        "view-switcher-button",
                        { 'active': activeView === 'quick-jobs' }
                    )}
                >
                    <span>Quick Jobs</span>
                </button>
            </div>
        </div>
    </div>
  );
}
