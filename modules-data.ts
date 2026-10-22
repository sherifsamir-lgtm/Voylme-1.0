export interface Airport {
  code: string;
  city: string;
  country: string;
  name: string;
}

export const AIRPORTS: Airport[] = [
  { code: 'JFK', city: 'New York', country: 'USA', name: 'John F. Kennedy International' },
  { code: 'LHR', city: 'London', country: 'UK', name: 'London Heathrow' },
  { code: 'DXB', city: 'Dubai', country: 'UAE', name: 'Dubai International' },
  { code: 'CDG', city: 'Paris', country: 'France', name: 'Charles de Gaulle' },
  { code: 'HND', city: 'Tokyo', country: 'Japan', name: 'Haneda Airport' },
  { code: 'LAX', city: 'Los Angeles', country: 'USA', name: 'Los Angeles International' },
  { code: 'SIN', city: 'Singapore', country: 'Singapore', name: 'Changi Airport' },
  { code: 'ZRH', city: 'Zurich', country: 'Switzerland', name: 'Zurich Airport' },
  { code: 'HKG', city: 'Hong Kong', country: 'China', name: 'Hong Kong International' },
  { code: 'MIA', city: 'Miami', country: 'USA', name: 'Miami International' },
];

export type CabinClass = 'first' | 'business' | 'private';

export interface CabinOption {
  id: CabinClass;
  label: string;
  shortLabel: string;
  description: string;
  multiplier: number;
}

export const CABIN_CLASSES: CabinOption[] = [
  { id: 'first', label: 'First Class', shortLabel: 'First', description: 'Lie-flat suite, personal butler, curated dining', multiplier: 1 },
  { id: 'business', label: 'Business Class', shortLabel: 'Business', description: 'Spacious lie-flat, priority service, fine dining', multiplier: 0.55 },
  { id: 'private', label: 'Private Jet', shortLabel: 'Private', description: 'Exclusive aircraft, bespoke schedule, ultimate privacy', multiplier: 4.5 },
];

export interface FlightResult {
  id: string;
  airline: string;
  airlineCode: string;
  aircraft: string;
  departTime: string;
  arriveTime: string;
  duration: string;
  stops: number;
  stopCities: string[];
  basePrice: number;
  amenities: string[];
  seatsLeft: number;
}

export const FLIGHT_RESULTS: FlightResult[] = [
  {
    id: 'f1',
    airline: 'Emirates',
    airlineCode: 'EK',
    aircraft: 'Airbus A380',
    departTime: '09:30',
    arriveTime: '19:45',
    duration: '7h 15m',
    stops: 0,
    stopCities: [],
    basePrice: 12500,
    amenities: ['Private Suite', 'Shower Spa', 'Onboard Lounge', 'Caviar Service'],
    seatsLeft: 2,
  },
  {
    id: 'f2',
    airline: 'Singapore Airlines',
    airlineCode: 'SQ',
    aircraft: 'Airbus A350',
    departTime: '22:00',
    arriveTime: '08:30+1',
    duration: '8h 30m',
    stops: 0,
    stopCities: [],
    basePrice: 14200,
    amenities: ['Skyroom Suite', 'Book the Cook', 'Laline Pajamas', 'Champagne Bar'],
    seatsLeft: 1,
  },
  {
    id: 'f3',
    airline: 'VOYLME Private',
    airlineCode: 'VJ',
    aircraft: 'Gulfstream G700',
    departTime: 'Flexible',
    arriveTime: 'Flexible',
    duration: '6h 45m',
    stops: 0,
    stopCities: [],
    basePrice: 58000,
    amenities: ['Full Aircraft Privacy', 'Bespoke Catering', 'In-Flight Office', 'Queen Bed'],
    seatsLeft: 12,
  },
  {
    id: 'f4',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    aircraft: 'Boeing 777',
    departTime: '14:15',
    arriveTime: '01:05+1',
    duration: '7h 50m',
    stops: 1,
    stopCities: ['Doha'],
    basePrice: 9800,
    amenities: ['Qsuite', 'Diptyque Amenity Kit', 'On-Demand Dining', 'Lounge Access'],
    seatsLeft: 4,
  },
];

