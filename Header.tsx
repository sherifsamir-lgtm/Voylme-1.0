import { useState } from 'react';
import { Menu, X, Search, Bell, ChevronDown } from 'lucide-react';
import { MODULES } from '@/modules';
import CurrencyLanguageSelector from '@/components/CurrencyLanguageSelector';
import WingedV from '@/components/WingedV';
import type { Currency, Language } from '@/constants';

interface HeaderProps {
  activeModule: string;
  onModuleSelect: (id: string) => void;
  currency: Currency;
  language: Language;
  onCurrencyChange: (c: Currency) => void;
  onLanguageChange: (l: Language) => void;
}

export default function Header({
  activeModule,
  onModuleSelect,
  currency,
  language,
  onCurrencyChange,
  onLanguageChange,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="flex items-center justify-between px-4 md:px-8 h-16 md:h-20">
          {/* Logo + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5 text-champagne-200" /> : <Menu className="w-5 h-5 text-champagne-200" />}
            </button>

            <div className="flex items-center select-none" aria-label="VOYLME brand">
              <WingedV size={58} className="flex-shrink-0" />
            </div>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                searchFocused ? 'glass-gold-border' : 'glass'
              }`}
            >
              <Search className={`w-4 h-4 transition-colors ${searchFocused ? 'text-gold-300' : 'text-champagne-300/50'}`} />
              <input
                type="text"
                placeholder="Search the platform..."
                className="bg-transparent border-none outline-none text-sm text-champagne-100 placeholder:text-champagne-300/40 flex-1"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <kbd className="hidden lg:block text-[10px] text-champagne-300/40 px-1.5 py-0.5 rounded border border-white/10">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:block">
              <CurrencyLanguageSelector
                currency={currency}
                language={language}
                onCurrencyChange={onCurrencyChange}
                onLanguageChange={onLanguageChange}
              />
            </div>

            <button className="relative p-2 md:p-2.5 rounded-lg glass hover:glass-gold-border transition-all duration-300 group">
              <Bell className="w-4 h-4 md:w-5 md:h-5 text-champagne-200 group-hover:text-gold-300 transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            </button>

            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full glass cursor-pointer hover:glass-gold-border transition-all duration-300">
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gold-400 to-burgundy-400 flex items-center justify-center">
                <span className="text-xs font-semibold text-burgundy-900">A</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xs font-medium text-champagne-100">Alexander</span>
                <span className="text-[10px] text-champagne-300/50">Founder</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-champagne-300/50" />
            </div>
          </div>
        </div>

        {/* Module Navigation Bar - Desktop */}
        <nav className="hidden lg:flex items-center gap-1 px-8 h-12 border-t border-white/5 overflow-x-auto">
          {MODULES.map((mod) => {
            const Icon = mod.icon;
            const isActive = activeModule === mod.id;
            return (
              <button
                key={mod.id}
                onClick={() => onModuleSelect(mod.id)}
                className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-lg transition-all duration-300 whitespace-nowrap ${
                  isActive ? 'glass-gold-border' : 'hover:bg-white/5'
                }`}
              >
                <Icon
                  className={`w-4 h-4 transition-colors module-icon ${
                    isActive ? 'text-gold-300' : 'text-champagne-300/60 group-hover:text-champagne-100'
                  }`}
                />
                <span
                  className={`text-xs font-medium tracking-wide transition-colors ${
                    isActive ? 'text-gold-200' : 'text-champagne-300/70 group-hover:text-champagne-100'
                  }`}
                >
                  {mod.label}
                </span>
                {isActive && (
                  <span className="absolute -bottom-px left-3 right-3 h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Mobile Slide-down Menu */}
        {mobileOpen && (
          <nav className="lg:hidden glass-strong border-t border-white/5 animate-slide-up">
            <div className="px-4 pt-4 pb-2">
              <CurrencyLanguageSelector
                currency={currency}
                language={language}
                onCurrencyChange={onCurrencyChange}
                onLanguageChange={onLanguageChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-2 p-4 pt-2">
              {MODULES.map((mod) => {
                const Icon = mod.icon;
                const isActive = activeModule === mod.id;
                return (
                  <button
                    key={mod.id}
                    onClick={() => {
                      onModuleSelect(mod.id);
                      setMobileOpen(false);
                    }}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                      isActive ? 'glass-gold-border' : 'glass hover:bg-white/5'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 ${
                        isActive ? 'text-gold-300' : 'text-champagne-300/60'
                      }`}
                    />
                    <div className="flex flex-col leading-tight text-left">
                      <span
                        className={`text-sm font-medium ${
                          isActive ? 'text-gold-200' : 'text-champagne-200'
                        }`}
                      >
                        {mod.label}
                      </span>
                      <span className="text-[10px] text-champagne-300/40">{mod.description}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </nav>
        )}
      </header>

      {/* Spacer for fixed header */}
      <div className="h-28 lg:h-32" />
    </>
  );
}
