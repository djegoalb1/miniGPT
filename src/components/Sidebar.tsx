import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { ChatSession, AcademicLevel } from '../types';
import { SCHOOL_SUBJECTS, ACADEMIC_LEVELS } from '../constants/schoolData';
import {
  Plus,
  Search,
  MessageSquare,
  Pin,
  Trash2,
  Edit2,
  Sparkles,
  HelpCircle,
  RotateCw,
  GraduationCap,
  ChevronDown,
  X,
  BookOpen,
  Home,
  LogOut,
  LogIn,
  ShieldCheck,
  User as UserIcon,
} from 'lucide-react';

interface SidebarProps {
  sessions: ChatSession[];
  currentSessionId: string | null;
  onSelectSession: (id: string) => void;
  onNewChat: (subjectId?: string) => void;
  onDeleteSession: (id: string) => void;
  onTogglePinSession: (id: string) => void;
  onRenameSession: (id: string, newTitle: string) => void;
  academicLevel: AcademicLevel;
  onChangeAcademicLevel: (level: AcademicLevel) => void;
  onOpenQuiz: () => void;
  onOpenFlashcards: () => void;
  isOpen: boolean;
  onCloseMobile: () => void;
  currentUser: User | null;
  onLogin: () => void;
  onLogout: () => void;
  onGoHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  sessions,
  currentSessionId,
  onSelectSession,
  onNewChat,
  onDeleteSession,
  onTogglePinSession,
  onRenameSession,
  academicLevel,
  onChangeAcademicLevel,
  onOpenQuiz,
  onOpenFlashcards,
  isOpen,
  onCloseMobile,
  currentUser,
  onLogin,
  onLogout,
  onGoHome,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [levelDropdownOpen, setLevelDropdownOpen] = useState(false);

  // Filter sessions
  const filteredSessions = sessions.filter((s) => {
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject = selectedSubjectFilter === 'all' || s.subjectId === selectedSubjectFilter;
    return matchesSearch && matchesSubject;
  });

  // Group sessions by pinned vs today vs older
  const pinnedSessions = filteredSessions.filter((s) => s.isPinned);
  const unpinnedSessions = filteredSessions.filter((s) => !s.isPinned);

  const now = Date.now();
  const oneDayMs = 24 * 60 * 60 * 1000;

  const todaySessions = unpinnedSessions.filter((s) => now - s.updatedAt < oneDayMs);
  const olderSessions = unpinnedSessions.filter((s) => now - s.updatedAt >= oneDayMs);

  const startRename = (s: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingId(s.id);
    setEditTitle(s.title);
  };

  const saveRename = (id: string) => {
    if (editTitle.trim()) {
      onRenameSession(id, editTitle.trim());
    }
    setEditingId(null);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-72 sm:w-80 bg-slate-900/95 border-r border-slate-800/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* App Logo & Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={onGoHome}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold font-heading tracking-tight text-white">MiniGPT</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  SCUOLA
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Tutor AI per Studenti</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Back to Home & New Chat Bar */}
        <div className="p-3.5 space-y-2 border-b border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onNewChat()}
              className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium text-xs sm:text-sm shadow-md shadow-indigo-500/20 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-1.5">
                <Plus className="w-4 h-4 transition-transform group-hover:rotate-90 duration-200" />
                <span>Nuova Lezione</span>
              </div>
              <span className="text-[10px] font-mono bg-white/10 px-1.5 py-0.5 rounded text-white/80">Ctrl+N</span>
            </button>

            <button
              onClick={onGoHome}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
              title="Torna alla Homepage di presentazione"
            >
              <Home className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={onOpenQuiz}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
              <span>Quiz Rapido</span>
            </button>
            <button
              onClick={onOpenFlashcards}
              className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5 text-violet-400" />
              <span>Flashcard</span>
            </button>
          </div>
        </div>

        {/* Academic Level Selector */}
        <div className="px-3.5 py-2.5 border-b border-slate-800/60 relative">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
            <span>Livello Scolastico</span>
            <span className="text-[10px] text-indigo-400">Calibra IA</span>
          </div>

          <button
            type="button"
            onClick={() => setLevelDropdownOpen(!levelDropdownOpen)}
            className="w-full px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-800 border border-slate-700/70 text-slate-200 text-xs font-medium flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2 truncate">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
              <span className="truncate">{academicLevel}</span>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                levelDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>