export interface SeatInfo {
  row: string;
  status: 'available' | 'occupied' | 'selected' | 'premium';
  label?: string;
}

export interface Amenity {
  id: string;
  label: string;
  icon: string;
}

export const HOTEL_AMENITIES: Amenity[] = [
  { id: 'pool', label: 'Private Pool', icon: 'Waves' },
  { id: 'butler', label: 'Butler Service', icon: 'BellRing' },
  { id: 'spa', label: 'Spa & Wellness', icon: 'Flower2' },
  { id: 'chef', label: 'Private Chef', icon: 'ChefHat' },
  { id: 'beach', label: 'Beachfront', icon: 'Palmtree' },
  { id: 'heli', label: 'Helipad', icon: 'Wind' },
  { id: 'cinema', label: 'Private Cinema', icon: 'Film' },
  { id: 'gym', label: 'Fitness Center', icon: 'Dumbbell' },
];

export interface HotelRoom {
  id: string;
  name: string;
  description: string;
  size: string;
  maxGuests: number;
  beds: string;
  pricePerNight: number;
  amenities: string[];
  popular?: boolean;
}

export interface Hotel {
  id: string;
  name: string;
  location: string;
  country: string;
  rating: number;
  reviews: number;
  description: string;
  images: string[];
  amenities: string[];
  rooms: HotelRoom[];
  tag?: string;
}

