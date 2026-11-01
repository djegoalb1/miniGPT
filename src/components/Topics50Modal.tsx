import React, { useState, useMemo } from 'react';
import {
  X,
  Search,
  BookOpen,
  Sparkles,
  HelpCircle,
  RotateCw,
  ArrowRight,
  Calculator,
  Zap,
  FlaskConical,
  Landmark,
  BookMarked,
  Compass,
  Languages,
  CheckCircle2,
} from 'lucide-react';
import { BASIC_TOPICS_50, BasicTopic } from '../constants/topics50Data';

interface Topics50ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTopicForChat: (prompt: string, subjectId: string) => void;
  onOpenQuizForTopic: (topic: string, subject: string) => void;
  onOpenFlashcardsForTopic: (topic: string, subject: string) => void;
}

const SUBJECT_ICONS: Record<string, React.ReactNode> = {
  math: <Calculator className="w-4 h-4 text-blue-400" />,
  physics: <Zap className="w-4 h-4 text-amber-400" />,
  history: <Landmark className="w-4 h-4 text-orange-400" />,
  literature: <BookMarked className="w-4 h-4 text-pink-400" />,
  science: <FlaskConical className="w-4 h-4 text-emerald-400" />,
  philosophy: <Compass className="w-4 h-4 text-purple-400" />,
  english: <Languages className="w-4 h-4 text-cyan-400" />,
};

const SUBJECT_BADGE_COLORS: Record<string, string> = {
  math: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
  physics: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
  history: 'bg-orange-500/15 text-orange-300 border-orange-500/30',
  literature: 'bg-pink-500/15 text-pink-300 border-pink-500/30',
  science: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
  philosophy: 'bg-purple-500/15 text-purple-300 border-purple-500/30',
  english: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
};

export const Topics50Modal: React.FC<Topics50ModalProps> = ({
  isOpen,
  onClose,
  onSelectTopicForChat,
  onOpenQuizForTopic,
  onOpenFlashcardsForTopic,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedTopicPreview, setSelectedTopicPreview] = useState<BasicTopic | null>(null);

  const subjectsList = [
    { id: 'all', name: 'Tutti (50)' },
    { id: 'math', name: 'Matematica (10)' },
    { id: 'physics', name: 'Fisica (8)' },
    { id: 'history', name: 'Storia (10)' },
    { id: 'literature', name: 'Italiano (8)' },
    { id: 'science', name: 'Scienze & Chimica (8)' },
    { id: 'philosophy', name: 'Filosofia (4)' },
    { id: 'english', name: 'Inglese (2)' },
  ];

  const filteredTopics = useMemo(() => {
    return BASIC_TOPICS_50.filter((t) => {
      const matchSubject =
        selectedSubjectFilter === 'all' || t.subjectId === selectedSubjectFilter;
      const q = searchQuery.toLowerCase();
      const matchSearch =
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.summary.toLowerCase().includes(q) ||
        t.keyConcepts.some((k) => k.toLowerCase().includes(q));
      return matchSubject && matchSearch;
    });
  }, [searchQuery, selectedSubjectFilter]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl h-[88vh] bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-bold font-heading text-white">
                  50 Argomenti Base per la Scuola
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  50 Lezioni Pronte
                </span>
              </div>
              <p className="text-xs text-slate-400">
                I concetti cardine più chiesti in verifiche e interrogazioni di medie, superiori e maturità.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Bar & Search */}
        <div className="p-3 sm:p-4 bg-slate-900/60 border-b border-slate-800 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca tra i 50 argomenti base (es. Pitagora, Newton, Rivoluzione, Dante, DNA)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Subjects Filter Chips */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {subjectsList.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelectedSubjectFilter(s.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium transition-colors ${
                  selectedSubjectFilter === s.id
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>

        {/* Main Body: Grid of 50 Topics */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {filteredTopics.length === 0 ? (
            <div className="p-12 text-center text-slate-500 space-y-3">
              <BookOpen className="w-12 h-12 mx-auto text-slate-600" />
              <p className="text-sm">Nessun argomento corrisponde alla ricerca.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSubjectFilter('all');
                }}
                className="text-xs text-indigo-400 underline"
              >
                Reimposta filtri
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
              {filteredTopics.map((topic) => {
                const badgeColor =
                  SUBJECT_BADGE_COLORS[topic.subjectId] ||
                  'bg-slate-800 text-slate-300 border-slate-700';

                return (
                  <div
                    key={topic.id}
                    className="p-4 rounded-2xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-all flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border flex items-center gap-1 ${badgeColor}`}
                        >
                          {SUBJECT_ICONS[topic.subjectId]}
                          <span>{topic.subject}</span>
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {topic.category}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold font-heading text-white group-hover:text-indigo-300 transition-colors line-clamp-2">
                        {topic.title}
                      </h4>

                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {topic.summary}
                      </p>

                      {/* Key concepts tags */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {topic.keyConcepts.slice(0, 2).map((k, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800/80 text-slate-400 truncate max-w-[140px]"
                          >
                            {k}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectTopicForChat(topic.samplePrompt, topic.subjectId);
                        }}
                        className="flex-1 py-1.5 px-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                        title="Spiega questo argomento in chat"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Spiega</span>
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onOpenQuizForTopic(topic.title, topic.subject);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                        title="Crea Quiz di verifica su questo argomento"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onOpenFlashcardsForTopic(topic.title, topic.subject);
                        }}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                        title="Crea Mazzo Flashcard su questo argomento"
                      >
                        <RotateCw className="w-3.5 h-3.5 text-violet-400" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-slate-800 bg-slate-900 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>50 Lezioni e schemi base pronti per verifiche, interrogazioni e compiti</span>
          </div>
          <button
            onClick={onClose}
            className="py-1.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
