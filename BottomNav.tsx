import { Home, Plane, Bookmark, Headphones, UserCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface BottomNavProps {
  activeModule: string;
  onModuleSelect: (id: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Home', icon: Home },
  { id: 'journeys', label: 'My Trips', icon: Plane },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'concierge', label: 'Support', icon: Headphones },
  { id: 'profile', label: 'Account', icon: UserCircle },
];

export default function BottomNav({ activeModule, onModuleSelect }: BottomNavProps) {
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-strong border-t border-gold-400/10">
      <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onModuleSelect(item.id)}
              className="flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg transition-all duration-300 relative"
            >
              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-400" />
              )}
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isActive ? 'text-gold-300' : 'text-champagne-300/50'
                }`}
              />
              <span
                className={`text-[9px] font-medium tracking-wide transition-colors ${
                  isActive ? 'text-gold-200' : 'text-champagne-300/40'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
