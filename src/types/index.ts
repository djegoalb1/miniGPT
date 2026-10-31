export type Role = 'user' | 'assistant' | 'system';

export interface ImageAttachment {
  data: string; // base64 without prefix
  mimeType: string;
  previewUrl: string;
  name?: string;
}

export interface Message {
  id: string;
  role: Role;
  content: string;
  timestamp: number;
  image?: ImageAttachment;
  isStreaming?: boolean;
  isError?: boolean;
}

export type AcademicLevel = 
  | 'Scuola Media (11-14 anni)'
  | 'Scuola Superiore (14-19 anni)'
  | 'Università / Concorsi';

export type StudyModeId = 
  | 'tutor'
  | 'solver'
  | 'homework'
  | 'summary'
  | 'exam_oral'
  | 'essay'
  | 'quiz'
  | 'flashcards';

export interface StudyMode {
  id: StudyModeId;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  badge: string;
  color: string;
  systemInstruction: string;
  placeholder: string;
}

export interface Subject {
  id: string;
  name: string;
  icon: string;
  color: string;
  textColor: string;
  bgLight: string;
  borderLight: string;
  samplePrompts: string[];
}

export interface ChatSession {
  id: string;
  title: string;
  subjectId: string;
  modeId: StudyModeId;
  academicLevel: AcademicLevel;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  isPinned?: boolean;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  title: string;
  subject: string;
  topic: string;
  questions: QuizQuestion[];
}

export interface Flashcard {
  id: number;
  front: string;
  back: string;
  hint?: string;
  mastered?: boolean;
}

export interface FlashcardDeck {
  id: string;
  deckTitle: string;
  topic: string;
  subject: string;
  cards: Flashcard[];
  createdAt: number;
}
