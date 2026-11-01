import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
  Legend,
} from 'recharts';
import {
  X,
  BarChart2,
  Clock,
  BookOpen,
  Sparkles,
  TrendingUp,
  Award,
  Calendar,
  Layers,
  CheckCircle2,
  HelpCircle,
  RotateCw,
} from 'lucide-react';
import { ChatSession } from '../types';
import { SCHOOL_SUBJECTS, STUDY_MODES } from '../constants/schoolData';

interface StudyStatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: ChatSession[];
  onOpenQuizForTopic?: (topic: string, subject: string) => void;
}

const SUBJECT_COLORS: Record<string, string> = {
  history: '#f59e0b', // Amber
  math: '#6366f1', // Indigo
  physics: '#0ea5e9', // Sky
  italian: '#ec4899', // Pink
  science: '#10b981', // Emerald
  philosophy: '#8b5cf6', // Violet
  latin: '#d97706', // Yellow-orange
  english: '#06b6d4', // Cyan
  all: '#64748b', // Slate
};

export const StudyStatsModal: React.FC<StudyStatsModalProps> = ({
  isOpen,
  onClose,
  sessions,
  onOpenQuizForTopic,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'subjects' | 'time'>('overview');

  // Compute analytics
  const stats = useMemo(() => {
    let totalMessages = 0;
    let totalUserQuestions = 0;
    let totalEstimatedMinutes = 0;

    const subjectCounts: Record<string, { count: number; messages: number; minutes: number }> = {};
    const modeCounts: Record<string, number> = {};
    const dayActivityMap: Record<string, number> = {};

    // Initialize last 7 days
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dayKey = d.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric' });
      dayActivityMap[dayKey] = 0;
    }

    sessions.forEach((s) => {
      const msgCount = s.messages.length;
      totalMessages += msgCount;

      const userMsgs = s.messages.filter((m) => m.role === 'user').length;
      totalUserQuestions += userMsgs;

      // Realistic study time estimation:
      // Minimum 4 mins per session with 1 message, plus ~3 mins for each follow-up Q&A
      const sessionMinutes = Math.min(Math.max(userMsgs * 4, msgCount > 0 ? 5 : 0), 60);
      totalEstimatedMinutes += sessionMinutes;

      // Subject stats
      const subjId = s.subjectId || 'all';
      if (!subjectCounts[subjId]) {
        subjectCounts[subjId] = { count: 0, messages: 0, minutes: 0 };
      }
      subjectCounts[subjId].count += 1;
      subjectCounts[subjId].messages += msgCount;
      subjectCounts[subjId].minutes += sessionMinutes;

      // Mode stats
      const modeId = s.modeId || 'tutor';
      modeCounts[modeId] = (modeCounts[modeId] || 0) + 1;

      // Day activity mapping
      const sessionDate = new Date(s.updatedAt || s.createdAt || Date.now());
      const dayDiff = Math.floor((now.getTime() - sessionDate.getTime()) / (1000 * 60 * 60 * 24));
      if (dayDiff >= 0 && dayDiff < 7) {
        const dayKey = sessionDate.toLocaleDateString('it-IT', { weekday: 'short', day: 'numeric' });
        dayActivityMap[dayKey] = (dayActivityMap[dayKey] || 0) + sessionMinutes;
      }
    });

    // Format subjects data for Recharts
    const subjectChartData = Object.entries(subjectCounts).map(([id, data]) => {
      const subjectObj = SCHOOL_SUBJECTS.find((sub) => sub.id === id);
      return {
        id,
        name: subjectObj?.name || 'Generale',
        sessions: data.count,
        messages: data.messages,
        minutes: data.minutes,
        color: SUBJECT_COLORS[id] || '#6366f1',
      };
    });
    // Sort by minutes descending
    subjectChartData.sort((a, b) => b.minutes - a.minutes);

    // Format day activity data for AreaChart
    const timelineData = Object.entries(dayActivityMap).map(([day, minutes]) => ({
      day,
      minuti: minutes,
    }));

    // Format mode distribution data
    const modeChartData = Object.entries(modeCounts).map(([id, count]) => {
      const modeObj = STUDY_MODES.find((m) => m.id === id);
      return {
        name: modeObj?.name || id,
        count,
      };
    });

    // Top subject
    const topSubject = subjectChartData[0] || null;

    // Format total time in hours and minutes
    const hours = Math.floor(totalEstimatedMinutes / 60);
    const mins = totalEstimatedMinutes % 60;
    const formattedTotalTime = hours > 0 ? `${hours}h ${mins}m` : `${mins} min`;

    // Smart pedagogical feedback
    let advice = 'Continua a esplorare più materie con MiniGPT per consolidare la tua preparazione.';
    if (topSubject && topSubject.sessions > 2) {
      advice = `Ottimo approfondimento su **${topSubject.name}** (${topSubject.minutes} min di studio)! Fai un Quiz di verifica rapido per testare la tua padronanza.`;
    } else if (totalMessages > 10) {
      advice = 'Ottimo ritmo di studio! Prova a creare un mazzo di Flashcard per fissare le formule e le date chiave prima della verifica.';
    }

    return {
      totalSessions: sessions.length,
      totalMessages,
      totalUserQuestions,
      totalEstimatedMinutes,
      formattedTotalTime,
      subjectChartData,
      timelineData,
      modeChartData,
      topSubject,
      advice,
    };
  }, [sessions]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 font-sans"
      >
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 bg-slate-900/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <BarChart2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-xl font-bold font-heading text-white">
                  Statistiche di Studio dello Studente
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Recharts AI
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Monitora il tempo dedicato, le materie più studiate e il ritmo di apprendimento.
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

        {/* Navigation Tabs */}
        <div className="px-4 sm:px-6 pt-3 bg-slate-900/50 border-b border-slate-800 flex items-center gap-2 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Panoramica & KPI</span>
          </button>

          <button
            onClick={() => setActiveTab('subjects')}
            className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'subjects'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Materie Più Studiate</span>
          </button>

          <button
            onClick={() => setActiveTab('time')}
            className={`pb-2.5 px-3 font-semibold transition-colors border-b-2 flex items-center gap-1.5 ${
              activeTab === 'time'
                ? 'border-indigo-500 text-indigo-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Tempo & Attività Giornaliera</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-medium uppercase tracking-wider">Tempo Totale</span>
                <Clock className="w-4 h-4 text-sky-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                {stats.formattedTotalTime}
              </p>
              <span className="text-[10px] text-slate-500 block">Stimato su {stats.totalSessions} lezioni</span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-medium uppercase tracking-wider">Domande Fatte</span>
                <HelpCircle className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold font-heading text-white">
                {stats.totalUserQuestions}
              </p>
              <span className="text-[10px] text-slate-500 block">{stats.totalMessages} messaggi totali</span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-medium uppercase tracking-wider">Materia Top</span>
                <Award className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-xl sm:text-2xl font-extrabold font-heading text-white truncate">
                {stats.topSubject ? stats.topSubject.name : 'Generale'}
              </p>
              <span className="text-[10px] text-amber-400/90 block">
                {stats.topSubject ? `${stats.topSubject.sessions} sessioni` : 'Inizia a studiare'}
              </span>
            </div>

            <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-slate-400">
                <span className="text-[11px] font-medium uppercase tracking-wider">Modalità Preferita</span>
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-base sm:text-lg font-bold font-heading text-white truncate mt-1">
                {stats.modeChartData[0]?.name || 'Tutor Socratico'}
              </p>
              <span className="text-[10px] text-purple-300 block">Metodo attivo</span>
            </div>
          </div>

          {/* Smart Pedagogical Advice Card */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/30 flex items-start gap-3">
            <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 flex-shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="flex-1 text-xs text-slate-300 space-y-1">
              <span className="font-semibold text-white block">Consiglio Didattico di MiniGPT:</span>
              <p className="leading-relaxed">{stats.advice}</p>
            </div>
            {stats.topSubject && onOpenQuizForTopic && (
              <button
                onClick={() => {
                  onClose();
                  onOpenQuizForTopic(stats.topSubject.name, stats.topSubject.id);
                }}
                className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs whitespace-nowrap transition-colors"
              >
                Quiz su {stats.topSubject.name}
              </button>
            )}
          </div>

          {/* Tab 1: Overview Charts */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart: Materie Più Studiate */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-heading text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-indigo-400" />
                    <span>Distribuzione Materie</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">Per minuti di studio</span>
                </div>

                <div className="h-60 w-full">
                  {stats.subjectChartData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.subjectChartData}
                          dataKey="minutes"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={55}
                          outerRadius={85}
                          paddingAngle={4}
                        >
                          {stats.subjectChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="#020617" strokeWidth={2} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#0f172a',
                            borderColor: '#334155',
                            borderRadius: '12px',
                            fontSize: '12px',
                            color: '#fff',
                          }}
                          formatter={(value: any) => [`${value} min`, 'Tempo di studio']}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-slate-500">
                      Nessun dato ancora disponibile.
                    </div>
                  )}
                </div>

                {/* Legend list */}
                <div className="flex flex-wrap gap-2 pt-1 text-[11px]">
                  {stats.subjectChartData.map((s) => (
                    <span key={s.id} className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-slate-300 font-medium">{s.name}:</span>
                      <span className="text-slate-400">{s.minutes}m</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Area Chart: Andamento Attività Ultimi 7 Giorni */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-heading text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                    <span>Ritmo di Studio Settimanale</span>
                  </h4>
                  <span className="text-[11px] text-slate-500">Minuti/giorno</span>
                </div>

                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={stats.timelineData}>
                      <defs>
                        <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#6366f1" stopOpacity={0.7} />
                          <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                      <XAxis dataKey="day" stroke="#64748b" fontSize={11} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} unit="m" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#334155',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#fff',
                        }}
                        formatter={(val: any) => [`${val} minuti`, 'Tempo di studio']}
                      />
                      <Area
                        type="monotone"
                        dataKey="minuti"
                        stroke="#818cf8"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorMinutes)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>Visualizzazione andamento ultimi 7 giorni</span>
                  <span className="text-indigo-400 font-medium">Aggiornato in tempo reale</span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Detailed Subjects Breakdown */}
          {activeTab === 'subjects' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-heading text-white">
                    Classifica Materie Più Approfondite
                  </h4>
                  <span className="text-xs text-slate-400">Ore e lezioni per argomento</span>
                </div>

                {/* BarChart of subjects */}
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stats.subjectChartData} layout="vertical" margin={{ left: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                      <XAxis type="number" stroke="#64748b" fontSize={11} unit=" min" />
                      <YAxis dataKey="name" type="category" stroke="#cbd5e1" fontSize={12} tickLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#334155',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#fff',
                        }}
                        formatter={(val: any) => [`${val} min`, 'Tempo di Studio']}
                      />
                      <Bar dataKey="minutes" radius={[0, 8, 8, 0]}>
                        {stats.subjectChartData.map((entry, index) => (
                          <Cell key={`bar-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Table Breakdown */}
                <div className="overflow-x-auto pt-2">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[10px]">
                        <th className="py-2.5 px-3">Materia</th>
                        <th className="py-2.5 px-3">Sessioni</th>
                        <th className="py-2.5 px-3">Messaggi</th>
                        <th className="py-2.5 px-3 text-right">Tempo Stimato</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 text-slate-300">
                      {stats.subjectChartData.map((s) => (
                        <tr key={s.id} className="hover:bg-slate-900/60 transition-colors">
                          <td className="py-2.5 px-3 flex items-center gap-2 font-medium text-white">
                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
                            <span>{s.name}</span>
                          </td>
                          <td className="py-2.5 px-3">{s.sessions} lezioni</td>
                          <td className="py-2.5 px-3">{s.messages} scambi</td>
                          <td className="py-2.5 px-3 text-right font-mono font-medium text-indigo-300">
                            {s.minutes} min
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Time and Session Duration */}
          {activeTab === 'time' && (
            <div className="space-y-4">
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold font-heading text-white">
                    Dettaglio Sessioni Recenti e Durata
                  </h4>
                  <span className="text-xs text-slate-400">Ultime lezioni completate</span>
                </div>

                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {sessions.slice(0, 10).map((s, idx) => {
                    const subj = SCHOOL_SUBJECTS.find((sub) => sub.id === s.subjectId);
                    const userMsgs = s.messages.filter((m) => m.role === 'user').length;
                    const sessionMins = Math.min(Math.max(userMsgs * 4, s.messages.length > 0 ? 5 : 0), 60);

                    return (
                      <div
                        key={s.id || idx}
                        className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 flex items-center justify-between text-xs"
                      >
                        <div className="min-w-0 pr-3">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-white truncate">{s.title}</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                              {subj?.name || 'Materia'}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 block mt-0.5">
                            {new Date(s.updatedAt || Date.now()).toLocaleDateString('it-IT', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>

                        <div className="text-right flex-shrink-0">
                          <span className="font-mono font-bold text-sky-400 block">
                            ~{sessionMins} min
                          </span>
                          <span className="text-[10px] text-slate-500">
                            {s.messages.length} messaggi
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-900/90 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Statistiche sincronizzate con il database di studio</span>
          </div>

          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            Chiudi
          </button>
        </div>
      </div>
    </div>
  );
};
