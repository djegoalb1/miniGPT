import express, { Request, Response } from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { searchKnowledgeBase } from './src/constants/schoolKnowledgeBase';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

// OverControl API configuration provided by user
const OVERCONTROL_API_KEY =
  process.env.OVERCONTROL_API_KEY ||
  'oc_sk_k_uATWuyJAjZwB_f5MDrmuvbvPRMqc2832XRlitsDX_4cuTudLF-RsYWjs';
const OVERCONTROL_BASE_URL = 'https://api.overcontrolgroup.com/v1';

// Shared server-side Gemini client
const getAiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY_MISSING');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};

// Helper: Normalize messages into valid alternating user/model contents for Gemini
function formatAndSanitizeContents(
  rawMessages: Array<{ role: string; content?: string }>,
  image?: { mimeType: string; data: string }
) {
  const validMessages = rawMessages.filter(
    (m, idx) => (m.content && m.content.trim().length > 0) || (idx === rawMessages.length - 1 && image)
  );

  if (validMessages.length === 0) {
    return [];
  }

  const coalesced: Array<{ role: 'user' | 'model'; text: string; hasImage?: boolean }> = [];

  for (let i = 0; i < validMessages.length; i++) {
    const m = validMessages[i];
    const role: 'user' | 'model' = m.role === 'assistant' || m.role === 'model' ? 'model' : 'user';
    const text = (m.content || '').trim();
    const isLast = i === validMessages.length - 1;

    if (coalesced.length > 0 && coalesced[coalesced.length - 1].role === role) {
      coalesced[coalesced.length - 1].text += `\n\n${text}`;
      if (isLast && image) {
        coalesced[coalesced.length - 1].hasImage = true;
      }
    } else {
      coalesced.push({
        role,
        text,
        hasImage: isLast && Boolean(image),
      });
    }
  }

  if (coalesced[coalesced.length - 1].role !== 'user') {
    coalesced.push({
      role: 'user',
      text: 'Continua e approfondisci la spiegazione per favore.',
    });
  }

  return coalesced.map((item) => {
    const parts: Array<{ text?: string; inlineData?: { mimeType: string; data: string } }> = [];

    if (item.hasImage && image && image.data && image.mimeType) {
      parts.push({
        inlineData: {
          mimeType: image.mimeType,
          data: image.data,
        },
      });
    }

    parts.push({ text: item.text || 'Aiutami con questa lezione' });

    return {
      role: item.role,
      parts,
    };
  });
}

