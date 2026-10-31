import React, { useState, useRef, useEffect } from 'react';
import {
  ChatSession,
  Message,
  StudyModeId,
  ImageAttachment,
  AcademicLevel,
} from '../types';
import {
  STUDY_MODES,
  SCHOOL_SUBJECTS,
  QUICK_STUDY_TOOLS,
} from '../constants/schoolData';
import { MarkdownRenderer } from './MarkdownRenderer';
import {
  Send,
  Square,
  Paperclip,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Copy,
  Check,
  Sparkles,
  Menu,
  GraduationCap,
  HelpCircle,
  RotateCw,
  Download,
  Share2,
  Trash2,
  X,
  ChevronDown,
  ArrowRight,
  BookOpen,
  Image as ImageIcon,
  Zap,
} from 'lucide-react';

interface ChatViewProps {
  session: ChatSession;
  onSendMessage: (content: string, image?: ImageAttachment) => Promise<void>;
  onStopStreaming: () => void;
  isStreaming: boolean;
  academicLevel: AcademicLevel;
  onChangeSubject: (subjectId: string) => void;
  onChangeMode: (modeId: StudyModeId) => void;
  onClearSession: () => void;
  onOpenMobileSidebar: () => void;
  onOpenQuizForTopic: (topic: string, subject: string) => void;
  onOpenFlashcardsForTopic: (topic: string, subject: string) => void;
  onViewImage: (url: string) => void;
}

