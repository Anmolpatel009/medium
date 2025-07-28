
'use client';

import { cn } from "@/lib/utils";

type ViewSwitcherProps = {
    activeView: 'professional' | 'quick-jobs';
    setActiveView: (view: 'professional' | 'quick-jobs') => void;
};

export default function ViewSwitcher({ activeView, setActiveView }: ViewSwitcherProps) {
  return (
    <div className="bg-background py-3">
        <div className="view-switcher-container">
             <div 
                onClick={() => setActiveView('professional')}
                className={cn( "view-switcher-button", { 'active': activeView === 'professional' })}
             >
                <span>Professional</span>
            </div>
             <div 
                onClick={() => setActiveView('quick-jobs')}
                className={cn( "view-switcher-button", { 'active': activeView === 'quick-jobs' })}
            >
                <span>Quick</span>
            </div>
            <span className={cn(
                "view-switcher-blob", 
                { 'active-professional': activeView === 'professional', 'active-quick': activeView === 'quick-jobs' }
            )}></span>
        </div>
    </div>
  );
}
