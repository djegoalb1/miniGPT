// Comprehensive Italian school curriculum knowledge base for offline/fallback mode
// Ensures students ALWAYS receive rich, pedagogical explanations even when daily API quota is exceeded.

export interface CurriculumTopic {
  keywords: string[];
  title: string;
  subject: string;
  content: string;
}

export const SCHOOL_KNOWLEDGE_BASE: CurriculumTopic[] = [
  {
    keywords: ['rivoluzione francese', 'bastiglia', 'robespierre', 'terrore', 'luigi xvi', 'stati generali', 'giacobini', '1789', 'pallacorda'],
    title: 'La Rivoluzione Francese (1789 - 1799)',
    subject: 'Storia',
    content: `Ciao! Ecco una spiegazione chiara, completa e strutturata per la scuola sulla **Rivoluzione Francese**, uno dei temi più chiesti nelle verifiche e interrogazioni! 🇫🇷

La **Rivoluzione Francese** (iniziata nel **1789** e conclusa nel **1799** con l'ascesa di Napoleone) è lo spartiacque fondamentale della storia: segna la fine dell'**Ancien Régime** (il vecchio sistema feudale basato sui privilegi di nobili e clero) e l'inizio dell'**Età Contemporanea**.

---

### 1. Le Cause Profonde: Perché scoppia la Rivoluzione?
La Francia di fine Settecento era una vera e propria polveriera per quattro motivi principali:

1. **La divisione ingiusta della società nei Tre Stati:**
   - **Clero (Primo Stato):** circa lo $0,5\\%$ della popolazione. Possedeva il $10\\%$ delle terre, non pagava tasse e riscuoteva la decima.
   - **Nobiltà (Secondo Stato):** circa l'$1,5\\%$ della popolazione. Possedeva il $25\\%$ delle terre, non pagava tasse ed esigeva diritti feudali dai contadini.
   - **Terzo Stato:** il restante **$98\\%$** (borghesi, banchieri, avvocati, commercianti, contadini e operai). Era l'unica classe che lavorava e pagava tutte le tasse dello Stato!
2. **La grave crisi economica e il debito pubblico:** Le casse dello Stato erano svuotate dalle spese folli della corte di Versailles e dalle continue guerre (incluso il sostegno alla Rivoluzione Americana). A peggiorare le cose, i pessimi raccolti del 1788 fecero raddoppiare il prezzo del pane.
3. **L'Illuminismo:** Le idee di libertà, uguaglianza e divisione dei poteri (diffuse da filosofi come Montesquieu, Voltaire e Rousseau) convinsero la borghesia che l'assolutismo regio fosse ormai ingiusto e superato.
4. **La debolezza di Re Luigi XVI:** Incapace di imporre ai nobili di pagare le tasse per sanare il debito.

---

### 2. Le Tre Grandi Fasi della Rivoluzione

#### 📌 Fase 1: La Fase Monarchico-Costituzionale (1789 – 1792)
- **Maggio 1789 – Gli Stati Generali:** Luigi XVI convoca l'assemblea dei tre ordini a Versailles. Sorge subito il conflitto sul sistema di votazione:
  - *Voto per ordine:* Clero e Nobiltà votano insieme e vincono sempre 2 contro 1.
  - *Voto per testa:* ogni deputato vota singolarmente (avvantaggiando il Terzo Stato, che aveva più deputati).
- **Giugno 1789 – Il Giuramento della Pallacorda:** I deputati del Terzo Stato si separano e si proclamano **Assemblea Nazionale Costituente**, giurando di non sciogliersi finché la Francia non avrà una Costituzione.
- **14 Luglio 1789 – La Presa della Bastiglia:** Il popolo parigino, armato, assalta la fortezza-prigione simbolo del dispotismo regio. È l'inizio ufficiale della Rivoluzione (oggi festa nazionale francese).
- **Agosto 1789 – Dichiarazione dei Diritti dell'Uomo e del Cittadino:** Vengono aboliti i privilegi feudali e approvato il manifesto dei diritti fondamentali: *"Gli uomini nascono e rimangono liberi ed eguali nei diritti"* (*Liberté, Égalité, Fraternité*).
- **Costituzione del 1791:** La Francia diventa una **Monarchia Costituzionale**. Il Re tenta la fuga all'estero (fuga di Varennes), ma viene intercettato e ricondotto a Parigi.

#### 📌 Fase 2: La Repubblica e il "Terrore" Giacobino (1792 – 1794)
- **1792 – Guerra contro Austria e Prussia:** Le monarchie europee minacciano di invadere la Francia per restaurare il Re. I sanculotti e i volontari difendono la nazione (vittoria di Valmy). Viene proclamata la **Repubblica**.
- **Gennaio 1793 – Esecuzione di Luigi XVI:** Il Re viene processato per alto tradimento e decapitato con la **ghigliottina** (seguito pochi mesi dopo dalla regina Maria Antonietta).
- **Il periodo del Terrore (1793-1794):** Per fronteggiare la guerra e le rivolte interne, il potere passa al *Comitato di Salute Pubblica* guidato da **Maximilien de Robespierre** (leader dei Giacobini). Vengono ghigliottinate oltre 40.000 persone sospettate di essere contro-rivoluzionarie. Viene introdotto il calmiere dei prezzi e la leva obbligatoria.

#### 📌 Fase 3: La Reazione Termidoriana e il Direttorio (1794 – 1799)
- **Luglio 1794 (Termidoro):** La borghesia moderata si ribella al clima di sangue e paura: Robespierre viene arrestato e ghigliottinato.
- **Costituzione del 1795:** Il governo viene affidato a un gruppo ristretto di cinque membri, il **Direttorio**.
- **9 Novembre 1799 (18 Brumaio):** Il giovane generale **Napoleone Bonaparte**, forte dei suoi successi militari in Italia e in Egitto, compie un colpo di stato assumendo il potere come Primo Console e chiudendo la fase rivoluzionaria.

---

### 3. Tabella Cronologica di Sintesi per il Ripasso

| Data / Anno | Evento Cardine | Perché è fondamentale? |
| :--- | :--- | :--- |
| **5 Maggio 1789** | Convocazione Stati Generali | Rottura tra Terzo Stato e Corona sul voto per testa |
| **14 Luglio 1789** | Presa della Bastiglia | Ingresso violento del popolo parigino sulla scena politica |
| **26 Agosto 1789** | Dichiarazione Diritti dell'Uomo | Nascita formale dei diritti civili moderni |
| **21 Gennaio 1793** | Ghigliottina di Luigi XVI | Caduta definitiva della monarchia millenaria |
| **1793 – 1794** | Il Terrore di Robespierre | Dittatura giacobina e legge sui sospetti |
| **1799 (18 Brumaio)** | Colpo di stato di Napoleone | Inizio dell'era napoleonica e fine della Rivoluzione |

---

### 4. L'Eredità della Rivoluzione oggi
- **Cittadini, non più sudditi:** La sovranità appartiene alla Nazione e al Popolo.
- **Laicità dello Stato:** Separazione netta tra potere civile e gerarchia ecclesiastica.
- **Nascita della politica moderna:** La distinzione tra *Destra* e *Sinistra* nasce proprio dalla disposizione dei banchi nell'Assemblea francese (a destra i conservatori e foglianti, a sinistra i girondini e giacobini radicali).

---

🎯 **Domanda di verifica per te:**
Sapresti dirmi **perché il Terzo Stato chiedeva con tanta insistenza di votare "per testa" e non "per ordine"** negli Stati Generali del 1789? 
*(Se rispondi a questa domanda, hai padroneggiato il passaggio più frequente nelle interrogazioni orali!)*`,
  },
  {
    keywords: ['prima guerra mondiale', 'grande guerra', 'sarajevo', 'francesco ferdinando', 'trincea', '1914', '1917', '1918', 'piave', 'caporetto'],
    title: 'La Prima Guerra Mondiale (1914 - 1918)',
    subject: 'Storia',
    content: `Ciao! Ecco lo schema completo e approfondito per studiare e ripetere la **Prima Guerra Mondiale** (la Grande Guerra).

---

### 1. Le Cause Profonde (L'acronimo M-A-I-N)
Per memorizzare le cause prima dell'esame o interrogazione, ricorda la sigla **M.A.I.N.**:
1. **M – Militarismo:** Corsa sfrenata al riarmo delle potenze industriali (soprattutto flotta navale tedesca vs britannica).
2. **A – Alleanze contrapposte:** L'Europa era divisa in due blocchi rigidi:
   - **Triplice Alleanza (1882):** Germania, Austria-Ungheria, Italia (l'Italia era unita solo a patto difensivo).
   - **Triplice Intesa (1907):** Gran Bretagna, Francia, Impero Russo.
3. **I – Imperialismo:** Lotta per le colonie in Africa e Asia e controllo delle rotte commerciali.
4. **N – Nazionalismo:** Rivalità tra Francia e Germania (per le regioni di Alsazia e Lorena) e instabilità nei Balcani ("la polveriera d'Europa").

### 2. La Scintilla: 28 Giugno 1914
A Sarajevo, l'arciduca erede al trono d'Austria **Francesco Ferdinando** e la moglie Sofia vengono assassinati dal nazionalista serbo **Gavrilo Princip**. L'Austria dichiara guerra alla Serbia il 28 luglio 1914, attivando a catena le alleanze internazionali.

### 3. Dalla Guerra Lampo alla Guerra di Trincea
La Germania tenta il **Piano Schlieffen** (attaccare a sorpresa la Francia passando dal Belgio neutrale per poi sconfiggere la Russia), ma viene fermata sulla Marna. La guerra diventa una **guerra di posizione e logoramento nelle trincee**, segnata da filo spinato, mitragliatrici e gas asfissianti.

### 4. L'Italia entra in guerra (Maggio 1915)
Inizialmente neutrale, l'Italia si spacca tra:
- **Neutralisti:** socialisti, cattolici, giolittiani (la maggioranza del Paese).
- **Interventisti:** nazionalisti, irredentisti, democratici e Benito Mussolini.
Con il **Patto segreto di Londra** (aprile 1915), l'Italia si allea con l'Intesa in cambio delle terre irredente (Trento, Trieste, Istria, Dalmazia) ed entra in guerra il **24 Maggio 1915**.

### 5. Il 1917: L'Anno della Svolta
1. **La Russia esce dalla guerra:** Con la Rivoluzione d'Ottobre, i bolscevichi di Lenin firmano la pace di Brest-Litovsk con la Germania.
2. **Gli Stati Uniti entrano in guerra:** Guidati dal presidente Wilson, portano uomini, risorse economiche e tecnologia decisive a favore dell'Intesa.
3. **La Disfatta di Caporetto (Ottobre 1917):** Gli austro-tedeschi sfondano le linee italiane. Il generale Cadorna viene sostituito da **Armando Diaz**, che riorganizza l'esercito e vince la battaglia del Piave e di **Vittorio Veneto** (Novembre 1918).

---

🎯 **Verifica:** Quale fu la differenza cruciale tra guerra di movimento e guerra di posizione nelle trincee?`,
  },
  {
    keywords: ['equazione secondo grado', 'formula quadratica', 'delta', 'discriminante', 'ax2+bx+c', 'parabola', 'equazioni secondo grado'],
    title: 'Equazioni di Secondo Grado: Guida e Risolutore',
    subject: 'Matematica',
    content: `Ciao! Ecco la spiegazione completa e il metodo infallibile per risolvere qualsiasi **equazione di secondo grado**.

Un'equazione di secondo grado in forma normale si presenta sempre così:
$$ax^2 + bx + c = 0 \\quad (\\text{con } a \\neq 0)$$

Dove:
- $a$ è il coefficiente del termine di secondo grado ($x^2$).
- $b$ è il coefficiente del termine di primo grado ($x$).
- $c$ è il termine noto (senza la $x$).

---

### 1. Il Calcolo del Discriminante ($\\Delta$)
Il primo passo obbligatorio è calcolare il $\\Delta$ (Delta):
$$\\Delta = b^2 - 4ac$$

Il valore del Delta ti dice subito quante soluzioni avrà l'equazione:
1. **Se $\\Delta > 0$:** Ci sono **2 soluzioni reali e distinte** ($x_1 \\neq x_2$).
2. **Se $\\Delta = 0$:** Ci sono **2 soluzioni reali e coincidenti** ($x_1 = x_2 = -\\frac{b}{2a}$).
3. **Se $\\Delta < 0$:** L'equazione è **impossibile** nei numeri reali (nessuna radice reale).

---

### 2. La Formula Risolutiva Generale
Se $\\Delta \\geq 0$, le soluzioni si trovano con la celebre formula:
$$x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$

---

### 3. Esempio Pratico Risolto Passo Passo
Risolviamo insieme:
$$2x^2 - 5x + 2 = 0$$

- **Dati:** $a = 2$, $b = -5$, $c = 2$
- **Passo 1 (Calcolo di $\\Delta$):**
  $$\\Delta = (-5)^2 - 4(2)(2) = 25 - 16 = 9$$
  Poiché $\\Delta = 9 > 0$, avremo due soluzioni distinte. Inoltre $\\sqrt{9} = 3$.
- **Passo 2 (Applicazione della formula):**
  $$x_{1,2} = \\frac{-(-5) \\pm 3}{2 \\cdot 2} = \\frac{5 \\pm 3}{4}$$
  - $x_1 = \\frac{5 + 3}{4} = \\frac{8}{4} = 2$
  - $x_2 = \\frac{5 - 3}{4} = \\frac{2}{4} = \\frac{1}{2}$

**Soluzione finale:** $x_1 = 2$, $x_2 = \\frac{1}{2}$.`,
  },
  {
    keywords: ['teorema di pitagora', 'triangolo rettangolo', 'ipotenusa', 'cateti', 'cateto'],
    title: 'Teorema di Pitagora: Enunciato, Formule e Dimostrazione',
    subject: 'Matematica',
    content: `Ciao! Ecco tutto quello che devi sapere sul **Teorema di Pitagora**, spiegato con formule LaTeX ed esempi pratici.

### 1. Enunciato del Teorema
> *In ogni triangolo rettangolo, l'area del quadrato costruito sull'ipotenusa è uguale alla somma delle aree dei quadrati costruiti sui due cateti.*

In notazione algebrica, indicando con:
- $i$ l'ipotenusa (il lato più lungo opposto all'angolo retto di $90^\\circ$)
- $c_1$ e $c_2$ i due cateti

$$i^2 = c_1^2 + c_2^2$$

---

### 2. Le Formule Dirette e Inverse
- **Per trovare l'Ipotenusa conoscendo i cateti:**
  $$i = \\sqrt{c_1^2 + c_2^2}$$
- **Per trovare un Cateto conoscendo l'ipotenusa e l'altro cateto:**
  $$c_1 = \\sqrt{i^2 - c_2^2} \\qquad c_2 = \\sqrt{i^2 - c_1^2}$$

### 3. Esempio Pratico con Terna Pitagorica Classica (3, 4, 5)
Un triangolo rettangolo ha i cateti lunghi $c_1 = 6\\text{ cm}$ e $c_2 = 8\\text{ cm}$. Calcola l'ipotenusa:
$$i = \\sqrt{6^2 + 8^2} = \\sqrt{36 + 64} = \\sqrt{100} = 10\\text{ cm}$$`,
  },
  {
    keywords: ['newton', 'dinamica', 'principi della dinamica', 'forza', 'massa', 'f=ma', 'inerzia', 'azione e reazione'],
    title: 'I 3 Principi della Dinamica di Newton',
    subject: 'Fisica',
    content: `Ciao! Ecco i **Tre Principi della Dinamica** (le leggi del moto di Isaac Newton), fondamentali per la fisica classica.

---

### 1. Primo Principio (Principio di Inerzia)
> *Un corpo rimane nel suo stato di quiete o di moto rettilineo uniforme a meno che non intervenga una forza esterna netta a modificare tale stato.*

- **Formula:** Se $\\sum \\vec{F} = 0$, allora $\\vec{v} = \\text{costante}$ (e l'accelerazione $\\vec{a} = 0$).
- **Esempio pratico:** Quando sei in autobus e l'autista frena bruscamente, il tuo corpo viene spinto in avanti perché continua a muoversi per inerzia alla velocità precedente.

---

### 2. Secondo Principio (Legge Fondamentale della Dinamica)
> *La forza risultante applicata a un corpo è direttamente proporzionale alla sua massa e all'accelerazione impressa.*

- **Formula fondamentale:**
  $$\\vec{F} = m \\cdot \\vec{a}$$
- Dove:
  - $F$ è la forza misurata in **Newton** ($\\text{N} = \\text{kg} \\cdot \\text{m/s}^2$).
  - $m$ è la massa inerziale (in chilogrammi, $\\text{kg}$).
  - $a$ è l'accelerazione (in $\\text{m/s}^2$).

---

### 3. Terzo Principio (Principio di Azione e Reazione)
> *A ogni azione corrisponde sempre una reazione uguale e contraria.*

- **Formula:**
  $$\\vec{F}_{A \\rightarrow B} = -\\vec{F}_{B \\rightarrow A}$$
- **Esempio pratico:** Quando nuoti o remi, spingi l'acqua all'indietro (azione) e l'acqua spinge il tuo corpo o la barca in avanti (reazione).`,
  },
  {
    keywords: ['mitosi', 'meiosi', 'cellula', 'cromosomi', 'fasi', 'profase', 'anafase', 'metafase', 'telofase', 'gameti'],
    title: 'Mitosi e Meiosi: Differenze, Fasi e Funzioni',
    subject: 'Scienze',
    content: `Ciao! Ecco il confronto chiaro tra **Mitosi** e **Meiosi**, due processi cellulari fondamentali spesso confusi nelle interrogazioni di scienze.

---

### 1. Tabella Comparativa Rapida

| Caratteristica | Mitosi | Meiosi |
| :--- | :--- | :--- |
| **Dove avviene?** | Nelle cellule somatiche (del corpo) | Nelle cellule germinali (organi riproduttivi) |
| **Numero divisioni** | 1 sola divisione cellulare | 2 divisioni consecutive (Meiosi I e II) |
| **Cellule figlie** | **2 cellule figlie diploidi ($2n$)** | **4 cellule figlie aploidi ($n$)** (gameti) |
| **Patrimonio genetico** | Geneticamente **identiche** alla madre | Geneticamente **diverse** (variabilità genetica) |
| **Crossing-over?** | NO | SÌ (nella Profase I, scambio di materiale genico) |
| **Scopo biologico** | Crescita, rigenerazione tessuti | Riproduzione sessuata (spermatozoi e ovuli) |

---

### 2. Le 4 Fasi della Mitosi (Mnemonica: P-M-A-T)
1. **Profase:** La cromatina si condensa in cromosomi visibili; scompare la membrana nucleare.
2. **Metafase:** I cromosomi si allineano perfettamente sulla piastra equatoriale al centro della cellula.
3. **Anafase:** I cromatidi fratelli si separano e vengono tirati ai poli opposti dai fusi mitotici.
4. **Telofase:** Si riformano le due membrane nucleari e avviene la citodieresi (divisione del citoplasma).`,
  },
  {
    keywords: ['divina commedia', 'dante', 'selva oscura', 'virgilio', 'inferno canto 1', 'tre fiere', 'lonza', 'leone', 'lupa'],
    title: 'Dante Alighieri: Canto I dell\'Inferno e la Selva Oscura',
    subject: 'Italiano',
    content: `Ciao! Ecco l'analisi completa del **Canto I dell'Inferno**, il proemio di tutta la *Divina Commedia* di Dante Alighieri.

### 1. I Primi Versi Celebri (vv. 1-6)
> *«Nel mezzo del cammin di nostra vita*  
> *mi ritrovai per una selva oscura,*  
> *ché la diritta via era smarrita.*  
> *Ahi quanto a dir qual era è cosa dura*  
> *esta selva selvaggia e aspra e forte*  
> *che nel pensier rinova la paura!»*

### 2. Parafrasi e Spiegazione dei Simboli
- **"Nel mezzo del cammin di nostra vita":** Dante ha circa 35 anni (secondo la Bibbia la vita media era 70 anni). Siamo nella primavera del **1300** (anno del primo Giubileo indetto da Bonifacio VIII).
- **La Selva Oscura:** È l'allegoria del **peccato**, dello smarrimento morale, spirituale e politico in cui è caduta l'umanità priva delle sue due guide (l'Impero e la Chiesa).
- **Il Colle Illuminato dal Sole:** Simboleggia la salvezza e la virtù che Dante tenta di scalare.

### 3. Le Tre Fiere e il loro Significato Allegorico
La salita di Dante verso il colle viene sbarrata da tre bestie feroci, simboli dei tre vizi capitali:
1. **La Lonza (ghepardo/leopardo):** Simbolo della **Lussuria** e della giovinezza superficiale.
2. **Il Leone:** Simbolo della **Superbia** e della violenza prepotente.
3. **La Lupa:** Simbolo dell'**Avarizia e Avidità** (la più pericolosa, non è mai sazia e fa morire Dante di paura).

### 4. L'Intervento di Virgilio
Quando Dante sta per soccombere, interviene l'anima del poeta latino **Virgilio**, simbolo della **Ragione Umana** e della sapienza classica, inviato da **Beatrice** (simbolo della Fede e della Grazia divina). Virgilio guiderà Dante attraverso l'Inferno e il Purgatorio.`,
  },
];

