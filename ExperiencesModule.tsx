import { useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  Clock3,
  Crown,
  Gem,
  MapPin,
  ShieldCheck,
  Sparkles,
  Ticket,
  X,
} from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  category: string;
  location: string;
  timing: string;
  description: string;
  image: string;
  spots: string;
  icon: typeof Sparkles;
  includes: string[];
}

const EXPERIENCES: Experience[] = [
  {
    id: 'island-dinner',
    title: 'Private Island Dinner',
    category: 'Culinary theatre',
    location: 'Maldives',
    timing: 'November 18, 2026',
    description: 'A moonlit table for eight on a private sandbank, with a Michelin-starred chef and a champagne pairing selected around the tide.',
    image: 'https://images.pexels.com/photos/5377506/pexels-photo-5377506.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    spots: '1 spot left',
    icon: Sparkles,
    includes: ['Private seaplane transfer', 'Seven-course tasting menu', 'Vintage champagne pairing'],
  },
  {
    id: 'paddock-access',
    title: 'Formula 1 Paddock Access',
    category: 'Motorsport',
    location: 'Monaco Grand Prix',
    timing: 'May 22–24, 2027',
    description: 'Behind-the-scenes access to the Monaco weekend, including team garage tours, pit-lane walk, and a hosted race-day suite.',
    image: 'https://images.pexels.com/photos/12795/pexels-photo-12795.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    spots: '4 places left',
    icon: Ticket,
    includes: ['Three-day hospitality pass', 'Pit-lane walk with host', 'Race-day suite and transfers'],
  },
  {
    id: 'gala-tickets',
    title: 'The Winter Gala',
    category: 'Society',
    location: 'Paris, France',
    timing: 'December 7, 2026',
    description: 'An invitation-only evening inside a private hôtel particulier, pairing contemporary performance with an intimate collector dinner.',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    spots: '2 tables left',
    icon: Crown,
    includes: ['Black-tie reception', 'Collector dinner', 'Private after-hours salon'],
  },
  {
    id: 'art-viewing',
    title: 'Art Private View',
    category: 'Culture',
    location: 'Venice, Italy',
    timing: 'October 3–5, 2026',
    description: 'A private preview of emerging masters during Biennale week, guided by an independent curator before the doors open to the public.',
    image: 'https://images.pexels.com/photos/157811/pexels-photo-157811.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    spots: '3 invitations left',
    icon: Gem,
    includes: ['Curator-led preview', 'Private palazzo aperitivo', 'Collector salon access'],
  },
];

export default function ExperiencesModule() {
  const [selected, setSelected] = useState<Experience | null>(null);
  const [requested, setRequested] = useState<string[]>([]);
  const [requestSent, setRequestSent] = useState(false);

  const submitRequest = () => {
    if (!selected) return;
    setRequested((current) => [...new Set([...current, selected.id])]);
    setRequestSent(true);
  };

  const closeModal = () => {
    setSelected(null);
    setRequestSent(false);
  };

  return (
    <section className="animate-fade-in space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-gold-300 mb-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-[10px] uppercase tracking-[0.25em]">By invitation only</span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl text-champagne-50">Exclusive experiences</h1>
          <p className="mt-2 text-sm text-champagne-300/60 max-w-2xl">Rare access, thoughtfully arranged. Every experience is personally confirmed by your concierge.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-champagne-300/50 glass rounded-full px-4 py-2.5 w-fit">
          <ShieldCheck className="w-4 h-4 text-gold-300" />
          <span>Members receive priority access</span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {EXPERIENCES.map((experience, index) => {
          const Icon = experience.icon;
          const isRequested = requested.includes(experience.id);
          return (
            <article key={experience.id} className="group glass rounded-2xl overflow-hidden hover:glass-gold-border transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 70}ms` }}>
              <div className="relative h-44 overflow-hidden">
                <img src={experience.image} alt={experience.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950 via-burgundy-950/20 to-transparent" />
                <span className="absolute top-3 left-3 rounded-full bg-burgundy-950/80 border border-gold-300/25 px-2.5 py-1 text-[10px] font-medium text-gold-200">{experience.spots}</span>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-champagne-100"><Icon className="w-3.5 h-3.5 text-gold-300" />{experience.category}</div>
              </div>
              <div className="p-4">
                <h2 className="font-serif text-xl text-champagne-50">{experience.title}</h2>
                <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2 text-[10px] text-champagne-300/50">
                  <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3 text-gold-300/70" />{experience.location}</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="w-3 h-3 text-gold-300/70" />{experience.timing}</span>
                </div>
                <p className="text-xs leading-relaxed text-champagne-300/60 mt-3 line-clamp-3">{experience.description}</p>
                <button onClick={() => setSelected(experience)} className="mt-4 flex items-center gap-2 text-xs font-medium text-gold-200 hover:text-gold-100 transition-colors">
                  {isRequested ? <><Check className="w-3.5 h-3.5" />Request sent</> : <>Explore experience <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" /></>}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-burgundy-950/80 backdrop-blur-sm" onMouseDown={closeModal}>
          <div className="glass-strong rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto animate-scale-in" onMouseDown={(event) => event.stopPropagation()}>
            <div className="relative h-52">
              <img src={selected.image} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-burgundy-950 to-transparent" />
              <button onClick={closeModal} aria-label="Close experience details" className="absolute top-4 right-4 p-2 rounded-full bg-burgundy-950/70 text-champagne-100 hover:text-gold-200"><X className="w-4 h-4" /></button>
              <div className="absolute bottom-5 left-6"><p className="text-xs uppercase tracking-[0.2em] text-gold-300">{selected.category}</p><h2 className="font-serif text-3xl text-champagne-50 mt-1">{selected.title}</h2></div>
            </div>
            <div className="p-6">
              {requestSent ? (
                <div className="py-6 text-center"><div className="mx-auto w-12 h-12 rounded-full bg-gold-400/15 flex items-center justify-center"><Check className="w-6 h-6 text-gold-300" /></div><h3 className="font-serif text-2xl text-champagne-50 mt-4">Your request is with concierge</h3><p className="text-sm text-champagne-300/60 mt-2">A member of our team will confirm availability and next steps shortly.</p><button onClick={closeModal} className="mt-5 text-xs text-gold-200 hover:text-gold-100">Return to experiences</button></div>
              ) : (
                <>
                  <p className="text-sm leading-relaxed text-champagne-200/75">{selected.description}</p>
                  <div className="grid sm:grid-cols-3 gap-2 mt-5">{selected.includes.map((item) => <div key={item} className="rounded-xl bg-white/5 border border-white/8 p-3 text-xs text-champagne-200"><Check className="w-3.5 h-3.5 text-gold-300 mb-2" />{item}</div>)}</div>
                  <div className="flex items-center gap-2 mt-5 text-xs text-champagne-300/55"><CalendarDays className="w-4 h-4 text-gold-300/70" />{selected.timing}<span className="text-gold-300/40">·</span>{selected.location}</div>
                  <button onClick={submitRequest} className="w-full mt-6 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 py-3 text-sm font-semibold text-burgundy-950 hover:from-gold-400 hover:to-gold-500 transition-all">Request this experience</button>
                  <p className="text-center text-[10px] text-champagne-300/40 mt-3">Your concierge will confirm pricing and availability before any commitment.</p>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
