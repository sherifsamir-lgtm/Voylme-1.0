import { useState, useEffect } from 'react';
import {
  X,
  ArrowRight,
  ArrowLeft,
  Check,
  User,
  Mail,
  Phone,
  Globe,
  Sparkles,
  ShieldCheck,
  PartyPopper,
} from 'lucide-react';
import { CURRENCIES, LANGUAGES, type Currency, type Language } from '@/constants';

interface OnboardingModalProps {
  open: boolean;
  onClose: () => void;
  currency: Currency;
  language: Language;
  onCurrencyChange: (c: Currency) => void;
  onLanguageChange: (l: Language) => void;
}

const STEPS = ['Welcome', 'Your Profile', 'Preferences', 'Complete'] as const;
const TOTAL_STEPS = STEPS.length;

const INTERESTS = [
  'Private Aviation',
  'Fine Dining',
  'Art & Culture',
  'Wellness & Spa',
  'Yachting',
  'Real Estate',
  'Wine & Spirits',
  'Adventure Travel',
];

export default function OnboardingModal({
  open,
  onClose,
  currency,
  language,
  onCurrencyChange,
  onLanguageChange,
}: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  useEffect(() => {
    if (open) {
      setStep(0);
      setFirstName('');
      setLastName('');
      setEmail('');
      setPhone('');
      setSelectedInterests([]);
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const canProceed = () => {
    if (step === 1) return firstName.trim() !== '' && lastName.trim() !== '' && email.trim() !== '';
    if (step === 2) return selectedInterests.length >= 1;
    return true;
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-burgundy-900/60 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg glass-strong rounded-3xl overflow-hidden animate-slide-up max-h-[90vh] flex flex-col">
        {/* Decorative top glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-40 bg-gradient-to-b from-gold-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative flex items-center justify-between px-6 pt-6 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full glass-gold-border flex items-center justify-center">
              <span className="font-serif text-sm font-semibold gold-text">V</span>
            </div>
            <span className="font-serif text-sm tracking-[0.2em] text-champagne-200 uppercase">VOYLME</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Close onboarding"
          >
            <X className="w-4 h-4 text-champagne-300/60" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-2 pb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] tracking-[0.15em] uppercase text-champagne-300/40">
              Step {step + 1} of {TOTAL_STEPS}
            </span>
            <span className="text-[10px] tracking-[0.15em] uppercase text-gold-300/60">
              {STEPS[step]}
            </span>
          </div>
          <div className="h-1 rounded-full bg-white/5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Content - scrollable */}
        <div className="relative px-6 py-4 overflow-y-auto flex-1">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-2xl glass-gold-border flex items-center justify-center mb-5 animate-glow-pulse">
                <Sparkles className="w-7 h-7 text-gold-300" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-champagne-100 mb-2">
                Welcome to <span className="gold-text font-medium">VOYLME</span>
              </h2>
              <p className="text-sm text-champagne-300/60 leading-relaxed max-w-sm mx-auto">
                You're about to enter a world of curated experiences and bespoke service.
                Let's set up your private account in a few quick steps.
              </p>
              <div className="mt-6 flex items-center justify-center gap-6">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-gold-300/70" />
                  </div>
                  <span className="text-[10px] text-champagne-300/50">Secure</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-gold-300/70" />
                  </div>
                  <span className="text-[10px] text-champagne-300/50">Curated</span>
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-xl glass flex items-center justify-center">
                    <Globe className="w-4 h-4 text-gold-300/70" />
                  </div>
                  <span className="text-[10px] text-champagne-300/50">Global</span>
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Profile */}
          {step === 1 && (
            <div className="py-2">
              <h2 className="font-serif text-xl md:text-2xl font-light text-champagne-100 mb-1">
                Tell us about yourself
              </h2>
              <p className="text-xs text-champagne-300/50 mb-5">
                Your information remains private and encrypted.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-champagne-300/50 mb-1.5 block">
                      First Name
                    </label>
                    <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl glass focus-within:glass-gold-border transition-all duration-300">
                      <User className="w-4 h-4 text-champagne-300/40 flex-shrink-0" />
                      <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Alexander"
                        className="bg-transparent border-none outline-none text-sm text-champagne-100 placeholder:text-champagne-300/30 flex-1 min-w-0"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] tracking-wider uppercase text-champagne-300/50 mb-1.5 block">
                      Last Name
                    </label>
                    <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl glass focus-within:glass-gold-border transition-all duration-300">
                      <User className="w-4 h-4 text-champagne-300/40 flex-shrink-0" />
                      <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Sterling"
                        className="bg-transparent border-none outline-none text-sm text-champagne-100 placeholder:text-champagne-300/30 flex-1 min-w-0"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-wider uppercase text-champagne-300/50 mb-1.5 block">
                    Email Address
                  </label>
                  <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl glass focus-within:glass-gold-border transition-all duration-300">
                    <Mail className="w-4 h-4 text-champagne-300/40 flex-shrink-0" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alexander@voylme.com"
                      className="bg-transparent border-none outline-none text-sm text-champagne-100 placeholder:text-champagne-300/30 flex-1 min-w-0"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-wider uppercase text-champagne-300/50 mb-1.5 block">
                    Phone <span className="text-champagne-300/30 normal-case tracking-normal">(optional)</span>
                  </label>
                  <div className="flex items-center gap-2 px-3.5 py-3 rounded-xl glass focus-within:glass-gold-border transition-all duration-300">
                    <Phone className="w-4 h-4 text-champagne-300/40 flex-shrink-0" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="bg-transparent border-none outline-none text-sm text-champagne-100 placeholder:text-champagne-300/30 flex-1 min-w-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div className="py-2">
              <h2 className="font-serif text-xl md:text-2xl font-light text-champagne-100 mb-1">
                Your preferences
              </h2>
              <p className="text-xs text-champagne-300/50 mb-5">
                Select your interests and regional settings to personalize your experience.
              </p>

              {/* Interests */}
              <div className="mb-5">
                <label className="text-[10px] tracking-wider uppercase text-champagne-300/50 mb-2.5 block">
                  Areas of Interest <span className="text-gold-300/60 normal-case tracking-normal">(select at least one)</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((interest) => {
                    const selected = selectedInterests.includes(interest);
                    return (
                      <button
                        key={interest}
                        onClick={() => toggleInterest(interest)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                          selected
                            ? 'glass-gold-border text-gold-200'
                            : 'glass text-champagne-300/60 hover:text-champagne-100'
                        }`}
                      >
                        {interest}
                        {selected && <Check className="w-3 h-3 inline ml-1.5 text-gold-300" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Currency & Language mini-selectors */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-champagne-300/50 mb-1.5 block">
                    Currency
                  </label>
                  <select
                    value={currency.code}
                    onChange={(e) => {
                      const c = CURRENCIES.find((c) => c.code === e.target.value);
                      if (c) onCurrencyChange(c);
                    }}
                    className="w-full px-3.5 py-3 rounded-xl glass text-sm text-champagne-100 border-none outline-none cursor-pointer focus:glass-gold-border transition-all appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23efc96b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                    }}
                  >
                    {CURRENCIES.map((c) => (
                      <option key={c.code} value={c.code} className="bg-burgundy-800 text-champagne-100">
                        {c.symbol} {c.code} — {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[10px] tracking-wider uppercase text-champagne-300/50 mb-1.5 block">
                    Language
                  </label>
                  <select
                    value={language.code}
                    onChange={(e) => {
                      const l = LANGUAGES.find((l) => l.code === e.target.value);
                      if (l) onLanguageChange(l);
                    }}
                    className="w-full px-3.5 py-3 rounded-xl glass text-sm text-champagne-100 border-none outline-none cursor-pointer focus:glass-gold-border transition-all appearance-none"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23efc96b' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 12px center',
                    }}
                  >
                    {LANGUAGES.map((l) => (
                      <option key={l.code} value={l.code} className="bg-burgundy-800 text-champagne-100">
                        {l.flag} — {l.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Complete */}
          {step === 3 && (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto rounded-2xl glass-gold-border flex items-center justify-center mb-5 animate-glow-pulse">
                <PartyPopper className="w-7 h-7 text-gold-300" />
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-light text-champagne-100 mb-2">
                You're all set, <span className="gold-text font-medium">{firstName || 'Guest'}</span>
              </h2>
              <p className="text-sm text-champagne-300/60 leading-relaxed max-w-sm mx-auto mb-6">
                Your private VOYLME account is ready. Welcome to a world of extraordinary experiences,
                curated just for you.
              </p>

              <div className="glass rounded-2xl p-4 max-w-xs mx-auto text-left">
                <div className="flex items-center justify-between py-1.5">
                  <span className="text-[10px] tracking-wider uppercase text-champagne-300/40">Name</span>
                  <span className="text-xs text-champagne-100">{firstName} {lastName}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-t border-white/5">
                  <span className="text-[10px] tracking-wider uppercase text-champagne-300/40">Email</span>
                  <span className="text-xs text-champagne-100">{email || '—'}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-t border-white/5">
                  <span className="text-[10px] tracking-wider uppercase text-champagne-300/40">Currency</span>
                  <span className="text-xs text-champagne-100">{currency.symbol} {currency.code}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-t border-white/5">
                  <span className="text-[10px] tracking-wider uppercase text-champagne-300/40">Language</span>
                  <span className="text-xs text-champagne-100">{language.label}</span>
                </div>
                <div className="flex items-center justify-between py-1.5 border-t border-white/5">
                  <span className="text-[10px] tracking-wider uppercase text-champagne-300/40">Interests</span>
                  <span className="text-xs text-gold-300">{selectedInterests.length} selected</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer / Actions */}
        <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button
              onClick={handleBack}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl glass text-xs font-medium text-champagne-300/70 hover:text-champagne-100 transition-all duration-300"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS - 1 ? (
            <button
              onClick={handleNext}
              disabled={!canProceed()}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-medium transition-all duration-300 ${
                canProceed()
                  ? 'glass-gold-border text-gold-200 hover:animate-glow-pulse'
                  : 'glass text-champagne-300/30 cursor-not-allowed'
              }`}
            >
              Continue
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl glass-gold-border text-xs font-medium text-gold-200 hover:animate-glow-pulse transition-all duration-300"
            >
              Enter VOYLME
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
