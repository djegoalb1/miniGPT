import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
  signInAnonymously,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { ChatSession } from '../types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Safe Google Sign-In with popup handling
export async function signInWithGooglePopup() {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    if (error?.code === 'auth/popup-blocked' || (error?.message && error.message.includes('popup-blocked'))) {
      const customErr = new Error('POPUP_BLOCKED');
      (customErr as any).code = 'auth/popup-blocked';
      throw customErr;
    }
    throw error;
  }
}

// 1-Click Anonymous Student Registration (bypasses any browser popup block)
export async function signInAsGuestStudent(studentName = 'Studente', academicLevel?: string) {
  const cred = await signInAnonymously(auth);
  if (cred.user) {
    const userRef = doc(db, 'users', cred.user.uid);
    try {
      await setDoc(
        userRef,
        {
          uid: cred.user.uid,
          email: `${(studentName || 'studente').toLowerCase().replace(/\s+/g, '')}@scuola.ai`,
          displayName: studentName.trim() || 'Studente',
          photoURL: '',
          schoolLevel: academicLevel || 'Scuola Superiore (14-19 anni)',
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (e) {
      console.error('Failed to set initial student profile:', e);
    }
  }
  return cred;
}

// User Profile management
export async function saveUserProfile(user: User, extraInfo?: { schoolLevel?: string }) {
  const userRef = doc(db, 'users', user.uid);
  try {
    await setDoc(
      userRef,
      {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || 'Studente',
        photoURL: user.photoURL || '',
        schoolLevel: extraInfo?.schoolLevel || 'Scuola Superiore (14-19 anni)',
        updatedAt: new Date().toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${user.uid}`);
  }
}

export async function getUserProfile(uid: string) {
  const userRef = doc(db, 'users', uid);
  try {
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (err) {
    handleFirestoreError(err, OperationType.GET, `users/${uid}`);
    return null;
  }
}

// User Chat Sessions in Firestore
export async function saveUserChatToFirestore(userId: string, session: ChatSession) {
  const chatRef = doc(db, 'users', userId, 'chats', session.id);
  try {
    await setDoc(
      chatRef,
      {
        id: session.id,
        userId,
        title: session.title,
        subjectId: session.subjectId,
        modeId: session.modeId,
        academicLevel: session.academicLevel,
        messages: JSON.stringify(session.messages),
        isPinned: Boolean(session.isPinned),
        updatedAt: new Date(session.updatedAt || Date.now()).toISOString(),
        createdAt: new Date(session.createdAt || Date.now()).toISOString(),
      },
      { merge: true }
    );
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `users/${userId}/chats/${session.id}`);
  }
}

export async function loadUserChatsFromFirestore(userId: string): Promise<ChatSession[]> {
  const chatsColl = collection(db, 'users', userId, 'chats');
  try {
    const snap = await getDocs(chatsColl);
    const sessions: ChatSession[] = [];
    snap.forEach((d) => {
      const data = d.data();
      let messages = [];
      try {
        messages = JSON.parse(data.messages || '[]');
      } catch {}
      sessions.push({
        id: data.id || d.id,
        title: data.title || 'Lezione',
        subjectId: data.subjectId || 'all',
        modeId: data.modeId || 'tutor',
        academicLevel: data.academicLevel || 'Scuola Superiore (14-19 anni)',
        messages,
        isPinned: Boolean(data.isPinned),
        createdAt: data.createdAt ? new Date(data.createdAt).getTime() : Date.now(),
        updatedAt: data.updatedAt ? new Date(data.updatedAt).getTime() : Date.now(),
      });
    });
    // Sort by updatedAt desc
    sessions.sort((a, b) => (b.updatedAt || 0) - (a.updatedAt || 0));
    return sessions;
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, `users/${userId}/chats`);
    return [];
  }
}

export async function deleteUserChatFromFirestore(userId: string, chatId: string) {
  const chatRef = doc(db, 'users', userId, 'chats', chatId);
  try {
    await deleteDoc(chatRef);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `users/${userId}/chats/${chatId}`);
  }
}

// Test connection on boot per Firebase guidelines
async function testConnection() {
  try {
    const { getDocFromServer } = await import('firebase/firestore');
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error('Please check your Firebase configuration.');
    }
  }
}
testConnection();

