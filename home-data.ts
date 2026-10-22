import {
  Plane,
  Hotel,
  Car,
  Compass,
  ShieldCheck,
  Ship,
  Award,
  BadgeDollarSign,
  Headphones,
  Lock,
  type LucideIcon,
} from 'lucide-react';
import type { LucideIcon as LucideIconType } from 'lucide-react';

export interface ServiceCard {
  id: string;
  label: string;
  icon: LucideIconType;
  description: string;
}

export const CORE_SERVICES: ServiceCard[] = [
  { id: 'flights', label: 'Flights', icon: Plane, description: 'Private & first-class' },
  { id: 'hotels', label: 'Hotels', icon: Hotel, description: '5-star & villas' },
  { id: 'cars', label: 'Cars', icon: Car, description: 'Supercars & limousines' },
  { id: 'activities', label: 'Activities', icon: Compass, description: 'Curated experiences' },
  { id: 'insurance', label: 'Insurance', icon: ShieldCheck, description: 'Premium coverage' },
  { id: 'yachts', label: 'Yachts', icon: Ship, description: 'Superyacht charters' },
];

export interface TrustBadge {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const TRUST_BADGES: TrustBadge[] = [
  { id: 'partners', label: 'Trusted Partners', icon: Award },
  { id: 'pricing', label: 'Best Prices', icon: BadgeDollarSign },
  { id: 'support', label: '24/7 Support', icon: Headphones },
  { id: 'secure', label: 'Secure Booking', icon: Lock },
];

export interface BottomNavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const BOTTOM_NAV_ITEMS: BottomNavItem[] = [
  { id: 'dashboard', label: 'Home', icon: Compass },
  { id: 'journeys', label: 'My Trips', icon: Plane },
  { id: 'saved', label: 'Saved', icon: Award },
  { id: 'concierge', label: 'Support', icon: Headphones },
  { id: 'profile', label: 'Account', icon: ShieldCheck },
];
