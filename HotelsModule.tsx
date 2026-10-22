import { useState } from 'react';
import {
  Star,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Check,
  Waves,
  BellRing,
  Flower2,
  ChefHat,
  Palmtree,
  Wind,
  Film,
  Dumbbell,
  Users,
  Maximize,
  BedDouble,
  ArrowRight,
  CalendarDays,
  Minus,
  Plus,
  type LucideIcon,
} from 'lucide-react';
import { HOTELS, HOTEL_AMENITIES, type Hotel, type HotelRoom } from '@/modules-data';

const AMENITY_ICONS: Record<string, LucideIcon> = {
  Waves,
  BellRing,
  Flower2,
  ChefHat,
  Palmtree,
  Wind,
  Film,
  Dumbbell,
};

function GallerySlider({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };

  return (
    <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden glass">
      {images.map((img, idx) => (
        <div
          key={idx}
          className="absolute inset-0 transition-opacity duration-500"
          style={{ opacity: idx === current ? 1 : 0 }}
        >
          <img src={img} alt={`${name} - view ${idx + 1}`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/60 via-transparent to-transparent" />
        </div>
      ))}

      {/* Controls */}
      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-strong flex items-center justify-center hover:glass-gold-border transition-all duration-300"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4 text-champagne-100" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass-strong flex items-center justify-center hover:glass-gold-border transition-all duration-300"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4 text-champagne-100" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrent(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === current ? 'w-6 bg-gold-300' : 'w-1.5 bg-white/30'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function PricingBreakdown({ room, nights }: { room: HotelRoom; nights: number }) {
  const roomTotal = room.pricePerNight * nights;
  const serviceFee = Math.round(roomTotal * 0.12);
  const taxes = Math.round(roomTotal * 0.08);
  const total = roomTotal + serviceFee + taxes;

  return (
    <div className="glass rounded-2xl p-5 animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium tracking-wider uppercase text-champagne-300/60">Price Breakdown</span>
        <span className="text-[10px] text-champagne-300/40">{nights} night{nights > 1 ? 's' : ''}</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-champagne-100">{room.name}</span>
            <span className="text-[10px] text-champagne-300/40">
              ${room.pricePerNight.toLocaleString()} × {nights}
            </span>
          </div>
          <span className="text-sm font-medium text-champagne-100">${roomTotal.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-xs text-champagne-300/50">Concierge Service Fee (12%)</span>
          <span className="text-sm text-champagne-200">${serviceFee.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-champagne-300/50">Taxes & Fees (8%)</span>
          <span className="text-sm text-champagne-200">${taxes.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <span className="text-sm font-medium text-champagne-100">Total</span>
          <span className="text-2xl font-serif font-medium text-gold-300">${total.toLocaleString()}</span>
        </div>
      </div>

      <button className="w-full mt-5 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl glass-gold-border hover:animate-glow-pulse transition-all duration-300">
        <span className="text-sm font-medium text-gold-200">Reserve Stay</span>
        <ArrowRight className="w-4 h-4 text-gold-300" />
      </button>
    </div>
  );
}

function HotelDetail({ hotel }: { hotel: Hotel }) {
  const [selectedRoom, setSelectedRoom] = useState<HotelRoom>(
    hotel.rooms.find((r) => r.popular) ?? hotel.rooms[0]
  );
  const [nights, setNights] = useState(3);

  return (
    <div className="animate-fade-in space-y-4">
      <GallerySlider images={hotel.images} name={hotel.name} />

      {/* Hotel Info */}
      <div className="glass rounded-2xl p-5">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              {hotel.tag && (
                <span className="px-2.5 py-1 rounded-full glass-gold-border text-[9px] tracking-wider uppercase text-gold-300 font-medium">
                  {hotel.tag}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 text-gold-300 fill-gold-300/30" />
                <span className="text-xs font-medium text-champagne-100">{hotel.rating.toFixed(1)}</span>
                <span className="text-[10px] text-champagne-300/40">({hotel.reviews} reviews)</span>
              </div>
            </div>
            <h2 className="font-serif text-2xl md:text-3xl font-light text-champagne-100">{hotel.name}</h2>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin className="w-3.5 h-3.5 text-gold-300/50" />
              <span className="text-sm text-champagne-300/60">{hotel.location}, {hotel.country}</span>
            </div>
            <p className="text-sm text-champagne-300/50 leading-relaxed mt-3 max-w-lg">{hotel.description}</p>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
          {hotel.amenities.map((amenityId) => {
            const amenity = HOTEL_AMENITIES.find((a) => a.id === amenityId);
            if (!amenity) return null;
            const Icon = AMENITY_ICONS[amenity.icon] ?? Check;
            return (
              <span
                key={amenityId}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 text-[11px] text-champagne-300/70"
              >
                <Icon className="w-3.5 h-3.5 text-gold-300/60" />
                {amenity.label}
              </span>
            );
          })}
        </div>
      </div>

      {/* Nights selector */}
      <div className="glass rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-gold-300/60" />
          <span className="text-sm text-champagne-200">Length of Stay</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setNights((n) => Math.max(1, n - 1))}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <Minus className="w-3.5 h-3.5 text-champagne-200" />
          </button>
          <span className="text-sm font-medium text-champagne-100 w-16 text-center">
            {nights} night{nights > 1 ? 's' : ''}
          </span>
          <button
            onClick={() => setNights((n) => Math.min(30, n + 1))}
            className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-champagne-200" />
          </button>
        </div>
      </div>

      {/* Room Tiers */}
      <div>
        <h3 className="text-sm font-medium tracking-wider uppercase text-champagne-300/60 mb-3">
          Select Your Suite
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4">
          {hotel.rooms.map((room) => {
            const isSelected = selectedRoom.id === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`text-left p-5 rounded-2xl transition-all duration-300 relative ${
                  isSelected ? 'glass-gold-border ring-1 ring-gold-400/30' : 'glass hover:bg-white/5'
                }`}
              >
                {room.popular && (
                  <span className="absolute -top-2.5 left-4 px-2 py-0.5 rounded-full glass-gold-border text-[8px] tracking-wider uppercase text-gold-300 font-medium">
                    Popular
                  </span>
                )}
                <div className="flex items-start justify-between mb-3">
                  <h4 className={`font-serif text-lg font-medium ${isSelected ? 'text-gold-200' : 'text-champagne-100'}`}>
                    {room.name}
                  </h4>
                  {isSelected && <Check className="w-4 h-4 text-gold-300 flex-shrink-0" />}
                </div>

                <p className="text-[11px] text-champagne-300/50 leading-relaxed mb-4 min-h-[40px]">
                  {room.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[10px] text-champagne-300/50">
                    <Maximize className="w-3 h-3 text-gold-300/50" />
                    {room.size}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-champagne-300/50">
                    <Users className="w-3 h-3 text-gold-300/50" />
                    Up to {room.maxGuests} guests
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-champagne-300/50">
                    <BedDouble className="w-3 h-3 text-gold-300/50" />
                    {room.beds}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <span className="text-[10px] tracking-wider uppercase text-champagne-300/40">From</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-serif font-medium text-gold-300">
                      ${room.pricePerNight.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-champagne-300/40">/ night</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing Breakdown */}
      <PricingBreakdown room={selectedRoom} nights={nights} />
    </div>
  );
}

export default function HotelsModule() {
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

  const toggleAmenity = (id: string) => {
    setSelectedAmenities((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const filteredHotels = selectedAmenities.length === 0
    ? HOTELS
    : HOTELS.filter((h) => selectedAmenities.every((a) => h.amenities.includes(a)));

  if (selectedHotel) {
    return (
      <div className="animate-fade-in space-y-5">
        {/* Back button */}
        <button
          onClick={() => setSelectedHotel(null)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:glass-gold-border transition-all duration-300"
        >
          <ChevronLeft className="w-4 h-4 text-champagne-300/60" />
          <span className="text-sm text-champagne-200">Back to Properties</span>
        </button>

        <HotelDetail hotel={selectedHotel} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl glass-gold-border flex items-center justify-center">
          <Palmtree className="w-5 h-5 text-gold-300" />
        </div>
        <div>
          <h2 className="font-serif text-xl md:text-2xl font-medium text-champagne-100">Luxury Stays</h2>
          <p className="text-xs text-champagne-300/50">Elite hotels, villas & private estates</p>
        </div>
      </div>

      {/* Amenity Filters */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium tracking-wider uppercase text-champagne-300/60">Filter by Amenities</span>
          {selectedAmenities.length > 0 && (
            <button
              onClick={() => setSelectedAmenities([])}
              className="text-[10px] text-gold-300/70 hover:text-gold-300 transition-colors"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {HOTEL_AMENITIES.map((amenity) => {
            const Icon = AMENITY_ICONS[amenity.icon] ?? Check;
            const isSelected = selectedAmenities.includes(amenity.id);
            return (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                  isSelected
                    ? 'glass-gold-border text-gold-200'
                    : 'glass text-champagne-300/60 hover:text-champagne-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-gold-300' : 'text-champagne-300/50'}`} />
                {amenity.label}
                {isSelected && <Check className="w-3 h-3 text-gold-300" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredHotels.map((hotel, idx) => (
          <button
            key={hotel.id}
            onClick={() => setSelectedHotel(hotel)}
            className="group glass rounded-2xl overflow-hidden text-left hover:glass-gold-border transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both' }}
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-900/80 via-burgundy-900/20 to-transparent" />

              {/* Tag */}
              {hotel.tag && (
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full glass-gold-border text-[9px] tracking-wider uppercase text-gold-300 font-medium">
                  {hotel.tag}
                </span>
              )}

              {/* Rating */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full glass-strong">
                <Star className="w-3 h-3 text-gold-300 fill-gold-300/30" />
                <span className="text-xs font-medium text-champagne-100">{hotel.rating.toFixed(1)}</span>
              </div>

              {/* Name overlay */}
              <div className="absolute bottom-3 left-4 right-4">
                <h3 className="font-serif text-xl font-medium text-champagne-50">{hotel.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-gold-300/70" />
                  <span className="text-xs text-champagne-200/80">{hotel.location}, {hotel.country}</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-4">
              <p className="text-xs text-champagne-300/50 leading-relaxed mb-3 line-clamp-2">
                {hotel.description}
              </p>

              {/* Mini amenities */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {hotel.amenities.slice(0, 4).map((amenityId) => {
                  const amenity = HOTEL_AMENITIES.find((a) => a.id === amenityId);
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
                      ${Math.min(...hotel.rooms.map((r) => r.pricePerNight)).toLocaleString()}
                    </span>
                    <span className="text-[10px] text-champagne-300/40">/ night</span>
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

      {filteredHotels.length === 0 && (
        <div className="glass rounded-2xl p-8 text-center">
          <p className="text-sm text-champagne-300/50">No properties match your selected amenities.</p>
          <button
            onClick={() => setSelectedAmenities([])}
            className="mt-3 text-xs text-gold-300/70 hover:text-gold-300 transition-colors"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