// Helper: Stream from OverControl API (lume-2)
async function streamOverControl(
  messages: Array<{ role: string; content: string }>,
  systemPrompt: string,
  res: Response
) {
  console.log('Routing request to OverControl AI (lume-2)...');

  const formattedMsgs = [
    { role: 'system', content: systemPrompt },
    ...messages.map((m) => ({
      role: m.role === 'model' || m.role === 'assistant' ? 'assistant' : 'user',
      content: m.content || '',
    })),
  ];

  const upstreamRes = await fetch(`${OVERCONTROL_BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OVERCONTROL_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'lume-2',
      messages: formattedMsgs,
      stream: true,
      temperature: 0.6,
    }),
  });

  if (!upstreamRes.ok) {
    const errText = await upstreamRes.text();
    throw new Error(`OverControl error ${upstreamRes.status}: ${errText}`);
  }

  const reader = upstreamRes.body?.getReader();
  if (!reader) throw new Error('Cannot read OverControl stream');

  const decoder = new TextDecoder();
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

      if (dataStr === '[DONE]') {
        break;
      }

      try {
        const parsed = JSON.parse(dataStr);
        const deltaText = parsed.choices?.[0]?.delta?.content;
        if (deltaText) {
          res.write(`data: ${JSON.stringify({ text: deltaText })}\n\n`);
        }
      } catch {}
    }
  }

  res.write('data: [DONE]\n\n');
  res.end();
}

// API: Stream chat completion
app.post('/api/chat/stream', async (req: Request, res: Response) => {
  const { messages, systemInstruction, image, subject, academicLevel } = req.body;

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: 'Nessun messaggio fornito.' });
    return;
  }

  // Set headers for SSE streaming
  res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('X-Accel-Buffering', 'no');
  res.flushHeaders?.();

  const baseSystemPrompt = `Sei MiniGPT, un tutor e assistente IA per la scuola e lo studio, empatico, chiaro, rigoroso e pedagogicamente impeccabile.
Comunichi in italiano (o nella lingua richiesta dallo studente per le materie linguistiche).
Livello scolastico attuale: ${academicLevel || 'Scuola Superiore (14-19 anni)'}.
Materia attuale: ${subject || 'Tutte le Materie'}.

Regole pedagogiche fondamentali:
1. Spiega in modo chiaro e comprensibile per l'età e il livello dello studente. Sii vivace, incoraggiante e diretto.
2. Quando lo studente pone un problema o esercizio (matematica, fisica, chimica, grammatica), mostra sempre i passaggi logici intermedi commentando il "perché" di ciascun passaggio.
3. Utilizza la notazione matematica LaTeX (delimitata da $...$ per formule in linea e $$...$$ per formule in blocco) quando ci sono espressioni, equazioni, frazioni o teoremi (es: $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$).
4. Usa elenchi puntati, tabelle comparative o grassetti strategici per rendere la lettura agile e piacevole.
5. Incoraggia lo studente e concludi con una breve domanda di verifica o un suggerimento pratico di ripasso per consolidare l'apprendimento.`;

  const fullInstruction = systemInstruction
    ? `${baseSystemPrompt}\n\nIstruzioni specifiche per questa modalità:\n${systemInstruction}`
    : baseSystemPrompt;

  // Strategy 1: If OverControl key is provided, we can use it directly or as Gemini fallback!
  let usedOverControl = false;

  // Try Gemini first if no image, or try OverControl immediately if image not present
  try {
    const ai = getAiClient();
    const formattedContents = formatAndSanitizeContents(messages, image);

    if (formattedContents.length === 0) {
      res.status(400).json({ error: 'Messaggi non validi o vuoti.' });
      return;
    }

    const streamResponse = await ai.models.generateContentStream({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: fullInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      },
    });

    for await (const chunk of streamResponse) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
    return;
  } catch (geminiErr: any) {
    console.warn('Gemini stream failed or quota reached. Switching to OverControl AI...', geminiErr?.status || geminiErr?.message);
  }

  // Strategy 2: OverControl (lume-2)
  try {
    const cleanHistory = messages.map((m: any) => ({
      role: m.role === 'assistant' ? 'assistant' : 'user',
      content: String(m.content || ''),
    }));

    await streamOverControl(cleanHistory, fullInstruction, res);
    usedOverControl = true;
    return;
  } catch (ocErr: any) {
    console.error('OverControl stream also failed:', ocErr?.message);
  }

  // Strategy 3: Built-in School Curriculum Knowledge Base
  try {
    const lastUserMsg = messages.filter((m: any) => m.role === 'user').pop();
    const queryText = (lastUserMsg?.content || '').toLowerCase();
    const lesson = searchKnowledgeBase(queryText, subject);

    let fallbackText = '';
    if (lesson) {
      fallbackText = lesson.content;
    } else {
      fallbackText = `### MiniGPT - Guida allo Studio: ${subject || 'Argomento Scolastico'}\n\nEcco i punti cardine per studiare questo argomento:\n\n1. **Inquadra il concetto fondamentale:** Definisci chiaramente i termini chiave e il contesto storico/scientifico.\n2. **Schema logico:** Suddividi l'argomento in cause, svolgimento e conseguenze.\n3. **Formule e Regole:** Memorizza le formule o definizioni applicandole a 2 esercizi pratici.\n\nPoni un'altra domanda specifica o scegli uno degli argomenti suggeriti in alto!`;
    }

    const chunks = fallbackText.match(/.{1,40}/gs) || [fallbackText];
    for (const c of chunks) {
      res.write(`data: ${JSON.stringify({ text: c })}\n\n`);
      await new Promise((r) => setTimeout(r, 12));
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (finalErr: any) {
    console.error('Final fallback error:', finalErr);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Errore temporaneo. Riprova tra poco.' });
    } else {
      res.write(`data: ${JSON.stringify({ error: 'Errore temporaneo.' })}\n\n`);
      res.write('data: [DONE]\n\n');
      res.end();
    }
  }
});

