import React, { useState } from 'react';
import { FlashcardDeck } from '../types';
import { X, Sparkles, RotateCw, Check, AlertCircle, ArrowLeft, ArrowRight, Lightbulb, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface FlashcardsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialSubject?: string;
  onSendToChat?: (text: string) => void;
}

export const FlashcardsModal: React.FC<FlashcardsModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
  initialSubject = 'Generale',
  onSendToChat,
}) => {
  const [topic, setTopic] = useState(initialTopic || '');
  const [cardCount, setCardCount] = useState(8);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deck, setDeck] = useState<FlashcardDeck | null>(null);

  // Review states
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredIds, setMasteredIds] = useState<Set<number>>(new Set());
  const [reviewLaterIds, setReviewLaterIds] = useState<Set<number>>(new Set());
  const [showHint, setShowHint] = useState(false);

  if (!isOpen) return null;

  const handleGenerateDeck = async (customTopic?: string) => {
    const targetTopic = customTopic || topic;
    if (!targetTopic.trim()) {
      setError('Inserisci un argomento per le flashcard.');
      return;
    }

    setLoading(true);
    setError(null);
    setDeck(null);
    setCurrentIndex(0);
    setIsFlipped(false);
    setShowHint(false);
    setMasteredIds(new Set());
    setReviewLaterIds(new Set());

    try {
      const res = await fetch('/api/flashcards/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: targetTopic,
          subject: initialSubject,
          count: cardCount,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Errore nella generazione delle flashcard.');
      }

      const data = await res.json();
      if (!data.cards || data.cards.length === 0) {
        throw new Error('Nessuna carta generata. Riprova con un argomento diverso.');
      }

      setDeck({
        id: Date.now().toString(),
        deckTitle: data.deckTitle || `Mazzo: ${targetTopic}`,
        topic: targetTopic,
        subject: initialSubject,
        cards: data.cards,
        createdAt: Date.now(),
      });
    } catch (err: any) {
      setError(err.message || 'Errore di connessione.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardDecision = (mastered: boolean) => {
    if (!deck) return;
    const currentCard = deck.cards[currentIndex];
    if (!currentCard) return;

    if (mastered) {
      setMasteredIds((prev) => new Set([...prev, currentCard.id]));
      setReviewLaterIds((prev) => {
        const next = new Set(prev);
        next.delete(currentCard.id);
        return next;
      });
    } else {
      setReviewLaterIds((prev) => new Set([...prev, currentCard.id]));
      setMasteredIds((prev) => {
        const next = new Set(prev);
        next.delete(currentCard.id);
        return next;
      });
    }

    // Advance to next
    if (currentIndex + 1 < deck.cards.length) {
      setIsFlipped(false);
      setShowHint(false);
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 150);
    } else {
      // Completed all
      try {
        confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
      } catch {}
    }
  };

  const currentCard = deck?.cards[currentIndex];
  const totalCards = deck?.cards.length || 0;
  const isLast = currentIndex === totalCards - 1;
  const allReviewed = totalCards > 0 && masteredIds.size + reviewLaterIds.size === totalCards;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-violet-500 to-indigo-600 text-white shadow-md shadow-violet-500/20">
              <RotateCw className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-white">Laboratorio Flashcard</h3>
              <p className="text-xs text-slate-400">Ripasso rapido a memoria attiva con MiniGPT</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {!deck && !loading && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Argomento o Vocabolario da memorizzare
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Es. Formule goniometriche, Verbi irregolari inglesi, Capitali europee..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-violet-500 focus:ring-1 focus:ring-violet-500 text-white placeholder-slate-500 outline-none transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateDeck()}
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Numero di Flashcard</label>
                <select
                  value={cardCount}
                  onChange={(e) => setCardCount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-300 text-sm focus:border-violet-500 outline-none"
                >
                  <option value={6}>6 Carte (Ripasso flash)</option>
                  <option value={8}>8 Carte (Standard)</option>
                  <option value={12}>12 Carte (Completo)</option>
                </select>
              </div>

              {/* Quick suggestions */}
              <div>
                <span className="text-xs text-slate-400 font-medium block mb-2">Idee per mazzi:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Formule di Cinematica',
                    'Paradigmi verbi latini frequenti',
                    'Tavola Periodica ed Elementi chiave',
                    'Date cardine Rivoluzione Francese',
                    'Figure retoriche italiane',
                  ].map((sugg) => (
                    <button
                      key={sugg}
                      type="button"
                      onClick={() => {
                        setTopic(sugg);
                        handleGenerateDeck(sugg);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700 transition-colors"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-sm flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => handleGenerateDeck()}
                className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 text-white font-medium shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Crea Mazzo con MiniGPT
              </button>
            </div>
          )}

          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="w-10 h-10 text-violet-400 animate-spin" />
              <p className="text-white font-medium">Generazione delle flashcard in corso...</p>
              <p className="text-xs text-slate-400">Estrazione dei concetti e definizioni chiave</p>
            </div>
          )}

          {deck && currentCard && (
            <div className="space-y-4">
              {/* Header stats */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-white truncate max-w-[200px]">{deck.deckTitle}</span>
                <div className="flex items-center gap-3">
                  <span className="text-emerald-400 font-medium">✓ {masteredIds.size} so</span>
                  <span className="text-amber-400 font-medium">✕ {reviewLaterIds.size} da rivedere</span>
                  <span className="bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                    {currentIndex + 1} / {totalCards}
                  </span>
                </div>
              </div>

              {/* 3D Flip Flashcard */}
              <div
                onClick={() => setIsFlipped(!isFlipped)}
                className="relative h-64 sm:h-72 cursor-pointer perspective-1000 group select-none"
              >
                <div
                  className={`relative w-full h-full rounded-2xl transition-transform duration-500 transform-style-preserve-3d shadow-xl ${
                    isFlipped ? 'rotate-y-180' : ''
                  }`}
                >
                  {/* Front Side */}
                  <div className="absolute inset-0 backface-hidden rounded-2xl border border-slate-700/80 bg-gradient-to-br from-slate-900 to-slate-950 p-6 flex flex-col justify-between items-center text-center">
                    <div className="w-full flex items-center justify-between text-xs text-slate-500">
                      <span className="uppercase tracking-wider font-semibold text-violet-400">FRONTE (DOMANDA)</span>
                      <span>Clicca per girare ↻</span>
                    </div>

                    <div className="text-lg sm:text-xl font-medium text-white px-4 leading-snug">
                      {currentCard.front}
                    </div>

                    <div className="w-full flex justify-center">
                      {currentCard.hint && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowHint(!showHint);
                          }}
                          className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 bg-amber-950/40 px-3 py-1 rounded-full border border-amber-800/50"
                        >
                          <Lightbulb className="w-3.5 h-3.5" />
                          <span>{showHint ? currentCard.hint : 'Mostra indizio'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-2xl border border-violet-500/40 bg-gradient-to-br from-slate-900 via-indigo-950/30 to-violet-950/40 p-6 flex flex-col justify-between items-center text-center">
                    <div className="w-full flex items-center justify-between text-xs text-slate-400">
                      <span className="uppercase tracking-wider font-semibold text-emerald-400">RETRO (RISPOSTA)</span>
                      <span>Clicca per rigirare ↻</span>
                    </div>

                    <div className="text-base sm:text-lg font-normal text-slate-100 px-2 leading-relaxed">
                      {currentCard.back}
                    </div>

                    <div className="text-xs text-slate-400">Valuta se ricordavi il concetto qui sotto ↓</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleCardDecision(false)}
                  className="py-2.5 px-4 rounded-xl bg-amber-950/40 hover:bg-amber-900/50 border border-amber-800/60 text-amber-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <AlertCircle className="w-4 h-4" />
                  <span>Da Rivedere</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleCardDecision(true)}
                  className="py-2.5 px-4 rounded-xl bg-emerald-950/50 hover:bg-emerald-900/50 border border-emerald-700/60 text-emerald-300 font-medium text-sm flex items-center justify-center gap-2 transition-colors"
                >
                  <Check className="w-4 h-4" />
                  <span>Lo Sapevo!</span>
                </button>
              </div>

              {/* Navigation arrows */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => {
                    setCurrentIndex((p) => Math.max(0, p - 1));
                    setIsFlipped(false);
                    setShowHint(false);
                  }}
                  className="flex items-center gap-1 hover:text-white disabled:opacity-30"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Precedente</span>
                </button>
                <button
                  disabled={isLast}
                  onClick={() => {
                    setCurrentIndex((p) => Math.min(totalCards - 1, p + 1));
                    setIsFlipped(false);
                    setShowHint(false);
                  }}
                  className="flex items-center gap-1 hover:text-white disabled:opacity-30"
                >
                  <span>Successiva</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {allReviewed && (
                <div className="mt-4 p-4 rounded-xl bg-violet-950/40 border border-violet-800/40 text-center space-y-3">
                  <p className="text-white font-medium text-sm">
                    Mazzo completato! Hai memorizzato {masteredIds.size} carte su {totalCards}.
                  </p>
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => {
                        setCurrentIndex(0);
                        setIsFlipped(false);
                        setMasteredIds(new Set());
                        setReviewLaterIds(new Set());
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 border border-slate-700"
                    >
                      Ricomincia Mazzo
                    </button>
                    {onSendToChat && (
                      <button
                        onClick={() => {
                          onSendToChat(
                            `Ho appena ripassato le flashcard su "${deck.topic}". Mi fai una domanda a bruciapelo per verificare la mia preparazione?`
                          );
                          onClose();
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-xs text-white"
                      >
                        Interrogami in Chat
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
