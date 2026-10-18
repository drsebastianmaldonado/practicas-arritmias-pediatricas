// Scores clínicos (pestaña "Scores"). Cada score se define acá; para agregar uno nuevo copiá un bloque.
//   verificado: false  ->  la página muestra "criterios pendientes de verificación". Poné true cuando hayas controlado cada
//                          puntaje contra la publicación original (y corregí "fuente" si hace falta).
//   grupos[].tipo:  "uno"   = se elige una sola opción (o ninguna)
//                   "suma"  = se pueden tildar varias y se suman
//                   "max"   = se pueden tildar varias pero cuenta solo el puntaje más alto
//   interpretacion: de mayor a menor; se usa la primera con  total >= desde
//   requiereGrupo:  (opcional) número de grupo (desde 0) que debe tener puntaje > 0; si no, se muestra sinRequisito
//   interpretacion[].corto: (opcional) texto breve que acompaña al rango en los cortes que se ven bajo el resultado
//   excluyentes:    (opcional) pares de criterios que no se suman juntos: "grupo.opción" o "grupo" entero (desde 0);
//                   al tildar uno, el otro queda bloqueado
//   opciones[].e:   (opcional) etiqueta que se muestra en lugar del puntaje, p. ej. "mayor" / "menor"
//   evaluar:        (opcional) reglas propias en vez de sumar puntos: recibe, por grupo, la lista de opciones tildadas
//                   y devuelve { titulo, lectura, activo } (activo = posición en "cortes", la lista de resultados posibles)
// En las calculadoras con fórmula, campos[].rango = [mín, máx] avisa si un dato parece mal cargado, y parcial(v)
// muestra lo que ya se puede calcular mientras faltan datos.
window.SCORES = [
  {
    id: "schwartz",
    titulo: "Score de Schwartz (síndrome de QT largo)",
    fuente: "Schwartz PJ, Crotti L. QTc behavior during exercise and genetic testing for the long-QT syndrome. Circulation. 2011;124:2181-5 (actualización del score de 1993).",
    verificado: true,
    grupos: [
      { t: "ECG · QTc en reposo (Bazett)", tipo: "uno", nota: "Sin fármacos ni trastornos que alteren estas variables del ECG.",
        opciones: [ { t: "QTc ≥ 480 ms", p: 3 }, { t: "QTc 460-479 ms", p: 2 }, { t: "QTc 450-459 ms (varones)", p: 1 } ] },
      { t: "ECG · otros hallazgos", tipo: "suma",
        opciones: [
          { t: "QTc ≥ 480 ms en el 4.º minuto de la recuperación de la ergometría", p: 1 },
          { t: "Torsades de pointes", p: 2 },
          { t: "Alternancia de la onda T", p: 1 },
          { t: "Onda T mellada en 3 derivaciones", p: 1 },
          { t: "Frecuencia cardíaca baja para la edad (solo niños)", p: 0.5 }
        ] },
      { t: "Historia clínica · síncope", tipo: "uno", nota: "El síncope y las torsades de pointes son mutuamente excluyentes: al tildar uno, el otro queda bloqueado.",
        opciones: [ { t: "Síncope con estrés", p: 2 }, { t: "Síncope sin estrés", p: 1 } ] },
      { t: "Historia clínica · sordera", tipo: "suma",
        opciones: [ { t: "Sordera congénita", p: 0.5 } ] },
      { t: "Historia familiar", tipo: "suma", nota: "El mismo familiar no puede contarse en las dos opciones.",
        opciones: [
          { t: "Familiares con síndrome de QT largo definido", p: 1 },
          { t: "Muerte súbita inexplicada antes de los 30 años en un familiar directo", p: 0.5 }
        ] }
    ],
    interpretacion: [
      { desde: 3.5, t: "Probabilidad alta de síndrome de QT largo", corto: "alta" },
      { desde: 1.5, t: "Probabilidad intermedia", corto: "intermedia" },
      { desde: 0,   t: "Probabilidad baja", corto: "baja" }
    ],
    excluyentes: [["1.1", "2"]]   // torsades de pointes (grupo 1, opción 1) y síncope (grupo 2)
  },
  {
    id: "shanghai",
    titulo: "Score de Shanghai (síndrome de Brugada)",
    fuente: "Antzelevitch C, Yan GX, Ackerman MJ, et al. J-wave syndromes expert consensus conference report: emerging concepts and gaps in knowledge. Heart Rhythm. 2016;13:e295-324.",
    verificado: true,
    grupos: [
      { t: "I. ECG", tipo: "uno", nota: "Solo se puntúa una opción de esta categoría.",
        opciones: [
          { t: "Patrón tipo 1 de Brugada espontáneo", p: 3.5 },
          { t: "Patrón tipo 1 de Brugada inducido por fiebre", p: 3 },
          { t: "Patrón tipo 2 o 3 que pasa a tipo 1 con la prueba farmacológica", p: 2 }
        ] },
      { t: "II. Historia clínica", tipo: "max", nota: "Cuenta solo el puntaje más alto de esta categoría.",
        opciones: [
          { t: "Paro cardíaco inexplicado o FV / TV polimorfa documentada", p: 3 },
          { t: "Respiración agónica nocturna", p: 2 },
          { t: "Síncope de probable causa arrítmica", p: 2 },
          { t: "Síncope de mecanismo poco claro", p: 1 },
          { t: "Aleteo o fibrilación auricular en menores de 30 años sin otra causa", p: 0.5 }
        ] },
      { t: "III. Historia familiar", tipo: "max", nota: "Cuenta solo el puntaje más alto de esta categoría.",
        opciones: [
          { t: "Familiar de 1.er o 2.º grado con síndrome de Brugada definido", p: 2 },
          { t: "Muerte súbita sospechosa (fiebre, nocturna o con fármacos que agravan el Brugada) en un familiar de 1.er o 2.º grado", p: 1 },
          { t: "Muerte súbita inexplicada antes de los 45 años en un familiar de 1.er o 2.º grado con autopsia negativa", p: 0.5 }
        ] },
      { t: "IV. Estudio genético", tipo: "suma",
        opciones: [ { t: "Mutación probablemente patogénica en un gen de susceptibilidad al Brugada", p: 0.5 } ] }
    ],
    requiereGrupo: 0,
    sinRequisito: "Para usar el score se necesita al menos un hallazgo de ECG (categoría I).",
    interpretacion: [
      { desde: 3.5, t: "Síndrome de Brugada probable / definitivo", corto: "probable / definitivo" },
      { desde: 2,   t: "Síndrome de Brugada posible", corto: "posible" },
      { desde: 0,   t: "No diagnóstico", corto: "no diagnóstico" }
    ]
  },
  {
    id: "deportista",
    titulo: "ECG del deportista: criterios internacionales (2017)",
    nota: "Para deportistas de 12 a 35 años. Tildá los hallazgos del ECG: los normales no requieren estudio; un solo hallazgo limítrofe tampoco; dos o más limítrofes, o cualquier hallazgo anormal, requieren evaluación adicional.",
    fuente: "Sharma S, Drezner JA, Baggish A, et al. International recommendations for electrocardiographic interpretation in athletes. J Am Coll Cardiol. 2017;69:1057-75 (y Eur Heart J. 2018;39:1466-80).",
    verificado: true,
    grupos: [
      { t: "Hallazgos normales (adaptación al entrenamiento)", tipo: "suma",
        opciones: [
          { t: "Aumento del voltaje del QRS (criterios de voltaje de HVI o HVD aislados)", e: "normal" },
          { t: "Bloqueo incompleto de rama derecha", e: "normal" },
          { t: "Repolarización precoz / elevación del ST", e: "normal" },
          { t: "Elevación del ST seguida de inversión de la onda T en V1-V4 en deportistas de raza negra", e: "normal" },
          { t: "Inversión de la onda T en V1-V3 en menores de 16 años", e: "normal" },
          { t: "Bradicardia o arritmia sinusal", e: "normal" },
          { t: "Ritmo auricular ectópico o ritmo de la unión", e: "normal" },
          { t: "Bloqueo AV de 1.er grado", e: "normal" },
          { t: "Bloqueo AV de 2.º grado Mobitz I (Wenckebach)", e: "normal" }
        ] },
      { t: "Hallazgos limítrofes", tipo: "suma", nota: "Uno solo, aislado, no requiere estudio; dos o más, sí.",
        opciones: [
          { t: "Desviación del eje a la izquierda (−30° a −90°)", e: "limítrofe" },
          { t: "Agrandamiento auricular izquierdo", e: "limítrofe" },
          { t: "Desviación del eje a la derecha (> 120°)", e: "limítrofe" },
          { t: "Agrandamiento auricular derecho", e: "limítrofe" },
          { t: "Bloqueo completo de rama derecha", e: "limítrofe" }
        ] },
      { t: "Hallazgos anormales", tipo: "suma", nota: "Inversión de la onda T: ≥ 1 mm en ≥ 2 derivaciones contiguas, sin contar aVR, III ni V1. No cuentan como anormales la inversión en V1-V3 en menores de 16 años, la T bifásica solo en V3, ni la elevación del punto J con ST convexo seguida de T negativa en V1-V4 en deportistas de raza negra.",
        opciones: [
          { t: "Inversión de la onda T anterior (V2-V4)", e: "anormal" },
          { t: "Inversión de la onda T lateral (I y aVL, V5 y/o V6)", e: "anormal" },
          { t: "Inversión de la onda T inferolateral (II y aVF, V5-V6, I y aVL)", e: "anormal" },
          { t: "Inversión de la onda T inferior (II y aVF)", e: "anormal" },
          { t: "Infradesnivel del ST ≥ 0,5 mm en ≥ 2 derivaciones contiguas", e: "anormal" },
          { t: "Ondas Q patológicas (Q/R ≥ 0,25 o ≥ 40 ms en ≥ 2 derivaciones, sin contar III ni aVR)", e: "anormal" },
          { t: "Bloqueo completo de rama izquierda", e: "anormal" },
          { t: "Trastorno inespecífico de la conducción intraventricular con QRS ≥ 140 ms", e: "anormal" },
          { t: "Onda épsilon", e: "anormal" },
          { t: "Preexcitación ventricular (PR < 120 ms con onda delta y QRS ≥ 120 ms)", e: "anormal" },
          { t: "QT prolongado: QTc ≥ 470 ms en varones o ≥ 480 ms en mujeres", e: "anormal" },
          { t: "Patrón de Brugada tipo 1", e: "anormal" },
          { t: "Bradicardia sinusal profunda (< 30 lpm) o pausas sinusales ≥ 3 s", e: "anormal" },
          { t: "Bloqueo AV de 1.er grado profundo (PR ≥ 400 ms)", e: "anormal" },
          { t: "Bloqueo AV de 2.º grado Mobitz II", e: "anormal" },
          { t: "Bloqueo AV de 3.er grado", e: "anormal" },
          { t: "Taquiarritmias auriculares (TSV, fibrilación o aleteo auricular)", e: "anormal" },
          { t: "≥ 2 extrasístoles ventriculares en un trazado de 10 s", e: "anormal" },
          { t: "Arritmias ventriculares (duplas, tripletas o TV no sostenida)", e: "anormal" }
        ] }
    ],
    cortes: ["No requiere estudio", "Requiere evaluación adicional"],
    evaluar: sel => {
      const lim = sel[1].length, anor = sel[2].length, n = (k, a, b) => k + " " + (k === 1 ? a : b);
      const titulo = `Hallazgos anormales: ${anor} · limítrofes: ${lim}`;
      if (anor) return { titulo, activo: 1, lectura: `ECG anormal (${n(anor, "hallazgo anormal", "hallazgos anormales")}): requiere evaluación adicional.` };
      if (lim >= 2) return { titulo, activo: 1, lectura: "Dos o más hallazgos limítrofes: requiere evaluación adicional." };
      return { titulo, activo: 0, lectura: lim ? "Un hallazgo limítrofe aislado: no requiere estudio adicional si el deportista está asintomático y sin antecedentes familiares." : "Sin hallazgos que requieran estudio (en deportista asintomático y sin antecedentes familiares)." };
    }
  },
  {
    id: "arvc",
    titulo: "Miocardiopatía arritmogénica del VD: criterios del Task Force (2010)",
    nota: "Cada categoría cuenta una sola vez (si hay un criterio mayor y uno menor en la misma categoría, cuenta el mayor). Definitivo: 2 mayores, o 1 mayor + 2 menores, o 4 menores de categorías distintas. Limítrofe: 1 mayor + 1 menor, o 3 menores. Posible: 1 mayor o 2 menores.",
    fuente: "Marcus FI, McKenna WJ, Sherrill D, et al. Diagnosis of arrhythmogenic right ventricular cardiomyopathy/dysplasia: proposed modification of the Task Force Criteria. Circulation. 2010;121:1533-41.",
    verificado: true,
    grupos: [
      { t: "I. Disfunción y alteraciones estructurales del VD", tipo: "max",
        opciones: [
          { t: "Eco: aquinesia, disquinesia o aneurisma regional del VD + (diástole) TSVD PLAX ≥ 32 mm (≥ 19 mm/m²), o PSAX ≥ 36 mm (≥ 21 mm/m²), o cambio fraccional de área ≤ 33 %", e: "mayor" },
          { t: "RMN: aquinesia, disquinesia o contracción disincrónica regional del VD + VFDVD ≥ 110 ml/m² (varones) o ≥ 100 ml/m² (mujeres), o FEVD ≤ 40 %", e: "mayor" },
          { t: "Angiografía del VD: aquinesia, disquinesia o aneurisma regional", e: "mayor" },
          { t: "Eco: aquinesia o disquinesia regional del VD + TSVD PLAX 29 a < 32 mm (16 a < 19 mm/m²), o PSAX 32 a < 36 mm (18 a < 21 mm/m²), o cambio fraccional de área > 33 % a ≤ 40 %", e: "menor" },
          { t: "RMN: aquinesia, disquinesia o contracción disincrónica regional del VD + VFDVD 100 a < 110 ml/m² (varones) o 90 a < 100 ml/m² (mujeres), o FEVD > 40 % a ≤ 45 %", e: "menor" }
        ] },
      { t: "II. Caracterización tisular (biopsia endomiocárdica)", tipo: "max",
        opciones: [
          { t: "Miocitos residuales < 60 % por morfometría (o < 50 % estimado), con reemplazo fibroso de la pared libre del VD en ≥ 1 muestra", e: "mayor" },
          { t: "Miocitos residuales 60-75 % por morfometría (o 50-65 % estimado), con reemplazo fibroso de la pared libre del VD en ≥ 1 muestra", e: "menor" }
        ] },
      { t: "III. Alteraciones de la repolarización", tipo: "max",
        opciones: [
          { t: "T negativas en V1, V2 y V3 (o más allá) en mayores de 14 años, sin bloqueo completo de rama derecha", e: "mayor" },
          { t: "T negativas en V1 y V2 en mayores de 14 años sin bloqueo completo de rama derecha, o en V4, V5 o V6", e: "menor" },
          { t: "T negativas en V1 a V4 en mayores de 14 años con bloqueo completo de rama derecha", e: "menor" }
        ] },
      { t: "IV. Alteraciones de la despolarización / conducción", tipo: "max",
        opciones: [
          { t: "Onda épsilon en derivaciones precordiales derechas (V1 a V3)", e: "mayor" },
          { t: "Potenciales tardíos en el ECG de señal promediada (≥ 1 de 3 parámetros) sin QRS ≥ 110 ms en el ECG estándar", e: "menor" },
          { t: "Duración de la activación terminal del QRS ≥ 55 ms (del nadir de la S al final del QRS) en V1, V2 o V3, sin bloqueo completo de rama derecha", e: "menor" }
        ] },
      { t: "V. Arritmias", tipo: "max",
        opciones: [
          { t: "TV sostenida o no sostenida con morfología de BRI y eje superior (QRS negativo o indeterminado en II, III y aVF, positivo en aVL)", e: "mayor" },
          { t: "TV sostenida o no sostenida del tracto de salida del VD (BRI con eje inferior) o de eje desconocido", e: "menor" },
          { t: "> 500 extrasístoles ventriculares en 24 h (Holter)", e: "menor" }
        ] },
      { t: "VI. Antecedentes familiares / genética", tipo: "max",
        opciones: [
          { t: "Familiar de 1.er grado con diagnóstico confirmado por criterios actuales del Task Force", e: "mayor" },
          { t: "Familiar de 1.er grado con diagnóstico confirmado por anatomía patológica (autopsia o cirugía)", e: "mayor" },
          { t: "Mutación patogénica (o probablemente patogénica) asociada a la enfermedad en el paciente", e: "mayor" },
          { t: "Familiar de 1.er grado con diagnóstico en el que no se puede confirmar si cumple los criterios actuales", e: "menor" },
          { t: "Muerte súbita prematura (< 35 años) por sospecha de la enfermedad en un familiar de 1.er grado", e: "menor" },
          { t: "Familiar de 2.º grado con diagnóstico confirmado (anatomía patológica o criterios actuales)", e: "menor" }
        ] }
    ],
    cortes: ["No cumple criterios", "Posible", "Limítrofe", "Definitivo"],
    evaluar: sel => {
      let M = 0, m = 0;
      sel.forEach(g => { if (g.some(o => o.e === "mayor")) M++; else if (g.length) m++; });
      const titulo = `Criterios mayores: ${M} · menores: ${m} (de categorías distintas)`;
      if (M >= 2 || (M === 1 && m >= 2) || m >= 4) return { titulo, activo: 3, lectura: "Diagnóstico definitivo." };
      if ((M === 1 && m === 1) || m === 3) return { titulo, activo: 2, lectura: "Diagnóstico limítrofe." };
      if (M === 1 || m === 2) return { titulo, activo: 1, lectura: "Diagnóstico posible." };
      return { titulo, activo: 0, lectura: "No cumple criterios diagnósticos." };
    }
  },
  // ---- Calculadoras con fórmula: "campos" (datos a ingresar) + "calc" (devuelve { titulo, valor (%), lectura, aviso }) ----
  {
    id: "hcmkids",
    titulo: "HCM Risk-Kids (muerte súbita a 5 años en miocardiopatía hipertrófica pediátrica)",
    nota: "Modelo para pacientes de 1 a 16 años con miocardiopatía hipertrófica. Ingresás los valores absolutos (mm) y la calculadora obtiene los Z-scores con edad-sexo-peso, igual que la calculadora oficial. No está validado en menores de 1 año, mayores de 16, con TV sostenida o FV previas, ni en miocardiopatías sindrómicas (errores innatos del metabolismo, RASopatías, enfermedad neuromuscular).",
    fuente: "Norrish G, et al. Development of a novel risk prediction model for sudden cardiac death in childhood hypertrophic cardiomyopathy (HCM Risk-Kids). JAMA Cardiol. 2019;4:918-927. Ecuaciones (superficie corporal, Z-scores, índice pronóstico y riesgo) tomadas del código de la calculadora oficial, hcmriskkids.org, y coinciden con la ecuación publicada en la validación externa (Eur J Prev Cardiol 2022, PMC8967478).",
    verificado: true,
    campos: [
      { id: "age", t: "Edad (años)", tipo: "num", paso: 1, min: 0, rango: [0, 18] },
      { id: "sexo", t: "Sexo", tipo: "sel", opciones: [["", "Elegir…"], ["F", "Femenino"], ["M", "Masculino"]] },
      { id: "peso", t: "Peso (kg)", tipo: "num", paso: 0.1, min: 0, rango: [2, 150] },
      { id: "mwt", t: "Espesor parietal máximo del ventrículo izquierdo en la ecocardiografía (mm)", tipo: "num", paso: 0.1, min: 0, rango: [3, 60] },
      { id: "la", t: "Diámetro de la aurícula izquierda, eje largo paraesternal, modo M o 2D (mm)", tipo: "num", paso: 0.1, min: 0, rango: [5, 80] },
      { id: "grad", t: "Gradiente máximo del tracto de salida del VI, en reposo o con Valsalva (mmHg; 4 × V²)", tipo: "num", paso: 1, min: 0, rango: [0, 200] },
      { id: "sinc", t: "Síncope inexplicado", tipo: "si" },
      { id: "nsvt", t: "TV no sostenida (≥ 3 latidos ventriculares consecutivos a ≥ 120 lpm, < 30 s, en Holter de al menos 24 h)", tipo: "si" }
    ],
    parcial: v => {   // Z-scores que ya se pueden calcular mientras faltan datos (mismas fórmulas que calc)
      if (!(v.peso > 0)) return "";
      const bsa = 0.1023 * Math.pow(v.peso, 0.68), f = x => x.toFixed(2).replace(".", ","), out = [];
      if (v.mwt > 0) out.push("Z-score del espesor parietal: " + f(((v.mwt / 10) / Math.pow(bsa, 0.4) - 0.58) / 0.09));
      if (v.la > 0 && v.sexo) out.push("Z-score de la aurícula izquierda: " + f(v.sexo === "M" ? ((v.la / (10.665 * Math.pow(v.peso, 0.255))) - 1) / 0.118 : ((v.la / (10.74 * Math.pow(v.peso, 0.246))) - 1) / 0.124));
      return out.join(" · ");
    },
    calc: v => {
      const bsa = 0.1023 * Math.pow(v.peso, 0.68);
      const zMwt = ((v.mwt / 10) / Math.pow(bsa, 0.4) - 0.58) / 0.09;
      const zLa = v.sexo === "M" ? ((v.la / (10.665 * Math.pow(v.peso, 0.255))) - 1) / 0.118
                                 : ((v.la / (10.74 * Math.pow(v.peso, 0.246))) - 1) / 0.124;
      const pi = 0.2171364 * (zMwt - 11.09) - 0.0047562 * (zMwt * zMwt - 174.12) + 0.130365 * (zLa - 1.92)
               + 0.429624 * v.sinc + 0.1861694 * v.nsvt - 0.0065555 * (v.grad - 21.8);
      const r = (1 - Math.pow(0.949437808, Math.exp(pi))) * 100, f = x => x.toFixed(2).replace(".", ",");
      const fuera = (v.age < 1 || v.age > 16) ? "Atención: el modelo solo está validado de 1 a 16 años. " : "";
      return { titulo: "Riesgo de muerte súbita a 5 años", valor: r,
        lectura: r >= 6 ? "Riesgo alto (≥ 6 % a 5 años, umbral usado en la validación del modelo)." : "Por debajo del umbral de 6 % a 5 años.",
        cortes: [{ t: "< 6 %", on: r < 6 }, { t: "≥ 6 % alto", on: r >= 6 }],
        detalle: `Z-score del espesor parietal: ${f(zMwt)} · Z-score de la aurícula izquierda: ${f(zLa)} · superficie corporal: ${f(bsa)} m² · índice pronóstico: ${f(pi)}`,
        aviso: fuera + "Riesgo = 1 − 0,949437808 ^ exp(índice pronóstico). Herramienta de apoyo: no reemplaza el juicio clínico." };
    }
  },
  {
    id: "hcmscd",
    titulo: "HCM Risk-SCD (muerte súbita a 5 años en miocardiopatía hipertrófica del adulto)",
    nota: "Modelo de la guía ESC 2014 para pacientes de 16 años o más. No está validado en niños (para ellos, usar HCM Risk-Kids), deportistas de alto rendimiento ni enfermedades metabólicas o de depósito.",
    fuente: "O'Mahony C, et al. A novel clinical risk prediction model for sudden cardiac death in hypertrophic cardiomyopathy (HCM Risk-SCD). Eur Heart J. 2014;35:2010-20. Ecuación y umbrales según la revisión de Arq Bras Cardiol 2018 (PMC6023627).",
    verificado: true,
    campos: [
      { id: "age", t: "Edad en la evaluación clínica (años)", tipo: "num", paso: 1, min: 0, rango: [10, 100] },
      { id: "mwt", t: "Espesor parietal máximo del ventrículo izquierdo (mm)", tipo: "num", paso: 1, min: 0, rango: [5, 60] },
      { id: "la", t: "Diámetro de la aurícula izquierda (mm)", tipo: "num", paso: 1, min: 0, rango: [15, 80] },
      { id: "grad", t: "Gradiente máximo del tracto de salida del VI, en reposo o con Valsalva (mmHg)", tipo: "num", paso: 1, min: 0, rango: [0, 200] },
      { id: "fam", t: "Antecedente familiar de muerte súbita", tipo: "si" },
      { id: "nsvt", t: "TV no sostenida", tipo: "si" },
      { id: "sinc", t: "Síncope inexplicado", tipo: "si" }
    ],
    calc: v => {
      const pi = 0.15939858 * v.mwt - 0.00294271 * v.mwt * v.mwt + 0.0259082 * v.la + 0.00446131 * v.grad
               + 0.4583082 * v.fam + 0.82639195 * v.nsvt + 0.71650361 * v.sinc - 0.01799934 * v.age;
      const r = (1 - Math.pow(0.998, Math.exp(pi))) * 100;
      return { titulo: "Riesgo de muerte súbita a 5 años", valor: r,
        lectura: r >= 6 ? "Riesgo alto (≥ 6 %): se debe considerar el CDI." : r >= 4 ? "Riesgo intermedio (4 a < 6 %): se puede considerar el CDI." : "Riesgo bajo (< 4 %): en general no se considera el CDI.",
        cortes: [{ t: "< 4 % bajo", on: r < 4 }, { t: "4 a < 6 % intermedio", on: r >= 4 && r < 6 }, { t: "≥ 6 % alto", on: r >= 6 }],
        aviso: (v.age < 16 ? "Atención: el modelo no está validado en menores de 16 años; usar HCM Risk-Kids. " : "") + "Riesgo = 1 − 0,998 ^ exp(índice pronóstico). Herramienta de apoyo: no reemplaza el juicio clínico." };
    }
  }
];

// Calculadoras que no se pueden reproducir acá (ecuación no publicada en abierto): se muestran como enlace a la oficial.
window.SCORES_ENLACES = [
  { t: "PRIMaCY (muerte súbita a 5 años en miocardiopatía hipertrófica pediátrica)",
    nota: "Modelo pediátrico (diagnóstico antes de los 18 años) desarrollado en SickKids con el registro SHaRe; alternativa a HCM Risk-Kids. Su ecuación no está publicada en abierto, por eso se usa la calculadora oficial. Miron A, et al. Circulation. 2020;142:217-29.",
    url: "https://tedrogersresearch.ca/primacy/" }
];
