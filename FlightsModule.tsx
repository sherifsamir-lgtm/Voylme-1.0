import { useState } from 'react';
import {
  Plane,
  ArrowLeftRight,
  Calendar,
  Search,
  Check,
  Star,
  Clock,
  Users,
  Armchair,
  ChevronDown,
  Sparkles,
  Radio,
} from 'lucide-react';
import {
  AIRPORTS,
  CABIN_CLASSES,
  FLIGHT_RESULTS,
  type CabinClass,
  type FlightResult,
} from '@/modules-data';

const PRIVATE_JET_IMAGE = 'https://images.pexels.com/photos/20562279/pexels-photo-20562279.jpeg?auto=compress&cs=tinysrgb&w=1200';

function AirportSelector({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (code: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selected = AIRPORTS.find((a) => a.code === value);

  return (
    <div className="relative flex-1">
      <label className="text-[10px] tracking-wider uppercase text-champagne-300/40 mb-1.5 block">{label}</label>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl glass hover:glass-gold-border transition-all duration-300"
      >
        <div className="flex flex-col items-start leading-tight flex-1 min-w-0">
          <span className="text-lg font-serif font-medium text-champagne-100">{value}</span>
          <span className="text-[10px] text-champagne-300/50 truncate">{selected?.city}, {selected?.country}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-champagne-300/40 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute top-full mt-2 left-0 right-0 glass-strong rounded-xl overflow-hidden animate-slide-up z-30 max-h-64 overflow-y-auto">
          {AIRPORTS.map((airport) => (
            <button
              key={airport.code}
              onClick={() => {
                onChange(airport.code);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between px-4 py-2.5 transition-all duration-200 hover:bg-white/5 ${
                airport.code === value ? 'bg-gold-500/10' : ''
              }`}
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-sm font-serif font-medium text-champagne-100 w-10">{airport.code}</span>
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

function SeatPreview({ cabinClass }: { cabinClass: CabinClass }) {
  const seatRows = cabinClass === 'private'
    ? [
        { row: '1', seats: ['available', 'available'] },
        { row: '2', seats: ['available', 'occupied'] },
        { row: '3', seats: ['selected', 'available'] },
      ]
    : cabinClass === 'first'
    ? [
        { row: '1', seats: ['available', 'available', 'available', 'available'] },
        { row: '2', seats: ['occupied', 'available', 'available', 'selected'] },
        { row: '3', seats: ['available', 'available', 'occupied', 'available'] },
      ]
    : [
        { row: '1', seats: ['available', 'occupied', 'available', 'occupied', 'available', 'available'] },
        { row: '2', seats: ['available', 'available', 'selected', 'available', 'occupied', 'available'] },
        { row: '3', seats: ['occupied', 'available', 'available', 'available', 'available', 'occupied'] },
      ];

  const seatColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-white/5 hover:bg-gold-500/20 border-white/10 text-champagne-300/40';
      case 'occupied': return 'bg-burgundy-700/40 border-burgundy-600/30 text-burgundy-300/30 cursor-not-allowed';
      case 'selected': return 'bg-gold-500/30 border-gold-400/40 text-gold-200';
      default: return 'bg-white/5 border-white/10';
    }
  };

  return (
    <div className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Armchair className="w-4 h-4 text-gold-300" />
          <span className="text-xs font-medium tracking-wider uppercase text-champagne-200">Cabin Preview</span>
        </div>
        <span className="text-[10px] text-champagne-300/40 capitalize">{cabinClass === 'private' ? 'Private Jet' : cabinClass + ' Class'}</span>
      </div>

      {/* Aircraft silhouette */}
      <div className="flex flex-col items-center">
        <div className="w-3/4 h-8 rounded-t-full bg-white/3 border-t border-x border-white/8 flex items-center justify-center">
          <span className="text-[8px] tracking-widest text-champagne-300/30 uppercase">Cockpit</span>
        </div>

        <div className="w-full py-4 px-2 flex flex-col gap-2.5 items-center">
          {seatRows.map((row) => (
            <div key={row.row} className="flex items-center gap-2">
              <span className="text-[10px] text-champagne-300/30 w-4 text-right">{row.row}</span>
              <div className={`flex gap-${cabinClass === 'business' ? '2' : '3'}`}>
                {row.seats.map((status, idx) => {
                  const midPoint = Math.ceil(row.seats.length / 2);
                  const showAisle = idx === midPoint;
                  return (
                    <div key={idx} className="flex items-center">
                      {showAisle && <div className="w-3" />}
                      <div
                        className={`w-7 h-7 rounded-lg border flex items-center justify-center transition-all duration-200 ${seatColor(status)}`}
                      >
                        <Armchair className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  );
                })}
              </div>
              <span className="text-[10px] text-champagne-300/30 w-4">{row.row}</span>
            </div>
          ))}
        </div>

        <div className="w-3/4 h-6 rounded-b-full bg-white/3 border-b border-x border-white/8" />
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-4 mt-4 pt-3 border-t border-white/5">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded border border-white/10 bg-white/5" />
          <span className="text-[9px] text-champagne-300/40">Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded border border-gold-400/40 bg-gold-500/30" />
          <span className="text-[9px] text-champagne-300/40">Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded border border-burgundy-600/30 bg-burgundy-700/40" />
          <span className="text-[9px] text-champagne-300/40">Occupied</span>
        </div>
      </div>
    </div>
  );
}

function FlightCard({
  flight,
  cabinClass,
  isSelected,
  onSelect,
}: {
  flight: FlightResult;
  cabinClass: CabinClass;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const cabin = CABIN_CLASSES.find((c) => c.id === cabinClass)!;
  const price = Math.round(flight.basePrice * cabin.multiplier);
  const isPrivate = flight.airlineCode === 'VJ';

  return (
    <div
      onClick={onSelect}
      className={`glass rounded-2xl p-5 cursor-pointer transition-all duration-300 ${
        isSelected ? 'glass-gold-border ring-1 ring-gold-400/30' : 'hover:bg-white/5'
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Airline + Times */}
        <div className="flex items-center gap-4 flex-1">
          <div className="flex flex-col items-center justify-center w-12 h-12 rounded-xl bg-white/5 flex-shrink-0">
            <span className="text-sm font-serif font-bold text-gold-300">{flight.airlineCode}</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-champagne-100">{flight.airline}</span>
              {isPrivate && (
                <span className="px-1.5 py-0.5 rounded text-[8px] tracking-wider uppercase bg-gold-500/15 text-gold-300 font-medium">
                  Private
                </span>
              )}
            </div>
            <span className="text-[10px] text-champagne-300/40">{flight.aircraft}</span>
          </div>
        </div>

        {/* Route */}
        <div className="flex items-center gap-3 md:gap-5 flex-1">
          <div className="text-center">
            <div className="text-lg font-serif font-medium text-champagne-100">{flight.departTime}</div>
          </div>
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-1 text-[10px] text-champagne-300/40">
              <Clock className="w-3 h-3" />
              {flight.duration}
            </div>
            <div className="relative w-full flex items-center my-1">
              <div className="h-px bg-gradient-to-r from-transparent via-gold-400/30 to-transparent flex-1" />
              <Plane className="w-3.5 h-3.5 text-gold-300/50 mx-1" />
              <div className="h-px bg-gradient-to-r from-gold-400/30 via-transparent to-transparent flex-1" />
            </div>
            <div className="text-[10px] text-champagne-300/40">
              {flight.stops === 0 ? 'Direct' : `${flight.stops} stop · ${flight.stopCities.join(', ')}`}
            </div>
          </div>
          <div className="text-center">
            <div className="text-lg font-serif font-medium text-champagne-100">{flight.arriveTime}</div>
          </div>
        </div>

        {/* Price + Select */}
        <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
          <div className="flex flex-col">
            <span className="text-[9px] tracking-wider uppercase text-champagne-300/40">{cabin.label}</span>
            <span className="text-xl font-serif font-medium text-gold-300">
              ${price.toLocaleString()}
            </span>
          </div>
          {isSelected ? (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg glass-gold-border text-[10px] font-medium text-gold-200">
              <Check className="w-3 h-3" />
              Selected
            </div>
          ) : (
            <div className="px-3 py-1.5 rounded-lg glass text-[10px] font-medium text-champagne-300/60">
              {flight.seatsLeft <= 2 ? `${flight.seatsLeft} left` : 'Select'}
            </div>
          )}
        </div>
      </div>

      {/* Amenities */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 border-t border-white/5">
        {flight.amenities.map((amenity) => (
          <span
            key={amenity}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/5 text-[10px] text-champagne-300/60"
          >
            <Sparkles className="w-2.5 h-2.5 text-gold-300/50" />
            {amenity}
          </span>
        ))}
      </div>

      {/* Expanded seat preview */}
      {isSelected && (
        <div className="mt-4 pt-4 border-t border-white/5 animate-slide-up">
          <SeatPreview cabinClass={cabinClass} />

          {isPrivate && (
            <div className="mt-3 rounded-xl overflow-hidden glass">
              <img
                src={PRIVATE_JET_IMAGE}
                alt="Private jet interior"
                className="w-full h-40 object-cover"
              />
            </div>
          )}

          <button className="w-full mt-4 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-gold-border hover:animate-glow-pulse transition-all duration-300">
            <span className="text-sm font-medium text-gold-200">Reserve & Continue</span>
            <ArrowLeftRight className="w-4 h-4 text-gold-300" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function FlightsModule() {
  const [origin, setOrigin] = useState('JFK');
  const [destination, setDestination] = useState('DXB');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState<CabinClass>('first');
  const [selectedFlight, setSelectedFlight] = useState<string | null>('f1');
  const [searched, setSearched] = useState(false);

  const handleSwap = () => {
    setOrigin(destination);
    setDestination(origin);
  };

  const handleSearch = () => setSearched(true);

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl glass-gold-border flex items-center justify-center">
          <Plane className="w-5 h-5 text-gold-300" />
        </div>
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-medium text-champagne-100">Flights</h2>
          <p className="text-xs text-champagne-300/50">Private & first-class aviation, curated</p>
        </div>
      </div>

      {/* Search Panel */}
      <div className="glass rounded-2xl p-5 md:p-6">
        {/* Route */}
        <div className="flex flex-col md:flex-row items-stretch md:items-end gap-3">
          <AirportSelector label="From" value={origin} onChange={setOrigin} />

          <button
            onClick={handleSwap}
            className="self-end p-3 rounded-xl glass hover:glass-gold-border transition-all duration-300 group flex-shrink-0"
            aria-label="Swap origin and destination"
          >
            <ArrowLeftRight className="w-4 h-4 text-champagne-300/60 group-hover:text-gold-300 group-hover:rotate-180 transition-all duration-300" />
          </button>

          <AirportSelector label="To" value={destination} onChange={setDestination} />
        </div>

        {/* Dates + Passengers */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          <div>
            <label className="text-[10px] tracking-wider uppercase text-champagne-300/40 mb-1.5 block">Departure</label>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl glass focus-within:glass-gold-border transition-all duration-300">
              <Calendar className="w-4 h-4 text-champagne-300/40 flex-shrink-0" />
              <input
                type="date"
                value={departDate}
                onChange={(e) => setDepartDate(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-champagne-100 flex-1 [color-scheme:dark]"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] tracking-wider uppercase text-champagne-300/40 mb-1.5 block">Return</label>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl glass focus-within:glass-gold-border transition-all duration-300">
              <Calendar className="w-4 h-4 text-champagne-300/40 flex-shrink-0" />
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="bg-transparent border-none outline-none text-sm text-champagne-100 flex-1 [color-scheme:dark]"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] tracking-wider uppercase text-champagne-300/40 mb-1.5 block">Passengers</label>
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl glass transition-all duration-300">
              <Users className="w-4 h-4 text-champagne-300/40 flex-shrink-0" />
              <button
                onClick={() => setPassengers((p) => Math.max(1, p - 1))}
                className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-champagne-200 text-sm flex items-center justify-center transition-colors"
              >
                –
              </button>
              <span className="text-sm font-medium text-champagne-100 w-6 text-center">{passengers}</span>
              <button
                onClick={() => setPassengers((p) => Math.min(12, p + 1))}
                className="w-6 h-6 rounded-lg bg-white/5 hover:bg-white/10 text-champagne-200 text-sm flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Cabin Class Selection */}
        <div className="mt-4">
          <label className="text-[10px] tracking-wider uppercase text-champagne-300/40 mb-2 block">Cabin Class</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CABIN_CLASSES.map((cabin) => {
              const isActive = cabinClass === cabin.id;
              return (
                <button
                  key={cabin.id}
                  onClick={() => setCabinClass(cabin.id)}
                  className={`text-left p-4 rounded-xl transition-all duration-300 ${
                    isActive ? 'glass-gold-border' : 'glass hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-sm font-medium ${isActive ? 'text-gold-200' : 'text-champagne-100'}`}>
                      {cabin.label}
                    </span>
                    {isActive && <Check className="w-3.5 h-3.5 text-gold-300" />}
                  </div>
                  <p className="text-[10px] text-champagne-300/50 leading-snug">{cabin.description}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full mt-5 flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-gold-border hover:animate-glow-pulse transition-all duration-300"
        >
          <Search className="w-4 h-4 text-gold-300" />
          <span className="text-sm font-medium text-gold-200">Search Available Flights</span>
        </button>
      </div>

      {/* Results */}
      {searched && (
        <div className="animate-slide-up space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 text-gold-300 animate-pulse" />
              <span className="text-xs text-champagne-300/60">
                {FLIGHT_RESULTS.length} flights found · {origin} → {destination}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-gold-300/60" />
              <span className="text-[10px] text-champagne-300/40">Best value first</span>
            </div>
          </div>

          {FLIGHT_RESULTS.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              cabinClass={cabinClass}
              isSelected={selectedFlight === flight.id}
              onSelect={() => setSelectedFlight(flight.id)}
            />
          ))}
        </div>
      )}

      {!searched && (
        <div className="glass rounded-2xl p-8 text-center animate-fade-in">
          <Plane className="w-8 h-8 text-gold-300/30 mx-auto mb-3" />
          <p className="text-sm text-champagne-300/50">
            Search for available flights to see curated options
          </p>
        </div>
      )}
    </div>
  );
}
