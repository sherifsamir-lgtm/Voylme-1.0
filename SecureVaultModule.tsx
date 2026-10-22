import { useEffect, useRef, useState } from 'react';
import { BadgeCheck, Eye, FileKey2, FileText, Fingerprint, Lock, ShieldCheck, Unlock, Upload, X } from 'lucide-react';

interface VaultDocument {
  id: string;
  name: string;
  type: string;
  detail: string;
  updated: string;
  icon: typeof FileText;
}

const STARTER_DOCUMENTS: VaultDocument[] = [
  { id: 'passport', name: 'Passport — Alexander', type: 'Identity document', detail: 'Valid until 14 Sep 2031', updated: 'Updated 12 days ago', icon: FileText },
  { id: 'black-card', name: 'Black Card credentials', type: 'Membership credential', detail: 'Sovereign access · Active', updated: 'Updated 2 months ago', icon: BadgeCheck },
  { id: 'vouchers', name: 'Booking vouchers', type: 'Travel documents', detail: '4 active vouchers', updated: 'Updated yesterday', icon: FileKey2 },
];

export default function SecureVaultModule() {
  const [locked, setLocked] = useState<boolean>(() => localStorage.getItem('voylme-vault-locked') !== 'false');
  const [documents, setDocuments] = useState<VaultDocument[]>(STARTER_DOCUMENTS);
  const [preview, setPreview] = useState<VaultDocument | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('voylme-vault-locked', String(locked));
  }, [locked]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setDocuments((current) => [...current, { id: `upload-${Date.now()}`, name: file.name, type: 'Private upload', detail: 'Encrypted in this session', updated: 'Added just now', icon: FileKey2 }]);
    event.target.value = '';
  };

  return (
    <section className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div><div className="flex items-center gap-2 text-gold-300 mb-2"><ShieldCheck className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.25em]">Private by design</span></div><h1 className="font-serif text-3xl md:text-4xl text-champagne-50">Secure vault</h1><p className="mt-2 text-sm text-champagne-300/60">Your essential documents, credentials, and travel records in one discreet place.</p></div>
        <button onClick={() => setLocked((value) => !value)} className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all ${locked ? 'glass-gold-border text-gold-200' : 'bg-gold-500 text-burgundy-950'}`}><Fingerprint className="w-4 h-4" />{locked ? 'Unlock with biometrics' : 'Lock vault'}</button>
      </div>

      <div className="glass-strong rounded-3xl p-5 md:p-7 relative overflow-hidden"><div className="absolute -right-16 -top-24 w-72 h-72 rounded-full bg-gold-400/10 blur-3xl" /><div className="relative flex flex-col md:flex-row md:items-center gap-5"><div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${locked ? 'bg-gold-400/15' : 'bg-emerald-400/15'}`}>{locked ? <Lock className="w-8 h-8 text-gold-300" /> : <Unlock className="w-8 h-8 text-emerald-300" />}</div><div className="flex-1"><p className="text-[10px] uppercase tracking-[0.22em] text-gold-300">Vault status</p><h2 className="font-serif text-2xl text-champagne-50 mt-1">{locked ? 'Biometric lock is active' : 'Vault temporarily unlocked'}</h2><p className="text-xs text-champagne-300/55 mt-1">{locked ? 'Your documents remain hidden until you verify your identity.' : 'Close this session when finished to restore biometric protection.'}</p></div><div className="flex items-center gap-2 text-xs text-champagne-300/55"><span className={`w-2 h-2 rounded-full ${locked ? 'bg-gold-400' : 'bg-emerald-400'} animate-pulse`} />{locked ? 'Protected' : 'Access granted'}</div></div></div>

      {locked ? <div className="glass rounded-2xl p-10 text-center"><div className="mx-auto w-14 h-14 rounded-full bg-burgundy-700/40 flex items-center justify-center"><Fingerprint className="w-7 h-7 text-gold-300" /></div><h2 className="font-serif text-2xl text-champagne-50 mt-4">Vault locked</h2><p className="text-sm text-champagne-300/55 mt-2 max-w-sm mx-auto">Use the biometric toggle above to preview your protected documents.</p></div> : <><div className="flex items-center justify-between"><div><p className="text-[10px] uppercase tracking-[0.2em] text-gold-300">Protected collection</p><h2 className="font-serif text-2xl text-champagne-50 mt-1">Your documents</h2></div><div><input ref={inputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={handleUpload} className="hidden" /><button onClick={() => inputRef.current?.click()} className="flex items-center gap-2 rounded-xl glass-gold-border px-4 py-2.5 text-xs text-gold-200 hover:text-gold-100"><Upload className="w-4 h-4" />Upload document</button></div></div><div className="grid md:grid-cols-3 gap-4">{documents.map((document) => { const Icon = document.icon; return <button key={document.id} onClick={() => setPreview(document)} className="glass rounded-2xl p-5 text-left hover:glass-gold-border transition-all duration-300 group"><div className="flex items-start justify-between"><div className="w-11 h-11 rounded-xl bg-gold-400/10 flex items-center justify-center"><Icon className="w-5 h-5 text-gold-300" /></div><Eye className="w-4 h-4 text-champagne-300/30 group-hover:text-gold-300 transition-colors" /></div><h3 className="text-sm font-medium text-champagne-100 mt-5">{document.name}</h3><p className="text-xs text-champagne-300/50 mt-1">{document.type}</p><p className="text-[10px] text-champagne-300/40 mt-4">{document.detail}</p><div className="flex items-center gap-1.5 mt-3 text-[10px] text-emerald-300/70"><ShieldCheck className="w-3 h-3" />{document.updated}</div></button>; })}</div><div className="flex items-center gap-2 text-[10px] text-champagne-300/40"><ShieldCheck className="w-3.5 h-3.5 text-gold-300/60" />Files are previewed locally in this session and never shown in public views.</div></>}

      {preview && <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-burgundy-950/80 backdrop-blur-sm" onMouseDown={() => setPreview(null)}><div className="glass-strong rounded-3xl w-full max-w-lg p-6 animate-scale-in" onMouseDown={(event) => event.stopPropagation()}><div className="flex items-start justify-between"><div className="flex items-center gap-3"><div className="w-11 h-11 rounded-xl bg-gold-400/10 flex items-center justify-center"><preview.icon className="w-5 h-5 text-gold-300" /></div><div><p className="text-[10px] uppercase tracking-[0.18em] text-gold-300">Secure preview</p><h2 className="font-serif text-xl text-champagne-50 mt-1">{preview.name}</h2></div></div><button onClick={() => setPreview(null)} aria-label="Close document preview" className="text-champagne-300/60 hover:text-champagne-100"><X className="w-4 h-4" /></button></div><div className="mt-6 rounded-2xl border border-white/8 bg-burgundy-950/50 p-8 text-center"><Lock className="w-8 h-8 text-gold-300/80 mx-auto" /><p className="text-sm text-champagne-200 mt-3">Protected document preview</p><p className="text-xs text-champagne-300/45 mt-1">{preview.detail}</p></div><button onClick={() => setPreview(null)} className="w-full mt-5 rounded-xl bg-white/5 border border-white/10 py-3 text-xs text-champagne-100 hover:border-gold-400/30">Close preview</button></div></div>}
    </section>
  );
}