export const ChatView: React.FC<ChatViewProps> = ({
  session,
  onSendMessage,
  onStopStreaming,
  isStreaming,
  academicLevel,
  onChangeSubject,
  onChangeMode,
  onClearSession,
  onOpenMobileSidebar,
  onOpenQuizForTopic,
  onOpenFlashcardsForTopic,
  onViewImage,
}) => {
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<ImageAttachment | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null);
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(null);
  const [modeDropdownOpen, setModeDropdownOpen] = useState(false);
  const [subjectDropdownOpen, setSubjectDropdownOpen] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  const currentMode = STUDY_MODES.find((m) => m.id === session.modeId) || STUDY_MODES[0];
  const currentSubject = SCHOOL_SUBJECTS.find((s) => s.id === session.subjectId) || SCHOOL_SUBJECTS[0];

  // Auto scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [session.messages, isStreaming]);

  // Adjust textarea height
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 180)}px`;
    }
  }, [inputText]);

  // Handle speech recognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'it-IT';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const toggleSpeechRecognition = () => {
    if (!recognitionRef.current) {
      alert('Il tuo browser non supporta il riconoscimento vocale.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        setIsListening(false);
      }
    }
  };

  // Text to speech
  const handleToggleSpeak = (msgId: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (speakingMessageId === msgId) {
      window.speechSynthesis.cancel();
      setSpeakingMessageId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Strip markdown formatting for cleaner speech
    const cleanText = text
      .replace(/[#*`_~$\\]/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .slice(0, 1000); // safety cap

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'it-IT';
    utterance.rate = 1.0;

    utterance.onend = () => setSpeakingMessageId(null);
    utterance.onerror = () => setSpeakingMessageId(null);

    setSpeakingMessageId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopyMessage = (msgId: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(msgId);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleSend = async () => {
    if ((!inputText.trim() && !attachedImage) || isStreaming) return;

    const textToSend = inputText.trim();
    const imageToSend = attachedImage || undefined;

    setInputText('');
    setAttachedImage(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    await onSendMessage(textToSend, imageToSend);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // File upload handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Carica solo file immagine (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const base64Data = result.split(',')[1];
      setAttachedImage({
        data: base64Data,
        mimeType: file.type,
        previewUrl: result,
        name: file.name,
      });
    };
    reader.readAsDataURL(file);
  };

  // Drag and drop & clipboard paste
  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) {
          processImageFile(file);
          e.preventDefault();
          break;
        }
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processImageFile(file);
    }
  };

  // Export chat as markdown notes
  const handleExportNotes = () => {
    if (session.messages.length === 0) return;

    let content = `# Appunti di Studio: ${session.title}\n`;
    content += `Materia: ${currentSubject.name} | Modalità: ${currentMode.name} | Livello: ${academicLevel}\n`;
    content += `Data: ${new Date().toLocaleDateString('it-IT')}\n\n---\n\n`;

    session.messages.forEach((m) => {
      const speaker = m.role === 'user' ? 'Studente' : 'MiniGPT';
      content += `### ${speaker}:\n${m.content}\n\n`;
    });

    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MiniGPT_${session.title.replace(/[^a-z0-9]/gi, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div
      className="flex-1 flex flex-col h-full bg-slate-950 overflow-hidden relative"
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragOver(true);
      }}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
    >
      {/* Drag & drop overlay */}
      {isDragOver && (
        <div className="absolute inset-0 z-50 bg-indigo-950/80 backdrop-blur-sm border-2 border-dashed border-indigo-400 flex flex-col items-center justify-center pointer-events-none">
          <ImageIcon className="w-16 h-16 text-indigo-300 animate-bounce" />
          <p className="text-xl font-bold font-heading text-white mt-3">
            Rilascia la foto del compito o dell'esercizio
          </p>
          <p className="text-sm text-indigo-200">MiniGPT leggerà ed analizzerà l'immagine</p>
        </div>
      )}

      {/* Top Navbar */}
      <header className="h-16 px-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex items-center justify-between z-30 flex-shrink-0">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <button
            onClick={onOpenMobileSidebar}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Subject Picker Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setSubjectDropdownOpen(!subjectDropdownOpen);
                setModeDropdownOpen(false);
              }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all ${currentSubject.bgLight} ${currentSubject.borderLight} ${currentSubject.textColor}`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="truncate max-w-[110px] sm:max-w-none">{currentSubject.name}</span>
              <ChevronDown className="w-3 h-3 opacity-70" />
            </button>

            {subjectDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-60 z-50 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 max-h-80 overflow-y-auto">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                  Seleziona Materia
                </span>
                {SCHOOL_SUBJECTS.map((subj) => (
                  <button
                    key={subj.id}
                    onClick={() => {
                      onChangeSubject(subj.id);
                      setSubjectDropdownOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs transition-colors text-left ${
                      subj.id === session.subjectId
                        ? 'bg-indigo-600 text-white font-medium'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <span className="truncate">{subj.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Study Mode Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setModeDropdownOpen(!modeDropdownOpen);
                setSubjectDropdownOpen(false);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700/80 text-xs text-slate-200 transition-colors"
            >
              <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-medium truncate max-w-[120px] sm:max-w-none">{currentMode.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {modeDropdownOpen && (
              <div className="absolute left-0 top-full mt-1.5 w-72 z-50 bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-1.5 space-y-1">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 block">
                  Modalità di Studio
                </span>
                {STUDY_MODES.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => {
                      onChangeMode(mode.id);
                      setModeDropdownOpen(false);
                    }}
                    className={`w-full flex flex-col p-2.5 rounded-xl text-xs text-left transition-colors ${
                      mode.id === session.modeId
                        ? 'bg-indigo-600/30 border border-indigo-500/50 text-indigo-200'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">{mode.name}</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                        {mode.badge}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">
                      {mode.description}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right header actions */}
        <div className="flex items-center gap-1 sm:gap-2">
          {session.messages.length > 0 && (
            <>
              <button
                onClick={handleExportNotes}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                title="Esporta appunti in Markdown"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={onClearSession}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Pulisci chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}

          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-[11px] text-slate-300">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>{academicLevel.split(' ')[0]}</span>
          </div>
        </div>
      </header>

      {/* Main Chat Messages Stream or Empty State */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {session.messages.length === 0 ? (
          /* Empty State Welcome */
          <div className="max-w-2xl mx-auto py-8 sm:py-12 space-y-8 animate-in fade-in duration-300">
            {/* Hero Banner */}
            <div className="text-center space-y-3">
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 text-white shadow-xl shadow-indigo-500/25">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-tight">
                MiniGPT per la Scuola
              </h2>
              <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto leading-relaxed">
                Il tuo tutor AI dedicato allo studio: spiegazioni passo-passo, risoluzione formule, verifica compiti e mappe concettuali.
              </p>
            </div>

            {/* Current Mode Card Highlight */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-indigo-500/30 shadow-lg flex items-start gap-3.5">
              <div className="p-2.5 rounded-xl bg-indigo-500/20 text-indigo-300 mt-0.5">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-white text-sm">Modalità Attiva: {currentMode.name}</h4>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-medium">
                    {currentSubject.name}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {currentMode.description}
                </p>
              </div>
            </div>

            {/* Quick Starters Carousel for current subject */}
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
                <span>Domande di partenza per {currentSubject.name}:</span>
                <span className="text-indigo-400">Clicca per inviare</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {currentSubject.samplePrompts.map((promptText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSendMessage(promptText)}
                    className="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-850 hover:border-indigo-500/50 border border-slate-800 text-left transition-all group flex items-start justify-between gap-2 shadow-sm"
                  >
                    <span className="text-xs text-slate-200 group-hover:text-white leading-relaxed">
                      {promptText}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 flex-shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div
                onClick={() => onOpenQuizForTopic(currentSubject.name, currentSubject.name)}
                className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 cursor-pointer text-center space-y-1.5 transition-colors"
              >
                <HelpCircle className="w-5 h-5 mx-auto text-indigo-400" />
                <span className="text-xs font-semibold text-white block">Quiz Interattivi</span>
                <span className="text-[10px] text-slate-400 block">Verifiche a risposta multipla</span>
              </div>
              <div
                onClick={() => onOpenFlashcardsForTopic(currentSubject.name, currentSubject.name)}
                className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 cursor-pointer text-center space-y-1.5 transition-colors"
              >
                <RotateCw className="w-5 h-5 mx-auto text-violet-400" />
                <span className="text-xs font-semibold text-white block">Flashcard 3D</span>
                <span className="text-[10px] text-slate-400 block">Ripasso formule e date</span>
              </div>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 cursor-pointer text-center space-y-1.5 transition-colors"
              >
                <Paperclip className="w-5 h-5 mx-auto text-emerald-400" />
                <span className="text-xs font-semibold text-white block">Foto del Compito</span>
                <span className="text-[10px] text-slate-400 block">Carica o incolla quaderno</span>
              </div>
            </div>
          </div>
        ) : (
          /* Messages Stream */
          <div className="max-w-3xl mx-auto space-y-6">
            {session.messages.map((message) => {
              const isUser = message.role === 'user';
              const isSpeaking = speakingMessageId === message.id;
              const isCopied = copiedMessageId === message.id;

              return (
                <div
                  key={message.id}
                  className={`flex gap-3 sm:gap-4 ${
                    isUser ? 'justify-end' : 'justify-start'
                  } group`}
                >
                  {!isUser && (
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 flex-shrink-0 mt-1">
                      <GraduationCap className="w-4 h-4" />
                    </div>
                  )}

                  <div
                    className={`relative max-w-[88%] sm:max-w-[82%] rounded-2xl px-4 py-3.5 ${
                      isUser
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
                        : message.isError
                        ? 'bg-rose-950/40 border border-rose-800/60 text-rose-200'
                        : 'bg-slate-900 border border-slate-800/90 text-slate-200 shadow-lg'
                    }`}
                  >
                    {/* Attached image if any */}
                    {message.image && (
                      <div className="mb-3">
                        <img
                          src={message.image.previewUrl}
                          alt="Compito allegato"
                          onClick={() => onViewImage(message.image!.previewUrl)}
                          className="max-h-56 rounded-xl object-contain border border-white/20 cursor-pointer hover:opacity-95 transition-opacity bg-black/40"
                          title="Clicca per ingrandire"
                        />
                      </div>
                    )}

                    {/* Content */}
                    {isUser ? (
                      <p className="whitespace-pre-wrap text-[14px] sm:text-[15px] leading-relaxed">
                        {message.content}
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {message.isStreaming && !message.content ? (
                          <div className="flex items-center gap-2 py-1 text-sm text-indigo-300">
                            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                            <span className="font-medium">MiniGPT sta preparando la spiegazione...</span>
                          </div>
                        ) : (
                          <>
                            <MarkdownRenderer content={message.content} />
                            {message.isStreaming && (
                              <span className="inline-block w-2 h-4 ml-1 bg-indigo-400 animate-pulse align-middle" />
                            )}
                          </>
                        )}
                        {message.isError && (
                          <div className="pt-2">
                            <button
                              onClick={() => {
                                const lastUserMsg = session.messages
                                  .filter((m) => m.role === 'user')
                                  .pop();
                                if (lastUserMsg) {
                                  onSendMessage(lastUserMsg.content, lastUserMsg.image);
                                }
                              }}
                              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-medium text-white transition-colors"
                            >
                              Riprova ora
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Assistant Message Actions Toolbar */}
                    {!isUser && !message.isStreaming && !message.isError && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-3 mt-2 border-t border-slate-800/70 text-xs text-slate-400">
                        {/* Audio speak */}
                        <button
                          onClick={() => handleToggleSpeak(message.id, message.content)}
                          className={`flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-800 transition-colors ${
                            isSpeaking ? 'text-indigo-400 font-medium' : 'text-slate-400 hover:text-white'
                          }`}
                          title="Ascolta spiegazione"
                        >
                          {isSpeaking ? (
                            <>
                              <VolumeX className="w-3.5 h-3.5 text-indigo-400" />
                              <span>Ferma audio</span>
                            </>
                          ) : (
                            <>
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Ascolta</span>
                            </>
                          )}
                        </button>

                        {/* Copy message */}
                        <button
                          onClick={() => handleCopyMessage(message.id, message.content)}
                          className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="Copia spiegazione"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span className="text-emerald-400">Copiato</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copia</span>
                            </>
                          )}
                        </button>

                        {/* Create Quiz from this topic */}
                        <button
                          onClick={() =>
                            onOpenQuizForTopic(session.title || currentSubject.name, currentSubject.name)
                          }
                          className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-indigo-950/60 text-slate-400 hover:text-indigo-300 transition-colors"
                          title="Genera quiz su questo argomento"
                        >
                          <HelpCircle className="w-3.5 h-3.5 text-indigo-400" />
                          <span>Fai un Quiz</span>
                        </button>

                        {/* Create Flashcards */}
                        <button
                          onClick={() =>
                            onOpenFlashcardsForTopic(session.title || currentSubject.name, currentSubject.name)
                          }
                          className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-violet-950/60 text-slate-400 hover:text-violet-300 transition-colors"
                          title="Genera flashcard per memorizzare"
                        >
                          <RotateCw className="w-3.5 h-3.5 text-violet-400" />
                          <span>Flashcard</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Dock & Prompt Toolbar */}
      <footer className="p-3 sm:p-4 bg-slate-900/90 border-t border-slate-800/80 backdrop-blur-md z-20 flex-shrink-0">
        <div className="max-w-3xl mx-auto space-y-2.5">
          {/* Quick study helper chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            {QUICK_STUDY_TOOLS.map((tool) => (
              <button
                key={tool.id}
                type="button"
                onClick={() => onSendMessage(tool.prompt)}
                disabled={isStreaming}
                className="px-2.5 py-1 rounded-full bg-slate-800/90 hover:bg-slate-750 text-slate-300 hover:text-white border border-slate-700/60 whitespace-nowrap transition-colors flex items-center gap-1 text-[11px] disabled:opacity-40"
              >
                <span>{tool.title}</span>
              </button>
            ))}
          </div>

          {/* Attached image preview pill */}
          {attachedImage && (
            <div className="inline-flex items-center gap-2 p-1.5 pr-3 rounded-xl bg-slate-800 border border-indigo-500/40 text-xs text-white">
              <img
                src={attachedImage.previewUrl}
                alt="Allegato"
                className="w-8 h-8 rounded-lg object-cover"
              />
              <span className="truncate max-w-[180px]">{attachedImage.name || 'Foto del compito'}</span>
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="p-1 rounded-md text-slate-400 hover:text-rose-400 hover:bg-slate-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Input Box */}
          <div className="relative rounded-2xl bg-slate-950 border border-slate-700/80 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 shadow-xl transition-all">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              placeholder={currentMode.placeholder}
              rows={1}
              className="w-full pl-4 pr-24 py-3 bg-transparent text-white placeholder-slate-500 text-sm sm:text-base outline-none resize-none max-h-44 leading-relaxed"
            />

            {/* Hidden file input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Input Action Controls (Right side) */}
            <div className="absolute right-2.5 bottom-2 flex items-center gap-1">
              {/* Attach image button */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className={`p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ${
                  attachedImage ? 'text-indigo-400' : ''
                }`}
                title="Carica foto del quaderno o problema"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              {/* Voice recognition */}
              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`p-2 rounded-xl transition-colors ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
                title="Dettatura vocale"
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Send or Stop button */}
              {isStreaming ? (
                <button
                  type="button"
                  onClick={onStopStreaming}
                  className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/30 transition-all"
                  title="Interrompi risposta"
                >
                  <Square className="w-4 h-4 fill-current" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSend}
                  disabled={!inputText.trim() && !attachedImage}
                  className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-30 disabled:hover:bg-indigo-600 text-white shadow-md shadow-indigo-600/30 transition-all"
                  title="Invia domanda (Invio)"
                >
                  <Send className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <p className="text-[11px] text-center text-slate-500">
            MiniGPT è il tuo tutor scolastico IA. Ricorda di verificare sempre con i tuoi libri di testo.
          </p>
        </div>
      </footer>
    </div>
  );
};