// API: Generate structured school quiz
app.post('/api/quiz/generate', async (req: Request, res: Response) => {
  const { topic, subject, academicLevel, questionCount = 5 } = req.body;

  if (!topic) {
    res.status(400).json({ error: 'Specifica un argomento per il quiz.' });
    return;
  }

  const prompt = `Crea un quiz scolastico rigoroso e coinvolgente sull'argomento: "${topic}".
Materia: ${subject || 'Generale'}.
Livello scolastico: ${academicLevel || 'Scuola Superiore'}.
Numero di domande: ${Math.min(Math.max(questionCount, 3), 8)}.

Per ogni domanda fornisci:
- Domanda chiara (può includere formule LaTeX $...$)
- 4 opzioni di risposta (A, B, C, D)
- Indice della risposta corretta (0-3)
- Spiegazione dettagliata ed educativa del perché la risposta corretta è valida.

Restituisci ESCLUSIVAMENTE un JSON valido (senza testo introduttivo né commenti) con questa struttura esatta:
{
  "title": "Titolo del Quiz",
  "subject": "${subject || 'Generale'}",
  "topic": "${topic}",
  "questions": [
    {
      "id": 1,
      "question": "Testo della domanda?",
      "options": ["Opzione A", "Opzione B", "Opzione C", "Opzione D"],
      "correctIndex": 0,
      "explanation": "Spiegazione approfondita..."
    }
  ]
}`;

  // Try Gemini first
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });
    const parsed = JSON.parse(response.text || '{}');
    if (parsed.questions?.length > 0) {
      res.json(parsed);
      return;
    }
  } catch (geminiErr) {
    console.log('Gemini quiz failed. Switching to OverControl...');
  }

  // Try OverControl
  try {
    const ocRes = await fetch(`${OVERCONTROL_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OVERCONTROL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'lume-2',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      }),
    });
    const ocData = await ocRes.json();
    const rawContent = ocData.choices?.[0]?.message?.content || '{}';
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.questions?.length > 0) {
        res.json(parsed);
        return;
      }
    }
  } catch (ocErr) {
    console.error('OverControl quiz error:', ocErr);
  }

  // Static Fallback
  res.json({
    title: `Quiz di Verifica: ${topic}`,
    subject: subject || 'Generale',
    topic,
    questions: [
      {
        id: 1,
        question: `Qual è il concetto o evento fondamentale legato a "${topic}"?`,
        options: [
          'La causa storica e il contesto culturale originario',
          'Una teoria secondaria priva di riscontri',
          'Un elemento non correlato alla materia',
          'Una legge abrogata nel secolo scorso',
        ],
        correctIndex: 0,
        explanation: `Nel programma scolastico, l'inquadramento delle cause e del contesto di "${topic}" è il primo punto valutato dai docenti.`,
      },
      {
        id: 2,
        question: `Quale metodo di studio è più efficace per padroneggiare "${topic}"?`,
        options: [
          'Memorizzazione passiva senza esercizi',
          'Schematizzazione per punti chiave e applicazione pratica',
          'Ignorare le definizioni cardine',
          'Leggere velocemente una sola volta',
        ],
        correctIndex: 1,
        explanation: 'La schematizzazione logica unita alla risoluzione di problemi e domande guida assicura ottimi risultati nelle verifiche.',
      },
    ],
  });
});

// API: Generate structured flashcards
app.post('/api/flashcards/generate', async (req: Request, res: Response) => {
  const { topic, subject, count = 6 } = req.body;

  if (!topic) {
    res.status(400).json({ error: 'Specifica un argomento per le flashcard.' });
    return;
  }

  const prompt = `Crea un set di ${count} flashcard educative per memorizzare concetti chiave, formule o definizioni su: "${topic}".
Materia: ${subject || 'Generale'}.

Restituisci ESCLUSIVAMENTE un JSON valido (senza testo markdown attorno) con questa struttura esatta:
{
  "deckTitle": "Mazzo: ${topic}",
  "topic": "${topic}",
  "cards": [
    {
      "id": 1,
      "front": "Domanda, termine chiave o formula da completare",
      "back": "Definizione chiara, spiegazione essenziale o soluzione",
      "hint": "Suggerimento mnemonico facoltativo"
    }
  ]
}`;

  // Try Gemini
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
      },
    });
    const parsed = JSON.parse(response.text || '{}');
    if (parsed.cards?.length > 0) {
      res.json(parsed);
      return;
    }
  } catch (e) {
    console.log('Gemini flashcards failed. Switching to OverControl...');
  }

  // Try OverControl
  try {
    const ocRes = await fetch(`${OVERCONTROL_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${OVERCONTROL_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'lume-2',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.2,
      }),
    });
    const ocData = await ocRes.json();
    const rawContent = ocData.choices?.[0]?.message?.content || '{}';
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.cards?.length > 0) {
        res.json(parsed);
        return;
      }
    }
  } catch (e) {
    console.error('OverControl flashcards error:', e);
  }

  // Static Fallback
  res.json({
    deckTitle: `Mazzo: ${topic}`,
    topic,
    cards: [
      {
        id: 1,
        front: `Concetto Fondamentale di ${topic}`,
        back: `La definizione essenziale da ricordare per interrogazioni ed esami su questo tema.`,
        hint: 'Definizione cardine',
      },
      {
        id: 2,
        front: `Applicazione o Regola Chiave`,
        back: `Come applicare le proprietà e i teoremi correlati a ${topic}.`,
        hint: 'Metodo pratico',
      },
    ],
  });
});

// Mount Vite middleware in development or serve static in production
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`MiniGPT server running on http://localhost:${port}`);
  });
}

startServer();
