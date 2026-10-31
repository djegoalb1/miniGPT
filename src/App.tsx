import React, { useState, useEffect, useRef } from 'react';
import { User, onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import {
  ChatSession,
  Message,
  AcademicLevel,
  StudyModeId,
  ImageAttachment,
} from './types';
import { STUDY_MODES } from './constants/schoolData';
import {
  auth,
  googleProvider,
  saveUserProfile,
  saveUserChatToFirestore,
  loadUserChatsFromFirestore,
  deleteUserChatFromFirestore,
} from './services/firebase';
import { Sidebar } from './components/Sidebar';
import { ChatView } from './components/ChatView';
import { Homepage } from './components/Homepage';
import { QuizModal } from './components/QuizModal';
import { FlashcardsModal } from './components/FlashcardsModal';
import { ImagePreviewModal } from './components/ImagePreviewModal';

const STORAGE_KEY_SESSIONS = 'minigpt_school_sessions_v1';
const STORAGE_KEY_LEVEL = 'minigpt_school_level_v1';
const STORAGE_KEY_TRIALS = 'minigpt_guest_trials_count_v1';
const MAX_GUEST_TRIALS = 3;

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'home' | 'app'>('home');

  // Guest trials tracking
  const [guestTrialCount, setGuestTrialCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_TRIALS);
      if (saved) return parseInt(saved, 10) || 0;
    } catch {}
    return 0;
  });

  const [academicLevel, setAcademicLevel] = useState<AcademicLevel>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LEVEL);
      if (saved) return saved as AcademicLevel;
    } catch {}
    return 'Scuola Superiore (14-19 anni)';
  });

  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_SESSIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {}
    return [createNewSessionObject('history', 'tutor', 'Scuola Superiore (14-19 anni)')];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    return sessions[0]?.id || '';
  });

  const [isStreaming, setIsStreaming] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Modals
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizTopic, setQuizTopic] = useState('');
  const [quizSubject, setQuizSubject] = useState('Storia');

  const [flashcardsModalOpen, setFlashcardsModalOpen] = useState(false);
  const [flashcardsTopic, setFlashcardsTopic] = useState('');
  const [flashcardsSubject, setFlashcardsSubject] = useState('Storia');

  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  // Firebase Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setAuthLoading(false);

      if (user) {
        // Save user profile to Firestore
        try {
          await saveUserProfile(user, { schoolLevel: academicLevel });
        } catch (e) {
          console.error('Failed to save user profile:', e);
        }

        // Load user chats from cloud database
        try {
          const cloudChats = await loadUserChatsFromFirestore(user.uid);
          if (cloudChats.length > 0) {
            setSessions(cloudChats);
            setCurrentSessionId(cloudChats[0].id);
          } else if (sessions.length > 0 && sessions[0].messages.length > 0) {
            // Sync initial local sessions to user cloud account
            for (const s of sessions) {
              await saveUserChatToFirestore(user.uid, s);
            }
          }
        } catch (e) {
          console.error('Failed to load cloud chats:', e);
        }
      }
    });

    return () => unsubscribe();
  }, [academicLevel]);

  // Persist guest trials to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_TRIALS, guestTrialCount.toString());
    } catch {}
  }, [guestTrialCount]);

  // Persist sessions to localStorage (as local cache)
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_SESSIONS, JSON.stringify(sessions));
    } catch (e) {
      console.error('Failed to save sessions to localStorage', e);
    }
  }, [sessions]);

  // Save academic level
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_LEVEL, academicLevel);
    } catch {}
  }, [academicLevel]);

  // Keyboard shortcut Ctrl+N for new chat
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
        e.preventDefault();
        handleCreateNewChat();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentSession = sessions.find((s) => s.id === currentSessionId) || sessions[0];

  function createNewSessionObject(
    subjectId = 'history',
    modeId: StudyModeId = 'tutor',
    level = academicLevel
  ): ChatSession {
    return {
      id: `chat_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: 'Nuova Spiegazione',
      subjectId,
      modeId,
      academicLevel: level,
      messages: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
  }

  // Auth actions
  const handleLoginWithGoogle = async () => {
    const cred = await signInWithPopup(auth, googleProvider);
    if (cred.user) {
      setViewMode('app');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setCurrentUser(null);
    setViewMode('home');
  };

  const handleCreateNewChat = (subjectId?: string) => {
    const newSession = createNewSessionObject(subjectId || currentSession?.subjectId || 'all');
    setSessions((prev) => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
    setMobileSidebarOpen(false);

    if (currentUser) {
      saveUserChatToFirestore(currentUser.uid, newSession);
    }
  };

  const handleDeleteSession = async (id: string) => {
    if (currentUser) {
      try {
        await deleteUserChatFromFirestore(currentUser.uid, id);
      } catch (e) {
        console.error('Failed to delete cloud chat:', e);
      }
    }

    setSessions((prev) => {
      const remaining = prev.filter((s) => s.id !== id);
      if (remaining.length === 0) {
        const fresh = createNewSessionObject();
        setCurrentSessionId(fresh.id);
        return [fresh];
      }
      if (currentSessionId === id) {
        setCurrentSessionId(remaining[0].id);
      }
      return remaining;
    });
  };

  const handleTogglePinSession = (id: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = { ...s, isPinned: !s.isPinned };
          if (currentUser) {
            saveUserChatToFirestore(currentUser.uid, updated);
          }
          return updated;
        }
        return s;
      })
    );
  };

  const handleRenameSession = (id: string, newTitle: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const updated = { ...s, title: newTitle };
          if (currentUser) {
            saveUserChatToFirestore(currentUser.uid, updated);
          }
          return updated;
        }
        return s;
      })
    );
  };

  const handleChangeSubject = (subjectId: string) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === currentSessionId) {
          const updated = { ...s, subjectId };
          if (currentUser) {
            saveUserChatToFirestore(currentUser.uid, updated);
          }
          return updated;
        }
        return s;
      })
    );
  };

  const handleChangeMode = (modeId: StudyModeId) => {
    setSessions((prev) =>
      prev.map((s) => {
        if (s.id === currentSessionId) {
          const updated = { ...s, modeId };
          if (currentUser) {
            saveUserChatToFirestore(currentUser.uid, updated);
          }
          return updated;
        }
        return s;
      })
    );
  };

  const handleClearSession = () => {
    if (window.confirm('Vuoi davvero cancellare i messaggi di questa sessione?')) {
      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSessionId) {
            const updated = { ...s, messages: [], title: 'Nuova Spiegazione' };
            if (currentUser) {
              saveUserChatToFirestore(currentUser.uid, updated);
            }
            return updated;
          }
          return s;
        })
      );
    }
  };

  const handleStopStreaming = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    setIsStreaming(false);
  };

  // Helper for homepage guest trial usage
  const handleUseGuestTrial = async (prompt: string): Promise<string> => {
    if (!currentUser && guestTrialCount >= MAX_GUEST_TRIALS) {
      throw new Error('LIMIT_REACHED');
    }

    setGuestTrialCount((prev) => prev + 1);

    const res = await fetch('/api/chat/stream', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [{ role: 'user', content: prompt }],
        subject: 'all',
        academicLevel,
      }),
    });

    if (!res.ok) {
      throw new Error('Errore nella richiesta.');
    }

    const reader = res.body?.getReader();
    if (!reader) throw new Error('Stream non disponibile');

    const decoder = new TextDecoder();
    let accumulated = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed || !trimmed.startsWith('data: ')) continue;
        const dataStr = trimmed.slice(6).trim();
        if (dataStr === '[DONE]') break;
        try {
          const p = JSON.parse(dataStr);
          if (p.text) accumulated += p.text;
        } catch {}
      }
    }

    return accumulated || 'Spiegazione completata!';
  };

  // Main chat streaming sender
  const handleSendMessage = async (text: string, image?: ImageAttachment) => {
    if (!currentSession) return;

    // Check guest limit in app as well
    if (!currentUser && guestTrialCount >= MAX_GUEST_TRIALS) {
      setViewMode('home');
      return;
    }

    if (!currentUser) {
      setGuestTrialCount((prev) => prev + 1);
    }

    const userMessage: Message = {
      id: `msg_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
      image,
    };

    const assistantPlaceholderId = `msg_${Date.now() + 1}`;
    const assistantMessage: Message = {
      id: assistantPlaceholderId,
      role: 'assistant',
      content: '',
      timestamp: Date.now() + 1,
      isStreaming: true,
    };

    const updatedTitle =
      currentSession.messages.length === 0
        ? text.slice(0, 36) + (text.length > 36 ? '...' : '')
        : currentSession.title;

    const previousCleanMessages = currentSession.messages.filter(
      (m) => m.content && m.content.trim().length > 0 && !m.isError
    );

    const updatedMessages = [...currentSession.messages, userMessage, assistantMessage];

    setSessions((prev) =>
      prev.map((s) =>
        s.id === currentSessionId
          ? {
              ...s,
              title: updatedTitle,
              messages: updatedMessages,
              updatedAt: Date.now(),
            }
          : s
      )
    );

    setIsStreaming(true);

    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const currentMode = STUDY_MODES.find((m) => m.id === currentSession.modeId) || STUDY_MODES[0];

    try {
      const historyPayload = [...previousCleanMessages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: abortController.signal,
        body: JSON.stringify({
          messages: historyPayload,
          systemInstruction: currentMode.systemInstruction,
          academicLevel: currentSession.academicLevel || academicLevel,
          subject: currentSession.subjectId,
          image: image
            ? {
                mimeType: image.mimeType,
                data: image.data,
              }
            : undefined,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: 'Errore di risposta' }));
        throw new Error(errorData.error || `Errore HTTP ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('Impossibile aprire lo stream dei dati.');

      const decoder = new TextDecoder();
      let accumulatedText = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith('data: ')) continue;

          const dataStr = trimmed.slice(6).trim();
          if (dataStr === '[DONE]') break;

          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.text) {
              accumulatedText += parsed.text;
              setSessions((prev) =>
                prev.map((s) =>
                  s.id === currentSessionId
                    ? {
                        ...s,
                        messages: s.messages.map((m) =>
                          m.id === assistantPlaceholderId
                            ? { ...m, content: accumulatedText, isStreaming: true }
                            : m
                        ),
                      }
                    : s
                )
              );
            } else if (parsed.error) {
              throw new Error(parsed.error);
            }
          } catch (parseErr: any) {
            if (parseErr.message && !parseErr.message.includes('JSON')) {
              throw parseErr;
            }
          }
        }
      }

      // Check remaining buffer
      if (buffer.trim().startsWith('data: ')) {
        const dataStr = buffer.trim().slice(6).trim();
        if (dataStr && dataStr !== '[DONE]') {
          try {
            const parsed = JSON.parse(dataStr);
            if (parsed.text) accumulatedText += parsed.text;
          } catch {}
        }
      }

      // Finalize streaming
      const finalAssistantMsg: Message = {
        id: assistantPlaceholderId,
        role: 'assistant',
        content: accumulatedText || 'Spiegazione completata.',
        timestamp: Date.now(),
        isStreaming: false,
      };

      setSessions((prev) =>
        prev.map((s) => {
          if (s.id === currentSessionId) {
            const finalMessages = s.messages.map((m) =>
              m.id === assistantPlaceholderId ? finalAssistantMsg : m
            );
            const updatedSession = { ...s, messages: finalMessages, updatedAt: Date.now() };

            // Save to Firebase Firestore if logged in
            if (currentUser) {
              saveUserChatToFirestore(currentUser.uid, updatedSession);
            }

            return updatedSession;
          }
          return s;
        })
      );
    } catch (err: any) {
      if (err.name === 'AbortError') {
        console.log('Stream stopped by user.');
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId
              ? {
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === assistantPlaceholderId ? { ...m, isStreaming: false } : m
                  ),
                }
              : s
          )
        );
      } else {
        let friendlyError = err.message || 'Errore durante la generazione della risposta.';
        setSessions((prev) =>
          prev.map((s) =>
            s.id === currentSessionId
              ? {
                  ...s,
                  messages: s.messages.map((m) =>
                    m.id === assistantPlaceholderId
                      ? {
                          ...m,
                          content: `⚠️ ${friendlyError}\n\nFai clic su "Riprova" o consulta gli argomenti di studio suggeriti in alto.`,
                          isStreaming: false,
                          isError: true,
                        }
                      : m
                  ),
                }
              : s
          )
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  // Launchers for modals
  const handleOpenQuiz = (topic?: string, subject?: string) => {
    setQuizTopic(topic || currentSession?.title || 'Storia: La Rivoluzione Francese');
    setQuizSubject(subject || currentSession?.subjectId || 'Storia');
    setQuizModalOpen(true);
  };

  const handleOpenFlashcards = (topic?: string, subject?: string) => {
    setFlashcardsTopic(topic || currentSession?.title || 'Storia: Date e Concetti Chiave');
    setFlashcardsSubject(subject || currentSession?.subjectId || 'Storia');
    setFlashcardsModalOpen(true);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans antialiased text-slate-100">
      {viewMode === 'home' ? (
        <div className="w-full h-full overflow-y-auto">
          <Homepage
            currentUser={currentUser}
            onLoginWithGoogle={handleLoginWithGoogle}
            onLogout={handleLogout}
            onEnterApp={() => setViewMode('app')}
            guestTrialCount={guestTrialCount}
            onUseGuestTrial={handleUseGuestTrial}
            maxGuestTrials={MAX_GUEST_TRIALS}
          />
        </div>
      ) : (
        <>
          {/* Left Sidebar */}
          <Sidebar
            sessions={sessions}
            currentSessionId={currentSessionId}
            onSelectSession={(id) => {
              setCurrentSessionId(id);
              setMobileSidebarOpen(false);
            }}
            onNewChat={handleCreateNewChat}
            onDeleteSession={handleDeleteSession}
            onTogglePinSession={handleTogglePinSession}
            onRenameSession={handleRenameSession}
            academicLevel={academicLevel}
            onChangeAcademicLevel={setAcademicLevel}
            onOpenQuiz={() => handleOpenQuiz()}
            onOpenFlashcards={() => handleOpenFlashcards()}
            isOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
            currentUser={currentUser}
            onLogin={handleLoginWithGoogle}
            onLogout={handleLogout}
            onGoHome={() => setViewMode('home')}
          />

          {/* Main Chat Area */}
          <main className="flex-1 flex flex-col h-full min-w-0">
            <ChatView
              session={currentSession}
              onSendMessage={handleSendMessage}
              onStopStreaming={handleStopStreaming}
              isStreaming={isStreaming}
              academicLevel={academicLevel}
              onChangeSubject={handleChangeSubject}
              onChangeMode={handleChangeMode}
              onClearSession={handleClearSession}
              onOpenMobileSidebar={() => setMobileSidebarOpen(true)}
              onOpenQuizForTopic={handleOpenQuiz}
              onOpenFlashcardsForTopic={handleOpenFlashcards}
              onViewImage={(url) => setPreviewImageSrc(url)}
            />
          </main>
        </>
      )}

      {/* Interactive Modals */}
      <QuizModal
        isOpen={quizModalOpen}
        onClose={() => setQuizModalOpen(false)}
        initialTopic={quizTopic}
        initialSubject={quizSubject}
        academicLevel={academicLevel}
        onSendToChat={(text) => handleSendMessage(text)}
      />

      <FlashcardsModal
        isOpen={flashcardsModalOpen}
        onClose={() => setFlashcardsModalOpen(false)}
        initialTopic={flashcardsTopic}
        initialSubject={flashcardsSubject}
        onSendToChat={(text) => handleSendMessage(text)}
      />

      <ImagePreviewModal
        src={previewImageSrc}
        onClose={() => setPreviewImageSrc(null)}
      />
    </div>
  );
}
