// Valores normales por edad (pestaña "QTc y valores por edad").
// Transcritos de las tablas I, III, IV, V, VII y VIII de la fuente citada abajo. Para cambiar o agregar una tabla, editá este archivo:
//   tablas: lista de { titulo, columnas: [clave, título], filas: [{clave: valor}], nota }
window.VALORES = {
  fuente: "Pérez-Lescure Picarzo FJ. Guía rápida para la lectura sistemática del ECG pediátrico. 2.ª Edic. En: AEPap ed. Curso de Actualización Pediatría 2010. Madrid: Exlibris Ediciones; 2010. p. 155-62 (texto tomado y modificado de Rev Pediatr Aten Primaria. 2006;8:319-26). aepap.org/sites/default/files/ecg.pdf",
  tablas: [
    { titulo: "Frecuencia cardíaca (lpm): rango (media)",
      columnas: [["edad", "Edad"], ["fc", "Rango (media)"]],
      filas: [
        { edad: "Neonato", fc: "95-150 (123)" }, { edad: "1-2 meses", fc: "121-179 (149)" }, { edad: "3-5 meses", fc: "106-186 (141)" },
        { edad: "6-11 meses", fc: "109-169 (134)" }, { edad: "1-2 años", fc: "89-151 (119)" }, { edad: "3-4 años", fc: "73-137 (108)" },
        { edad: "5-7 años", fc: "65-133 (100)" }, { edad: "8-11 años", fc: "62-130 (91)" }, { edad: "12-15 años", fc: "60-119 (85)" }
      ] },
    { titulo: "Intervalo PR: límites inferior y superior de la normalidad (seg)",
      columnas: [["edad", "Edad"], ["inf", "Límite inferior"], ["sup", "Límite superior"]],
      filas: [
        { edad: "< 1 día", inf: "0,08", sup: "0,16" }, { edad: "1 día a 3 semanas", inf: "0,08", sup: "0,14" }, { edad: "1 a 2 meses", inf: "0,08", sup: "0,13" },
        { edad: "3 a 5 meses", inf: "0,08", sup: "0,15" }, { edad: "6 a 11 meses", inf: "0,08", sup: "0,16" }, { edad: "12 a 35 meses", inf: "0,08", sup: "0,15" },
        { edad: "3 a 7 años", inf: "0,10", sup: "0,16" }, { edad: "8 a 11 años", inf: "0,10", sup: "0,17" }, { edad: "12 a 15 años", inf: "0,10", sup: "0,18" },
        { edad: "Adulto", inf: "0,12", sup: "0,20" }
      ] },
    { titulo: "Duración del QRS: límite superior de la normalidad (seg)",
      columnas: [["edad", "Edad"], ["lsn", "Límite superior"]],
      filas: [
        { edad: "RN a 3 años", lsn: "0,07" }, { edad: "3 a 8 años", lsn: "0,08" }, { edad: "8 a 12 años", lsn: "0,09" },
        { edad: "12 a 16 años", lsn: "0,10" }, { edad: "Adulto", lsn: "0,10" }
      ] },
    { titulo: "Eje del QRS: media (rango)",
      columnas: [["edad", "Edad"], ["eje", "Media (rango)"]],
      filas: [
        { edad: "1 semana - 1 mes", eje: "+110º (de +30 hasta +180)" }, { edad: "1 - 3 meses", eje: "+70º (de +10 hasta +125)" },
        { edad: "3 meses - 3 años", eje: "+60º (de +10 hasta +110)" }, { edad: "> 3 años", eje: "+60º (de +20 hasta +120)" }
      ] },
    { titulo: "Intervalo QTc: valores normales",
      columnas: [["edad", "Grupo"], ["qtc", "QTc"]],
      filas: [
        { edad: "< 6 meses", qtc: "≤ 0,450 seg" }, { edad: "Niños", qtc: "≤ 0,440 seg" }, { edad: "Adolescentes y adultos", qtc: "≤ 0,430 seg" }
      ],
      nota: "Según la fuente, QTc = QT / √(intervalo R-R en seg), es decir, la fórmula de Bazett." },
    { titulo: "Voltaje de las ondas R y S (mm): media (p98)",
      columnas: [["edad", "Edad"], ["r1", "V1 · R"], ["s1", "V1 · S"], ["r6", "V6 · R"], ["s6", "V6 · S"]],
      filas: [
        { edad: "< 1 d", r1: "13,8 (26,1)", s1: "8,5 (22,7)", r6: "4,2 (11,1)", s6: "3,2 (9,6)" },
        { edad: "1-2 d", r1: "14,1 (26,9)", s1: "9,1 (20,7)", r6: "4,5 (12,2)", s6: "3,0 (9,4)" },
        { edad: "3-6 d", r1: "12,9 (24,2)", s1: "6,6 (16,8)", r6: "5,2 (12,1)", s6: "3,5 (9,8)" },
        { edad: "1-3 s", r1: "10,6 (20,8)", s1: "4,2 (10,8)", r6: "7,6 (16,4)", s6: "3,4 (9,8)" },
        { edad: "1-2 m", r1: "9,5 (18,4)", s1: "5,0 (12,4)", r6: "11,6 (21,4)", s6: "2,7 (6,4)" },
        { edad: "3-5 m", r1: "9,8 (19,8)", s1: "5,7 (17,1)", r6: "13,1 (22,4)", s6: "2,9 (9,9)" },
        { edad: "6-11 m", r1: "9,4 (20,3)", s1: "6,4 (18,1)", r6: "12,6 (22,7)", s6: "2,1 (7,2)" },
        { edad: "1-2 a", r1: "8,9 (17,7)", s1: "8,4 (21,0)", r6: "13,1 (22,6)", s6: "1,9 (6,6)" },
        { edad: "3-4 a", r1: "8,1 (18,2)", s1: "10,2 (21,4)", r6: "14,8 (24,2)", s6: "1,5 (5,2)" },
        { edad: "5-7 a", r1: "6,7 (13,9)", s1: "12,0 (23,8)", r6: "16,3 (26,5)", s6: "1,2 (4,0)" },
        { edad: "8-11 a", r1: "5,4 (12,1)", s1: "11,9 (25,4)", r6: "16,3 (25,4)", s6: "1,0 (3,9)" },
        { edad: "12-15 a", r1: "4,1 (9,9)", s1: "10,8 (21,2)", r6: "14,3 (23,0)", s6: "0,8 (3,7)" }
      ],
      nota: "d: días · s: semanas · m: meses · a: años." }
  ]
};
