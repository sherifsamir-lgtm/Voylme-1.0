import {
  LayoutDashboard,
  Plane,
  CalendarCheck,
  ConciergeBell,
  Sparkles,
  Users,
  BarChart3,
  CalendarDays,
  Wallet,
  ShieldCheck,
  MessageSquare,
  Settings,
  UserCircle,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface ModuleConfig {
  id: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  description: string;
}

export const MODULES: ModuleConfig[] = [
  { id: 'dashboard', label: 'Dashboard', shortLabel: 'Home', icon: LayoutDashboard, description: 'Overview & insights' },
  { id: 'journeys', label: 'Journeys', shortLabel: 'Trips', icon: Plane, description: 'Travel itineraries' },
  { id: 'reservations', label: 'Reservations', shortLabel: 'Stays', icon: CalendarCheck, description: 'Bookings & lodgings' },
  { id: 'concierge', label: 'Concierge', shortLabel: 'Assist', icon: ConciergeBell, description: 'Personal assistance' },
  { id: 'experiences', label: 'Experiences', shortLabel: 'Events', icon: Sparkles, description: 'Curated activities' },
  { id: 'members', label: 'Members', shortLabel: 'Club', icon: Users, description: 'Member directory' },
  { id: 'analytics', label: 'Analytics', shortLabel: 'Data', icon: BarChart3, description: 'Performance metrics' },
  { id: 'calendar', label: 'Calendar', shortLabel: 'Dates', icon: CalendarDays, description: 'Schedule & timeline' },
  { id: 'finance', label: 'Finance', shortLabel: 'Money', icon: Wallet, description: 'Billing & accounts' },
  { id: 'vault', label: 'Vault', shortLabel: 'Files', icon: ShieldCheck, description: 'Secure documents' },
  { id: 'communications', label: 'Communications', shortLabel: 'Chat', icon: MessageSquare, description: 'Messages & alerts' },
  { id: 'settings', label: 'Settings', shortLabel: 'Config', icon: Settings, description: 'Preferences' },
  { id: 'profile', label: 'Profile', shortLabel: 'You', icon: UserCircle, description: 'Your account' },
];
