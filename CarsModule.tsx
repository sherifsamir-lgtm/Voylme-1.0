import { useState } from 'react';
import {
  Car as CarIcon,
  Gauge,
  Zap,
  CalendarDays,
  Check,
  MapPin,
  ArrowRight,
  Minus,
  Plus,
  ShieldCheck,
  UserCheck,
  ConciergeBell,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';
import {
  CARS,
  CAR_FEATURES,
  DRIVER_PREFERENCES,
  DELIVERY_LOCATIONS,
  type Car,
} from '@/modules-data';

const FEATURE_ICONS: Record<string, LucideIcon> = {
  chauffeur: UserCheck,
  delivery: MapPin,
  insurance: ShieldCheck,
  concierge: ConciergeBell,
};

function CarDetail({ car }: { car: Car }) {
  const [rentalDays, setRentalDays] = useState(3);
  const [deliveryLocation, setDeliveryLocation] = useState(DELIVERY_LOCATIONS[0]);
  const [pickupLocation, setPickupLocation] = useState(DELIVERY_LOCATIONS[1]);
  const [selectedDrivers, setSelectedDrivers] = useState<string[]>(['professional']);
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [pickupOpen, setPickupOpen] = useState(false);

  const rentalTotal = car.dailyRate * rentalDays;
  const insuranceTotal = car.insurancePerDay * rentalDays;
  const deliveryFee = deliveryLocation === 'Custom Address' ? 250 : 150;
  const grandTotal = rentalTotal + insuranceTotal + deliveryFee;

  const toggleDriver = (id: string) => {
    setSelectedDrivers((prev) =>
      prev.includes(id) ? prev.filter((d) => d !== id) : [...prev, id]
    );
  };

  const specs = [
    { icon: CalendarDays, label: 'Year', value: `${car.year}` },
    { icon: Gauge, label: 'Top Speed', value: car.topSpeed },
    { icon: Zap, label: 'Power', value: car.horsepower },
    { icon: CarIcon, label: 'Transmission', value: car.transmission },
  ];

  return (
    <div className="animate-fade-in space-y-5">
      {/* Hero image */}
      <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden glass">
        <img src={car.image} alt={`${car.brand} ${car.model}`} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/80 via-transparent to-transparent" />

        {car.tag && (
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass-gold-border text-[10px] tracking-wider uppercase text-gold-300 font-medium">
            {car.tag}
          </span>
        )}

        <div className="absolute bottom-4 left-5 right-5">
          <h2 className="font-serif text-2xl md:text-3xl font-light text-champagne-50">{car.brand} {car.model}</h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm text-champagne-200/80">{car.category}</span>
            <span className="text-xs text-champagne-300/40">·</span>
            <span className="text-sm text-champagne-200/80">{car.color}</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="glass rounded-2xl p-5">
        <p className="text-sm text-champagne-300/60 leading-relaxed">{car.description}</p>
      </div>

      {/* Specs */}
      <div>
        <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-300/60 mb-3">Specifications</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
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

      {/* Features */}
      <div>
        <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-300/60 mb-3">Included Features</h3>
        <div className="flex flex-wrap gap-2">
          {car.features.map((featureId) => {
            const feature = CAR_FEATURES.find((f) => f.id === featureId);
            if (!feature) return null;
            const Icon = FEATURE_ICONS[feature.icon] ?? Check;
            return (
              <span
                key={featureId}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl glass text-xs text-champagne-300/70"
              >
                <Icon className="w-4 h-4 text-gold-300/60" />
                {feature.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Rental Duration */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-gold-300" />
            <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-200">Rental Duration</h3>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setRentalDays((d) => Math.max(1, d - 1))}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Minus className="w-3.5 h-3.5 text-champagne-200" />
            </button>
            <span className="text-sm font-medium text-champagne-100 w-20 text-center">
              {rentalDays} day{rentalDays > 1 ? 's' : ''}
            </span>
            <button
              onClick={() => setRentalDays((d) => Math.min(30, d + 1))}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-champagne-200" />
            </button>
          </div>
        </div>
      </div>

      {/* Delivery & Pickup */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="relative">
          <label className="text-[10px] tracking-wider uppercase text-champagne-300/40 mb-1.5 block">Delivery Location</label>
          <button
            onClick={() => setDeliveryOpen((v) => !v)}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl glass hover:glass-gold-border transition-all duration-300"
          >
            <MapPin className="w-4 h-4 text-gold-300/60 flex-shrink-0" />
            <span className="text-sm text-champagne-100 flex-1 text-left">{deliveryLocation}</span>
            <ChevronDown className={`w-4 h-4 text-champagne-300/40 transition-transform ${deliveryOpen ? 'rotate-180' : ''}`} />
          </button>
          {deliveryOpen && (
            <div className="absolute top-full mt-2 left-0 right-0 glass-strong rounded-xl overflow-hidden animate-slide-up z-30 max-h-56 overflow-y-auto">
              {DELIVERY_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setDeliveryLocation(loc);
                    setDeliveryOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-all duration-200 ${
                    loc === deliveryLocation ? 'bg-gold-500/10' : ''
                  }`}
                >
                  <span className="text-sm text-champagne-200">{loc}</span>
                  {loc === deliveryLocation && <Check className="w-3.5 h-3.5 text-gold-300" />}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="text-[10px] tracking-wider uppercase text-champagne-300/40 mb-1.5 block">Pickup Location</label>
          <button
            onClick={() => setPickupOpen((v) => !v)}
            className="w-full flex items-center gap-2 px-4 py-3 rounded-xl glass hover:glass-gold-border transition-all duration-300"
          >
            <MapPin className="w-4 h-4 text-gold-300/60 flex-shrink-0" />
            <span className="text-sm text-champagne-100 flex-1 text-left">{pickupLocation}</span>
            <ChevronDown className={`w-4 h-4 text-champagne-300/40 transition-transform ${pickupOpen ? 'rotate-180' : ''}`} />
          </button>
          {pickupOpen && (
            <div className="absolute top-full mt-2 left-0 right-0 glass-strong rounded-xl overflow-hidden animate-slide-up z-30 max-h-56 overflow-y-auto">
              {DELIVERY_LOCATIONS.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setPickupLocation(loc);
                    setPickupOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-white/5 transition-all duration-200 ${
                    loc === pickupLocation ? 'bg-gold-500/10' : ''
                  }`}
                >
                  <span className="text-sm text-champagne-200">{loc}</span>
                  {loc === pickupLocation && <Check className="w-3.5 h-3.5 text-gold-300" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Driver Preferences (only for chauffeur-driven cars) */}
      {car.features.includes('chauffeur') && (
        <div>
          <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-300/60 mb-3">Driver Preferences</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DRIVER_PREFERENCES.map((pref) => {
              const isSelected = selectedDrivers.includes(pref.id);
              return (
                <button
                  key={pref.id}
                  onClick={() => toggleDriver(pref.id)}
                  className={`text-left p-4 rounded-xl transition-all duration-200 ${
                    isSelected ? 'glass-gold-border' : 'glass hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${isSelected ? 'text-gold-200' : 'text-champagne-100'}`}>
                      {pref.label}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-gold-300" />}
                  </div>
                  <p className="text-[10px] text-champagne-300/50">{pref.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Security Deposit & Insurance */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="w-4 h-4 text-gold-300" />
          <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-200">Insurance & Security</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-gold-300/60" />
              <span className="text-xs text-champagne-300/50">Security Deposit</span>
            </div>
            <span className="text-xl font-serif font-medium text-gold-300">
              ${car.securityDeposit.toLocaleString()}
            </span>
            <p className="text-[10px] text-champagne-300/40 mt-1">Refundable upon vehicle return</p>
          </div>
          <div className="glass rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-gold-300/60" />
              <span className="text-xs text-champagne-300/50">Full Insurance</span>
            </div>
            <span className="text-xl font-serif font-medium text-gold-300">
              ${car.insurancePerDay}<span className="text-sm text-champagne-300/40">/day</span>
            </span>
            <p className="text-[10px] text-champagne-300/40 mt-1">Comprehensive coverage included</p>
          </div>
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-medium tracking-wider uppercase text-champagne-300/60">Rental Summary</span>
          <span className="text-[10px] text-champagne-300/40">{rentalDays} day{rentalDays > 1 ? 's' : ''}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-champagne-100">{car.brand} {car.model}</span>
              <span className="text-[10px] text-champagne-300/40">
                ${car.dailyRate.toLocaleString()}/day × {rentalDays}
              </span>
            </div>
            <span className="text-sm font-medium text-champagne-100">${rentalTotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-xs text-champagne-300/50">Insurance ({car.insurancePerDay}/day)</span>
            <span className="text-sm text-champagne-200">${insuranceTotal.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-champagne-300/50">Delivery to {deliveryLocation}</span>
            <span className="text-sm text-champagne-200">${deliveryFee}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-champagne-300/50">Security Deposit (hold)</span>
            <span className="text-sm text-champagne-200">${car.securityDeposit.toLocaleString()}</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-white/5">
            <span className="text-sm font-medium text-champagne-100">Total</span>
            <span className="text-2xl font-serif font-medium text-gold-300">${grandTotal.toLocaleString()}</span>
          </div>
        </div>

        <button className="w-full mt-5 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-gold-border hover:animate-glow-pulse transition-all duration-300">
          <span className="text-sm font-medium text-gold-200">Confirm Reservation</span>
          <ArrowRight className="w-4 h-4 text-gold-300" />
        </button>
      </div>
    </div>
  );
}

export default function CarsModule() {
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  if (selectedCar) {
    return (
      <div className="animate-fade-in space-y-5">
        <button
          onClick={() => setSelectedCar(null)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:glass-gold-border transition-all duration-300"
        >
          <ArrowRight className="w-4 h-4 text-champagne-300/60 rotate-180" />
          <span className="text-sm text-champagne-200">Back to Fleet</span>
        </button>

        <CarDetail car={selectedCar} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl glass-gold-border flex items-center justify-center">
          <CarIcon className="w-5 h-5 text-gold-300" />
        </div>
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-medium text-champagne-100">Luxury Mobility</h2>
          <p className="text-xs text-champagne-300/50">Supercars, limousines & chauffeur service</p>
        </div>
      </div>

      {/* Car Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CARS.map((car, idx) => (
          <button
            key={car.id}
            onClick={() => setSelectedCar(car)}
            className="group glass rounded-2xl overflow-hidden text-left hover:glass-gold-border transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both' }}
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/80 via-burgundy-900/10 to-transparent" />

              {car.tag && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-gold-border text-[9px] tracking-wider uppercase text-gold-300 font-medium">
                  {car.tag}
                </span>
              )}

              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-serif text-xl font-medium text-champagne-50">{car.brand}</h3>
                <span className="text-sm text-champagne-200/80">{car.model}</span>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="text-center">
                  <Gauge className="w-3.5 h-3.5 text-gold-300/50 mx-auto mb-1" />
                  <span className="text-[10px] text-champagne-300/50 block">Speed</span>
                  <span className="text-xs font-medium text-champagne-100">{car.topSpeed}</span>
                </div>
                <div className="text-center">
                  <Zap className="w-3.5 h-3.5 text-gold-300/50 mx-auto mb-1" />
                  <span className="text-[10px] text-champagne-300/50 block">Power</span>
                  <span className="text-xs font-medium text-champagne-100">{car.horsepower}</span>
                </div>
                <div className="text-center">
                  <CalendarDays className="w-3.5 h-3.5 text-gold-300/50 mx-auto mb-1" />
                  <span className="text-[10px] text-champagne-300/50 block">Year</span>
                  <span className="text-xs font-medium text-champagne-100">{car.year}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {car.features.map((featureId) => {
                  const feature = CAR_FEATURES.find((f) => f.id === featureId);
                  if (!feature) return null;
                  const Icon = FEATURE_ICONS[feature.icon] ?? Check;
                  return (
                    <span
                      key={featureId}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 text-[10px] text-champagne-300/60"
                    >
                      <Icon className="w-3 h-3 text-gold-300/50" />
                      {feature.label}
                    </span>
                  );
                })}
              </div>

              {/* Price + CTA */}
              <div className="flex items-end justify-between pt-3 border-t border-white/5">
                <div>
                  <span className="text-[9px] tracking-wider uppercase text-champagne-300/40">Daily Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-serif font-medium text-gold-300">
                      ${car.dailyRate.toLocaleString()}
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
