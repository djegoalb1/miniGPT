import React, { useState } from 'react';
import { QuizData, QuizQuestion } from '../types';
import { X, CheckCircle, XCircle, Award, Sparkles, RefreshCw, ChevronRight, HelpCircle, Loader2 } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
  initialSubject?: string;
  academicLevel: string;
  onSendToChat?: (text: string) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  initialTopic = '',
  initialSubject = 'Matematica',
  academicLevel,
  onSendToChat,
}) => {
  const [topic, setTopic] = useState(initialTopic || '');
  const [questionCount, setQuestionCount] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);

  // Playing state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  if (!isOpen) return null;

  const handleGenerateQuiz = async (customTopic?: string) => {
    const targetTopic = customTopic || topic;
    if (!targetTopic.trim()) {
      setError('Inserisci un argomento per il quiz.');
      return;
    }

    setLoading(true);
    setError(null);
    setQuizData(null);
    setSelectedAnswers({});
    setCurrentIndex(0);
    setShowExplanation(false);
    setIsFinished(false);

    try {
      const res = await fetch('/api/quiz/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: targetTopic,
          subject: initialSubject,
          academicLevel,
          questionCount,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Errore nella generazione del quiz.');
      }

      const data: QuizData = await res.json();
      if (!data.questions || data.questions.length === 0) {
        throw new Error('Nessuna domanda generata. Riprova con un argomento più dettagliato.');
      }
      setQuizData(data);
    } catch (err: any) {
      setError(err.message || 'Errore di connessione.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // already answered
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optionIndex }));
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (!quizData) return;
    if (currentIndex + 1 < quizData.questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
      // Calculate score and fire confetti if high
      const correct = Object.entries(selectedAnswers).filter(
        ([idx, chosen]) => quizData.questions[Number(idx)]?.correctIndex === chosen
      ).length;
      if (correct / quizData.questions.length >= 0.7) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {}
      }
    }
  };

  const currentQ: QuizQuestion | undefined = quizData?.questions[currentIndex];
  const userChosen = selectedAnswers[currentIndex];
  const totalQuestions = quizData?.questions.length || 0;
  const correctCount = quizData
    ? Object.entries(selectedAnswers).filter(
        ([idx, chosen]) => quizData.questions[Number(idx)]?.correctIndex === chosen
      ).length
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-heading text-white">Quiz Interattivo di Verifica</h3>
              <p className="text-xs text-slate-400">Mettiti alla prova con domande generate da MiniGPT</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {!quizData && !loading && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">
                  Argomento o Capitolo da testare
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Es. Teorema di Pitagora, Seconda Guerra Mondiale, Fotosintesi..."
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-white placeholder-slate-500 outline-none transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && handleGenerateQuiz()}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Numero Domande</label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-slate-300 text-sm focus:border-indigo-500 outline-none"
                  >
                    <option value={3}>3 Domande (Rapido)</option>
                    <option value={5}>5 Domande (Standard)</option>
                    <option value={8}>8 Domande (Approfondito)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Livello</label>
                  <div className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-700/60 text-indigo-300 text-sm truncate">
                    {academicLevel}
                  </div>
                </div>
              </div>

              {/* Quick suggestions */}
              <div className="pt-2">
                <span className="text-xs text-slate-400 font-medium block mb-2">Suggerimenti rapidi:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Equazioni di secondo grado',
                    'La Divina Commedia di Dante',
                    'Prima Guerra Mondiale',
                    'Genetica e Leggi di Mendel',
                    'Present Perfect vs Past Simple',
                  ].map((sugg) => (
                    <button
                      key={sugg}
                      type="button"
                      onClick={() => {
                        setTopic(sugg);
                        handleGenerateQuiz(sugg);
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 text-xs text-slate-300 border border-slate-700 transition-colors"
                    >
                      {sugg}
                    </button>
                  ))}
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-300 text-sm flex items-center gap-2">
                  <XCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="button"
                onClick={() => handleGenerateQuiz()}
                className="w-full mt-3 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Genera Quiz con MiniGPT
              </button>
            </div>
          )}

          {loading && (
            <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
              <Loader2 className="w-10 h-10 text-indigo-400 animate-spin" />
              <p className="text-white font-medium">MiniGPT sta preparando il tuo test scolastico...</p>
              <p className="text-xs text-slate-400">Elaborazione domande calibrate sul tuo livello di studio</p>
            </div>
          )}

          {quizData && !isFinished && currentQ && (
            <div className="space-y-5">
              {/* Progress Bar */}
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>
                  Domanda <strong className="text-indigo-400">{currentIndex + 1}</strong> di {totalQuestions}
                </span>
                <span className="bg-slate-800 px-2 py-0.5 rounded text-indigo-300 border border-slate-700/60">
                  {quizData.topic}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-500 h-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-white font-medium text-base sm:text-lg">
                {currentQ.question}
              </div>

              {/* Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((opt, optIdx) => {
                  const isChosen = userChosen === optIdx;
                  const isCorrect = currentQ.correctIndex === optIdx;
                  const answered = userChosen !== undefined;

                  let btnStyle = 'bg-slate-800/70 hover:bg-slate-700/80 border-slate-700/70 text-slate-200';
                  if (answered) {
                    if (isCorrect) {
                      btnStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-medium';
                    } else if (isChosen) {
                      btnStyle = 'bg-rose-950/60 border-rose-500 text-rose-200 font-medium';
                    } else {
                      btnStyle = 'bg-slate-900/40 border-slate-800 text-slate-500 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={answered}
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-lg bg-slate-900 flex items-center justify-center text-xs font-semibold text-slate-300 border border-slate-700 flex-shrink-0 mt-0.5">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="flex-1 text-sm sm:text-base">{opt}</span>
                      {answered && isCorrect && <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
                      {answered && isChosen && !isCorrect && <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next */}
              {showExplanation && (
                <div className="p-4 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-sm text-indigo-200 space-y-3 animate-in fade-in duration-200">
                  <div className="flex items-center gap-1.5 font-semibold text-indigo-300">
                    <HelpCircle className="w-4 h-4" />
                    <span>Spiegazione del Tutor:</span>
                  </div>
                  <p className="leading-relaxed text-slate-200 text-xs sm:text-sm">{currentQ.explanation}</p>
                  <div className="flex justify-end pt-1">
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm flex items-center gap-1.5 transition-colors shadow-md"
                    >
                      <span>{currentIndex + 1 < totalQuestions ? 'Prossima Domanda' : 'Vedi Risultato'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {isFinished && quizData && (
            <div className="py-6 text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-xl shadow-indigo-500/20">
                <Award className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-2xl font-bold font-heading text-white">Quiz Completato!</h4>
                <p className="text-slate-400 text-sm mt-1">
                  Hai risposto correttamente a <strong className="text-indigo-400">{correctCount}</strong> su{' '}
                  <strong>{totalQuestions}</strong> domande.
                </p>
                <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-slate-800 text-sm font-semibold border border-slate-700">
                  Voto stimato:{' '}
                  <span className={correctCount / totalQuestions >= 0.6 ? 'text-emerald-400' : 'text-rose-400'}>
                    {Math.round((correctCount / totalQuestions) * 10 * 10) / 10} / 10
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/60 text-left text-xs sm:text-sm text-slate-300">
                <p className="font-semibold text-white mb-1">Consiglio del tutor:</p>
                {correctCount / totalQuestions >= 0.8
                  ? 'Eccellente padronanza! Sei pronto per compiti in classe ed interrogazioni su questo argomento.'
                  : correctCount / totalQuestions >= 0.6
                  ? 'Buona preparazione, ma ripassa i punti dove hai sbagliato prima della verifica orale.'
                  : 'Ti conviene fare un ripasso approfondito con MiniGPT: chiedi di spiegarti i punti oscuri!'}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAnswers({});
                    setCurrentIndex(0);
                    setShowExplanation(false);
                    setIsFinished(false);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-medium border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Ripeti questo Quiz
                </button>

                {onSendToChat && (
                  <button
                    type="button"
                    onClick={() => {
                      onSendToChat(
                        `Ho appena fatto un quiz su "${quizData.topic}" e ho fatto ${correctCount}/${totalQuestions}. Mi aiuteresti a ripassare gli errori e a chiarire i concetti fondamentali?`
                      );
                      onClose();
                    }}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-medium flex items-center justify-center gap-1.5 transition-colors shadow-lg shadow-indigo-600/30"
                  >
                    <span>Ripassa in Chat con MiniGPT</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
