import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BottomNav from '@/components/BottomNav';
import OnboardingModal from '@/components/OnboardingModal';
import FlightsModule from '@/components/FlightsModule';
import HotelsModule from '@/components/HotelsModule';
import YachtsModule from '@/components/YachtsModule';
import CarsModule from '@/components/CarsModule';
import ExperiencesModule from '@/components/ExperiencesModule';
import MembersModule from '@/components/MembersModule';
import SecureVaultModule from '@/components/SecureVaultModule';
import UtilityModule from '@/components/UtilityModule';
import WingedV from '@/components/WingedV';
import { CURRENCIES, LANGUAGES, type Currency, type Language } from '@/constants';

type MobilityTab = 'exclusive' | 'yachts' | 'cars';

function App() {
  const [activeModule, setActiveModule] = useState(() => localStorage.getItem('voylme-active-module') ?? 'dashboard');
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [language, setLanguage] = useState<Language>(LANGUAGES[0]);
  const [mobilityTab, setMobilityTab] = useState<MobilityTab>(() => (localStorage.getItem('voylme-experience-tab') as MobilityTab | null) ?? 'exclusive');

  useEffect(() => {
    localStorage.setItem('voylme-active-module', activeModule);
  }, [activeModule]);

  useEffect(() => {
    localStorage.setItem('voylme-experience-tab', mobilityTab);
  }, [mobilityTab]);

  const handleServiceSelect = (id: string) => {
    switch (id) {
      case 'flights':
        setActiveModule('journeys');
        break;
      case 'hotels':
        setActiveModule('reservations');
        break;
      case 'cars':
        setActiveModule('experiences');
        setMobilityTab('cars');
        break;
      case 'yachts':
        setActiveModule('experiences');
        setMobilityTab('yachts');
        break;
      case 'insurance':
        setActiveModule('finance');
        break;
      case 'activities':
        setActiveModule('concierge');
        break;
      default:
        break;
    }
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'journeys':
        return <FlightsModule />;
      case 'reservations':
        return <HotelsModule />;
      case 'experiences':
        return (
          <div className="space-y-5">
            <div className="flex items-center gap-2 p-1.5 glass rounded-2xl w-fit overflow-x-auto max-w-full">
              {(['exclusive', 'yachts', 'cars'] as MobilityTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setMobilityTab(tab)}
                  className={`px-4 md:px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    mobilityTab === tab ? 'glass-gold-border text-gold-200' : 'text-champagne-300/60 hover:text-champagne-100'
                  }`}
                >
                  {tab === 'exclusive' ? 'Exclusive Experiences' : tab === 'yachts' ? 'Superyachts' : 'Luxury Cars'}
                </button>
              ))}
            </div>
            {mobilityTab === 'exclusive' ? <ExperiencesModule /> : mobilityTab === 'yachts' ? <YachtsModule /> : <CarsModule />}
          </div>
        );
      case 'members':
        return <MembersModule />;
      case 'vault':
        return <SecureVaultModule />;
      case 'concierge':
      case 'analytics':
      case 'calendar':
      case 'finance':
      case 'communications':
      case 'settings':
      case 'profile':
        return <UtilityModule moduleId={activeModule} />;
      default:
        return null;
    }
  };

  const showHome = activeModule === 'dashboard';

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        activeModule={activeModule}
        onModuleSelect={(id) => {
          setActiveModule(id);
          if (id === 'experiences') setMobilityTab('exclusive');
        }}
        currency={currency}
        language={language}
        onCurrencyChange={setCurrency}
        onLanguageChange={setLanguage}
      />

      {/* Ambient decorative orbs */}
      <div className="fixed top-1/3 right-1/4 w-96 h-96 rounded-full bg-gold-500/5 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-burgundy-400/10 blur-[100px] pointer-events-none" />

      <main className="flex-1 px-4 md:px-8 pb-24 lg:pb-8 relative z-10">
        {/* Module-specific content */}
        {renderModule()}

        {/* Dashboard: Hero + Services */}
        {showHome && (
          <HeroSection
            onSearch={() => setActiveModule('journeys')}
            onServiceSelect={handleServiceSelect}
          />
        )}

        {/* Status Footer */}
        <footer className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <WingedV size={30} className="voylme-footer-logo" />
            <span className="text-xs text-champagne-300/40">Crafted for the extraordinary</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400/70 animate-pulse" />
            <span className="text-xs text-champagne-300/50">All systems operational</span>
          </div>
        </footer>
      </main>

      {/* Bottom Navigation - Mobile only */}
      <BottomNav activeModule={activeModule} onModuleSelect={setActiveModule} />

      {/* Onboarding Modal */}
      <OnboardingModal
        open={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        currency={currency}
        language={language}
        onCurrencyChange={setCurrency}
        onLanguageChange={setLanguage}
      />
    </div>
  );
}

export default App;
