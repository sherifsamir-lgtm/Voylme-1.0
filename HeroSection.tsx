import { useState, useRef, useEffect } from 'react';
import {
  ArrowLeftRight,
  Calendar,
  Search,
  Users,
  ChevronDown,
  Check,
  Star,
  Plane,
  MapPin,
} from 'lucide-react';
import { AIRPORTS } from '@/modules-data';
import { TRUST_BADGES, CORE_SERVICES } from '@/home-data';

const HERO_IMAGE = 'https://images.pexels.com/photos/28772726/pexels-photo-28772726.jpeg?auto=compress&cs=tinysrgb&w=1600';

interface HeroSectionProps {
  onSearch: () => void;
  onServiceSelect: (id: string) => void;
}

function AirportInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = AIRPORTS.find((a) => a.code === value);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative flex-1" ref={ref}>
      <label className="text-[9px] tracking-[0.15em] uppercase text-champagne-300/40 mb-1 block">{label}</label>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-burgundy-900/40 border border-white/8 hover:border-gold-400/30 transition-all duration-300"
      >
        <MapPin className="w-3.5 h-3.5 text-gold-300/60 flex-shrink-0" />
        <div className="flex flex-col items-start leading-tight flex-1 min-w-0 text-left">
          <span className="text-sm font-medium text-champagne-100">{value}</span>
          <span className="text-[10px] text-champagne-300/40 truncate">{selected?.city}</span>
        </div>
        <ChevronDown className={`w-3.5 h-3.5 text-champagne-300/40 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-1.5 left-0 right-0 glass-strong rounded-xl overflow-hidden animate-slide-up z-40 max-h-56 overflow-y-auto">
          {AIRPORTS.map((airport) => (
            <button
              key={airport.code}
              onClick={() => {
                onChange(airport.code);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-3 py-2.5 hover:bg-white/5 transition-all duration-200 ${
                airport.code === value ? 'bg-gold-500/10' : ''
              }`}
            >
              <div className="flex items-center gap-2.5 text-left">
                <span className="text-sm font-serif font-medium text-champagne-100 w-9">{airport.code}</span>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs text-champagne-200">{airport.city}</span>
                  <span className="text-[10px] text-champagne-300/40">{airport.country}</span>
                </div>
              </div>
              {airport.code === value && <Check className="w-3.5 h-3.5 text-gold-300" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HeroSection({ onSearch, onServiceSelect }: HeroSectionProps) {
  const [tripType, setTripType] = useState<'round' | 'oneway'>('round');
  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('DXB');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  return (
    <section className="animate-fade-in">
      {/* Cinematic Hero Banner */}
      <div className="relative w-full h-[420px] md:h-[500px] lg:h-[560px] rounded-3xl overflow-hidden mb-6">
        {/* Background image */}
        <img
          src={HERO_IMAGE}
          alt="Luxury private jet at sunset"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Burgundy gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-burgundy-500/70 via-burgundy-700/60 to-burgundy-900/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/90 via-transparent to-burgundy-900/30" />

        {/* Hero text */}
        <div className="absolute top-0 left-0 right-0 p-6 md:p-10 lg:p-14 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 animate-slide-up">
            <Star className="w-3 h-3 text-gold-300 fill-gold-300/30" />
            <span className="text-[10px] tracking-[0.25em] uppercase text-gold-300 font-medium">
              By Invitation Only
            </span>
            <Star className="w-3 h-3 text-gold-300 fill-gold-300/30" />
          </div>
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-light text-champagne-50 leading-[1.1] animate-slide-up" style={{ animationDelay: '60ms', animationFillMode: 'both' }}>
            The Art of
            <br />
            <span className="gold-text font-medium">Extraordinary Living</span>
          </h1>
          <p className="text-sm md:text-base text-champagne-200/70 mt-3 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
            Your private gateway to bespoke journeys, exclusive experiences, and uncompromising service.
          </p>
        </div>

        {/* Search Card Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6">
          <div className="glass-strong rounded-2xl p-4 md:p-6 max-w-4xl mx-auto animate-slide-up" style={{ animationDelay: '200ms', animationFillMode: 'both' }}>
            {/* Trip type tabs */}
            <div className="flex items-center gap-1.5 mb-4">
              <button
                onClick={() => setTripType('round')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  tripType === 'round' ? 'glass-gold-border text-gold-200' : 'glass text-champagne-300/60 hover:text-champagne-100'
                }`}
              >
                Round-trip
              </button>
              <button
                onClick={() => setTripType('oneway')}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                  tripType === 'oneway' ? 'glass-gold-border text-gold-200' : 'glass text-champagne-300/60 hover:text-champagne-100'
                }`}
              >
                One-way
              </button>
            </div>

            {/* Search fields */}
            <div className="flex flex-col md:flex-row items-stretch md:items-end gap-2.5">
              <AirportInput label="From" value={origin} onChange={setOrigin} />

              <button
                onClick={handleSwap}
                className="self-end p-2.5 rounded-xl glass hover:glass-gold-border transition-all duration-300 group flex-shrink-0"
                aria-label="Swap origin and destination"
              >
                <ArrowLeftRight className="w-4 h-4 text-champagne-300/60 group-hover:text-gold-300 group-hover:rotate-180 transition-all duration-300" />
              </button>

              <AirportInput label="To" value={destination} onChange={setDestination} />

              {/* Depart date */}
              <div className="flex-1 min-w-[120px]">
                <label className="text-[9px] tracking-[0.15em] uppercase text-champagne-300/40 mb-1 block">Departure</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-burgundy-900/40 border border-white/8 hover:border-gold-400/30 transition-all duration-300">
                  <Calendar className="w-3.5 h-3.5 text-gold-300/60 flex-shrink-0" />
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="bg-transparent border-none outline-none text-sm text-champagne-100 flex-1 min-w-0 [color-scheme:dark]"
                  />
                </div>
              </div>

              {/* Return date (only for round-trip) */}
              {tripType === 'round' && (
                <div className="flex-1 min-w-[120px]">
                  <label className="text-[9px] tracking-[0.15em] uppercase text-champagne-300/40 mb-1 block">Return</label>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-burgundy-900/40 border border-white/8 hover:border-gold-400/30 transition-all duration-300">
                    <Calendar className="w-3.5 h-3.5 text-gold-300/60 flex-shrink-0" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      className="bg-transparent border-none outline-none text-sm text-champagne-100 flex-1 min-w-0 [color-scheme:dark]"
                    />
                  </div>
                </div>
              )}

              {/* Passengers */}
              <div className="flex-1 min-w-[120px]">
                <label className="text-[9px] tracking-[0.15em] uppercase text-champagne-300/40 mb-1 block">Passengers</label>
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-burgundy-900/40 border border-white/8 hover:border-gold-400/30 transition-all duration-300">
                  <Users className="w-3.5 h-3.5 text-gold-300/60 flex-shrink-0" />
                  <button
                    onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                    className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 text-champagne-200 text-xs flex items-center justify-center transition-colors"
                  >
                    –
                  </button>
                  <span className="text-sm font-medium text-champagne-100 w-5 text-center">{passengers}</span>
                  <button
                    onClick={() => setPassengers((p) => Math.min(12, p + 1))}
                    className="w-5 h-5 rounded bg-white/5 hover:bg-white/10 text-champagne-200 text-xs flex items-center justify-center transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Search button */}
              <button
                onClick={onSearch}
                className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-burgundy-600 to-burgundy-800 border border-gold-400/30 hover:from-burgundy-500 hover:to-burgundy-700 hover:border-gold-400/50 transition-all duration-300 group"
              >
                <Search className="w-4 h-4 text-gold-300 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium text-gold-200">Search</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        {TRUST_BADGES.map((badge, idx) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.id}
              className="flex items-center gap-2.5 glass rounded-xl px-4 py-3 animate-slide-up"
              style={{ animationDelay: `${300 + idx * 60}ms`, animationFillMode: 'both' }}
            >
              <div className="w-8 h-8 rounded-lg bg-burgundy-700/30 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gold-300/70" />
              </div>
              <span className="text-xs font-medium text-champagne-200">{badge.label}</span>
            </div>
          );
        })}
      </div>

      {/* Core Services Grid */}
      <div className="mb-2">
        <div className="flex items-center gap-2 mb-4">
          <Plane className="w-4 h-4 text-gold-300" />
          <h2 className="text-sm font-medium tracking-[0.15em] uppercase text-champagne-300/60">
            Core Services
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {CORE_SERVICES.map((service, idx) => {
            const Icon = service.icon;
            return (
              <button
                key={service.id}
                onClick={() => onServiceSelect(service.id)}
                className="group relative p-4 md:p-5 rounded-2xl text-left transition-all duration-300 animate-slide-up overflow-hidden"
                style={{
                  animationDelay: `${400 + idx * 60}ms`,
                  animationFillMode: 'both',
                  background: 'linear-gradient(135deg, rgba(102,0,51,0.5) 0%, rgba(38,0,24,0.7) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold-500/0 to-gold-500/0 group-hover:from-gold-500/10 group-hover:to-transparent transition-all duration-300" />

                <div className="relative">
                  <div className="w-10 h-10 md:w-11 md:h-11 rounded-xl bg-white/5 group-hover:bg-gold-500/15 flex items-center justify-center mb-3 transition-all duration-300">
                    <Icon className="w-5 h-5 text-white group-hover:text-gold-300 transition-colors" />
                  </div>
                  <h3 className="text-sm font-medium text-champagne-100 group-hover:text-gold-200 transition-colors">
                    {service.label}
                  </h3>
                  <p className="text-[10px] text-champagne-300/40 mt-0.5 leading-snug">{service.description}</p>
                </div>

                {/* Bottom gold line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400/0 to-transparent group-hover:via-gold-400/50 transition-all duration-500" />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
