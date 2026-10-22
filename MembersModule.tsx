import { useState } from 'react';
import { Check, ChevronRight, Crown, Mail, MessageCircle, Send, ShieldCheck, Sparkles, Users, X } from 'lucide-react';

type Tier = 'Sovereign' | 'Royal' | 'Elite';

interface TierInfo {
  name: Tier;
  eyebrow: string;
  description: string;
  color: string;
  benefits: string[];
}

const TIERS: TierInfo[] = [
  { name: 'Sovereign', eyebrow: 'The inner circle', description: 'For members who expect the impossible to be arranged before they ask.', color: 'from-amber-200 to-yellow-500', benefits: ['Dedicated global lifestyle director', 'Unlisted access and private introductions', 'Priority aircraft and villa availability', 'Invitation-only calendar previews'] },
  { name: 'Royal', eyebrow: 'Preferred access', description: 'A more personal way to move through the world, with every detail anticipated.', color: 'from-gold-200 to-gold-500', benefits: ['Personal concierge, around the clock', 'Preferred partner upgrades', 'Early access to rare experiences', 'Complimentary arrival service'] },
  { name: 'Elite', eyebrow: 'Your first key', description: 'A considered foundation for effortless travel, stays, and experiences.', color: 'from-champagne-200 to-champagne-400', benefits: ['Dedicated concierge team', 'Member-only rates and amenities', 'Priority booking support', 'Curated monthly edit'] },
];