          {levelDropdownOpen && (
            <div className="absolute left-3.5 right-3.5 top-full mt-1.5 z-50 bg-slate-900 border border-slate-700 rounded-xl shadow-xl p-1 space-y-1">
              {ACADEMIC_LEVELS.map((lvl) => (
                <button
                  key={lvl.id}
                  onClick={() => {
                    onChangeAcademicLevel(lvl.id);
                    setLevelDropdownOpen(false);
                  }}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-colors flex flex-col ${
                    academicLevel === lvl.id
                      ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/40'
                      : 'hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <span className="font-semibold">{lvl.label}</span>
                  <span className="text-[10px] text-slate-400">{lvl.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search & Subject filter */}
        <div className="p-3 border-b border-slate-800/60 space-y-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cerca nelle spiegazioni..."
              className="w-full pl-8 pr-3 py-1.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs text-white placeholder-slate-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Subjects mini badges carousel */}
          <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-none text-[11px]">
            {SCHOOL_SUBJECTS.slice(0, 6).map((subj) => (
              <button
                key={subj.id}
                onClick={() => setSelectedSubjectFilter(subj.id)}
                className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors ${
                  selectedSubjectFilter === subj.id
                    ? 'bg-indigo-600 text-white font-medium'
                    : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                {subj.name.split(' ')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Sessions List */}
        <div className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
          {sessions.length === 0 ? (
            <div className="p-6 text-center text-slate-500 text-xs space-y-2">
              <MessageSquare className="w-8 h-8 mx-auto text-slate-600" />
              <p>Nessuna chat recente.</p>
              <p className="text-[11px] text-slate-500">
                Fai una domanda per iniziare la tua prima sessione di studio!
              </p>
            </div>
          ) : (
            <>
              {/* Pinned sessions */}
              {pinnedSessions.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                    <Pin className="w-3 h-3" />
                    <span>In Evidenza</span>
                  </div>
                  <div className="space-y-0.5">
                    {pinnedSessions.map((session) => renderSessionItem(session))}
                  </div>
                </div>
              )}

              {/* Today sessions */}
              {todaySessions.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    Oggi
                  </div>
                  <div className="space-y-0.5">
                    {todaySessions.map((session) => renderSessionItem(session))}
                  </div>
                </div>
              )}

              {/* Older sessions */}
              {olderSessions.length > 0 && (
                <div>
                  <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                    Precedenti
                  </div>
                  <div className="space-y-0.5">
                    {olderSessions.map((session) => renderSessionItem(session))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* User Account & Database Firewall Status Card */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/80">
          {currentUser ? (
            <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/80 border border-slate-800">
              <div className="flex items-center gap-2 min-w-0">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt={currentUser.displayName || 'Utente'}
                    className="w-8 h-8 rounded-full border border-indigo-500/40 object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-indigo-600/30 text-indigo-300 flex items-center justify-center font-bold text-xs border border-indigo-500/30">
                    {(currentUser.displayName || currentUser.email || 'S')[0].toUpperCase()}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-white truncate">
                    {currentUser.displayName || 'Studente'}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400">
                    <ShieldCheck className="w-3 h-3" />
                    <span className="truncate">Database Firewall Attivo</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Disconnetti"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs text-indigo-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Salvataggio su Cloud</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Accedi per salvare i tuoi appunti e le tue chat su database protetto.
              </p>
              <button
                onClick={onLogin}
                className="w-full py-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Accedi con Google</span>
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );

  function renderSessionItem(session: ChatSession) {
    const isCurrent = session.id === currentSessionId;
    const isEditing = editingId === session.id;
    const subject = SCHOOL_SUBJECTS.find((s) => s.id === session.subjectId);

    return (
      <div
        key={session.id}
        onClick={() => {
          if (!isEditing) onSelectSession(session.id);
        }}
        className={`group relative flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
          isCurrent
            ? 'bg-slate-800 text-white font-medium border border-slate-700'
            : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-indigo-500/70 flex-shrink-0" />

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={() => saveRename(session.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') saveRename(session.id);
              if (e.key === 'Escape') setEditingId(null);
            }}
            autoFocus
            className="flex-1 bg-slate-950 px-2 py-0.5 rounded border border-indigo-500 text-white text-xs outline-none"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="flex-1 min-w-0 pr-1">
            <p className="truncate">{session.title}</p>
            {subject && (
              <span className="text-[10px] text-slate-400 block truncate">
                {subject.name}
              </span>
            )}
          </div>
        )}

        {/* Hover Action icons */}
        <div
          className={`flex items-center gap-1 transition-opacity ${
            isCurrent ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTogglePinSession(session.id);
            }}
            className={`p-1 rounded hover:bg-slate-700 transition-colors ${
              session.isPinned ? 'text-amber-400' : 'text-slate-400 hover:text-white'
            }`}
            title={session.isPinned ? 'Rimuovi evidenza' : 'Fissa in alto'}
          >
            <Pin className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={(e) => startRename(session, e)}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            title="Rinomina"
          >
            <Edit2 className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteSession(session.id);
            }}
            className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
            title="Elimina"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }
};
