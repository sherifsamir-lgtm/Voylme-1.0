import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe, Coins } from 'lucide-react';
import { CURRENCIES, LANGUAGES, type Currency, type Language } from '@/constants';

interface CurrencyLanguageSelectorProps {
  currency: Currency;
  language: Language;
  onCurrencyChange: (c: Currency) => void;
  onLanguageChange: (l: Language) => void;
}

export default function CurrencyLanguageSelector({
  currency,
  language,
  onCurrencyChange,
  onLanguageChange,
}: CurrencyLanguageSelectorProps) {
  const [openTab, setOpenTab] = useState<'currency' | 'language' | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenTab(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpenTab(openTab ? null : 'currency')}
        className="flex items-center gap-2.5 px-3 md:px-4 py-2 rounded-full glass hover:glass-gold-border transition-all duration-300 group"
      >
        <Coins className="w-3.5 h-3.5 text-gold-300/70 group-hover:text-gold-300 transition-colors" />
        <span className="text-xs font-medium text-champagne-100">{currency.code}</span>
        <span className="w-px h-3 bg-white/15" />
        <Globe className="w-3.5 h-3.5 text-gold-300/70 group-hover:text-gold-300 transition-colors" />
        <span className="text-xs font-medium text-champagne-100">{language.flag}</span>
        <ChevronDown
          className={`w-3 h-3 text-champagne-300/50 transition-transform duration-300 ${openTab ? 'rotate-180' : ''}`}
        />
      </button>

      {openTab && (
        <div className="absolute right-0 top-full mt-2 w-72 glass-strong rounded-2xl overflow-hidden animate-slide-up z-50">
          {/* Tab Switcher */}
          <div className="flex p-1.5 m-2 gap-1 rounded-xl bg-white/5">
            <button
              onClick={() => setOpenTab('currency')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                openTab === 'currency' ? 'glass-gold-border text-gold-200' : 'text-champagne-300/60 hover:text-champagne-100'
              }`}
            >
              <Coins className="w-3.5 h-3.5" />
              Currency
            </button>
            <button
              onClick={() => setOpenTab('language')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                openTab === 'language' ? 'glass-gold-border text-gold-200' : 'text-champagne-300/60 hover:text-champagne-100'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Language
            </button>
          </div>

          {/* Options List */}
          <div className="max-h-56 overflow-y-auto px-2 pb-2">
            {openTab === 'currency'
              ? CURRENCIES.map((c) => {
                  const selected = c.code === currency.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => {
                        onCurrencyChange(c);
                        setOpenTab(null);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        selected ? 'bg-gold-500/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 text-center text-base font-serif text-gold-300">{c.symbol}</span>
                        <div className="flex flex-col leading-tight text-left">
                          <span className={`text-sm font-medium ${selected ? 'text-gold-200' : 'text-champagne-100'}`}>
                            {c.code}
                          </span>
                          <span className="text-[10px] text-champagne-300/40">{c.name}</span>
                        </div>
                      </div>
                      {selected && <Check className="w-4 h-4 text-gold-300" />}
                    </button>
                  );
                })
              : LANGUAGES.map((l) => {
                  const selected = l.code === language.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => {
                        onLanguageChange(l);
                        setOpenTab(null);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 ${
                        selected ? 'bg-gold-500/10' : 'hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 text-center text-xs font-bold text-gold-300/80">{l.flag}</span>
                        <span className={`text-sm font-medium ${selected ? 'text-gold-200' : 'text-champagne-100'}`}>
                          {l.label}
                        </span>
                      </div>
                      {selected && <Check className="w-4 h-4 text-gold-300" />}
                    </button>
                  );
                })}
          </div>
        </div>
      )}
    </div>
  );
}