export default function MembersModule() {
  const [activeTier, setActiveTier] = useState<Tier>('Royal');
  const [inviteOpen, setInviteOpen] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);
  const [email, setEmail] = useState('');

  const tier = TIERS.find((item) => item.name === activeTier) ?? TIERS[1];

  const sendInvite = () => {
    if (!email.trim()) return;
    setInviteSent(true);
  };

  return (
    <section className="animate-fade-in space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <div><div className="flex items-center gap-2 text-gold-300 mb-2"><Crown className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.25em]">The Voylme circle</span></div><h1 className="font-serif text-3xl md:text-4xl text-champagne-50">VIP members portal</h1><p className="mt-2 text-sm text-champagne-300/60">Your access, your people, your next extraordinary moment.</p></div>
        <button onClick={() => { setInviteOpen(true); setInviteSent(false); }} className="inline-flex items-center gap-2 rounded-xl glass-gold-border px-4 py-2.5 text-xs font-medium text-gold-200 hover:text-gold-100 w-fit"><Users className="w-4 h-4" />Invite a member</button>
      </div>

      <div className="glass-strong rounded-3xl p-5 md:p-7 overflow-hidden relative">
        <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-gold-400/10 blur-3xl" />
        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4"><div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-200 to-gold-600 flex items-center justify-center shadow-lg shadow-gold-900/30"><Crown className="w-8 h-8 text-burgundy-950" /></div><div><p className="text-[10px] uppercase tracking-[0.22em] text-gold-300">Current membership</p><h2 className="font-serif text-3xl text-champagne-50">Royal</h2><p className="text-xs text-champagne-300/50 mt-1">Member since 2021 · New York</p></div></div>
          <div className="flex items-center gap-3 text-xs text-champagne-300/60"><ShieldCheck className="w-4 h-4 text-gold-300" />Verified member <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /></div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-5">
        <div className="glass rounded-2xl p-5 md:p-6"><div className="flex items-center justify-between mb-5"><div><p className="text-[10px] uppercase tracking-[0.2em] text-gold-300">Access overview</p><h2 className="font-serif text-2xl text-champagne-50 mt-1">Choose your standard</h2></div><Sparkles className="w-5 h-5 text-gold-300/70" /></div><div className="flex gap-2 overflow-x-auto pb-1">{TIERS.map((item) => <button key={item.name} onClick={() => setActiveTier(item.name)} className={`flex-shrink-0 rounded-xl px-4 py-3 text-left border transition-all ${item.name === activeTier ? 'border-gold-400/40 bg-gold-400/10' : 'border-white/8 bg-white/[0.02] hover:bg-white/5'}`}><span className="block text-sm font-medium text-champagne-100">{item.name}</span><span className="block text-[10px] text-champagne-300/45 mt-1">{item.eyebrow}</span></button>)}</div><div className="mt-5 rounded-2xl bg-burgundy-950/40 border border-white/6 p-5"><div className="flex items-center gap-2"><span className={`w-2 h-2 rounded-full bg-gradient-to-r ${tier.color}`} /><span className="text-xs uppercase tracking-[0.15em] text-gold-300">{tier.name} access</span></div><p className="text-sm text-champagne-200/70 mt-3 leading-relaxed">{tier.description}</p><div className="grid sm:grid-cols-2 gap-3 mt-5">{tier.benefits.map((benefit) => <div key={benefit} className="flex items-start gap-2 text-xs text-champagne-200"><Check className="w-3.5 h-3.5 text-gold-300 mt-0.5 flex-shrink-0" />{benefit}</div>)}</div></div></div>

        <div className="glass rounded-2xl p-5 md:p-6"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-gold-400/10 flex items-center justify-center"><MessageCircle className="w-5 h-5 text-gold-300" /></div><div><p className="text-[10px] uppercase tracking-[0.2em] text-gold-300">At your service</p><h2 className="font-serif text-2xl text-champagne-50">Your concierge</h2></div></div><p className="text-sm text-champagne-300/60 leading-relaxed mt-5">“Alexander, I’m ready whenever you are. Tell me what would make this moment extraordinary.”</p><div className="mt-6 space-y-2"><button className="w-full flex items-center justify-between rounded-xl bg-white/5 border border-white/8 px-4 py-3 text-xs text-champagne-100 hover:border-gold-400/30 transition-colors"><span className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-gold-300" />Message Alexander</span><ChevronRight className="w-4 h-4 text-champagne-300/40" /></button><button className="w-full flex items-center justify-between rounded-xl bg-white/5 border border-white/8 px-4 py-3 text-xs text-champagne-100 hover:border-gold-400/30 transition-colors"><span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gold-300" />Email concierge</span><ChevronRight className="w-4 h-4 text-champagne-300/40" /></button></div><p className="text-[10px] text-champagne-300/40 mt-4 text-center">Average response time · 4 minutes</p></div>
      </div>

      {inviteOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-burgundy-950/80 backdrop-blur-sm" onMouseDown={() => setInviteOpen(false)}><div className="glass-strong rounded-3xl w-full max-w-md p-6 animate-scale-in" onMouseDown={(event) => event.stopPropagation()}>{inviteSent ? <div className="text-center py-5"><div className="mx-auto w-12 h-12 rounded-full bg-gold-400/15 flex items-center justify-center"><Check className="w-6 h-6 text-gold-300" /></div><h2 className="font-serif text-2xl text-champagne-50 mt-4">Invitation prepared</h2><p className="text-sm text-champagne-300/60 mt-2">Your concierge will personally follow up with {email}.</p><button onClick={() => setInviteOpen(false)} className="mt-5 text-xs text-gold-200">Done</button></div> : <><div className="flex justify-between items-start"><div><p className="text-[10px] uppercase tracking-[0.2em] text-gold-300">Extend the circle</p><h2 className="font-serif text-2xl text-champagne-50 mt-1">Invite a member</h2></div><button onClick={() => setInviteOpen(false)} aria-label="Close invitation dialog" className="text-champagne-300/60 hover:text-champagne-100"><X className="w-4 h-4" /></button></div><p className="text-sm text-champagne-300/60 leading-relaxed mt-4">Send their details to our concierge team and we’ll take care of the introduction.</p><label className="block text-[10px] uppercase tracking-[0.15em] text-champagne-300/50 mt-5 mb-2">Guest email</label><input value={email} onChange={(event) => setEmail(event.target.value)} type="email" placeholder="name@domain.com" className="w-full rounded-xl bg-burgundy-950/60 border border-white/10 px-4 py-3 text-sm text-champagne-100 outline-none focus:border-gold-400/50" /><button onClick={sendInvite} className="w-full mt-4 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 py-3 text-sm font-semibold text-burgundy-950 hover:from-gold-400 hover:to-gold-500"><Send className="w-4 h-4" />Prepare invitation</button></>}</div></div>}
    </section>
  );
}
