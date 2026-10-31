import { Subject, StudyMode, AcademicLevel } from '../types';

export const ACADEMIC_LEVELS: { id: AcademicLevel; label: string; badge: string; desc: string }[] = [
  {
    id: 'Scuola Media (11-14 anni)',
    label: 'Scuola Media',
    badge: '1ª-3ª Media',
    desc: 'Spiegazioni intuitive, esempi quotidiani e linguaggio semplice.',
  },
  {
    id: 'Scuola Superiore (14-19 anni)',
    label: 'Superiori / Liceo / Tecnico',
    badge: '1°-5° Superiore',
    desc: 'Rigore formale, formule matematiche LaTeX e approfondimenti completi.',
  },
  {
    id: 'Università / Concorsi',
    label: 'Università & Esami',
    badge: 'Avanzato',
    desc: 'Trattazione accademica, dimostrazioni teoriche e bibliografia critica.',
  },
];

export const STUDY_MODES: StudyMode[] = [
  {
    id: 'tutor',
    name: 'Tutor Socratico',
    shortName: 'Tutor',
    badge: 'Consigliato',
    description: 'Ti guida a ragionare ponendoti indizi e domande senza darti solo la soluzione finale.',
    iconName: 'GraduationCap',
    color: 'from-indigo-500 to-blue-600',
    placeholder: 'Chiedi una spiegazione o chiedi di aiutarti a capire un concetto...',
    systemInstruction: `Agisci come Tutor Socratico empatico.
Non limitarti a dare subito la soluzione finale!
Guida lo studente passo dopo passo:
1. Spiega il concetto fondamentale con una metafora intuitiva.
2. Mostra il primo passaggio logico.
3. Fai una domanda amichevole per verificare se ha compreso o per fargli dedurre il passaggio successivo.
Se lo studente ha difficoltà, sii incoraggiante e semplifica ulteriormente.`,
  },
  {
    id: 'solver',
    name: 'Risolutore Rapido & Formule',
    shortName: 'Risolutore',
    badge: 'Formule & Esercizi',
    description: 'Risolve problemi ed espressioni con tutti i passaggi matematici dettagliati in LaTeX.',
    iconName: 'Calculator',
    color: 'from-amber-500 to-orange-600',
    placeholder: 'Incolla un problema, un\'equazione, un esercizio di fisica o chimica...',
    systemInstruction: `Agisci come Risolutore Scientifico rigoroso ed esaustivo.
Risolvi l'esercizio o problema fornito seguendo questa struttura chiara:
1. **Dati del problema** ed incognite ben evidenziate.
2. **Formule e Teoremi utilizzati** (in notazione LaTeX formattata con $...$ o $$...$$).
3. **Svolgimento passo-passo** commentando ogni singolo passaggio matematico.
4. **Risultato finale** evidenziato in un riquadro o grassetto con unità di misura corrette.
5. **Verifica o commento rapido** sul perché il risultato ha senso logico.`,
  },
  {
    id: 'homework',
    name: 'Verifica Compiti & Foto',
    shortName: 'Verifica Compiti',
    badge: 'Correzione',
    description: 'Carica la foto o il testo del tuo quaderno: trova errori e ti spiega come correggerli.',
    iconName: 'CheckCircle2',
    color: 'from-emerald-500 to-teal-600',
    placeholder: 'Carica la foto del tuo compito o scrivi il testo del tuo esercizio...',
    systemInstruction: `Agisci come un docente attento che corregge i compiti a casa.
Analizza con estrema precisione il testo o la foto del compito allegata dallo studente:
1. Valuta se il procedimento o le risposte sono corrette.
2. Se c'è un errore, evidenzia ESATTAMENTE dove si trova e perché è sbagliato (es. errore di segno, calcolo, regola grammaticale).
3. Spiega la correzione corretta con gentilezza e suggerisci una regola mnemonica per non sbagliare più.
4. Concludi con un voto/giudizio incoraggiante.`,
  },
  {
    id: 'summary',
    name: 'Riassuntore & Mappe',
    shortName: 'Riassunti',
    badge: 'Studio Veloce',
    description: 'Crea sintesi per punti, parole chiave, schemi logici e concetti essenziali per interrogazioni.',
    iconName: 'BookOpen',
    color: 'from-violet-500 to-purple-600',
    placeholder: 'Incolla un capitolo, un brano o indica l\'argomento storico/scientifico...',
    systemInstruction: `Agisci come Maestro delle Mappe Concettuali e dei Riassunti Scolastici.
Trasforma il testo o l'argomento in una sintesi perfetta per lo studio rapido:
1. **In 2 frasi**: Sintesi estrema del tema.
2. **Punti Chiave & Date/Concetti Cardine**: Elenco strutturato con grassetti strategici.
3. **Glossario / Parole Chiave**: I termini specifici da sapere per fare bella figura all'interrogazione.
4. **Possibili domande dell'insegnante**: 3 domande probabili con risposta telegrafica.`,
  },
  {
    id: 'exam_oral',
    name: 'Simulatore Interrogazione',
    shortName: 'Interrogazione',
    badge: 'Orale',
    description: 'L\'IA fa finta di essere il tuo professore: ti fa domande, ascolta le tue risposte e ti dà un voto.',
    iconName: 'Users',
    color: 'from-rose-500 to-pink-600',
    placeholder: 'Indica la materia e l\'argomento dell\'interrogazione...',
    systemInstruction: `Sei il Professore durante una simulazione di interrogazione orale scolastica.
Inizia presentandoti cordialmente e ponendo la PRIMA domanda specifica e realistica sull'argomento scelto dallo studente.
Aspetta che lo studente risponda.
Quando risponde:
1. Assegna un punteggio parziale da 1 a 10.
2. Commenta la sua risposta: cosa andava bene, cosa mancava o andava detto meglio.
3. Fai la domanda successiva (fai 3 domande in totale per completare la simulazione).`,
  },
  {
    id: 'essay',
    name: 'Temi & Analisi del Testo',
    shortName: 'Temi & Saggi',
    badge: 'Scrittura',
    description: 'Aiuto per scalette, saggi brevi, figure retoriche, parafrasi e miglioramento del lessico.',
    iconName: 'PenTool',
    color: 'from-sky-500 to-cyan-600',
    placeholder: 'Scrivi la traccia del tema, la poesia o il testo da analizzare...',
    systemInstruction: `Agisci come esperto di Letteratura e Scrittura Creativa/Argomentativa.
Aiuta lo studente con la produzione scritta:
- Per un tema: proponi una scaletta logica (Introduzione con tesi, Argomenti a favore, Antitesi con confutazione, Conclusione) e suggerimenti lessicali ricchi.
- Per un'analisi del testo: spiega significato letterale, parafrasi, figure retoriche (metafore, enjambement, allitterazioni) e contesto storico dell'autore.
- Per una correzione: evidenzia errori sintattici e suggerisci sinonimi aulici.`,
  },
];

