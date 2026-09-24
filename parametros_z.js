// Calculadoras de Z-score (pestaña "Parámetros Z"). Usa el mismo formato que scores.js (campos + calc): documentado ahí.

// Coeficientes de la Tabla 5 de Dallaire & Dahdah (ver "dallaire" más abajo): modelo Z = (CAobs − [a + b·√BSA]) / (aSE + bSE·√BSA).
var DALLAIRE = {
  lmca:     { t: 'Tronco de la coronaria izquierda (LMCA)',        a: -0.1817, b: 2.9238, aSE: 0.1801, bSE: 0.2530 },
  lad:      { t: 'Descendente anterior (LAD)',                      a: -0.1502, b: 2.2672, aSE: 0.1709, bSE: 0.2293 },
  cx:       { t: 'Circunfleja (Cx)',                                a: -0.2716, b: 2.3458, aSE: 0.1142, bSE: 0.3423 },
  rcaProx:  { t: 'Coronaria derecha, segmento proximal',            a: -0.3039, b: 2.7521, aSE: 0.1626, bSE: 0.2881 },
  rcaMed:   { t: 'Coronaria derecha, segmento medio',               a: -0.3060, b: 2.4078, aSE: 0.1324, bSE: 0.3259 },
  rcaDist:  { t: 'Coronaria derecha, segmento distal',              a: -0.3185, b: 2.3295, aSE: 0.1099, bSE: 0.3198 }
};

// Coeficientes de la Tabla 2 de Pettersen et al. (ver "pettersen" más abajo): y = ln(medida), Media(y) = b0 + b1*BSA + b2*BSA² + b3*BSA³.
var PETTERSEN = {
  RVDd:    { t: 'Ventrículo derecho en diástole (RVDd)',        b0: -0.317, b1: 1.850, b2: -1.274, b3: 0.335, mse: 0.058, r2: 0.604 },
  IVSd:    { t: 'Septum interventricular en diástole (IVSd)',    b0: -1.242, b1: 1.272, b2: -0.762, b3: 0.208, mse: 0.046, r2: 0.606 },
  IVSs:    { t: 'Septum interventricular en sístole (IVSs)',     b0: -1.048, b1: 1.751, b2: -1.177, b3: 0.318, mse: 0.034, r2: 0.695 },
  LVIDd:   { t: 'Ventrículo izquierdo en diástole (LVIDd)',      b0:  0.105, b1: 2.859, b2: -2.119, b3: 0.552, mse: 0.010, r2: 0.922 },
  LVIDs:   { t: 'Ventrículo izquierdo en sístole (LVIDs)',       b0: -0.371, b1: 2.833, b2: -2.081, b3: 0.538, mse: 0.016, r2: 0.875 },
  LVPWd:   { t: 'Pared posterior del VI en diástole (LVPWd)',    b0: -1.586, b1: 1.849, b2: -1.188, b3: 0.313, mse: 0.037, r2: 0.739 },
  LVPWs:   { t: 'Pared posterior del VI en sístole (LVPWs)',     b0: -0.947, b1: 1.907, b2: -1.259, b3: 0.330, mse: 0.023, r2: 0.794 },
  AoAnn:   { t: 'Anillo aórtico',                                 b0: -0.874, b1: 2.708, b2: -1.841, b3: 0.452, mse: 0.010, r2: 0.934 },
  Sinus:   { t: 'Senos de Valsalva',                              b0: -0.500, b1: 2.537, b2: -1.707, b3: 0.420, mse: 0.012, r2: 0.916 },
  STJ:     { t: 'Unión sinotubular',                              b0: -0.759, b1: 2.643, b2: -1.797, b3: 0.442, mse: 0.018, r2: 0.878 },
  TAoArch: { t: 'Arco aórtico transverso',                        b0: -0.790, b1: 3.020, b2: -2.484, b3: 0.712, mse: 0.023, r2: 0.865 },
  Isthmus: { t: 'Istmo aórtico',                                  b0: -1.072, b1: 2.539, b2: -1.627, b3: 0.368, mse: 0.027, r2: 0.825 },
  DAoArch: { t: 'Arco aórtico distal',                            b0: -0.976, b1: 2.469, b2: -1.746, b3: 0.445, mse: 0.026, r2: 0.792 },
  AoDiaph: { t: 'Aorta a nivel del diafragma',                    b0: -0.922, b1: 2.100, b2: -1.411, b3: 0.371, mse: 0.018, r2: 0.842 },
  PVAnn:   { t: 'Anillo pulmonar',                                b0: -0.761, b1: 2.774, b2: -1.808, b3: 0.436, mse: 0.023, r2: 0.873 },
  MPA:     { t: 'Arteria pulmonar principal (tronco)',            b0: -0.707, b1: 2.746, b2: -1.807, b3: 0.424, mse: 0.024, r2: 0.857 },
  RPA:     { t: 'Arteria pulmonar derecha',                       b0: -1.360, b1: 3.394, b2: -2.508, b3: 0.660, mse: 0.027, r2: 0.873 },
  LPA:     { t: 'Arteria pulmonar izquierda',                     b0: -1.348, b1: 2.884, b2: -1.954, b3: 0.466, mse: 0.028, r2: 0.842 },
  MVAnn:   { t: 'Anillo mitral',                                  b0: -0.271, b1: 2.446, b2: -1.700, b3: 0.425, mse: 0.022, r2: 0.826 },
  TVAnn:   { t: 'Anillo tricuspídeo',                             b0: -0.164, b1: 2.341, b2: -1.596, b3: 0.387, mse: 0.036, r2: 0.726 },
  LA:      { t: 'Aurícula izquierda (diámetro anteroposterior)',  b0: -0.208, b1: 2.164, b2: -1.597, b3: 0.429, mse: 0.020, r2: 0.801 }
};

