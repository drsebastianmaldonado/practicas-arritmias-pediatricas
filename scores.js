// Scores clínicos (pestaña "Scores"). Cada score se define acá; para agregar uno nuevo copiá un bloque.
//   verificado: false  ->  la página muestra "criterios pendientes de verificación". Poné true cuando hayas controlado cada
//                          puntaje contra la publicación original (y corregí "fuente" si hace falta).
//   grupos[].tipo:  "uno"   = se elige una sola opción (o ninguna)
//                   "suma"  = se pueden tildar varias y se suman
//                   "max"   = se pueden tildar varias pero cuenta solo el puntaje más alto
//   interpretacion: de mayor a menor; se usa la primera con  total >= desde
//   requiereGrupo:  (opcional) número de grupo (desde 0) que debe tener puntaje > 0; si no, se muestra sinRequisito
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
      { t: "Historia clínica · síncope", tipo: "uno", nota: "El síncope y las torsades de pointes son mutuamente excluyentes.",
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
      { desde: 3.5, t: "Probabilidad alta de síndrome de QT largo" },
      { desde: 1.5, t: "Probabilidad intermedia" },
      { desde: 0,   t: "Probabilidad baja" }
    ]
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
      { desde: 3.5, t: "Síndrome de Brugada probable / definitivo" },
      { desde: 2,   t: "Síndrome de Brugada posible" },
      { desde: 0,   t: "No diagnóstico" }
    ]
  },
  // ---- Calculadoras con fórmula: "campos" (datos a ingresar) + "calc" (devuelve { titulo, valor (%), lectura, aviso }) ----
  {
    id: "hcmkids",
    titulo: "HCM Risk-Kids (muerte súbita a 5 años en miocardiopatía hipertrófica pediátrica)",
    nota: "Modelo para pacientes de 1 a 16 años con miocardiopatía hipertrófica. Ingresás los valores absolutos (mm) y la calculadora obtiene los Z-scores con edad-sexo-peso, igual que la calculadora oficial. No está validado en menores de 1 año, mayores de 16, con TV sostenida o FV previas, ni en miocardiopatías sindrómicas (errores innatos del metabolismo, RASopatías, enfermedad neuromuscular).",
    fuente: "Norrish G, et al. Development of a novel risk prediction model for sudden cardiac death in childhood hypertrophic cardiomyopathy (HCM Risk-Kids). JAMA Cardiol. 2019;4:918-927. Ecuaciones (superficie corporal, Z-scores, índice pronóstico y riesgo) tomadas del código de la calculadora oficial, hcmriskkids.org, y coinciden con la ecuación publicada en la validación externa (Eur J Prev Cardiol 2022, PMC8967478).",
    verificado: true,
    campos: [
      { id: "age", t: "Edad (años)", tipo: "num", paso: 1, min: 0 },
      { id: "sexo", t: "Sexo", tipo: "sel", opciones: [["", "Elegir…"], ["F", "Femenino"], ["M", "Masculino"]] },
      { id: "peso", t: "Peso (kg)", tipo: "num", paso: 0.1, min: 0 },
      { id: "mwt", t: "Espesor parietal máximo del ventrículo izquierdo en la ecocardiografía (mm)", tipo: "num", paso: 0.1, min: 0 },
      { id: "la", t: "Diámetro de la aurícula izquierda, eje largo paraesternal, modo M o 2D (mm)", tipo: "num", paso: 0.1, min: 0 },
      { id: "grad", t: "Gradiente máximo del tracto de salida del VI, en reposo o con Valsalva (mmHg; 4 × V²)", tipo: "num", paso: 1, min: 0 },
      { id: "sinc", t: "Síncope inexplicado", tipo: "si" },
      { id: "nsvt", t: "TV no sostenida (≥ 3 latidos ventriculares consecutivos a ≥ 120 lpm, < 30 s, en Holter de al menos 24 h)", tipo: "si" }
    ],
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
      { id: "age", t: "Edad en la evaluación clínica (años)", tipo: "num", paso: 1, min: 0 },
      { id: "mwt", t: "Espesor parietal máximo del ventrículo izquierdo (mm)", tipo: "num", paso: 1, min: 0 },
      { id: "la", t: "Diámetro de la aurícula izquierda (mm)", tipo: "num", paso: 1, min: 0 },
      { id: "grad", t: "Gradiente máximo del tracto de salida del VI, en reposo o con Valsalva (mmHg)", tipo: "num", paso: 1, min: 0 },
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
        aviso: (v.age < 16 ? "Atención: el modelo no está validado en menores de 16 años; usar HCM Risk-Kids. " : "") + "Riesgo = 1 − 0,998 ^ exp(índice pronóstico). Herramienta de apoyo: no reemplaza el juicio clínico." };
    }
  }
];
