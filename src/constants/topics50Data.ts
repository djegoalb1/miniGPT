// 50 Foundational School Topics (50 Nuovi Argomenti Base)
// Covers the core curriculum for Scuola Media, Superiore, and first-year University

export interface BasicTopic {
  id: string;
  title: string;
  subject: string;
  subjectId: string;
  category: string;
  summary: string;
  keyConcepts: string[];
  samplePrompt: string;
  content: string;
}

export const BASIC_TOPICS_50: BasicTopic[] = [
  // --- MATEMATICA (1 - 10) ---
  {
    id: 'mat_01',
    title: 'Equazioni di Primo Grado',
    subject: 'Matematica',
    subjectId: 'math',
    category: 'Algebra',
    summary: 'Risoluzione di equazioni lineari nella forma $ax + b = 0$, principi di equivalenza e verifica.',
    keyConcepts: ['Primo Principio di Equivalenza', 'Secondo Principio', 'Isolamento dell\'incognita $x$'],
    samplePrompt: 'Spiegami come si risolve un\'equazione di primo grado con frazioni passo dopo passo',
    content: `### Equazioni di Primo Grado ($ax + b = 0$)
Un'equazione lineare o di primo grado si presenta nella forma canonica:
$$ax + b = 0 \\quad (a \\neq 0)$$

#### I 2 Principi Fondamentali di Equivalenza:
1. **Primo Principio (Trasporto):** Aggiungendo o sottraendo la stessa quantità a entrambi i membri, l'equazione non cambia. In pratica, quando un termine si sposta da una parte all'altra dell'uguale, **cambia di segno**:
   $$ax + b = 0 \\implies ax = -b$$
2. **Secondo Principio (Semplificazione):** Moltiplicando o dividendo entrambi i membri per uno stesso numero diverso da zero:
   $$x = -\\frac{b}{a}$$

#### Esempio svolto passo passo:
Risolviamo: $3x - 5 = 2x + 7$
- Spostiamo le $x$ a sinistra e i numeri a destra: $3x - 2x = 7 + 5$
- Semplifichiamo: $x = 12$
- **Verifica:** $3(12) - 5 = 31$, e $2(12) + 7 = 31$. Risultato esatto!`,
  },
  {
    id: 'mat_02',
    title: 'Equazioni di Secondo Grado e Formula del Delta',
    subject: 'Matematica',
    subjectId: 'math',
    category: 'Algebra',
    summary: 'La formula quadratica generale $x = (-b \\pm \\sqrt{\\Delta})/(2a)$ e lo studio del discriminante $\\Delta = b^2 - 4ac$.',
    keyConcepts: ['Discriminante $\\Delta$', 'Soluzioni Reali e Distinte', 'Equazioni Pure e Spurie'],
    samplePrompt: 'Come si risolve un\'equazione di secondo grado spuria e quando il Delta è negativo?',
    content: `### Equazioni di Secondo Grado ($ax^2 + bx + c = 0$)
Ogni equazione di secondo grado completa ha la forma:
$$ax^2 + bx + c = 0 \\quad (a \\neq 0)$$

#### Il Calcolo del Discriminante:
$$\\Delta = b^2 - 4ac$$
- **Se $\\Delta > 0$:** 2 soluzioni reali e distinte: $x_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$
- **Se $\\Delta = 0$:** 2 soluzioni reali e coincidenti: $x_1 = x_2 = -\\frac{b}{2a}$
- **Se $\\Delta < 0$:** Nessuna soluzione reale (impossibile in $\\mathbb{R}$).

#### Casi Particolari (Incomplete):
- **Pura ($b = 0$):** $ax^2 + c = 0 \\implies x^2 = -\\frac{c}{a} \\implies x = \\pm \\sqrt{-\\frac{c}{a}}$
- **Spuria ($c = 0$):** $ax^2 + bx = 0 \\implies x(ax + b) = 0 \\implies x_1 = 0,\\; x_2 = -\\frac{b}{a}$`,
  },
  {
    id: 'mat_03',
    title: 'Teorema di Pitagora',
    subject: 'Matematica',
    subjectId: 'math',
    category: 'Geometria',
    summary: 'Relazione fondamentale tra ipotenusa e cateti nel triangolo rettangolo: $i^2 = c_1^2 + c_2^2$.',
    keyConcepts: ['Ipotenusa', 'Cateto Maggiore e Minore', 'Terne Pitagoriche (3, 4, 5)'],
    samplePrompt: 'Dimostrami il teorema di Pitagora ed esegui un esercizio con i cateti 5 e 12',
    content: `### Teorema di Pitagora
Nel triangolo rettangolo (angolo di $90^\\circ$):
> *Il quadrato costruito sull'ipotenusa è uguale alla somma dei quadrati costruiti sui due cateti.*

#### Formule Fondamentali:
- **Ipotenusa ($i$):** $i = \\sqrt{c_1^2 + c_2^2}$
- **Cateto ($c_1$):** $c_1 = \\sqrt{i^2 - c_2^2}$
- **Cateto ($c_2$):** $c_2 = \\sqrt{i^2 - c_1^2}$

#### Esercizio Tipico:
Dati i cateti $c_1 = 5\\text{ cm}$ e $c_2 = 12\\text{ cm}$:
$$i = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13\\text{ cm}$$`,
  },
  {
    id: 'mat_04',
    title: 'Teorema di Talete e Similitudini',
    subject: 'Matematica',
    subjectId: 'math',
    category: 'Geometria',
    summary: 'Fascio di rette parallele intersecate da due trasversali e proporzionalità tra triangoli simili.',
    keyConcepts: ['Fascio di Parallele', 'Segmenti Proporzionali', 'Criteri di Similitudine'],
    samplePrompt: 'Spiegami il teorema di Talete e come applicarlo per trovare un segmento incognito',
    content: `### Teorema di Talete
> *Un fascio di rette parallele intersecato da due rette trasversali determina su di esse segmenti direttamente proporzionali.*

Se le rette $r_1 \\parallel r_2 \\parallel r_3$ intersecano le trasversali $t$ nei punti $A, B, C$ e $t'$ nei punti $A', B', C'$, allora:
$$\\frac{AB}{BC} = \\frac{A'B'}{B'C'}$$

#### Applicazione nei Triangoli Simili:
Due triangoli sono simili se hanno gli angoli congruenti e i lati omologhi in proporzione ($k$ costante di proporzionalità):
$$\\frac{A'B'}{AB} = \\frac{B'C'}{BC} = \\frac{A'C'}{AC} = k$$
L'area cresce con il quadrato del rapporto: $\\text{Area}' = k^2 \\cdot \\text{Area}$.`,
  },
  {
    id: 'mat_05',
    title: 'Prodotti Notevoli e Scomposizione in Fattori',
    subject: 'Matematica',
    subjectId: 'math',
    category: 'Algebra',
    summary: 'Quadrato di binomio, somma per differenza, cubo di binomio e raccoglimento a fattor comune.',
    keyConcepts: ['Quadrato di Binomio', 'Somma per Differenza', 'Raccoglimento Fattore Comune'],
    samplePrompt: 'Quali sono tutte le formule dei prodotti notevoli da sapere per la verifica?',
    content: `### Prodotti Notevoli Fondamentali
Consentono di svolgere rapidamente moltiplicazioni tra polinomi senza fare tutti i passaggi intermedi:

1. **Quadrato di un Binomio:**
   $$(a + b)^2 = a^2 + 2ab + b^2$$
   $$(a - b)^2 = a^2 - 2ab + b^2$$
2. **Somma per Differenza (Differenza di quadrati):**
   $$(a + b)(a - b) = a^2 - b^2$$
3. **Cubo di un Binomio:**
   $$(a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3$$
4. **Quadrato di un Trinomio:**
   $$(a + b + c)^2 = a^2 + b^2 + c^2 + 2ab + 2ac + 2bc$$`,
  },
  {
    id: 'mat_06',
    title: 'Sistemi Lineari di Equazioni (2x2)',
    subject: 'Matematica',
    subjectId: 'math',
    category: 'Algebra',
    summary: 'I metodi risolutivi: Sostituzione, Riduzione (addizione/sottrazione) e Metodo di Cramer.',
    keyConcepts: ['Metodo di Sostituzione', 'Metodo di Riduzione', 'Determinante di Cramer'],
    samplePrompt: 'Come si risolve un sistema di due equazioni con il metodo di sostituzione?',
    content: `### Sistemi Lineari a Due Incognite
Un sistema in forma normale:
$$\\begin{cases} a_1 x + b_1 y = c_1 \\\\ a_2 x + b_2 y = c_2 \\end{cases}$$

#### Metodi di Risoluzione:
1. **Sostituzione:** Si isola una variabile (es. $y$) dalla prima equazione e si sostituisce nella seconda.
2. **Riduzione (Combinazione lineare):** Si moltiplicano le equazioni per coefficienti opportuni in modo che, sommandole, una delle variabili si annulli.
3. **Cramer:** Si calcolano i determinanti:
   $$D = a_1 b_2 - a_2 b_1, \\quad D_x = c_1 b_2 - c_2 b_1, \\quad D_y = a_1 c_2 - a_2 c_1$$
   $$x = \\frac{D_x}{D}, \\quad y = \\frac{D_y}{D} \\quad (\\text{se } D \\neq 0)$$`,
  },
  {
    id: 'mat_07',
    title: 'Disequazioni di Primo e Secondo Grado',
    subject: 'Matematica',
    subjectId: 'math',
    category: 'Algebra',
    summary: 'La regola del cambio verso per numeri negativi, parabola associata e studio del segno.',
    keyConcepts: ['Inversione del Verso', 'Parabola Associata', 'Valori Interni ed Esterni'],
    samplePrompt: 'Come si risolve una disequazione di secondo grado: x^2 - 4x + 3 > 0?',
    content: `### Disequazioni e Studio del Segno
#### Regola d'oro delle Disequazioni:
Quando si moltiplica o divide per un **numero negativo**, il verso della disuguaglianza **si inverte**:
$$-2x > 6 \\implies x < -3$$

#### Disequazioni di Secondo Grado ($ax^2 + bx + c > 0$ con $a > 0$):
Si trovano le radici dell'equazione associata con il $\\Delta$:
- **Se $\\Delta > 0$ con radici $x_1 < x_2$:**
  - $P(x) > 0 \\implies$ **Valori esterni:** $x < x_1 \\;\\cup\\; x > x_2$
  - $P(x) < 0 \\implies$ **Valori interni:** $x_1 < x < x_2$
- **Se $\\Delta < 0$:**
  - $P(x) > 0 \\implies$ Sempre vero per ogni $x \\in \\mathbb{R}$
  - $P(x) < 0 \\implies$ Impossibile`,
  },
  {
    id: 'mat_08',
    title: 'Frazioni Algebriche e Proporzioni',
    subject: 'Matematica',
    subjectId: 'math',
    category: 'Aritmetica e Algebra',
    summary: 'Proprietà del permutare, invertire e comporre nelle proporzioni e condizioni di esistenza (C.E.).',
    keyConcepts: ['Prodotto dei Medi = Prodotto degli Estremi', 'Condizioni di Esistenza (Denominatore $\\neq 0$)'],
    samplePrompt: 'Quali sono le condizioni di esistenza di una frazione algebrica e come trovo l\'incognita in una proporzione?',
    content: `### Frazioni Algebriche e Proporzioni
#### 1. Le Proporzioni ($a : b = c : d$)
- **Proprietà Fondamentale:** Il prodotto dei medi è uguale al prodotto degli estremi:
  $$b \\cdot c = a \\cdot d$$
- **Formula per l'incognita:** Se $x$ è un estremo: $x = \\frac{b \\cdot c}{a}$; se $x$ è un medio: $x = \\frac{a \\cdot d}{b}$.

#### 2. Condizioni di Esistenza (C.E.):
Una frazione algebrica $\\frac{A(x)}{B(x)}$ ha significato solo se il denominatore è **diverso da zero**:
$$\\text{C.E.: } B(x) \\neq 0$$
Prima di semplificare o sommare frazioni algebriche, è obbligatorio scomporre i denominatori e porre le C.E.`,
  },
  {
    id: 'mat_09',
    title: 'Le Derivate Fondamentali e Regole di Derivazione',
    subject: 'Matematica',
    subjectId: 'math',
    category: 'Analisi Matematica',
    summary: 'La definizione di limite del rapporto incrementale, derivate delle potenze, prodotto e quoziente.',
    keyConcepts: ['Rapporto Incrementale', 'Regola della Potenza $D(x^n) = n x^{n-1}$', 'Derivata del Prodotto e Quoziente'],
    samplePrompt: 'Fammi una tabella delle derivate fondamentali e calcola la derivata di f(x) = (3x^2 + 1)/(x - 2)',
    content: `### Le Derivate Fondamentali in Analisi
La derivata misura il tasso di variazione istantaneo e la pendenza della retta tangente:
$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$

#### Tabella delle Derivate Immediate:
- $D(c) = 0$ (costante)
- $D(x^n) = n \\cdot x^{n-1}$ (es. $D(x^3) = 3x^2$)
- $D(e^x) = e^x$
- $D(\\ln x) = \\frac{1}{x}$
- $D(\\sin x) = \\cos x, \\quad D(\\cos x) = -\\sin x$

#### Regole Operative:
- **Prodotto:** $D[f \\cdot g] = f' \\cdot g + f \\cdot g'$
- **Quoziente:** $D\\left[\\frac{f}{g}\\right] = \\frac{f' \\cdot g - f \\cdot g'}{g^2}$
- **Funzione composta (Chain Rule):** $D[f(g(x))] = f'(g(x)) \\cdot g'(x)$`,
  },
  {
    id: 'mat_10',
    title: 'Calcolo delle Probabilità e Statistica Descrittiva',
    subject: 'Matematica',
    subjectId: 'math',
    category: 'Statistica e Probabilità',
    summary: 'Definizione classica di probabilità (casi favorevoli/casi possibili), media, mediana, moda e varianza.',
    keyConcepts: ['Casi Favorevoli / Possibili', 'Eventi Indipendenti ed Escludenti', 'Media, Mediana e Varianza'],
    samplePrompt: 'Qual è la formula della probabilità classica e come si calcola la mediana di una serie di dati?',
    content: `### Probabilità e Statistica
#### 1. Definizione Classica di Probabilità:
$$P(E) = \\frac{\\text{Numero di casi favorevoli}}{\\text{Numero di casi possibili}} \\quad (0 \\le P(E) \\le 1)$$
- **Evento Certo:** $P = 1$
- **Evento Impossibile:** $P = 0$
- **Evento Contrario:** $P(\\bar{E}) = 1 - P(E)$

#### 2. Indicatori Statistici Essenziali:
- **Media Aritmetica ($\\bar{x}$):** Somma di tutti i valori divisa per il numero dei valori.
- **Mediana:** Il valore centrale della serie ordinata in ordine crescente.
- **Moda:** Il valore che si presenta con la frequenza più elevata.`,
  },

  // --- FISICA (11 - 18) ---
  {
    id: 'fis_11',
    title: 'I Tre Principi della Dinamica di Newton',
    subject: 'Fisica',
    subjectId: 'physics',
    category: 'Meccanica Classica',
    summary: 'Principio di Inerzia, Legge fondamentale $F = m \\cdot a$, e Principio di Azione e Reazione.',
    keyConcepts: ['Principio di Inerzia', '$F = ma$', 'Azione e Reazione'],
    samplePrompt: 'Spiegami i 3 principi di Newton con esempi pratici che posso dire all\'orale',
    content: `### I Tre Principi della Dinamica di Newton
1. **Primo Principio (Inerzia):** Un corpo persevera nel suo stato di quiete o di moto rettilineo uniforme a meno che una forza esterna netta non agisca su di esso ($\\sum \\vec{F} = 0 \\implies \\vec{v} = \\text{costante}$).
2. **Secondo Principio (Legge fondamentale):** La forza risultante impressa a un corpo è proporzionale all'accelerazione e alla sua massa inerziale:
   $$\\vec{F} = m \\cdot \\vec{a} \\quad [\\text{Newton} = \\text{kg} \\cdot \\text{m/s}^2]$$
3. **Terzo Principio (Azione e Reazione):** Se un corpo A esercita una forza su un corpo B, il corpo B esercita su A una forza uguale in modulo e contraria in verso:
   $$\\vec{F}_{A \\to B} = -\\vec{F}_{B \\to A}$$`,
  },
  {
    id: 'fis_12',
    title: 'Moto Rettilineo Uniforme e Uniformemente Accelerato',
    subject: 'Fisica',
    subjectId: 'physics',
    category: 'Cinematica',
    summary: 'Le leggi orarie del moto: $s(t) = s_0 + vt$ e $s(t) = s_0 + v_0t + \\frac{1}{2}at^2$, accelerazione di gravità $g$.',
    keyConcepts: ['Velocità Costante', 'Accelerazione Costante $a$', 'Caduta Libera dei Gravi ($g = 9.81\\text{ m/s}^2$)'],
    samplePrompt: 'Formule del moto uniformemente accelerato e calcolo dello spazio di frenata di un\'auto',
    content: `### Cinematica: M.R.U. e M.R.U.A.
#### 1. Moto Rettilineo Uniforme (MRU, $a = 0$):
La velocità è costante lungo una traiettoria rettilinea:
$$v = \\frac{\\Delta s}{\\Delta t} \\implies s(t) = s_0 + v \\cdot t$$

#### 2. Moto Rettilineo Uniformemente Accelerato (MRUA, $a = \\text{cost}$):
L'accelerazione è costante nel tempo:
$$v(t) = v_0 + a \\cdot t$$
$$s(t) = s_0 + v_0 \\cdot t + \\frac{1}{2} a \\cdot t^2$$
- **Formula senza il tempo:** $v^2 - v_0^2 = 2 a \\Delta s$
- **Caduta dei gravi nel vuoto:** $a = g \\approx 9{,}81\\text{ m/s}^2$ diretta verso il basso.`,
  },
  {
    id: 'fis_13',
    title: 'Lavoro, Energia Cinetica e Conservazione dell\'Energia',
    subject: 'Fisica',
    subjectId: 'physics',
    category: 'Dinamica ed Energia',
    summary: 'Il lavoro $L = F \\cdot s \\cdot \\cos(\\theta)$, l\'energia cinetica $E_k = \\frac{1}{2}mv^2$ e potenziale gravitazionale $E_p = mgh$.',
    keyConcepts: ['Lavoro Meccanico (Joule)', 'Teorema dell\'Energia Cinetica', 'Conservazione Energia Meccanica ($E_k + E_p = \\text{cost}$)'],
    samplePrompt: 'Spiegami la differenza tra energia cinetica ed energia potenziale e quando l\'energia meccanica si conserva',
    content: `### Lavoro ed Energia Meccanica
#### 1. Il Lavoro Meccanico ($L$):
$$L = \\vec{F} \\cdot \\vec{s} = F \\cdot s \\cdot \\cos(\\alpha) \\quad [\\text{Joule} = \\text{N} \\cdot \\text{m}]$$
- Se $\\alpha = 0^\\circ$: Lavoro motore massimo ($L = F \\cdot s$)
- Se $\\alpha = 90^\\circ$: Lavoro nullo ($L = 0$)
- Se $\\alpha = 180^\\circ$: Lavoro resistente (es. forza d'attrito, $L = -F \\cdot s$)

#### 2. Teorema dell'Energia Cinetica:
$$L_{\\text{tot}} = \\Delta E_k = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2$$

#### 3. Conservazione dell'Energia Meccanica:
In presenza di sole forze conservative (es. gravità, forza elastica):
$$E_{\\text{tot}} = E_k + E_p = \\text{costante}$$
$$mgh + \\frac{1}{2}mv^2 = \\text{costante}$$`,
  },
  {
    id: 'fis_14',
    title: 'Legge di Gravitazione Universale di Newton',
    subject: 'Fisica',
    subjectId: 'physics',
    category: 'Astrofisica e Gravità',
    summary: 'La forza di attrazione gravitazionale tra due masse: $F = G \\frac{m_1 m_2}{r^2}$ e la costante $G$.',
    keyConcepts: ['Costante di Gravitazione $G$', 'Inverso del Quadrato della Distanza', 'Massa vs Peso'],
    samplePrompt: 'Come funziona la legge di gravitazione universale e perché il peso cambia sulla Luna?',
    content: `### Legge di Gravitazione Universale
Isaac Newton formulò che ogni particella nell'universo attrae ogni altra particella con una forza proporzionale al prodotto delle masse e inversamente proporzionale al quadrato della loro distanza:
$$F = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}$$
Dove $G = 6{,}674 \\times 10^{-11} \\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$.

#### Differenza tra Massa e Peso:
- **Massa ($m$):** Quantità di materia intrinseca del corpo (misurata in $\\text{kg}$), invariabile ovunque.
- **Peso ($P$):** Forza con cui la Terra (o altro pianeta) attrae la massa: $\\vec{P} = m \\cdot \\vec{g}$.
- Sulla Luna $g_{\\text{luna}} \\approx 1{,}62\\text{ m/s}^2$ (circa $1/6$ di quella terrestre), quindi il peso è ridotto di 6 volte!`,
  },
  {
    id: 'fis_15',
    title: 'Le Leggi di Ohm e i Circuiti Elettrici',
    subject: 'Fisica',
    subjectId: 'physics',
    category: 'Elettromagnetismo',
    summary: 'Tensione ($V$), intensità di corrente ($I$) e resistenza ($R$): prima legge $V = R \\cdot I$, resistori in serie e parallelo.',
    keyConcepts: ['Prima Legge di Ohm ($V = RI$)', 'Resistori in Serie e Parallelo', 'Effetto Joule e Potenza ($P = VI$)'],
    samplePrompt: 'Come si calcola la resistenza equivalente di resistori in serie e in parallelo?',
    content: `### Elettricità: Leggi di Ohm
#### 1. Prima Legge di Ohm:
Nei conduttori ohmici, la differenza di potenziale (tensione) è direttamente proporzionale alla corrente:
$$V = R \\cdot I$$
- $V$ = Tensione o d.d.p. in **Volt** ($\\text{V}$)
- $I$ = Intensità di corrente in **Ampere** ($\\text{A}$)
- $R$ = Resistenza in **Ohm** ($\\Omega$)

#### 2. Configurazione dei Resistori:
- **In Serie:** La corrente è la stessa. Le resistenze si sommano:
  $$R_{\\text{eq}} = R_1 + R_2 + R_3$$
- **In Parallelo:** La tensione è la stessa. Si sommano i reciproci:
  $$\\frac{1}{R_{\\text{eq}}} = \\frac{1}{R_1} + \\frac{1}{R_2}$$`,
  },
  {
    id: 'fis_16',
    title: 'Pressione Idrostatica e Principio di Archimede',
    subject: 'Fisica',
    subjectId: 'physics',
    category: 'Meccanica dei Fluidi',
    summary: 'Legge di Stevino $p = \\rho g h$, Principio di Pascal e spinta idrostatica verso l\'alto $F_A = \\rho V g$.',
    keyConcepts: ['Legge di Stevino', 'Principio di Archimede', 'Galleggiamento dei Corpi'],
    samplePrompt: 'Perché una nave di ferro galleggia mentre una monetina affonda? Spiegami Archimede',
    content: `### Fluidi: Stevino e Archimede
#### 1. Legge di Stevino:
La pressione idrostatica dovuta alla colonna di liquido sovrastante a profondità $h$:
$$p = p_0 + \\rho \\cdot g \\cdot h$$
Dove $\\rho$ è la densità del fluido e $p_0$ la pressione atmosferica alla superficie.

#### 2. Principio di Archimede:
> *Ogni corpo immerso in un fluido riceve una spinta verticale dal basso verso l'alto pari al peso del volume di fluido spostato.*
$$F_A = \\rho_{\\text{fluido}} \\cdot V_{\\text{immerso}} \\cdot g$$
- **Galleggiamento:** Se la densità media del corpo è minore di quella del fluido ($\\rho_{\\text{corpo}} < \\rho_{\\text{fluido}}$), il corpo sale a galla!`,
  },
  {
    id: 'fis_17',
    title: 'I Principi della Termodinamica e il Calore',
    subject: 'Fisica',
    subjectId: 'physics',
    category: 'Termodinamica',
    summary: 'Calore specifico $Q = m c \\Delta T$, Primo principio $\\Delta U = Q - L$ ed Entropia nel secondo principio.',
    keyConcepts: ['Calore Latente e Specifico', 'Primo Principio (Conservazione Energia)', 'Secondo Principio (Entropia)'],
    samplePrompt: 'Spiegami la differenza tra temperatura e calore e il primo principio della termodinamica',
    content: `### Termodinamica e Calore
- **Temperatura:** Misura dell'energia cinetica media delle particelle del corpo.
- **Calore ($Q$):** Energia termica in transito da un corpo più caldo a uno più freddo.
  $$Q = m \\cdot c \\cdot \\Delta T$$

#### I Principi della Termodinamica:
1. **Primo Principio:** La variazione di energia interna di un sistema è uguale al calore scambiato meno il lavoro compiuto:
   $$\\Delta U = Q - L$$
2. **Secondo Principio:** Il calore non può fluire spontaneamente da un corpo freddo a uno caldo senza lavoro esterno. L'entropia (disordine) dell'universo tende sempre ad aumentare.`,
  },
  {
    id: 'fis_18',
    title: 'Le Onde e l\'Effetto Doppler',
    subject: 'Fisica',
    subjectId: 'physics',
    category: 'Acustica ed Elettromagnetismo',
    summary: 'Relazione $v = \\lambda \\cdot f$, frequenza, lunghezza d\'onda, ampiezza e variazione di tono dell\'effetto Doppler.',
    keyConcepts: ['Lunghezza d\'Onda $\\lambda$', 'Frequenza $f = 1/T$', 'Effetto Doppler dell\'ambulanza'],
    samplePrompt: 'Perché la sirena dell\'ambulanza sembra più acuta quando si avvicina e più grave quando si allontana?',
    content: `### Le Onde e l'Effetto Doppler
Un'onda è una perturbazione che trasporta energia senza trasportare materia.
- **Relazione fondamentale:**
  $$v = \\lambda \\cdot f = \\frac{\\lambda}{T}$$
  Dove $\\lambda$ è la lunghezza d'onda, $f$ la frequenza in Hertz ($\\text{Hz}$) e $v$ la velocità di propagazione.

#### L'Effetto Doppler:
È la variazione apparente di frequenza di un'onda percepita da un osservatore in moto relativo rispetto alla sorgente:
- **Sorgente in avvicinamento:** I fronti d'onda vengono compressi $\\implies$ lunghezza d'onda minore $\\implies$ **frequenza più alta (suono più acuto)**.
- **Sorgente in allontanamento:** I fronti d'onda si distanziano $\\implies$ **frequenza più bassa (suono più grave)**.`,
  },

  // --- STORIA (19 - 28) ---
  {
    id: 'sto_19',
    title: 'La Caduta dell\'Impero Romano d\'Occidente (476 d.C.)',
    subject: 'Storia',
    subjectId: 'history',
    category: 'Storia Antica e Medievale',
    summary: 'La deposizione di Romolo Augustolo da parte di Odoacre, le invasioni barbariche e la crisi economica del III-IV secolo.',
    keyConcepts: ['476 d.C. Fine Età Antica', 'Odoacre e Romolo Augustolo', 'Invasioni Barbariche'],
    samplePrompt: 'Quali furono le cause interne ed esterne che portarono alla caduta dell\'Impero Romano d\'Occidente?',
    content: `### La Caduta dell'Impero Romano d'Occidente (476 d.C.)
Nel **476 d.C.** il generale barbaro **Odoacre** depone l'ultimo imperatore romano d'Occidente, il giovanissimo **Romolo Augustolo**, e invia le insegne imperiali a Costantinopoli. Questo evento segna per gli storici la fine dell'**Età Antica** e l'inizio del **Medioevo**.

#### Cause Complesse:
1. **Cause Esterne:** Le continue migrazioni e invasioni di popoli germanici (Visigoti, Vandali, Unni di Attila).
2. **Cause Interne:**
   - Crisi demografica ed economica (spopolamento campagne, inflazione, pressione fiscale insostenibile).
   - Indebolimento dell'esercito (arruolamento massiccio di mercenari barbari).
   - Instabilità politica e continue guerre civili tra generali.`,
  },
  {
    id: 'sto_20',
    title: 'Il Feudalesimo e la Società Medievale',
    subject: 'Storia',
    subjectId: 'history',
    category: 'Medioevo',
    summary: 'Il sistema feudale: vassallaggio, beneficio, immunità, castelli e la divisione tripartita (oratores, bellatores, laboratores).',
    keyConcepts: ['Rapporto Vassallatico', 'Omaggio e Beneficio', 'I Tre Ordini Medievali'],
    samplePrompt: 'Come funzionava il sistema feudale istituito da Carlo Magno e la piramide feudale?',
    content: `### Il Feudalesimo e la Società Curtense
Nato nell'impero carolingio di Carlo Magno, il feudalesimo è un sistema politico, economico e sociale basato su legami personali di fedeltà e protezione.

#### Gli Elementi del Feudo:
1. **Vassallaggio:** Giuramento di fedeltà del vassallo al sovrano durante la cerimonia dell'omaggio.
2. **Beneficio:** La concessione temporanea di terre e rendite.
3. **Immunità:** Il diritto del feudatario di amministrare la giustizia e riscuotere tributi nel proprio territorio.

#### I Tre Ordini della Società Medievale:
- **Oratores (Clero):** Coloro che pregano.
- **Bellatores (Cavalieri e Nobili):** Coloro che combattono.
- **Laboratores (Contadini e Servi della gleba):** Coloro che lavorano la terra.`,
  },
  {
    id: 'sto_21',
    title: 'La Peste Nera del 1348 in Europa',
    subject: 'Storia',
    subjectId: 'history',
    category: 'Basso Medioevo',
    summary: 'La grande epidemia di peste bubbonica portata dalle pulci dei ratti, il crollo demografico del 30-50% e la crisi del Trecento.',
    keyConcepts: ['Batterio Yersinia pestis', 'Crollo Demografico', 'Crisi del Trecento e Decameron'],
    samplePrompt: 'Quali furono le conseguenze economiche e sociali della peste nera del 1348 in Europa?',
    content: `### La Peste Nera del 1348
Nella primavera del **1348** arrivò in Europa attraverso le navi mercantili genovesi provenienti dal Mar Nero la più devastante pandemia di peste bubbonica della storia, causata dal batterio *Yersinia pestis* trasmesso dalle pulci dei ratti neri.

#### Conseguenze Cardine:
- **Dimezzamento della popolazione:** L'Europa perse tra un terzo e la metà dei suoi abitanti (circa 25-30 milioni di morti).
- **Shock psicologico e culturale:** Diffusione del tema del *memento mori* (danze macabre) e caccia ai capri espiatori (pogrom contro gli ebrei). Fa da cornice al celebre *Decameron* di Boccaccio.
- **Riorganizzazione economica:** La scarsità di manodopera aumentò il potere contrattuale dei contadini superstiti, accelerando la crisi del sistema servile feudale.`,
  },
  {
    id: 'sto_22',
    title: 'L\'Umanesimo e il Rinascimento Italiano',
    subject: 'Storia',
    subjectId: 'history',
    category: 'Età Moderna',
    summary: 'L\'antropocentrismo (*homo faber fortunae suae*), la riscoperta dei classici greci e latini, mecenatismo e prospettiva.',
    keyConcepts: ['Antropocentrismo', 'Mecenatismo a Firenze', 'Leonardo, Michelangelo, Raffaello'],
    samplePrompt: 'Qual è la differenza fondamentale tra Umanesimo e Rinascimento e quali corti italiane furono protagoniste?',
    content: `### Umanesimo e Rinascimento (XV - XVI secolo)
Movimento culturale e artistico nato in Italia (soprattutto a Firenze con i Medici) che segna il passaggio dal Medioevo alla Modernità.

#### Caratteristiche Fondamentali:
- **Dalla visione teocentrica all'antropocentrismo:** L'uomo è al centro del mondo (*homo faber ipsius fortunae*, artefice del proprio destino).
- **Riscoperta dei classici:** Studio filologico dei testi greci e latini senza l'interpretazione dogmatica medievale.
- **Arte e Scienza:** Invenzione della prospettiva geometrica (Brunelleschi), studio dell'anatomia umana e mecenatismo principesco (Firenze, Roma papale, Venezia).`,
  },
  {
    id: 'sto_23',
    title: 'La Riforma Protestante di Martin Lutero (1517)',
    subject: 'Storia',
    subjectId: 'history',
    category: 'Età Moderna',
    summary: 'Le 95 tesi di Wittenberg contro la vendita delle indulgenze, *Sola Fide*, *Sola Scriptura* e la pace di Augusta (1555).',
    keyConcepts: ['95 Tesi di Wittenberg', 'Sola Fide e Sola Scriptura', 'Scisma della Cristianità'],
    samplePrompt: 'Cosa criticava Martin Lutero alla Chiesa cattolica e quali sono i principi della Riforma protestante?',
    content: `### La Riforma Protestante (1517)
Il **31 Ottobre 1517** il monaco agostiniano **Martin Lutero** affigge alla cattedrale di Wittenberg le sue **95 Tesi**, denunciando lo scandalo della **vendita delle indulgenze** (pagamento in denaro per ottenere la remissione delle pene in Purgatorio).

#### I Pilastri Teologici di Lutero:
1. **Sola Fide:** La salvezza dell'anima si ottiene solo per fede nella grazia di Dio, non mediante le opere buone o i pagamenti alla Chiesa.
2. **Sola Scriptura:** La Bibbia è l'unica autorità; ogni credente è sacerdote di se stesso (*sacerdozio universale*).
3. **Due soli Sacramenti:** Riconosciuti solo Battesimo ed Eucaristia.
4. **Pace di Augusta (1555):** Principio del *Cuius regio, eius religio* (i sudditi devono seguire la fede del proprio principe).`,
  },
  {
    id: 'sto_24',
    title: 'La Rivoluzione Francese (1789 - 1799)',
    subject: 'Storia',
    subjectId: 'history',
    category: 'Età Moderna e Contemporanea',
    summary: 'Dagli Stati Generali e Presa della Bastiglia al Regime del Terrore di Robespierre e colpo di stato di Napoleone.',
    keyConcepts: ['Presa della Bastiglia (14 Luglio 1789)', 'Dichiarazione Diritti Uomo', 'Il Terrore Giacobino'],
    samplePrompt: 'Riassumi le 3 fasi della Rivoluzione Francese e il significato di Liberté, Égalité, Fraternité',
    content: `### La Rivoluzione Francese
Segna la fine dell'**Ancien Régime** e dei privilegi feudali di nobiltà e clero.

#### Fasi Salienti:
1. **1789:** Convocazione degli Stati Generali; il Terzo Stato si proclama Assemblea Nazionale (Giuramento della Pallacorda). Il **14 Luglio 1789** il popolo insorge con la **Presa della Bastiglia**. Proclamata la *Dichiarazione dei Diritti dell'Uomo e del Cittadino*.
2. **1792-1794 (Repubblica e Terrore):** Guerra contro Austria e Prussia. Luigi XVI viene ghigliottinato (1793). Dittatura giacobina di **Robespierre** col Comitato di Salute Pubblica.
3. **1799:** Colpo di stato del **18 Brumaio** di Napoleone Bonaparte che assume il potere come Primo Console.`,
  },
  {
    id: 'sto_25',
    title: 'L\'Epopea Napoleonica e il Congresso di Vienna (1815)',
    subject: 'Storia',
    subjectId: 'history',
    category: 'Età Contemporanea',
    summary: 'Codice Civile, campagne militari, blocco continentale, disfatta in Russia, Waterloo e la Restaurazione.',
    keyConcepts: ['Codice Napoleonico', 'Battaglia di Waterloo (1815)', 'Congresso di Vienna e Restaurazione'],
    samplePrompt: 'Cosa decise il Congresso di Vienna nel 1815 e cosa stabilivano i principi di legittimità ed equilibrio?',
    content: `### Napoleone e la Restaurazione
Generale brillante, Napoleone si autoincorona Imperatore dei Francesi nel 1804. Diffonde in tutta Europa il **Codice Civile** (laicità dello stato, uguaglianza giuridica, abolizione del feudalesimo).

#### La Caduta:
- Disastrosa campagna di Russia del 1812.
- Sconfitta definitiva a **Waterloo** nel 1815 ed esilio a Sant'Elena.

#### Il Congresso di Vienna (1814-1815):
Le potenze vincitrici (Austria con Metternich, Russia, Prussia e Gran Bretagna) ridefiniscono la mappa d'Europa con due principi cardine:
1. **Principio di Legittimità:** Restaurare sui troni i sovrani legittimi deposti da Napoleone.
2. **Principio di Equilibrio:** Nessuna potenza deve diventare tanto forte da dominare le altre.`,
  },
  {
    id: 'sto_26',
    title: 'Il Risorgimento e l\'Unità d\'Italia (1861)',
    subject: 'Storia',
    subjectId: 'history',
    category: 'Storia d\'Italia',
    summary: 'Le tre Guerre d\'Indipendenza, Mazzini, Garibaldi con la Spedizione dei Mille e la proclamazione del Regno d\'Italia.',
    keyConcepts: ['17 Marzo 1861 Unità d\'Italia', 'Cavour e Garibaldi', 'Spedizione dei Mille'],
    samplePrompt: 'Come si arrivò all\'Unità d\'Italia nel 1861 e quale fu il ruolo di Cavour e Garibaldi?',
    content: `### Il Risorgimento Italiano
Il processo storico che portò alla nascita dello Stato unitario italiano il **17 Marzo 1861** con re **Vittorio Emanuele II**.

#### I Protagonisti:
- **Camillo Benso Conte di Cavour:** Statista e Primo Ministro del Regno di Sardegna; tesse alleanze diplomatiche con la Francia di Napoleone III (Accordi di Plombières).
- **Giuseppe Garibaldi:** Il condottiero popolare della **Spedizione dei Mille** (1860) che risale dalla Sicilia conquistando il Regno delle Due Sicilie.
- **Giuseppe Mazzini:** Fondatore della *Giovine Italia*, teorico dell'Italia "Una, Libera, Indipendente e Repubblicana".`,
  },
  {
    id: 'sto_27',
    title: 'La Prima Guerra Mondiale (1914 - 1918)',
    subject: 'Storia',
    subjectId: 'history',
    category: 'Novecento',
    summary: 'L\'attentato di Sarajevo, guerra di trincea, entrata dell\'Italia nel 1915, la svolta del 1917 e i 14 punti di Wilson.',
    keyConcepts: ['28 Giugno 1914 Sarajevo', 'Guerra di Logoramento e Trincea', '1917: Entrata USA e Uscita Russia'],
    samplePrompt: 'Perché la Prima Guerra Mondiale divenne una guerra di posizione e quale fu il ruolo dei trattati di pace?',
    content: `### La Grande Guerra (1914-1918)
Iniziata dopo l'attentato di Sarajevo all'arciduca Francesco Ferdinando, oppose la **Triplice Intesa** (Francia, Gran Bretagna, Russia, poi Italia e USA) agli **Imperi Centrali** (Germania, Austria-Ungheria, Impero Ottomano).

#### Punti Salienti:
- **Guerra di Trincea:** L'uso di mitragliatrici, filo spinato e gas asfissianti trasforma la guerra lampo in un massacro di logoramento.
- **L'Italia entra nel 1915:** Dopo il Patto di Londra. Fronte dell'Isonzo, disfatta di Caporetto (1917) e riscossa sul Piave e a Vittorio Veneto (1918).
- **Conseguenze:** Crollo di 4 grandi imperi (Tedesco, Austro-Ungarico, Russo, Ottomano) e Trattato punitivo di Versailles.`,
  },
  {
    id: 'sto_28',
    title: 'La Seconda Guerra Mondiale e la Shoah (1939 - 1945)',
    subject: 'Storia',
    subjectId: 'history',
    category: 'Novecento',
    summary: 'L\'invasione della Polonia, Pearl Harbor, Stalingrado, lo sbarco in Normandia, i campi di sterminio nazisti e le bombe atomiche.',
    keyConcepts: ['1 Settembre 1939 Invasione Polonia', 'Shoah e Campi di Sterminio', 'Stalingrado, D-Day e Hiroshima'],
    samplePrompt: 'Quali furono le tappe cruciali della Seconda Guerra Mondiale dal 1939 al 1945?',
    content: `### La Seconda Guerra Mondiale (1939-1945)
Il conflitto più sanguinoso della storia umana (oltre 60 milioni di morti), scatenato dall'espansionismo nazifascista di Adolf Hitler.

#### Momenti Chiave:
- **1 Settembre 1939:** Hitler invade la Polonia; scatta la guerra.
- **1941:** Invasione dell'URSS (Operazione Barbarossa) e attacco giapponese a **Pearl Harbor** (entrata USA).
- **La Shoah:** Genocidio sistematico pianificato di 6 milioni di ebrei, oppositori politici, rom e disabili nei campi di sterminio (Auschwitz-Birkenau).
- **La Svolta (1942-1943):** Battaglia di Stalingrado e caduta del fascismo in Italia (25 Luglio 1943).
- **1944-1945:** Sbarco in Normandia (D-Day), suicidio di Hitler e resa tedesca (Maggio 1945). Bombe atomiche su **Hiroshima e Nagasaki** (Agosto 1945) che costringono il Giappone alla resa.`,
  },

  // --- ITALIANO & LETTERATURA (29 - 36) ---
  {
    id: 'ita_29',
    title: 'Dante Alighieri: La Divina Commedia',
    subject: 'Italiano',
    subjectId: 'literature',
    category: 'Letteratura Medievale',
    summary: 'Il viaggio allegorico attraverso Inferno, Purgatorio e Paradiso: 100 canti in terzine dantesche a rima incatenata.',
    keyConcepts: ['Selva Oscura e Tre Fiere', 'Contrappasso', 'Virgilio, Beatrice e San Bernardo'],
    samplePrompt: 'Spiegami la legge del contrappasso nella Divina Commedia con esempi famosi come Paolo e Francesca',
    content: `### La Divina Commedia di Dante Alighieri
Scritta tra il 1304 e il 1321, è il capolavoro della lingua italiana e della letteratura mondiale. Narra un viaggio allegorico compiuto da Dante nella primavera del **1300** attraverso i tre regni ultraterreni.

#### Struttura Matematica dell'Opera:
- **3 Cantiche:** Inferno (34 canti), Purgatorio (33 canti), Paradiso (33 canti) = **100 canti in totale**.
- Metro: **Terzina dantesca** a rima incatenata ($ABA\\; BCB\\; CDC$).
- **La Legge del Contrappasso:** La pena inflitta ai dannati rispecchia il peccato per analogia o per contrasto (es. Paolo e Francesca, trascinati da una bufera incessante come in vita furono travolti dalla passione carnale).`,
  },
  {
    id: 'ita_30',
    title: 'Francesco Petrarca e il Canzoniere',
    subject: 'Italiano',
    subjectId: 'literature',
    category: 'Letteratura Umanistica',
    summary: 'Il dissidio interiore tra l\'amore terreno per Laura, la gloria letteraria e il desiderio di purificazione spirituale.',
    keyConcepts: ['Laura e il Senhal ("l\'aura")', 'Dissidio Interiore (Accidia)', 'Modello del Classicismo Volgare'],
    samplePrompt: 'Qual è il significato del dissidio interiore in Petrarca e come si differenzia da Dante?',
    content: `### Francesco Petrarca e il *Rerum Vulgarium Fragmenta*
Petrarca (1304–1374) è il padre dell'Umanesimo e il maestro assoluto della lirica d'amore europea (petrarchismo).

#### Il Dissidio Interiore:
A differenza di Dante, per il quale Beatrice è un miracolo che guida direttamente a Dio (*donna-angelo*), per Petrarca l'amore per **Laura** è una passione terrena che distoglie l'anima dalla salvezza divina. L'animo del poeta è dilaniato tra il richiamo della gloria e dei piaceri terreni e il rimorso religioso (*accidia*).

#### Forma e Stile:
366 componimenti (in vita e in morte di Laura), scritti in una lingua raffinatissima e musicale che diventerà il modello supremo della poesia lirica italiana (indicato da Pietro Bembo nel Cinquecento).`,
  },
  {
    id: 'ita_31',
    title: 'Giovanni Boccaccio e il Decameron',
    subject: 'Italiano',
    subjectId: 'literature',
    category: 'Prosa Trecentesca',
    summary: 'Cento novelle narrate in dieci giorni da dieci giovani durante la peste di Firenze del 1348: ingegno, beffa e fortuna.',
    keyConcepts: ['Cornice Narrativa', 'L\'Ingegno Umano e l\'Industria', 'Le Novelle di Beffa (Calandrino)'],
    samplePrompt: 'Quali sono i grandi temi del Decameron di Boccaccio e chi sono i narratori della brigata?',
    content: `### Giovanni Boccaccio: Il *Decameron*
Scritto tra il 1349 e il 1353, è la prima grande opera in prosa narrativa della letteratura europea.

#### La Struttura (La Cornice):
Dieci giovani (sette donne e tre uomini) fuggono da Firenze devastata dalla peste del 1348 e si rifugiano in campagna. Per dieci giorni raccontano dieci novelle al giorno (**100 novelle**).

#### I Grandi Temi:
1. **L'Ingegno e l'Industria:** L'abilità dell'uomo di volgere a proprio favore le circostanze difficili grazie alla prontezza verbale e all'intelligenza.
2. **La Fortuna:** Il caso imprevedibile che domina le vicende umane.
3. **La Beffa:** Lo scherzo ironico ai danni degli ingenui e presuntuosi (es. il celebre ciclo di Calandrino).`,
  },
  {
    id: 'ita_32',
    title: 'Alessandro Manzoni: I Promessi Sposi',
    subject: 'Italiano',
    subjectId: 'literature',
    category: 'Ottocento e Romanzo Storico',
    summary: 'La vicenda di Renzo e Lucia nella Lombardia del Seicento sotto la dominazione spagnola, tra peste, giustizia e Provvidenza.',
    keyConcepts: ['Romanzo Storico', 'La Provvidenza Divina', 'I Personaggi: Don Abbondio, Gertrude, L\'Innominato'],
    samplePrompt: 'Qual è il ruolo della Provvidenza nei Promessi Sposi e l\'evoluzione morale dell\'Innominato?',
    content: `### Alessandro Manzoni: *I Promessi Sposi*
Pubblicato nella versione definitiva nel 1840 ("risciacquatura dei panni in Arno" per creare la lingua italiana moderna), è il fondamento del romanzo moderno in Italia.

#### Temi Centrali:
- **Gli Umili come Protagonisti:** Per la prima volta nella grande letteratura, i protagonisti assoluti non sono eroi o re, ma due popolani: **Renzo Tramaglino** e **Lucia Mondella**.
- **La Provvidenza:** Dio non interviene magicamente per evitare il dolore, ma agisce nella storia per condurre i fedeli alla salvezza morale ("il sugo di tutta la storia").
- **La Denuncia del Potere Ingiusto:** Don Rodrigo e l'incompetenza dei governanti spagnoli versus la carità eroica di Padre Cristoforo e del Cardinale Federigo Borromeo.`,
  },
  {
    id: 'ita_33',
    title: 'Giacomo Leopardi: L\'Infinito e il Pessimismo',
    subject: 'Italiano',
    subjectId: 'literature',
    category: 'Romanticismo',
    summary: 'Dall\'Infinito al pessimismo storico, cosmico ed eroico della ginestra: la natura come matrigna indifferente.',
    keyConcepts: ['L\'Infinito ("Naufragar m\'è dolce")', 'Pessimismo Storico vs Cosmico', 'La Ginestra e la Solidarietà Umana'],
    samplePrompt: 'Spiegami le tre fasi del pessimismo di Leopardi con esempi dai Canti',
    content: `### Giacomo Leopardi (1798–1837)
Il più grande poeta del Romanticismo italiano, filosofo della disillusione e della dignità umana.

#### Le Fasi del Pessimismo:
1. **Pessimismo Storico:** L'infelicità umana è colpa del progresso e della ragione, che hanno allontanato l'uomo dallo stato di innocenza e dalle illusioni degli antichi.
2. **Pessimismo Cosmico (Natura Matrigna):** La Natura non è madre benevola ma un meccanismo cieco e indifferente che produce gli esseri viventi solo per perpetuare il ciclo di vita e distruzione (*Dialogo della Natura e di un Islandese*).
3. **Pessimismo Eroico (*La Ginestra*):** Presa coscienza della comune fragilità, gli uomini devono stringersi in una **"social catena"** di solidarietà e fratellanza contro la comune nemica, la Natura.`,
  },
  {
    id: 'ita_34',
    title: 'Giovanni Verga e il Verismo',
    subject: 'Italiano',
    subjectId: 'literature',
    category: 'Ottocento',
    summary: 'Il canone dell\'impersonalità, l\'eclisse dell\'autore, i vinti dalla fiumana del progresso (Rosso Malpelo, I Malavoglia).',
    keyConcepts: ['L\'Impersonalità dell\'Autore', 'L\'Ideale dell\'Ostrica', 'La Fiumana del Progresso'],
    samplePrompt: 'Cos\'è l\'eclisse dell\'autore in Verga e come si vede nella novella di Rosso Malpelo?',
    content: `### Giovanni Verga e il Verismo Italiano
Ispirato al Naturalismo francese di Zola, Verga racconta la dura realtà della Sicilia post-unitaria.

#### I Principi Cardine:
1. **L'Impersonalità:** L'opera d'arte deve sembrare essersi "fatta da sé". L'autore scompare e la voce narrante adotta il punto di vista e il linguaggio corale della comunità popolare.
2. **Il Ciclo dei Vinti:** Il progresso è come una fiumana inarrestabile vista da lontano; ma guardando da vicino, travolge e stritola i più deboli che hanno tentato di cambiare stato sociale.
3. **L'Ideale dell'Ostrica:** Chi appartiene a una classe sociale umile deve rimanere attaccato allo scoglio della famiglia e del lavoro tradizionale per non essere divorato dal mare del mondo.`,
  },
  {
    id: 'ita_35',
    title: 'Luigi Pirandello: Le Maschere e l\'Umorismo',
    subject: 'Italiano',
    subjectId: 'literature',
    category: 'Novecento',
    summary: 'Il relativismo conoscitivo, la trappola della famiglia e del lavoro, il sentimento del contrario (*L\'Umorismo*, *Il fu Mattia Pascal*).',
    keyConcepts: ['La Maschera e le Forme', 'Avvertimento vs Sentimento del Contrario', 'La Frantumazione dell\'Io'],
    samplePrompt: 'Spiegami la differenza tra comico e umoristico secondo Pirandello con l\'esempio della vecchia imbellettata',
    content: `### Luigi Pirandello (Premio Nobel 1934)
Massimo interprete della crisi d'identità dell'uomo contemporaneo nel primo Novecento.

#### Concetti Fondamentali:
- **La Vita contro la Forma:** La vita è un flusso continuo e magmatico; la società ci costringe a cristallizzarci in "forme" e "maschere" (il bravo impiegato, il padre esemplare, il cittadino modello).
- **La Frantumazione dell'Io (*Uno, nessuno e centomila*):** Non siamo un individuo unico: siamo tanti quanti sono coloro che ci guardano, e in realtà nessuno.
- **L'Umorismo (Il sentimento del contrario):** 
  - *Comico (Avvertimento del contrario):* Rido vedendo una vecchia signora truccata in modo ridicolo.
  - *Umorismo (Sentimento del contrario):* Scopro che quella donna soffre e si trucca per non perdere l'amore del marito più giovane: il riso si trasforma in amara compassione.`,
  },
  {
    id: 'ita_36',
    title: 'Le Figure Retoriche Essenziali per la Scuola',
    subject: 'Italiano',
    subjectId: 'literature',
    category: 'Stilistica e Retorica',
    summary: 'Significato, riconoscimento ed esempi di metafora, metonimia, ossimoro, chiasmo, sineddoche e allitterazione.',
    keyConcepts: ['Metafora e Similitudine', 'Ossimoro e Antitesi', 'Chiasmo e Anastrofe'],
    samplePrompt: 'Fammi una guida alle figure retoriche più chieste nelle verifiche con esempi famosi',
    content: `### Le Figure Retoriche Fondamentali
1. **Metafora:** Similitudine abbreviata senza il "come" (*"I suoi capelli sono d'oro"*).
2. **Similitudine:** Paragone esplicito introdotto da nessi come, tale, quale (*"Splende come una stella"*).
3. **Ossimoro:** Accostamento di due parole di senso opposto e apparentemente inconciliabile (*"Silenzio assordante"*, *"Ghiaccio bollente"*).
4. **Metonimia:** Sostituzione di un termine con un altro legato da un rapporto logico di causa/effetto, contenente/contenuto, autore/opera (*"Bere un bicchiere"*, *"Leggere Dante"*).
5. **Chiasmo:** Disposizione a croce ($A-B / B'-A'$) di elementi collegati (*"Le donne, i cavallier, l'arme, gli amori"*).
6. **Allitterazione:** Ripetizione degli stessi suoni consonantici o vocalici (*"E caddi come corpo morto cadde"*).`,
  },

  // --- SCIENZE & CHIMICA (37 - 44) ---
  {
    id: 'sci_37',
    title: 'Mitosi e Meiosi: La Divisione Cellulare',
    subject: 'Scienze',
    subjectId: 'science',
    category: 'Biologia',
    summary: 'Confronto tra cellule somatiche ($2n$) e gameti ($n$), le fasi della mitosi (PMAT) e il crossing-over meiotico.',
    keyConcepts: ['Profase, Metafase, Anafase, Telofase', 'Diploide vs Aploide', 'Crossing-Over e Variabilità Genetica'],
    samplePrompt: 'Qual è la differenza fondamentale tra mitosi e meiosi in una tabella riassuntiva?',
    content: `### Mitosi vs Meiosi
- **Mitosi:** Avviene nelle cellule somatiche (del corpo). Una cellula madre diploide ($2n$) genera **2 cellule figlie identiche ($2n$)** per crescita e riparazione dei tessuti.
- **Meiosi:** Avviene nelle cellule germinali. Da una cellula madre diploide ($2n$) si ottengono **4 cellule figlie aploidi ($n$)** chiamate **gameti** (spermatozoi e ovociti).

#### Le Fasi della Mitosi (Mnemonica: P-M-A-T):
1. **Profase:** Condensazione della cromatina in cromosomi; rottura della membrana nucleare.
2. **Metafase:** Allineamento dei cromosomi sul piano equatoriale della cellula.
3. **Anafase:** Separazione dei cromatidi fratelli verso i poli opposti.
4. **Telofase e Citodieresi:** Riformazione del nucleo e separazione del citoplasma.
- *Nota Meiosi:* Durante la Profase I avviene il **crossing-over**, ovvero lo scambio di frammenti di DNA tra cromosomi omologhi che garantisce la diversità genetica della specie!`,
  },
  {
    id: 'sci_38',
    title: 'La Struttura dell\'Atomo e la Tavola Periodica',
    subject: 'Scienze',
    subjectId: 'science',
    category: 'Chimica',
    summary: 'Protoni, neutroni ed elettroni; numero atomico $Z$, numero di massa $A$ e configurazione elettronica a strati.',
    keyConcepts: ['Numero Atomico $Z$', 'Elettroni di Valenza', 'Regola dell\'Ottetto'],
    samplePrompt: 'Come si legge la tavola periodica degli elementi e cosa indica il numero atomico Z?',
    content: `### Struttura dell'Atomo
L'atomo è la più piccola unità di un elemento chimico, formato da:
- **Nucleo centrale:** Con **Protoni** (carica $+1$) e **Neutroni** (carica $0$).
- **Nube elettronica:** Con **Elettroni** (carica $-1$) in orbita su livelli energetici discreti.
- **Numero Atomico ($Z$):** Numero di protoni (determina l'identità dell'elemento).
- **Numero di Massa ($A$):** Somma di protoni e neutroni ($A = Z + N$).

#### La Tavola Periodica di Mendeleev:
- **Gruppi (colonne verticali):** Gli elementi hanno lo stesso numero di **elettroni di valenza** (nello strato più esterno) e proprietà chimiche simili.
- **Periodi (righe orizzontali):** Indicano il livello energetico principale degli elettroni.`,
  },
  {
    id: 'sci_39',
    title: 'I Legami Chimici: Covalente, Ionico e a Idrogeno',
    subject: 'Scienze',
    subjectId: 'science',
    category: 'Chimica',
    summary: 'Differenza di elettronegatività, condivisione di elettroni, reticoli salini e ponti a idrogeno nell\'acqua.',
    keyConcepts: ['Legame Covalente Puro e Polare', 'Legame Ionico', 'Ponte a Idrogeno'],
    samplePrompt: 'Come si stabilisce se un legame è covalente puro, covalente polare o ionico in base all\'elettronegatività?',
    content: `### I Legami Chimici e la Regola dell'Ottetto
Gli atomi tendono a legarsi per completare il loro guscio esterno con **8 elettroni** (stabilità dei gas nobili).

#### Tipologie di Legame:
1. **Legame Covalente Puro (omopolare):** Condivisione paritaria di una o più coppie di elettroni tra atomi con differenza di elettronegatività quasi nulla ($\\Delta EN < 0{,}4$, es. $H_2$, $O_2$).
2. **Legame Covalente Polare:** Gli elettroni condivisi sono più attratti dall'atomo più elettronegativo, creando dipoli parziali ($0{,}4 \\le \\Delta EN < 1{,}9$, es. molecola dell'acqua $H_2O$).
3. **Legame Ionico:** Trasferimento completo di uno o più elettroni con formazione di ioni carichi attratti elettrostaticamente ($\\Delta EN \\ge 1{,}9$, es. sale da cucina $NaCl$).
4. **Legame a Idrogeno:** Attrazione intermolecolare tra un idrogeno legato a un atomo molto elettronegativo ($O, N, F$) e il doppietto solitario di un altro atomo. Responsabile delle proprietà uniche dell'acqua e della struttura del DNA!`,
  },
  {
    id: 'sci_40',
    title: 'La Doppia Elica del DNA e la Sintesi Proteica',
    subject: 'Scienze',
    subjectId: 'science',
    category: 'Biologia Molecolare',
    summary: 'Basi azotate complementari (A-T, C-G), trascrizione dell\'mRNA nel nucleo e traduzione sui ribosomi.',
    keyConcepts: ['Basi Azotate Complementari', 'Trascrizione (DNA $\\to$ mRNA)', 'Traduzione e Codice Genetico'],
    samplePrompt: 'Come avviene la sintesi proteica a partire dal DNA nei ribosomi?',
    content: `### DNA e Sintesi delle Proteine
Il DNA (Acido Desossiribonucleico) custodisce il codice genetico degli organismi viventi.

#### Struttura della Doppia Elica (Watson e Crick, 1953):
È un polimero formato da nucleotidi (gruppo fosfato, zucchero desossiribosio e una base azotata).
- **Accoppiamento complementare:** Adenina con Timina ($A=T$ con 2 legami a idrogeno), Citosina con Guanina ($C\\equiv G$ con 3 legami).

#### Il Dogma Centrale della Biologia:
$$\\text{DNA} \\xrightarrow{\\text{Trascrizione}} \\text{mRNA} \\xrightarrow{\\text{Traduzione}} \\text{Proteina}$$
1. **Trascrizione:** Nel nucleo, l'RNA polimerasi copia il filamento di DNA in una molecola di mRNA (dove l'Uracile $U$ sostituisce la Timina $T$).
2. **Traduzione:** Nel citoplasma, sui ribosomi, ogni tripletta di basi (**codone**) dell'mRNA viene letta dal tRNA che trasporta lo specifico amminoacido corrispondente.`,
  },
  {
    id: 'sci_41',
    title: 'La Fotosintesi Clorofilliana e Respirazione Cellulare',
    subject: 'Scienze',
    subjectId: 'science',
    category: 'Biochimica',
    summary: 'La reazione $6CO_2 + 6H_2O + \\text{luce} \\to C_6H_{12}O_6 + 6O_2$, fase luminosa e ciclo di Calvin nei cloroplasti.',
    keyConcepts: ['Equazione Chimica Fotosintesi', 'Cloroplasti e Clorofilla', 'Respirazione nei Mitocondri'],
    samplePrompt: 'Qual è la reazione chimica della fotosintesi e qual è la differenza con la respirazione cellulare?',
    content: `### Fotosintesi Clorofilliana
Il processo biochimico con cui le piante autotrofe convertono l'energia luminosa solare in energia chimica (glucosio):
$$6CO_2 + 6H_2O + \\text{Luce solare} \\longrightarrow C_6H_{12}O_6 + 6O_2$$

#### Le Due Fasi:
1. **Fase Luminosa (nei tilacoidi dei cloroplasti):** La clorofilla cattura i fotoni, spacca la molecola d'acqua (*fotolisi*) liberando ossigeno ($O_2$) e produce ATP e NADPH.
2. **Fase Oscura / Ciclo di Calvin (nello stroma):** L'anidride carbonica ($CO_2$) dell'aria viene "fissata" e ridotta in glucosio.

- *Nota sul ciclo opposto:* La **Respirazione Cellulare** compiuta nei mitocondri da piante e animali brucia glucosio con ossigeno per produrre energia ATP vitale, rilasciando $CO_2$ e $H_2O$.`,
  },
  {
    id: 'sci_42',
    title: 'Le Leggi di Mendel e le Basi della Genetica',
    subject: 'Scienze',
    subjectId: 'science',
    category: 'Genetica',
    summary: 'Dominanza, segregazione indipendente degli alleli, quadrato di Punnett, genotipo e fenotipo.',
    keyConcepts: ['Legge della Dominanza', 'Genotipo vs Fenotipo', 'Omozigote ed Eterozigote'],
    samplePrompt: 'Spiegami le 3 leggi di Mendel sulle piante di pisello odoroso con il quadrato di Punnett',
    content: `### Le 3 Leggi dell'Ereditarietà di Gregor Mendel
Attraverso gli esperimenti con le piante di pisello odoroso (*Pisum sativum*), Mendel fondò la genetica moderna:

1. **Prima Legge (Dominanza):** Incrociando due individui di linea pura per caratteri alternativi (es. seme liscio $LL$ x seme rugoso $ll$), tutti i discendenti di prima generazione ($F_1$) manifestano solo il carattere **dominante** (seme liscio $Ll$).
2. **Seconda Legge (Segregazione):** Nella seconda generazione ($F_2$), gli alleli si separano: il carattere recessivo ricompare nel rapporto fenotipico **$3:1$**.
3. **Terza Legge (Assortimento Indipendente):** Nell'incrocio tra individui che differiscono per due o più caratteri, ciascuna coppia di alleli viene ereditata indipendentemente dalle altre.`,
  },
  {
    id: 'sci_43',
    title: 'La Teoria dell\'Evoluzione di Charles Darwin',
    subject: 'Scienze',
    subjectId: 'science',
    category: 'Evoluzione',
    summary: 'La selezione naturale (*L\'Origine delle Specie*, 1859), variabilità genetica casuale e adattamento all\'ambiente.',
    keyConcepts: ['Selezione Naturale', 'Sopravvivenza del Più Adatto', 'Confronto con Lamarck'],
    samplePrompt: 'Qual è la differenza fondamentale tra la teoria dell\'evoluzione di Lamarck e quella di Darwin?',
    content: `### L'Evoluzione per Selezione Naturale
Nel 1859 **Charles Darwin** pubblica *L'origine delle specie per selezione naturale*, rivoluzionando la concezione della vita.

#### I Principi Cardine:
1. **Sovrapproduzione e Lotta per la sopravvivenza:** Gli organismi generano più prole di quanta le risorse ambientali possano sostenere.
2. **Variabilità intraspecifica:** All'interno di una stessa specie, i singoli individui presentano piccole differenze spontanee (oggi sappiamo dovute alle mutazioni casuali del DNA).
3. **Selezione Naturale:** Gli individui con caratteristiche casualmente più vantaggiose nel loro specifico ambiente hanno maggiori probabilità di sopravvivere e riprodursi, trasmettendo tali tratti alla discendenza.
- *Differenza con Lamarck:* Per Lamarck l'uso continuo di un organo ne determina lo sviluppo trasmesso ai figli (es. il collo della giraffa che si allunga per raggiungere le foglie); per Darwin esistevano giraffe con colli di lunghezze diverse e quelle con collo più lungo sono state favorite dalla disponibilità di cibo.`,
  },
  {
    id: 'sci_44',
    title: 'La Tettonica delle Placche, Terremoti e Vulcani',
    subject: 'Scienze',
    subjectId: 'science',
    category: 'Scienze della Terra',
    summary: 'La deriva dei continenti di Wegener, correnti convettive nel mantello, margini divergenti, convergenti e trascorrenti.',
    keyConcepts: ['Deriva dei Continenti', 'Margini di Subduzione e Faglie', 'Scala Richter vs Mercalli'],
    samplePrompt: 'Come si muovono le placche tettoniche e qual è la differenza tra ipocentro ed epicentro di un terremoto?',
    content: `### Tettonica a Placche e Sismologia
La litosfera terrestre è frammentata in grandi blocchi rigidi (**placche tettoniche**) che galleggiano sull'astenosfera sottostante, mosse dai moti convettivi di calore del mantello.

#### Tipi di Margini:
1. **Divergenti (in allontanamento):** Formano le dorsali oceaniche (fuoriuscita di magma e creazione di nuova crosta).
2. **Convergenti (in collisione):** Formano zone di subduzione e catene montuose (orogenesi, es. Alpi e Himalaya).
3. **Trascorrenti (scorrimento laterale):** Come la celebre faglia di San Andreas in California, generatrici di frequenti terremoti.

#### I Terremoti:
- **Ipocentro:** Il punto esatto nel sottosuolo dove si genera la frattura delle rocce.
- **Epicentro:** Il punto della superficie terrestre verticale all'ipocentro che avverte per primo le onde sismiche.
- **Scale di misurazione:** La scala **Richter** misura l'energia sprigionata (*magnitudo*); la scala **Mercalli** valuta i danni provocati a strutture e persone.`,
  },

  // --- FILOSOFIA (45 - 48) ---
  {
    id: 'fil_45',
    title: 'Socrate: La Maieutica e il "So di non Sapere"',
    subject: 'Filosofia',
    subjectId: 'philosophy',
    category: 'Filosofia Antica',
    summary: 'L\'ironia socratica, la confutazione (*elenchos*), il parto delle idee e la condanna a morte del 399 a.C.',
    keyConcepts: ['"So di Non Sapere"', 'La Maieutica (Arte della Levatrice)', 'L\'Intellettualismo Etico'],
    samplePrompt: 'In cosa consiste il metodo socratico del dialogo e perché Socrate fu condannato a morte?',
    content: `### Socrate e la Ricerca della Verità
Socrate (470–399 a.C.) non scrisse nulla: riteneva che la vera filosofia potesse vivere solo nel dialogo vivo e aperto tra persone.

#### I Due Momenti del Metodo Socratico:
1. **L'Ironia e la Confutazione (*Elenchos*):** Distrugge le false certezze dell'interlocutore fingendosi ignorante e ponendo continue domande (*"Che cos'è la giustizia?"*), portandolo alla consapevolezza socratica fondamentale: *"So di non sapere"*.
2. **La Maieutica (L'arte della levatrice):** Come sua madre Fenarete aiutava le donne a partorire i corpi, Socrate aiuta i discepoli a partorire autonomamente la verità che giace già dentro la loro anima.
- **Intellettualismo etico:** Chi compie il male non è malvagio per natura, ma ignorante del vero bene.`,
  },
  {
    id: 'fil_46',
    title: 'Platone: Il Mito della Caverna e il Mondo delle Idee',
    subject: 'Filosofia',
    subjectId: 'philosophy',
    category: 'Filosofia Antica',
    summary: 'Il dualismo tra mondo sensibile e Iperuranio, l\'allegoria degli schiavi incatenati e il filosofo-re nella Repubblica.',
    keyConcepts: ['L\'Iperuranio e le Idee', 'Mito della Caverna', 'I Quattro Gradi della Conoscenza'],
    samplePrompt: 'Cosa rappresenta il Mito della Caverna di Platone e quali sono i 4 gradi della conoscenza?',
    content: `### Platone: Il Mondo delle Idee e la Caverna
Discepolo di Socrate, Platone elabora il sistema del **dualismo metafisico**:
- **Mondo Sensibile:** Il mondo materiale e mutevole in cui viviamo, fatto di ombre e copie imperfette (*doxa*, opinione).
- **Mondo delle Idee (Iperuranio):** La dimensione trascendente delle forme eterne, immutabili e perfette, presiedute dall'**Idea del Bene**.

#### Il Mito della Caverna (*La Repubblica*, Libro VII):
Dei prigionieri vivono incatenati fin dall'infanzia in fondo a una caverna, vedendo proiettate sulla parete solo le ombre di statuette illuminate da un fuoco alle loro spalle: credono che quelle ombre siano l'unica realtà. Uno schiavo si libera, sale faticosamente all'esterno, rimane inizialmente abbagliato dalla luce del Sole (l'Idea del Bene) e contempla la vera realtà. Tornato nella caverna per liberare i compagni, viene deriso e rischia la morte: è l'allegoria della missione liberatrice del filosofo!`,
  },
  {
    id: 'fil_47',
    title: 'Aristotele: Logica, Sillogismo e le Quattro Cause',
    subject: 'Filosofia',
    subjectId: 'philosophy',
    category: 'Filosofia Antica',
    summary: 'L\'Organon aristotelico, il sillogismo perfetto, la metafisica della sostanza, potenza e atto.',
    keyConcepts: ['Il Sillogismo', 'Potenza e Atto', 'Le Quattro Cause (Materiale, Formale, Efficiente, Finale)'],
    samplePrompt: 'Fammi un esempio di sillogismo aristotelico e spiegami le 4 cause della metafisica',
    content: `### Aristotele e la Sistemazione del Sapere
Allievo di Platone ma critico della separazione dell'Iperuranio: per Aristotele le essenze e le forme risiedono all'interno delle cose stesse (*sinolo* di materia e forma).

#### Le Quattro Cause del Divenire:
1. **Causa Materiale:** La materia di cui è fatta una cosa (es. il marmo della statua).
2. **Causa Formale:** L'essenza e la forma geometrica della cosa (la sagoma dell'eroe).
3. **Causa Efficiente:** Ciò che genera il mutamento (lo scultore col martello).
4. **Causa Finale:** Lo scopo verso cui tende il processo (la gloria o la bellezza).

#### La Logica e il Sillogismo:
Il sillogismo è la forma perfetta del ragionamento deduttivo:
- *Premessa Maggiore:* Tutti gli uomini sono mortali.
- *Premessa Minore:* Socrate è un uomo.
- *Conclusione necessaria:* Dunque, Socrate è mortale.`,
  },
  {
    id: 'fil_48',
    title: 'Immanuel Kant: I Giudizi Sintetici a Priori',
    subject: 'Filosofia',
    subjectId: 'philosophy',
    category: 'Filosofia Moderna',
    summary: 'La Rivoluzione Copernicana gnoseologica, spazio e tempo come forme pure a priori, fenomeno e noumeno.',
    keyConcepts: ['Giudizi Sintetici a Priori', 'Rivoluzione Copernicana della Conoscenza', 'Fenomeno vs Noumeno'],
    samplePrompt: 'Cosa intende Kant per Rivoluzione Copernicana della conoscenza e cosa sono le forme pure a priori?',
    content: `### Immanuel Kant: La Critica della Ragion Pura (1781)
Kant supera sia il dogmatismo razionalista sia lo scetticismo empirista di Hume.

#### La "Rivoluzione Copernicana":
Come Copernico cambiò punto di vista mettendo il Sole al centro e la Terra in orbita, così Kant sposta l'attenzione dall'oggetto al **soggetto conoscente**: non è la mente umana che si adatta passivamente alle cose, ma sono le cose che vengono filtrate e ordinate dalle nostre strutture mentali innate (**forme a priori**).

#### I Giudizi Sintetici a Priori:
- Fecondi come l'esperienza (sintetici), ma universali e necessari come la logica (a priori), come le proposizioni della matematica e della fisica ($7 + 5 = 12$).
- **Fenomeno vs Noumeno:**
  - *Fenomeno:* La realtà come ci appare ordinata attraverso le nostre forme a priori di Spazio, Tempo e le 12 Categorie.
  - *Noumeno (la "cosa in sé"):* La realtà assoluta indipendente dalla nostra percezione, pensabile ma inconoscibile.`,
  },

  // --- INGLESE (49 - 50) ---
  {
    id: 'ing_49',
    title: 'Past Simple vs Present Perfect',
    subject: 'Inglese',
    subjectId: 'english',
    category: 'Grammatica Inglese',
    summary: 'La differenza chiave: azione conclusa nel passato con tempo definito vs azione con collegamento al presente.',
    keyConcepts: ['Time markers (yesterday, ago vs already, yet, ever)', 'Have/Has + Past Participle', 'Azione Conclusa vs Aperta'],
    samplePrompt: 'Qual è la regola per non sbagliare mai tra Past Simple e Present Perfect in inglese?',
    content: `### Past Simple vs Present Perfect in English
Uno degli argomenti più testati nelle verifiche e certificazioni Cambridge/IELTS!

#### 1. Past Simple:
Si usa quando l'azione è **completamente conclusa nel passato** e il momento temporale è specificato o sottinteso:
- *Parole spia:* **yesterday, last week, in 1999, two days ago, when I was a child**.
- *Esempio:* *"I visited London last summer."* (L'estate scorsa è finita, l'azione è conclusa).

#### 2. Present Perfect (*have/has + past participle*):
Si usa quando l'azione ha un **collegamento diretto con il presente**, o il tempo non è concluso, o per esperienze di vita:
- *Parole spia:* **already, yet, just, ever, never, for, since, so far, this morning**.
- *Esempio:* *"I have visited London three times."* (Nella mia vita finora, esperienza ancora aperta).
- *Esempio contrasto:* 
  - *"Did you eat breakfast?"* (Si chiede nel pomeriggio, il momento della colazione è passato).
  - *"Have you eaten breakfast yet?"* (Si chiede la mattina presto, sei ancora in tempo a farla).`,
  },
  {
    id: 'ing_50',
    title: 'I Periodi Ipotetici (Conditionals: 0, 1st, 2nd, 3rd)',
    subject: 'Inglese',
    subjectId: 'english',
    category: 'Grammatica Inglese',
    summary: 'Le quattro forme dei periodi ipotetici: verità scientifiche (0), realtà (1st), possibilità (2nd) e rimpianto irreale (3rd).',
    keyConcepts: ['Zero Conditional (If + Present, Present)', 'First (If + Present, Will)', 'Second (If + Past, Would)', 'Third (If + Past Perfect, Would have)'],
    samplePrompt: 'Come si formano e quando si usano i 4 tipi di conditionals in inglese?',
    content: `### The 4 English Conditionals
1. **Zero Conditional (Verità generali e scientifiche):**
   $$\\text{If} + \\text{Present Simple}, \\; \\text{Present Simple}$$
   - *"If you heat water to 100°C, it boils."*
2. **First Conditional (Situazioni reali e probabili nel futuro):**
   $$\\text{If} + \\text{Present Simple}, \\; \\text{will} + \\text{base form}$$
   - *"If it rains tomorrow, we will stay at home."*
3. **Second Conditional (Situazioni ipotetiche, immaginarie o improbabili):**
   $$\\text{If} + \\text{Past Simple}, \\; \\text{would} + \\text{base form}$$
   - *"If I won the lottery, I would buy a boat."*
   - *"If I were you, I would study harder."*
4. **Third Conditional (Ipotesi passata non verificata, rimpianto):**
   $$\\text{If} + \\text{Past Perfect}, \\; \\text{would have} + \\text{past participle}$$
   - *"If I had studied more, I would have passed the exam."*`,
  },
];