// Helper to find a matching lesson from knowledge base with fuzzy student typo tolerance
export function searchKnowledgeBase(query: string, subject?: string): CurriculumTopic | null {
  const q = query.toLowerCase().replace(/[^a-z0-9\s]/gi, ' ');

  // 1. Direct keyword match
  for (const topic of SCHOOL_KNOWLEDGE_BASE) {
    if (topic.keywords.some((kw) => q.includes(kw))) {
      return topic;
    }
  }

  // 2. Fuzzy roots for common school topics (even with typos like 'revoluzione frtanciese')
  // Rivoluzione Francese
  if (
    q.includes('revoluz') ||
    q.includes('rivoluz') ||
    q.includes('frances') ||
    q.includes('frtanc') ||
    q.includes('bastigl') ||
    q.includes('robespierre') ||
    q.includes('giacobin') ||
    q.includes('1789')
  ) {
    return SCHOOL_KNOWLEDGE_BASE[0]; // French Revolution
  }

  // Prima Guerra Mondiale
  if (
    q.includes('prima guerra') ||
    q.includes('1 guerra') ||
    q.includes('1914') ||
    q.includes('grande guerra') ||
    q.includes('sarajevo') ||
    q.includes('trince')
  ) {
    return SCHOOL_KNOWLEDGE_BASE[1];
  }

  // Equazioni di secondo grado
  if (
    q.includes('equazion') ||
    q.includes('secondo grado') ||
    q.includes('formula quadratica') ||
    q.includes('delta') ||
    q.includes('discriminante')
  ) {
    return SCHOOL_KNOWLEDGE_BASE[2];
  }

  // Teorema di Pitagora
  if (q.includes('pitagor') || q.includes('ipotenusa') || q.includes('catet') || q.includes('triangolo rettangolo')) {
    return SCHOOL_KNOWLEDGE_BASE[3];
  }

  // Fisica / Newton
  if (q.includes('newton') || q.includes('dinamic') || q.includes('forza') || q.includes('inerzia')) {
    return SCHOOL_KNOWLEDGE_BASE[4];
  }

  // Mitosi / Meiosi / Scienze
  if (q.includes('mitos') || q.includes('meios') || q.includes('cellul') || q.includes('cromosom')) {
    return SCHOOL_KNOWLEDGE_BASE[5];
  }

  // Dante / Letteratura
  if (q.includes('dante') || q.includes('commedia') || q.includes('inferno') || q.includes('selva')) {
    return SCHOOL_KNOWLEDGE_BASE[6];
  }

  // Substring or title match
  for (const topic of SCHOOL_KNOWLEDGE_BASE) {
    const titleWords = topic.title.toLowerCase().split(' ');
    if (titleWords.some((w) => w.length > 3 && q.includes(w))) {
      return topic;
    }
  }

  // Subject default if specifically requested
  if (subject === 'history' || q.includes('storia')) {
    return SCHOOL_KNOWLEDGE_BASE[0];
  }

  return null;
}
