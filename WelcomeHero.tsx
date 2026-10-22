import {
  Plane,
  ConciergeBell,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Star,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { CORE_FEATURES, type CoreFeature } from '@/constants';

interface WelcomeHeroProps {
  onBeginOnboarding: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  Plane,
  ConciergeBell,
  Sparkles,
  ShieldCheck,
};

export default function WelcomeHero({ onBeginOnboarding }: WelcomeHeroProps) {
  return (
    <section className="animate-fade-in">
      {/* Hero Panel */}
      <div className="glass rounded-3xl p-6 md:p-10 lg:p-14 mb-6 relative overflow-hidden">
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-gold-500/12 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-gradient-to-tr from-burgundy-400/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col items-center text-center max-w-2xl mx-auto">
          {/* Badge */}
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold-border mb-6 animate-slide-up">
            <Star className="w-3 h-3 text-gold-300 fill-gold-300/30" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-gold-300 font-medium">
              By Invitation Only
            </span>
          </div>

          {/* Brand Title */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-champagne-100 leading-[1.1] mb-3 animate-slide-up" style={{ animationDelay: '60ms', animationFillMode: 'both' }}>
            The Art of
            <br />
            <span className="gold-text font-medium">Extraordinary Living</span>
          </h1>

          {/* Tagline */}
          <p className="text-sm md:text-base lg:text-lg text-champagne-300/60 leading-relaxed max-w-xl mb-8 animate-slide-up" style={{ animationDelay: '120ms', animationFillMode: 'both' }}>
            VOYLME is your private gateway to a curated world of bespoke journeys,
            exclusive experiences, and uncompromising personal service — crafted for those
            who expect the exceptional.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3 animate-slide-up" style={{ animationDelay: '180ms', animationFillMode: 'both' }}>
            <button
              onClick={onBeginOnboarding}
              className="group flex items-center gap-3 px-7 py-4 rounded-2xl glass-gold-border hover:animate-glow-pulse transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <span className="text-sm font-medium text-gold-200">Begin Private Onboarding</span>
              <ArrowRight className="w-4 h-4 text-gold-300 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="flex items-center gap-2 px-6 py-4 rounded-2xl glass text-sm font-medium text-champagne-200 hover:text-champagne-100 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto justify-center">
              <Sparkles className="w-4 h-4 text-gold-300/70" />
              Explore the Platform
            </button>
          </div>

          {/* Trust indicators */}
          <div className="flex items-center gap-5 md:gap-8 mt-10 pt-6 border-t border-white/5 w-full justify-center flex-wrap animate-slide-up" style={{ animationDelay: '240ms', animationFillMode: 'both' }}>
            <div className="flex flex-col items-center gap-1">
              <span className="font-serif text-2xl md:text-3xl font-medium text-champagne-100">2,400+</span>
              <span className="text-[10px] tracking-wider uppercase text-champagne-300/40">Curated Experiences</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center gap-1">
              <span className="font-serif text-2xl md:text-3xl font-medium text-champagne-100">180</span>
              <span className="text-[10px] tracking-wider uppercase text-champagne-300/40">Destinations</span>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex flex-col items-center gap-1">
              <span className="font-serif text-2xl md:text-3xl font-medium text-champagne-100">24/7</span>
              <span className="text-[10px] tracking-wider uppercase text-champagne-300/40">Concierge</span>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
        {CORE_FEATURES.map((feature: CoreFeature, idx: number) => {
          const Icon = ICON_MAP[feature.icon] ?? Sparkles;
          return (
            <div
              key={feature.id}
              className="group glass rounded-2xl p-5 md:p-6 hover:glass-gold-border transition-all duration-300 animate-slide-up cursor-default"
              style={{ animationDelay: `${300 + idx * 80}ms`, animationFillMode: 'both' }}
            >
              <div className="w-11 h-11 rounded-xl bg-white/5 group-hover:bg-gradient-to-br group-hover:from-gold-400/30 group-hover:to-burgundy-500/20 flex items-center justify-center mb-4 transition-all duration-300">
                <Icon className="w-5 h-5 text-champagne-300/60 group-hover:text-gold-300 transition-colors" />
              </div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-gold-300/50 font-medium block mb-1">
                {feature.subtitle}
              </span>
              <h3 className="font-serif text-lg font-medium text-champagne-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-xs text-champagne-300/50 leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
