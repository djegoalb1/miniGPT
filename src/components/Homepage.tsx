import React, { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  Calculator,
  BookOpen,
  HelpCircle,
  RotateCw,
  Laptop,
  Smartphone,
  ShieldCheck,
  Send,
  Loader2,
  LogIn,
  User as UserIcon,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { MarkdownRenderer } from './MarkdownRenderer';
import { SCHOOL_SUBJECTS, STUDY_MODES } from '../constants/schoolData';

interface HomepageProps {
  currentUser: User | null;
  onLoginWithGoogle: () => Promise<void>;
  onLogout: () => Promise<void>;
  onEnterApp: () => void;
  guestTrialCount: number; // 0 to 3
  onUseGuestTrial: (prompt: string) => Promise<string>;
  maxGuestTrials: number;
}

export const Homepage: React.FC<HomepageProps> = ({
  currentUser,
  onLoginWithGoogle,
  onLogout,
  onEnterApp,
  guestTrialCount,
  onUseGuestTrial,
  maxGuestTrials = 3,
}) => {
  const [demoInput, setDemoInput] = useState('');
  const [demoConversation, setDemoConversation] = useState<
    Array<{ role: 'user' | 'assistant'; text: string }>
  >([
    {
      role: 'assistant',
      text: 'Ciao! Sono **MiniGPT**, il tuo assistente didattico. Fai una domanda su qualsiasi materia (storia, matematica, fisica, italiano) per provare le tue **3 risposte gratuite**!',
    },
  ]);
  const [demoLoading, setDemoLoading] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const trialsRemaining = Math.max(0, maxGuestTrials - guestTrialCount);
  const isLimitReached = trialsRemaining === 0 && !currentUser;

  const demoBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    demoBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [demoConversation, demoLoading]);

  const handleSendDemoMessage = async (customPrompt?: string) => {
    const textToSend = (customPrompt || demoInput).trim();
    if (!textToSend || demoLoading) return;

    if (isLimitReached) {
      setShowAuthModal(true);
      return;
    }

    setDemoInput('');
    setDemoConversation((prev) => [...prev, { role: 'user', text: textToSend }]);
    setDemoLoading(true);

    try {
      const responseText = await onUseGuestTrial(textToSend);
      setDemoConversation((prev) => [...prev, { role: 'assistant', text: responseText }]);
    } catch (err) {
      setDemoConversation((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: '⚠️ Si è verificato un errore temporaneo. Riprova tra pochi secondi.',
        },
      ]);
    } finally {
      setDemoLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setAuthLoading(true);
    try {
      await onLoginWithGoogle();
      setShowAuthModal(false);
    } catch (err: any) {
      console.error('Login error:', err);
      alert('Accesso annullato o non riuscito. Riprova con un account Google.');
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold font-heading tracking-tight text-white">
                MiniGPT
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 uppercase tracking-wider">
                Scuola AI
              </span>
            </div>
          </div>
        </div>

        {/* Center navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300 font-medium">
          <a href="#demo" className="hover:text-white transition-colors">
            Prova l'IA
          </a>
          <a href="#features" className="hover:text-white transition-colors">
            Modalità
          </a>
          <a href="#subjects" className="hover:text-white transition-colors">
            Materie
          </a>
          <a href="#devices" className="hover:text-white transition-colors">
            Dispositivi
          </a>
        </nav>

        {/* Right CTA / User Status */}
        <div className="flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2.5">
              <button
                onClick={onEnterApp}
                className="py-2 px-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-indigo-500/20 transition-all"
              >
                <span>Apri MiniGPT & Cronologia</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Disconnetti"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs text-slate-300">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>
                  {trialsRemaining > 0
                    ? `${trialsRemaining} prove rimaste`
                    : 'Prove terminate'}
                </span>
              </div>
              <button
                onClick={() => setShowAuthModal(true)}
                className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors"
              >
                <LogIn className="w-4 h-4 text-indigo-400" />
                <span>Accedi / Registrati</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-8 max-w-6xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium animate-in fade-in duration-300">
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>Il Tutor di Studio Intelligente per Studenti e Compiti</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-tight max-w-4xl mx-auto">
          L'Intelligenza Artificiale che ti{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">
            spiega il metodo
          </span>
          , non ti dà solo la risposta.
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Pensato per medie, superiori e università: passaggi matematici in LaTeX,
          sintesi storiche, verifiche con foto del quaderno, simulazioni di interrogazioni e flashcard.
        </p>

        {/* Devices supported badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-slate-400">
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
            <Laptop className="w-3.5 h-3.5 text-indigo-400" /> Windows & Mac
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
            <Smartphone className="w-3.5 h-3.5 text-sky-400" /> iPhone & iPad (iOS)
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> Smartphone Android
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-800">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Database Firewall Protetto
          </span>
        </div>
      </section>

      {/* Interactive Live Demo Box (Max 3 free trials) */}
      <section id="demo" className="max-w-4xl mx-auto w-full px-4 sm:px-6 pb-20">
        <div className="rounded-2xl sm:rounded-3xl bg-slate-900/90 border border-indigo-500/30 shadow-2xl overflow-hidden flex flex-col">
          {/* Demo Header */}
          <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
              <div>
                <h3 className="text-sm sm:text-base font-bold font-heading text-white">
                  Prova MiniGPT in Anteprima
                </h3>
                <p className="text-xs text-slate-400">
                  {currentUser
                    ? 'Sei registrato: messaggi e cronologia illimitati!'
                    : `Hai a disposizione 3 prove gratuite (${trialsRemaining}/3 rimanenti)`}
                </p>
              </div>
            </div>

            {/* Trial progress dots */}
            {!currentUser && (
              <div className="flex items-center gap-1.5">
                {[0, 1, 2].map((idx) => (
                  <span
                    key={idx}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      idx < guestTrialCount
                        ? 'bg-slate-700'
                        : 'bg-indigo-500 shadow-sm shadow-indigo-500/50'
                    }`}
                    title={`Prova ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Demo Chat Stream */}
          <div className="p-4 sm:p-6 min-h-[300px] max-h-[460px] overflow-y-auto space-y-4 bg-slate-950/60">
            {demoConversation.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-3 ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white flex-shrink-0 mt-0.5 shadow-md">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-200'
                  }`}
                >
                  <MarkdownRenderer content={msg.text} />
                </div>
              </div>
            ))}

            {demoLoading && (
              <div className="flex items-center gap-2 text-indigo-300 text-xs sm:text-sm py-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                <span>MiniGPT sta scrivendo la spiegazione...</span>
              </div>
            )}

            <div ref={demoBottomRef} />
          </div>

          {/* Quick starter chips */}
          <div className="px-4 py-2 bg-slate-900/60 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="text-[11px] text-slate-500 font-medium whitespace-nowrap">
              Esempi:
            </span>
            {[
              'Spiegami la Rivoluzione Francese in 3 punti',
              'Come si calcola la derivata di x^3?',
              'Riassumi il Canto 1 dell\'Inferno di Dante',
              'I 3 principi della dinamica di Newton',
            ].map((sugg) => (
              <button
                key={sugg}
                type="button"
                disabled={demoLoading || isLimitReached}
                onClick={() => handleSendDemoMessage(sugg)}
                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 whitespace-nowrap transition-colors disabled:opacity-40"
              >
                {sugg}
              </button>
            ))}
          </div>

          {/* Input / Gate Box */}
          <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800">
            {isLimitReached ? (
              <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-purple-950/60 to-slate-900 border border-indigo-500/40 text-center space-y-3">
                <div className="w-10 h-10 mx-auto rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-bold font-heading text-white">
                    Hai completato le tue 3 prove gratuite!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-md mx-auto mt-1 leading-relaxed">
                    Registrati gratuitamente in 1 clic per salvare la tua cronologia, fare
                    domande illimitate e accedere a Quiz e Flashcard su database protetto.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowAuthModal(true)}
                  className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium text-sm shadow-lg shadow-indigo-500/25 transition-all inline-flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Registrati Gratis per Continuare</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={demoInput}
                  onChange={(e) => setDemoInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendDemoMessage()}
                  placeholder={
                    trialsRemaining > 0
                      ? `Fai una domanda di prova (${trialsRemaining} rimanenti)...`
                      : 'Fai una domanda a MiniGPT...'
                  }
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:border-indigo-500 outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleSendDemoMessage()}
                  disabled={!demoInput.trim() || demoLoading}
                  className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 text-white shadow-md transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-12 border-t border-slate-800/80">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-4xl font-extrabold font-heading text-white">
            Progettato specificamente per come si studia a scuola
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Non un semplice chatbot generico, ma strumenti calibrati sui programmi didattici italiani.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white">Tutor Socratico</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Ti aiuta a ragionare ponendoti indizi e domande guida, così impari il metodo e non dimentichi più la lezione.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400 w-fit">
              <Calculator className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white">Risolutore con Passaggi</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Equazioni, fisica e formule chimiche mostrate con notazione matematica LaTeX e commento passo-passo.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 w-fit">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white">Mappe & Riassunti</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Sintesi per punti, date cardine, parole chiave e schemi ad albero pronti per le interrogazioni.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
              <HelpCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white">Quiz di Verifica</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Test a risposta multipla con voto in decimi, timer e spiegazione del perché ciascuna opzione è corretta o errata.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-violet-500/10 text-violet-400 w-fit">
              <RotateCw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white">Flashcard 3D</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              Ripasso a ripetizione spaziata con effetto flip per memorizzare vocaboli, date e formule scientifiche.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-sky-500/10 text-sky-400 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold font-heading text-white">Database Firewall</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              I tuoi appunti e le tue sessioni sono protetti da regole di sicurezza Firebase per garantire privacy assoluta.
            </p>
          </div>
        </div>
      </section>

      {/* Cross Platform Section */}
      <section id="devices" className="py-16 px-4 sm:px-8 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Sempre con te: su PC, Mac, iPhone, iPad e Android
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Inizia a studiare sul computer a casa e ripassa le flashcard dal tuo smartphone mentre sei in autobus o prima di entrare in classe.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-2">
              <Laptop className="w-8 h-8 text-indigo-400" />
              <span className="text-xs font-semibold text-white">Computer Desktop</span>
              <span className="text-[10px] text-slate-400">Windows & Mac</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-2">
              <Smartphone className="w-8 h-8 text-sky-400" />
              <span className="text-xs font-semibold text-white">Apple iOS</span>
              <span className="text-[10px] text-slate-400">iPhone & iPad</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-2">
              <Smartphone className="w-8 h-8 text-emerald-400" />
              <span className="text-xs font-semibold text-white">Android</span>
              <span className="text-[10px] text-slate-400">Smartphone & Tablet</span>
            </div>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-purple-400" />
              <span className="text-xs font-semibold text-white">Cloud Sync</span>
              <span className="text-[10px] text-slate-400">Database Crittografato</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500 space-y-2">
        <p>© 2026 MiniGPT - L'AI per la Scuola e lo Studio. Tutti i diritti riservati.</p>
        <p>I tuoi dati sono protetti e memorizzati sul tuo account Firebase personale.</p>
      </footer>

      {/* Auth Modal */}
      {showAuthModal && (
        <div
          onClick={() => setShowAuthModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/25">
              <GraduationCap className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                Crea il tuo Account Studente
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                Salva le tue conversazioni sul database Firebase protetto da firewall,
                sblocca messaggi illimitati, quiz e flashcard.
              </p>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                disabled={authLoading}
                onClick={handleGoogleAuth}
                className="w-full py-3 px-4 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-sm flex items-center justify-center gap-3 transition-colors shadow-md disabled:opacity-50"
              >
                {authLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-slate-700" />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>Continua con Google</span>
                  </>
                )}
              </button>
            </div>

            <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-[11px] text-slate-400 space-y-1 text-left">
              <div className="flex items-center gap-1.5 font-semibold text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sicurezza e Firewall Database:</span>
              </div>
              <p>
                Il tuo account viene registrato su Firebase Firestore. Le regole di firewall
                garantiscono che solo tu possa accedere alla tua cronologia e ai tuoi appunti.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShowAuthModal(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Chiudi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