export const SCHOOL_SUBJECTS: Subject[] = [
  {
    id: 'all',
    name: 'Tutte le Materie',
    icon: 'Sparkles',
    color: 'from-indigo-500 to-purple-600',
    textColor: 'text-indigo-400',
    bgLight: 'bg-indigo-500/10',
    borderLight: 'border-indigo-500/30',
    samplePrompts: [
      'Come posso organizzare al meglio il mio pomeriggio di studio?',
      'Spiegami la differenza tra massa e peso con un esempio pratico.',
      'Fammi un riassunto dei punti chiave della Rivoluzione Industriale.',
      'Come si risolve un\'equazione di secondo grado fratta?',
    ],
  },
  {
    id: 'math',
    name: 'Matematica',
    icon: 'Percent',
    color: 'from-blue-500 to-cyan-600',
    textColor: 'text-blue-400',
    bgLight: 'bg-blue-500/10',
    borderLight: 'border-blue-500/30',
    samplePrompts: [
      'Risolvi e spiegami passo passo l\'equazione: $2x^2 - 5x + 2 = 0$',
      'Come si calcola la derivata del prodotto di due funzioni?',
      'Spiegami il Teorema di Pitagora e la sua dimostrazione intuitiva.',
      'Come trovo il dominio di una funzione logaritmica con frazione?',
    ],
  },
  {
    id: 'physics',
    name: 'Fisica',
    icon: 'Zap',
    color: 'from-amber-500 to-yellow-600',
    textColor: 'text-amber-400',
    bgLight: 'bg-amber-500/10',
    borderLight: 'border-amber-500/30',
    samplePrompts: [
      'Spiegami i 3 principi della dinamica di Newton con esempi della vita reale.',
      'Un corpo di massa 4 kg scivola da un piano inclinato di 30°: trova l\'accelerazione.',
      'Qual è la differenza tra conservazione dell\'energia e della quantità di moto?',
      'Come funziona la legge di Coulomb e come si applica ai vettori?',
    ],
  },
  {
    id: 'science',
    name: 'Scienze & Chimica',
    icon: 'FlaskConical',
    color: 'from-emerald-500 to-green-600',
    textColor: 'text-emerald-400',
    bgLight: 'bg-emerald-500/10',
    borderLight: 'border-emerald-500/30',
    samplePrompts: [
      'Come si bilancia la reazione redox: $KMnO_4 + HCl \\rightarrow KCl + MnCl_2 + Cl_2 + H_2O$?',
      'Spiega la differenza tra mitosi e meiosi e le relative fasi.',
      'Come funziona la struttura a doppia elica del DNA e i legami a idrogeno?',
      'Cosa sono gli isotopi e come si calcola la massa atomica media?',
    ],
  },
  {
    id: 'history',
    name: 'Storia',
    icon: 'Landmark',
    color: 'from-orange-500 to-red-600',
    textColor: 'text-orange-400',
    bgLight: 'bg-orange-500/10',
    borderLight: 'border-orange-500/30',
    samplePrompts: [
      'Quali furono le cause profonde che scatenarono la Prima Guerra Mondiale?',
      'Riassumi la caduta dell\'Impero Romano d\'Occidente (476 d.C.) in 5 punti chiave.',
      'Spiegami il piano Marshall e le origini della Guerra Fredda.',
      'Cosa furono le leggi fascistissime del 1925-1926?',
    ],
  },
  {
    id: 'literature',
    name: 'Italiano & Letteratura',
    icon: 'BookMarked',
    color: 'from-pink-500 to-rose-600',
    textColor: 'text-pink-400',
    bgLight: 'bg-pink-500/10',
    borderLight: 'border-pink-500/30',
    samplePrompts: [
      'Parafrasi e commento delle terzine della selva oscura (Inferno, Canto I, vv. 1-12).',
      'Quali sono i temi cardine de "I Promessi Sposi" e il concetto di Provvidenza?',
      'Spiegami le figure retoriche principali: metafora, metonimia, ossimoro, chiasmo.',
      'Scaletta argomentativa per un tema sull\'impatto dei social network tra i giovani.',
    ],
  },
  {
    id: 'philosophy',
    name: 'Filosofia',
    icon: 'Compass',
    color: 'from-purple-500 to-indigo-600',
    textColor: 'text-purple-400',
    bgLight: 'bg-purple-500/10',
    borderLight: 'border-purple-500/30',
    samplePrompts: [
      'Spiegami il mito della caverna di Platone e il suo significato epistemologico.',
      'Cosa intende Kant per "giudizi sintetici a priori" nella Critica della Ragion Pura?',
      'Qual è il concetto di superuomo (Übermensch) e di eterno ritorno in Nietzsche?',
      'Il metodo maieutico di Socrate spiegato in modo semplice.',
    ],
  },
  {
    id: 'languages',
    name: 'Inglese & Lingue',
    icon: 'Languages',
    color: 'from-teal-500 to-emerald-600',
    textColor: 'text-teal-400',
    bgLight: 'bg-teal-500/10',
    borderLight: 'border-teal-500/30',
    samplePrompts: [
      'Explain the difference between Present Perfect Simple and Past Simple with examples.',
      'Correggi questo paragrafo in inglese ed evidenzia vocaboli più avanzati (C1).',
      'Explain the conditional clauses (Zero, First, Second, Third) with a quick summary table.',
      'Write 10 common English idioms used in school and everyday conversation.',
    ],
  },
  {
    id: 'latin',
    name: 'Latino & Greco',
    icon: 'Scroll',
    color: 'from-amber-600 to-amber-800',
    textColor: 'text-amber-300',
    bgLight: 'bg-amber-600/10',
    borderLight: 'border-amber-600/30',
    samplePrompts: [
      'Come si traduce e si riconosce l\'ablativo assoluto in latino?',
      'Analisi logica e paradigmi di questa frase di Cicerone: "Historia magistra vitae est".',
      'Come funziona la consecutio temporum con il congiuntivo?',
      'Le 5 declinazioni latine: schema rapido delle desinenze chiave.',
    ],
  },
  {
    id: 'computer_science',
    name: 'Informatica',
    icon: 'Code2',
    color: 'from-cyan-500 to-blue-600',
    textColor: 'text-cyan-400',
    bgLight: 'bg-cyan-500/10',
    borderLight: 'border-cyan-500/30',
    samplePrompts: [
      'Spiegami come funziona l\'algoritmo Binary Search in Python con commenti riga per riga.',
      'Qual è la differenza tra complessità $O(n)$ e $O(n^2)$ con un esempio visivo?',
      'Come funziona il modello client-server e i codici HTTP (200, 404, 500)?',
      'Aiutami a trovare il bug in questa funzione ricorsiva per calcolare il fattoriale.',
    ],
  },
];

export const QUICK_STUDY_TOOLS = [
  {
    id: 'explain_simple',
    title: 'Spiega come a un bambino',
    prompt: 'Spiegami questo argomento con parole semplici, metafore chiare ed esempi della vita quotidiana.',
    icon: 'Smile',
  },
  {
    id: 'step_by_step',
    title: 'Passaggio per passaggio',
    prompt: 'Mostrami tutti i passaggi intermedi nel dettaglio, spiegando la regola usata per ciascuno.',
    icon: 'ListOrdered',
  },
  {
    id: 'test_me',
    title: 'Fammi 3 domande di verifica',
    prompt: 'Fammi 3 domande a trabocchetto su quello che abbiamo appena spiegato per testare la mia comprensione!',
    icon: 'HelpCircle',
  },
  {
    id: 'mind_map',
    title: 'Schema / Mappa concettuale',
    prompt: 'Crea uno schema a punti ad albero (mappa concettuale) con i concetti cardine da memorizzare.',
    icon: 'GitFork',
  },
  {
    id: 'real_world',
    title: 'Esempio pratico reale',
    prompt: 'Dove si applica o si vede questo concetto nel mondo reale o nella tecnologia?',
    icon: 'Globe',
  },
];