export const HOTELS: Hotel[] = [
  {
    id: 'h1',
    name: 'Villa Aurelia',
    location: 'Amalfi Coast',
    country: 'Italy',
    rating: 5.0,
    reviews: 47,
    description: 'A clifftop private estate overlooking the Tyrrhenian Sea, featuring infinity pools, terraced gardens, and a full estate staff.',
    images: [
      'https://images.pexels.com/photos/19730387/pexels-photo-19730387.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/20814252/pexels-photo-20814252.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/35438899/pexels-photo-35438899.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    amenities: ['pool', 'butler', 'chef', 'spa', 'beach'],
    tag: 'Estate',
    rooms: [
      {
        id: 'h1r1',
        name: 'Garden Suite',
        description: 'Private terrace with Mediterranean garden views, marble bathroom with soaking tub.',
        size: '85 m²',
        maxGuests: 2,
        beds: '1 King Bed',
        pricePerNight: 3200,
        amenities: ['butler', 'spa'],
      },
      {
        id: 'h1r2',
        name: 'Sea View Pavilion',
        description: 'Floor-to-ceiling windows with panoramic sea views, private plunge pool, outdoor lounge.',
        size: '140 m²',
        maxGuests: 3,
        beds: '1 King + 1 Sofa Bed',
        pricePerNight: 5800,
        amenities: ['pool', 'butler', 'chef'],
        popular: true,
      },
      {
        id: 'h1r3',
        name: 'Estate Villa',
        description: 'Exclusive use of the entire clifftop estate with 6 bedrooms, infinity pool, private chef and full staff.',
        size: '780 m²',
        maxGuests: 12,
        beds: '6 Bedrooms',
        pricePerNight: 18500,
        amenities: ['pool', 'butler', 'chef', 'spa', 'beach', 'cinema'],
      },
    ],
  },
  {
    id: 'h2',
    name: 'The Royal Mansour',
    location: 'Marrakech',
    country: 'Morocco',
    rating: 5.0,
    reviews: 92,
    description: 'A palatial riad retreat within the ancient city walls, offering private riads with rooftop pools and personal butlers.',
    images: [
      'https://images.pexels.com/photos/15531325/pexels-photo-15531325.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/38891222/pexels-photo-38891222.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/18320915/pexels-photo-18320915.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    amenities: ['pool', 'butler', 'spa', 'chef'],
    tag: 'Palace',
    rooms: [
      {
        id: 'h2r1',
        name: 'Riad Premier',
        description: 'Traditional Moroccan riad with private courtyard, fountain, and rooftop terrace.',
        size: '120 m²',
        maxGuests: 2,
        beds: '1 King Bed',
        pricePerNight: 2800,
        amenities: ['butler', 'spa'],
      },
      {
        id: 'h2r2',
        name: 'Riad with Pool',
        description: 'Private riad with rooftop plunge pool, panoramic Atlas Mountain views, butler service.',
        size: '180 m²',
        maxGuests: 4,
        beds: '2 Queen Beds',
        pricePerNight: 4800,
        amenities: ['pool', 'butler', 'spa', 'chef'],
        popular: true,
      },
      {
        id: 'h2r3',
        name: 'Grand Riad Palace',
        description: 'Four-bedroom private riad palace with private hammam, rooftop pool, and dedicated staff of six.',
        size: '520 m²',
        maxGuests: 8,
        beds: '4 Bedrooms',
        pricePerNight: 12000,
        amenities: ['pool', 'butler', 'chef', 'spa', 'cinema'],
      },
    ],
  },
  {
    id: 'h3',
    name: 'Aman Venice',
    location: 'Venice',
    country: 'Italy',
    rating: 4.9,
    reviews: 68,
    description: 'A 16th-century palazzo on the Grand Canal, offering priceless art, private docks, and unparalleled Venetian luxury.',
    images: [
      'https://images.pexels.com/photos/33519320/pexels-photo-33519320.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/6250592/pexels-photo-6250592.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/20740492/pexels-photo-20740492.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
    amenities: ['spa', 'butler', 'chef'],
    tag: 'Palazzo',
    rooms: [
      {
        id: 'h3r1',
        name: 'Canal Suite',
        description: 'Suite with direct Grand Canal views, restored Renaissance frescoes, marble bath.',
        size: '70 m²',
        maxGuests: 2,
        beds: '1 King Bed',
        pricePerNight: 3600,
        amenities: ['butler', 'spa'],
      },
      {
        id: 'h3r2',
        name: 'Palazzo Chamber',
        description: 'Spacious chamber with private terrace, butler service, and access to private dock.',
        size: '110 m²',
        maxGuests: 3,
        beds: '1 King + 1 Sofa Bed',
        pricePerNight: 5400,
        amenities: ['butler', 'spa', 'chef'],
        popular: true,
      },
    ],
  },
];

/* ==================== YACHT MODULE DATA ==================== */

export interface YachtAmenity {
  id: string;
  label: string;
  icon: string;
}

export const YACHT_AMENITIES: YachtAmenity[] = [
  { id: 'helipad', label: 'Helipad', icon: 'Wind' },
  { id: 'jacuzzi', label: 'Jacuzzi', icon: 'Droplets' },
  { id: 'jetski', label: 'Jet Skis', icon: 'Waves' },
  { id: 'submarine', label: 'Submarine', icon: 'Anchor' },
  { id: 'pool', label: 'Infinity Pool', icon: 'Droplet' },
  { id: 'gym', label: 'Gym', icon: 'Dumbbell' },
  { id: 'cinema', label: 'Cinema', icon: 'Film' },
  { id: 'spa', label: 'Spa', icon: 'Flower2' },
];

export interface YachtRoute {
  id: string;
  name: string;
  description: string;
  stops: string[];
  days: number;
}

export const YACHT_ROUTES: YachtRoute[] = [
  {
    id: 'r1',
    name: 'French Riviera',
    description: 'Monaco to Saint-Tropez via Cap Ferrat',
    stops: ['Monaco', 'Nice', 'Cannes', 'Saint-Tropez'],
    days: 7,
  },
  {
    id: 'r2',
    name: 'Greek Islands',
    description: 'Athens to Mykonos via Santorini',
    stops: ['Athens', 'Mykonos', 'Santorini', 'Crete'],
    days: 10,
  },
  {
    id: 'r3',
    name: 'Caribbean Charter',
    description: 'St. Barts to Antigua via St. Lucia',
    stops: ['St. Barts', 'St. Lucia', 'Dominica', 'Antigua'],
    days: 7,
  },
  {
    id: 'r4',
    name: 'Amalfi to Capri',
    description: 'Naples to Capri via Positano',
    stops: ['Naples', 'Sorrento', 'Positano', 'Amalfi', 'Capri'],
    days: 5,
  },
];

export interface Yacht {
  id: string;
  name: string;
  type: string;
  length: string;
  capacity: number;
  crew: number;
  year: number;
  topSpeed: string;
  cabins: number;
  image: string;
  amenities: string[];
  pricePerDay: number;
  description: string;
  tag?: string;
}

export const YACHTS: Yacht[] = [
  {
    id: 'y1',
    name: 'Aurora Borealis',
    type: 'Motor Yacht',
    length: '85m',
    capacity: 12,
    crew: 28,
    year: 2023,
    topSpeed: '18 kn',
    cabins: 6,
    image: 'https://images.pexels.com/photos/10256590/pexels-photo-10256590.jpeg?auto=compress&cs=tinysrgb&w=1200',
    amenities: ['helipad', 'jacuzzi', 'pool', 'gym', 'cinema', 'spa', 'jetski', 'submarine'],
    pricePerDay: 95000,
    description: 'An award-winning 85-meter superyacht featuring a full-beam owner\'s suite, private submarine bay, and certified helipad.',
    tag: 'Flagship',
  },
  {
    id: 'y2',
    name: 'Serena Mare',
    type: 'Sailing Yacht',
    length: '62m',
    capacity: 10,
    crew: 12,
    year: 2022,
    topSpeed: '15 kn',
    cabins: 5,
    image: 'https://images.pexels.com/photos/8299833/pexels-photo-8299833.jpeg?auto=compress&cs=tinysrgb&w=1200',
    amenities: ['jacuzzi', 'pool', 'gym', 'spa', 'jetski'],
    pricePerDay: 52000,
    description: 'A sleek 62-meter sailing yacht combining classic elegance with cutting-edge technology, perfect for eco-conscious charters.',
    tag: 'Sailing',
  },
  {
    id: 'y3',
    name: 'Oceana Royale',
    type: 'Expedition Yacht',
    length: '72m',
    capacity: 14,
    crew: 18,
    year: 2024,
    topSpeed: '16 kn',
    cabins: 7,
    image: 'https://images.pexels.com/photos/13386028/pexels-photo-13386028.jpeg?auto=compress&cs=tinysrgb&w=1200',
    amenities: ['helipad', 'jacuzzi', 'pool', 'gym', 'cinema', 'jetski', 'submarine'],
    pricePerDay: 78000,
    description: 'A go-anywhere expedition yacht with ice-class hull, helicopter landing pad, and state-of-the-art exploration equipment.',
    tag: 'Expedition',
  },
  {
    id: 'y4',
    name: 'Vento del Mare',
    type: 'Motor Yacht',
    length: '55m',
    capacity: 8,
    crew: 9,
    year: 2021,
    topSpeed: '22 kn',
    cabins: 4,
    image: 'https://images.pexels.com/photos/13385973/pexels-photo-13385973.jpeg?auto=compress&cs=tinysrgb&w=1200',
    amenities: ['jacuzzi', 'pool', 'gym', 'jetski'],
    pricePerDay: 34000,
    description: 'A fast and stylish 55-meter yacht built for Mediterranean cruising, featuring a spacious sun deck and beach club.',
    tag: 'Sport',
  },
];

/* ==================== CAR MODULE DATA ==================== */

export interface CarAmenity {
  id: string;
  label: string;
  icon: string;
}

export const CAR_FEATURES: CarAmenity[] = [
  { id: 'chauffeur', label: 'Chauffeur Included', icon: 'UserCheck' },
  { id: 'delivery', label: 'Delivery Available', icon: 'MapPin' },
  { id: 'insurance', label: 'Full Insurance', icon: 'ShieldCheck' },
  { id: 'concierge', label: 'Roadside Concierge', icon: 'ConciergeBell' },
];

export interface Car {
  id: string;
  brand: string;
  model: string;
  category: string;
  year: number;
  image: string;
  color: string;
  transmission: string;
  topSpeed: string;
  horsepower: string;
  dailyRate: number;
  securityDeposit: number;
  insurancePerDay: number;
  features: string[];
  description: string;
  tag?: string;
}

export const CARS: Car[] = [
  {
    id: 'c1',
    brand: 'Rolls-Royce',
    model: 'Phantom VIII',
    category: 'Luxury Sedan',
    year: 2024,
    image: 'https://images.pexels.com/photos/5046370/pexels-photo-5046370.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'Diamond Black',
    transmission: 'Automatic',
    topSpeed: '250 km/h',
    horsepower: '563 hp',
    dailyRate: 2800,
    securityDeposit: 25000,
    insurancePerDay: 180,
    features: ['chauffeur', 'delivery', 'insurance', 'concierge'],
    description: 'The pinnacle of British luxury, featuring hand-stitched leather, starlight headliner, and the iconic Magic Carpet Ride suspension.',
    tag: 'Chauffeur-Driven',
  },
  {
    id: 'c2',
    brand: 'Lamborghini',
    model: 'Aventador SVJ',
    category: 'Supercar',
    year: 2023,
    image: 'https://images.pexels.com/photos/7391652/pexels-photo-7391652.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'Giallo Inti',
    transmission: '7-Speed ISR',
    topSpeed: '350 km/h',
    horsepower: '759 hp',
    dailyRate: 4200,
    securityDeposit: 50000,
    insurancePerDay: 320,
    features: ['delivery', 'insurance', 'concierge'],
    description: 'A track-bred supercar with naturally aspirated V12, active aerodynamics, and a presence that commands every road.',
    tag: 'Self-Drive',
  },
  {
    id: 'c3',
    brand: 'Ferrari',
    model: 'SF90 Stradale',
    category: 'Hybrid Supercar',
    year: 2024,
    image: 'https://images.pexels.com/photos/12801144/pexels-photo-12801144.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'Rosso Corsa',
    transmission: '8-Speed DCT',
    topSpeed: '340 km/h',
    horsepower: '986 hp',
    dailyRate: 5500,
    securityDeposit: 75000,
    insurancePerDay: 450,
    features: ['delivery', 'insurance', 'concierge'],
    description: 'Ferrari\'s first plug-in hybrid, combining three electric motors with a twin-turbo V8 for nearly 1000 horsepower of pure exhilaration.',
    tag: 'Self-Drive',
  },
  {
    id: 'c4',
    brand: 'Mercedes-Maybach',
    model: 'S680 Limousine',
    category: 'Chauffeur Limousine',
    year: 2024,
    image: 'https://images.pexels.com/photos/9151813/pexels-photo-9151813.jpeg?auto=compress&cs=tinysrgb&w=1200',
    color: 'Obsidian Black',
    transmission: '9-Speed Auto',
    topSpeed: '250 km/h',
    horsepower: '612 hp',
    dailyRate: 2200,
    securityDeposit: 20000,
    insurancePerDay: 150,
    features: ['chauffeur', 'delivery', 'insurance', 'concierge'],
    description: 'The ultimate chauffeur-driven limousine with reclining executive seats, massaging functions, rear champagne cooler, and partition privacy.',
    tag: 'Chauffeur-Driven',
  },
];

export const DRIVER_PREFERENCES = [
  { id: 'professional', label: 'Professional Attire', description: 'Suit & tie, discretion guaranteed' },
  { id: 'multilingual', label: 'Multilingual', description: 'Fluent in 3+ languages' },
  { id: 'security', label: 'Security Trained', description: 'Close protection certified' },
  { id: 'local', label: 'Local Expert', description: 'City knowledge & routing' },
];

export const DELIVERY_LOCATIONS = [
  'Hotel Lobby',
  'Private Residence',
  'Airport Terminal',
  'Yacht Marina',
  'VOYLME Lounge',
  'Custom Address',
];
