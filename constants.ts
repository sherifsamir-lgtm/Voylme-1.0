export interface Currency {
  code: string;
  symbol: string;
  name: string;
}

export interface Language {
  code: string;
  label: string;
  flag: string;
}

export const CURRENCIES: Currency[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
  { code: 'CHF', symbol: '₣', name: 'Swiss Franc' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
  { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
];

export const LANGUAGES: Language[] = [
  { code: 'en', label: 'English', flag: 'EN' },
  { code: 'fr', label: 'Français', flag: 'FR' },
  { code: 'es', label: 'Español', flag: 'ES' },
  { code: 'de', label: 'Deutsch', flag: 'DE' },
  { code: 'it', label: 'Italiano', flag: 'IT' },
  { code: 'ar', label: 'العربية', flag: 'AR' },
  { code: 'ja', label: '日本語', flag: 'JA' },
  { code: 'zh', label: '中文', flag: 'ZH' },
];

export interface CoreFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export const CORE_FEATURES: CoreFeature[] = [
  {
    id: 'journeys',
    title: 'Bespoke Journeys',
    subtitle: 'Curated Travel',
    description: 'Hand-crafted itineraries to the world\'s most extraordinary destinations, tailored to your every desire.',
    icon: 'Plane',
  },
  {
    id: 'concierge',
    title: 'Private Concierge',
    subtitle: '24/7 Assistance',
    description: 'A dedicated lifestyle manager at your service, anytime, anywhere — from last-minute reservations to impossible requests.',
    icon: 'ConciergeBell',
  },
  {
    id: 'experiences',
    title: 'Exclusive Experiences',
    subtitle: 'Members Only',
    description: 'Access to private events, cultural immersions, and once-in-a-lifetime moments unavailable to the public.',
    icon: 'Sparkles',
  },
  {
    id: 'vault',
    title: 'Secure Vault',
    subtitle: 'Encrypted Storage',
    description: 'Bank-grade encrypted storage for your documents, credentials, and sensitive information — always private, always secure.',
    icon: 'ShieldCheck',
  },
];
