
'use client';

import { cn } from "@/lib/utils";

type ViewSwitcherProps = {
    activeView: 'professional' | 'quick-jobs';
    setActiveView: (view: 'professional' | 'quick-jobs') => void;
};

export default function ViewSwitcher({ activeView, setActiveView }: ViewSwitcherProps) {
  return (
    <div className="bg-secondary/30 py-3">
        <div className="container">
            <div className="flex flex-col sm:flex-row items-center bg-background p-1 rounded-xl border w-full">
                 <button 
                    onClick={() => setActiveView('professional')}
                    className={cn(
                        "view-switcher-button w-full sm:w-1/2 justify-center",
                        { 'active': activeView === 'professional' }
                    )}
                 >
                    <span>Professional</span>
                </button>
                 <button 
                    onClick={() => setActiveView('quick-jobs')}
                    className={cn(
                        "view-switcher-button w-full sm:w-1/2 justify-center",
                        { 'active': activeView === 'quick-jobs' }
                    )}
                >
                    <span>Quick</span>
                </button>
            </div>
        </div>
    </div>
  );
}
