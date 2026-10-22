import { ArrowRight, BarChart3, CalendarDays, ConciergeBell, MessageSquare, Settings, UserCircle, Wallet } from 'lucide-react';

interface UtilityModuleProps {
  moduleId: string;
}

const MODULE_CONTENT: Record<string, { icon: typeof Settings; eyebrow: string; title: string; description: string; actions: string[] }> = {
  concierge: { icon: ConciergeBell, eyebrow: 'Always at your service', title: 'Private concierge', description: 'Your dedicated team is ready to arrange the detail that turns a plan into a memory.', actions: ['Start a conversation', 'Review active requests'] },
  analytics: { icon: BarChart3, eyebrow: 'Your private overview', title: 'Travel intelligence', description: 'A considered view of your journeys, preferences, and the moments you have made extraordinary.', actions: ['View annual summary', 'Export activity'] },
  calendar: { icon: CalendarDays, eyebrow: 'Your private schedule', title: 'Calendar', description: 'Keep flights, stays, events, and personal moments together in one calm view.', actions: ['Add a private event', 'View upcoming journeys'] },
  finance: { icon: Wallet, eyebrow: 'Discreetly handled', title: 'Finance', description: 'Review invoices, credits, and the financial details behind your arrangements.', actions: ['View statements', 'Review payment methods'] },
  communications: { icon: MessageSquare, eyebrow: 'Your conversations', title: 'Communications', description: 'Every conversation with your concierge team, kept together and easy to revisit.', actions: ['Open latest conversation', 'Contact concierge'] },
  settings: { icon: Settings, eyebrow: 'Your preferences', title: 'Settings', description: 'Shape how Voylme works for you, from notifications to travel preferences.', actions: ['Edit preferences', 'Manage notifications'] },
  profile: { icon: UserCircle, eyebrow: 'Your private profile', title: 'Profile', description: 'Keep your personal details and preferences ready for a more seamless service.', actions: ['Edit profile', 'Review preferences'] },
};

export default function UtilityModule({ moduleId }: UtilityModuleProps) {
  const content = MODULE_CONTENT[moduleId] ?? MODULE_CONTENT.settings;
  const Icon = content.icon;
  return <section className="animate-fade-in max-w-4xl"><div className="glass-strong rounded-3xl p-7 md:p-12"><div className="w-14 h-14 rounded-2xl bg-gold-400/10 flex items-center justify-center"><Icon className="w-7 h-7 text-gold-300" /></div><p className="text-[10px] uppercase tracking-[0.25em] text-gold-300 mt-7">{content.eyebrow}</p><h1 className="font-serif text-4xl md:text-5xl text-champagne-50 mt-2">{content.title}</h1><p className="text-sm md:text-base leading-relaxed text-champagne-300/60 max-w-xl mt-4">{content.description}</p><div className="grid sm:grid-cols-2 gap-3 mt-8">{content.actions.map((action) => <button key={action} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/8 px-4 py-3.5 text-xs text-champagne-100 hover:border-gold-400/30 transition-colors"><span>{action}</span><ArrowRight className="w-4 h-4 text-gold-300" /></button>)}</div></div></section>;
}
