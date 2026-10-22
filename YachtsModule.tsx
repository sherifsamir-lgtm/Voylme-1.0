import { useState } from 'react';
import {
  Ship,
  Users,
  Ruler,
  Gauge,
  BedDouble,
  CalendarDays,
  Check,
  Wind,
  Droplets,
  Waves,
  Anchor,
  Droplet,
  Dumbbell,
  Film,
  Flower2,
  ArrowRight,
  Minus,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import {
  YACHTS,
  YACHT_AMENITIES,
  YACHT_ROUTES,
  type Yacht,
} from '@/modules-data';

const AMENITY_ICONS: Record<string, LucideIcon> = {
  Wind,
  Droplets,
  Waves,
  Anchor,
  Droplet,
  Dumbbell,
  Film,
  Flower2,
};

function YachtDetail({ yacht }: { yacht: Yacht }) {
  const [selectedRoute, setSelectedRoute] = useState(YACHT_ROUTES[0].id);
  const [charterDays, setCharterDays] = useState(7);

  const charterTotal = yacht.pricePerDay * charterDays;
  const crewCost = yacht.crew * 350 * charterDays;
  const provisioning = Math.round(charterTotal * 0.15);
  const fuelCost = Math.round(charterTotal * 0.2);
  const grandTotal = charterTotal + crewCost + provisioning + fuelCost;

  const specs = [
    { icon: Ruler, label: 'Length', value: yacht.length },
    { icon: Users, label: 'Guests', value: `${yacht.capacity}` },
    { icon: Users, label: 'Crew', value: `${yacht.crew}` },
    { icon: BedDouble, label: 'Cabins', value: `${yacht.cabins}` },
    { icon: Gauge, label: 'Top Speed', value: yacht.topSpeed },
    { icon: CalendarDays, label: 'Built', value: `${yacht.year}` },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      {/* Hero image */}
      <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden glass">
        <img src={yacht.image} alt={yacht.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/80 via-transparent to-transparent" />

        {yacht.tag && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass-gold-border text-[10px] tracking-wider uppercase text-gold-300 font-medium">
            {yacht.tag}
          </span>
        )}

        <div className="absolute bottom-4 left-5 right-5">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-champagne-50">{yacht.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Ship className="w-4 h-4 text-gold-300/70" />
            <span className="text-sm text-champagne-200/80">{yacht.type}</span>
            <span className="text-xs text-champagne-300/40">·</span>
            <span className="text-sm text-champagne-200/80">{yacht.length}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="glass rounded-2xl p-5">
        <p className="text-sm text-champagne-300/60 leading-relaxed">{yacht.description}</p>
      </div>

      {/* Specs */}
      <div>
        <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-300/60 mb-3">Specifications</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {specs.map((spec) => {
            const Icon = spec.icon;
            return (
              <div key={spec.label} className="glass rounded-xl p-4 text-center">
                <Icon className="w-5 h-5 text-gold-300/60 mx-auto mb-2" />
                <div className="text-sm font-serif font-medium text-champagne-100">{spec.value}</div>
                <div className="text-[10px] tracking-wider uppercase text-champagne-300/40 mt-0.5">{spec.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-300/60 mb-3">Onboard Amenities</h3>
        <div className="flex flex-wrap gap-2">
          {yacht.amenities.map((amenityId) => {
            const amenity = YACHT_AMENITIES.find((a) => a.id === amenityId);
            if (!amenity) return null;
            const Icon = AMENITY_ICONS[amenity.icon] ?? Check;
            return (
              <span
                key={amenityId}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-xs text-champagne-300/70"
              >
                <Icon className="w-4 h-4 text-gold-300/60" />
                {amenity.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Crew details */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-gold-300" />
          <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-200">Crew Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="glass rounded-xl p-4">
            <span className="text-2xl font-serif font-medium text-gold-300">{yacht.crew}</span>
            <span className="text-xs text-champagne-300/50 block mt-1">Crew Members</span>
          </div>
          <div className="glass rounded-xl p-4">
            <span className="text-sm font-medium text-champagne-100">Licensed Captain</span>
            <span className="text-xs text-champagne-300/50 block mt-1">Master 3,000 GT</span>
          </div>
          <div className="glass rounded-xl p-4">
            <span className="text-sm font-medium text-champagne-100">Private Chef & Sommelier</span>
            <span className="text-xs text-champagne-300/50 block mt-1">Included</span>
          </div>
        </div>
      </div>

      {/* Route/Itinerary Selection */}
      <div>
        <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-300/60 mb-3">Select Itinerary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {YACHT_ROUTES.map((r) => {
            const isSelected = selectedRoute === r.id;
            return (
              <button
                key={r.id}
                onClick={() => {
                  setSelectedRoute(r.id);
                  setCharterDays(r.days);
                }}
                className={`text-left p-4 rounded-2xl transition-all duration-300 ${
                  isSelected ? 'glass-gold-border ring-1 ring-gold-400/30' : 'glass hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${isSelected ? 'text-gold-200' : 'text-champagne-100'}`}>
                    {r.name}
                  </span>
                  {isSelected && <Check className="w-4 h-4 text-gold-300" />}
                </div>
                <p className="text-[11px] text-champagne-300/50 mb-3">{r.description}</p>
                <div className="flex flex-wrap items-center gap-1">
                  {r.stops.map((stop, idx) => (
                    <span key={stop} className="flex items-center gap-1">
                      <span className="text-[10px] text-champagne-300/60">{stop}</span>
                      {idx < r.stops.length - 1 && <span className="text-[10px] text-gold-300/30">→</span>}
                    </span>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[10px] text-champagne-300/40">
                    <CalendarDays className="w-3 h-3 inline mr-1 text-gold-300/50" />
                    {r.days} days
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Charter Duration & Pricing */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gold-300" />
            <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-200">Charter Duration</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCharterDays((d) => Math.max(1, d - 1))}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5 text-champagne-200" />
            </button>
            <span className="text-sm font-medium text-champagne-100 w-20 text-center">
              {charterDays} day{charterDays > 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setCharterDays((d) => Math.min(30, d + 1))}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-champagne-200" />
            </button>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-champagne-100">Charter Fee</span>
              <span className="text-[10px] text-champagne-300/40">
                ${yacht.pricePerDay.toLocaleString()}/day × {charterDays}
              </span>
            </div>
            <span className="text-sm font-medium text-champagne-100">${charterTotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-xs text-champagne-300/50">Crew Wages & Provisions</span>
            <span className="text-sm text-champagne-200">${crewCost.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-champagne-300/50">Provisioning & Catering (15%)</span>
            <span className="text-sm text-champagne-200">${provisioning.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-champagne-300/50">Fuel (20%)</span>
            <span className="text-sm text-champagne-200">${fuelCost.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-sm font-medium text-champagne-100">Total Charter</span>
            <span className="text-2xl font-serif font-medium text-gold-300">${grandTotal.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full mt-5 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-gold-border hover:animate-glow-pulse transition-all duration-300">
          <span className="text-sm font-medium text-gold-200">Reserve Charter</span>
          <ArrowRight className="w-4 h-4 text-gold-300" />
        </button>
      </div>
    </div>
  );
}

export default function YachtsModule() {
  const [selectedYacht, setSelectedYacht] = useState<Yacht | null>(null);

  if (selectedYacht) {
    return (
      <div className="animate-fade-in space-y-5">
        <button
          onClick={() => setSelectedYacht(null)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:glass-gold-border transition-all duration-300"
        >
          <ArrowRight className="w-4 h-4 text-champagne-300/60 rotate-180" />
          <span className="text-sm text-champagne-200">Back to Fleet</span>
        </button>

        <YachtDetail yacht={selectedYacht} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl glass-gold-border flex items-center justify-center">
          <Ship className="w-5 h-5 text-gold-300" />
        </div>
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-medium text-champagne-100">Marine & Yachts</h2>
          <p className="text-xs text-champagne-300/50">Superyacht charters & bespoke itineraries</p>
        </div>
      </div>

      {/* Yacht Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {YACHTS.map((yacht, idx) => (
          <button
            key={yacht.id}
            onClick={() => setSelectedYacht(yacht)}
            className="group glass rounded-2xl overflow-hidden text-left hover:glass-gold-border transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both' }}
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={yacht.image}
                alt={yacht.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/80 via-transparent to-transparent" />

              {yacht.tag && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-gold-border text-[9px] tracking-wider uppercase text-gold-300 font-medium">
                  {yacht.tag}
                </span>
              )}

              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-serif text-xl font-medium text-champagne-50">{yacht.name}</h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-champagne-200/80">{yacht.type}</span>
                  <span className="text-[10px] text-champagne-300/40">·</span>
                  <span className="text-xs text-champagne-200/80">{yacht.length}</span>
                </div>
              </div>
            </div>

            {/* Specs row */}
            <div className="p-4">
              <div className="grid grid-cols-4 gap-2 mb-3">
                <div className="text-center">
                  <Ruler className="w-3.5 h-3.5 text-gold-300/50 mx-auto mb-1" />
                  <span className="text-[10px] text-champagne-300/50 block">Length</span>
                  <span className="text-xs font-medium text-champagne-100">{yacht.length}</span>
                </div>
                <div className="text-center">
                  <Users className="w-3.5 h-3.5 text-gold-300/50 mx-auto mb-1" />
                  <span className="text-[10px] text-champagne-300/50 block">Guests</span>
                  <span className="text-xs font-medium text-champagne-100">{yacht.capacity}</span>
                </div>
                <div className="text-center">
                  <Users className="w-3.5 h-3.5 text-gold-300/50 mx-auto mb-1" />
                  <span className="text-[10px] text-champagne-300/50 block">Crew</span>
                  <span className="text-xs font-medium text-champagne-100">{yacht.crew}</span>
                </div>
                <div className="text-center">
                  <Gauge className="w-3.5 h-3.5 text-gold-300/50 mx-auto mb-1" />
                  <span className="text-[10px] text-champagne-300/50 block">Speed</span>
                  <span className="text-xs font-medium text-champagne-100">{yacht.topSpeed}</span>
                </div>
              </div>

              {/* Key amenities */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {yacht.amenities.slice(0, 5).map((amenityId) => {
                  const amenity = YACHT_AMENITIES.find((a) => a.id === amenityId);
                  if (!amenity) return null;
                  const Icon = AMENITY_ICONS[amenity.icon] ?? Check;
                  return (
                    <span
                      key={amenityId}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-[10px] text-champagne-300/60"
                    >
                      <Icon className="w-3 h-3 text-gold-300/50" />
                      {amenity.label}
                    </span>
                  );
                })}
              </div>

              {/* Price + CTA */}
              <div className="flex items-end justify-between pt-3 border-t border-white/5">
                <div>
                  <span className="text-[9px] tracking-wider uppercase text-champagne-300/40">From</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-serif font-medium text-gold-300">
                      ${yacht.pricePerDay.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-champagne-300/40">/ day</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-champagne-300/60 group-hover:text-gold-300 transition-colors">
                  View Details
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