// calc(v) tiene que devolver { titulo, valor, lectura, decimales (opcional, def. 1), unidad (opcional, def. ' %' — acá se usa ''
// porque el resultado es un Z-score, no un porcentaje), detalle (opcional), aviso (opcional) }.
window.PARAMETROS_Z = [
  {
    id: 'pettersen',
    titulo: 'Z-score de estructuras cardíacas por ecocardiografía (Pettersen · Detroit)',
    nota: 'Población: 782 pacientes sanos de 1 día a 18 años, Children\'s Hospital of Michigan (Detroit). Se excluyeron pacientes con cardiopatía, síndromes genéticos u obesidad. La superficie corporal se calcula con la fórmula de DuBois y DuBois (la que trae por defecto la calculadora de parameterz.com para este mismo estudio); el artículo no aclara cuál usó.',
    fuente: 'Pettersen MD, Du W, Skeens ME, Humes RA. Regression equations for calculation of z scores of cardiac structures in a large cohort of healthy infants, children, and adolescents: an echocardiographic study. J Am Soc Echocardiogr. 2008;21(8):922-934. Coeficientes transcritos de la Tabla 2 del artículo original.',
    verificado: true,
    campos: [
      { id: 'estructura', t: 'Estructura medida', tipo: 'sel', opciones: [['', 'Elegir…']].concat(Object.keys(PETTERSEN).map(k => [k, PETTERSEN[k].t])) },
      { id: 'valor', t: 'Valor medido (cm)', tipo: 'num', paso: 0.01, min: 0 },
      { id: 'peso', t: 'Peso (kg)', tipo: 'num', paso: 0.1, min: 0 },
      { id: 'altura', t: 'Altura (cm)', tipo: 'num', paso: 0.1, min: 0 }
    ],
    calc: v => {
      const e = PETTERSEN[v.estructura];
      const bsa = 0.007184 * Math.pow(v.altura, 0.725) * Math.pow(v.peso, 0.425);
      const meanY = e.b0 + e.b1 * bsa + e.b2 * bsa * bsa + e.b3 * bsa * bsa * bsa;
      const z = (Math.log(v.valor) - meanY) / Math.sqrt(e.mse);
      const az = Math.abs(z);
      const lectura = az <= 2 ? 'Dentro del rango esperado para esa superficie corporal (± 2).'
        : az <= 3 ? 'Por fuera de ± 2 respecto de lo esperado para esa superficie corporal.'
        : 'Marcadamente por fuera de ± 3 respecto de lo esperado para esa superficie corporal.';
      return { titulo: 'Z-score: ' + e.t, valor: z, decimales: 2, unidad: '', lectura,
        detalle: `Superficie corporal (DuBois): ${bsa.toFixed(2)} m² · Media esperada para esa superficie: ${Math.exp(meanY).toFixed(2)} cm · R² de esta ecuación: ${e.r2}`,
        aviso: 'Z = (ln(valor medido) − media esperada en escala logarítmica) / √MSE. Herramienta de apoyo: no reemplaza el juicio clínico. El R² varía mucho según la estructura (de 0,60 a 0,93): con R² más bajo, el Z-score es menos preciso.' };
    }
  },
  {
    id: 'dallaire',
    titulo: 'Z-score de arterias coronarias (Dallaire & Dahdah · Montreal)',
    nota: 'Población: 1033 niños sanos de 2 meses a 18 años evaluados en el Hospital Sainte-Justine (Montreal, Canadá) entre 2001 y 2008 por soplo, síncope o dolor torácico considerados benignos, con ecocardiograma normal. Diámetros medidos de borde interno a borde interno. La superficie corporal se calcula con la fórmula de Haycock (los autores la usaron para obtener estos coeficientes y recomiendan explícitamente usar esa misma fórmula al aplicar la ecuación).',
    fuente: 'Dallaire F, Dahdah N. New equations and a critical appraisal of coronary artery Z scores in healthy children. J Am Soc Echocardiogr. 2011;24(1):60-74. Coeficientes transcritos de la Tabla 5 del artículo original (modelo con raíz cuadrada de la superficie corporal, el que los autores recomiendan como principal). Fórmula verificada reproduciendo los valores de las Tablas A1 y A2 del anexo del artículo.',
    verificado: true,
    campos: [
      { id: 'segmento', t: 'Segmento coronario medido', tipo: 'sel', opciones: [['', 'Elegir…']].concat(Object.keys(DALLAIRE).map(k => [k, DALLAIRE[k].t])) },
      { id: 'valor', t: 'Diámetro medido (mm)', tipo: 'num', paso: 0.01, min: 0 },
      { id: 'peso', t: 'Peso (kg)', tipo: 'num', paso: 0.1, min: 0 },
      { id: 'altura', t: 'Altura (cm)', tipo: 'num', paso: 0.1, min: 0 }
    ],
    calc: v => {
      const e = DALLAIRE[v.segmento];
      const bsa = 0.024265 * Math.pow(v.peso, 0.5378) * Math.pow(v.altura, 0.3964);
      const raiz = Math.sqrt(bsa);
      const media = e.a + e.b * raiz;
      const errorEst = e.aSE + e.bSE * raiz;
      const z = (v.valor - media) / errorEst;
      const az = Math.abs(z);
      const lectura = az <= 2 ? 'Dentro del rango esperado para esa superficie corporal (± 2).'
        : az <= 2.5 ? 'Levemente por fuera de ± 2: límite de lo esperado para esa superficie corporal.'
        : 'Marcadamente por fuera de ± 2,5 respecto de lo esperado para esa superficie corporal.';
      return { titulo: 'Z-score: ' + e.t, valor: z, decimales: 2, unidad: '', lectura,
        detalle: `Superficie corporal (Haycock): ${bsa.toFixed(2)} m² · Diámetro medio esperado para esa superficie: ${media.toFixed(2)} mm`,
        aviso: 'Z = (diámetro medido − [a + b·√BSA]) / (errorSE_a + errorSE_b·√BSA), con coeficientes propios por segmento (Tabla 5 del artículo). El uso clínico principal de este Z-score es la enfermedad de Kawasaki; la clasificación de dilatación/aneurisma según guías (ej. AHA 2017) combina el Z-score con otros criterios y no se calcula acá. Herramienta de apoyo: no reemplaza el juicio clínico.' };
    }
  }
];
