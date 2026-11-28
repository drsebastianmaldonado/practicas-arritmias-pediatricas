// Sección "Taquicardias": una animación 3D (video corto) por taquicardia, con el circuito y las claves para reconocerla.
// Los videos y sus carátulas están en videos_taquicardias/<id>.mp4 y <id>.jpg.
window.TAQUICARDIAS = [
  { grupo: 'Supraventriculares', color: '#3d8bd9', items: [
    { id: 'trnav', c: 'TRNAV típica', t: 'TRNAV típica (lenta-rápida)', circ: 'Reentrada dentro del nodo AV: baja por la vía lenta y sube por la vía rápida.',
      claves: ['Reentrada en el nodo AV: baja por la vía lenta y sube por la vía rápida.', 'RP corto: la P cae dentro o al final del QRS (pseudo r′ en V1, pseudo S en las inferiores).', 'A y V casi simultáneos: la A más precoz está en el septum, cerca del His.', 'Se corta con maniobras vagales o adenosina.'] },
    { id: 'trnavat', c: 'TRNAV atípica', t: 'TRNAV atípica (rápida-lenta)', circ: 'Reentrada en el nodo AV al revés: baja por la vía rápida y sube por la vía lenta.',
      claves: ['Reentrada en el nodo AV al revés: baja por la vía rápida y sube por la lenta.', 'RP largo: la P cae cerca del QRS siguiente, negativa en las inferiores.', 'La A más precoz está cerca del ostium del seno coronario.', 'Suele ser más incesante que la típica.'] },
    { id: 'trav', c: 'TRAV ortodrómica', t: 'TRAV ortodrómica', circ: 'Baja por el nodo AV y el His, y sube por una vía accesoria (acá, lateral izquierda).',
      claves: ['Baja por el nodo AV y el His, y sube por una vía accesoria (acá, lateral izquierda).', 'QRS angosto. La aurícula se activa en serie con el ventrículo: RP > 80 ms (la P retrógrada cae después del QRS).', 'La A más precoz está en la pared lateral izquierda.', 'La vía puede ser manifiesta (WPW) u oculta.'] },
    { id: 'anti', c: 'TRAV antidrómica', t: 'TRAV antidrómica', circ: 'El circuito al revés: baja por la vía accesoria y sube por la rama derecha, el His y el nodo AV.',
      claves: ['Baja por la vía accesoria y sube por la rama derecha, el His y el nodo AV.', 'QRS ancho y preexcitado: se puede confundir con una TV.', 'Es poco frecuente; puede haber más de una vía.', 'En ritmo sinusal hay preexcitación (WPW).'] },
    { id: 'af', c: 'TRAV atriofascicular', t: 'TRAV atriofascicular', circ: 'Baja por una vía atriofascicular, de la pared lateral de la AD a la rama derecha, y sube por la rama derecha, el His y el nodo AV.',
      claves: ['Vía atriofascicular: de la pared lateral de la AD a la rama derecha; conduce con decremento.', 'QRS ancho con patrón de BRI.', 'Sube por la rama derecha, el His y el nodo AV.', 'En ritmo sinusal el ECG suele ser normal.'] },
    { id: 'pjrt', c: 'PJRT', t: 'PJRT', circ: 'Baja por el nodo AV y el His, y sube por una vía posteroseptal lenta y decremental.',
      claves: ['Baja por el nodo AV y sube por una vía posteroseptal lenta y decremental.', 'RP largo, con P negativa en II, III y aVF.', 'La A más precoz está en el ostium del seno coronario.', 'Es incesante: puede producir taquicardiomiopatía.'] },
    { id: 'ta', c: 'Taquicardia auricular', t: 'Taquicardia auricular focal', circ: 'Un foco auricular (acá, la vena pulmonar superior izquierda) dispara solo y la A conduce por el nodo AV.',
      claves: ['Un foco auricular (acá, la vena pulmonar superior izquierda) dispara solo.', 'P de morfología distinta de la sinusal.', 'Puede seguir con bloqueo AV: la aurícula no necesita al nodo.', 'No depende del ventrículo.'] },
    { id: 'fa', c: 'FA', t: 'Fibrilación auricular', circ: 'Múltiples frentes de activación caóticos en las aurículas; el nodo AV filtra y conduce a los ventrículos en forma irregular.',
      claves: ['Las aurículas se activan en frentes caóticos, a más de 350 por minuto, sin un ciclo regular.', 'El nodo AV filtra: respuesta ventricular irregularmente irregular, con QRS angosto.', 'En el ECG no hay ondas P: la línea de base muestra ondas f.', 'Es poco frecuente en pediatría: buscar cardiopatía, WPW y otras causas. Con preexcitación, evitar los fármacos que bloquean el nodo AV.'] },
    { id: 'flutter', c: 'Aleteo auricular', t: 'Aleteo auricular típico', circ: 'Macrorreentrada en la aurícula derecha, alrededor del anillo tricuspídeo, con el istmo cavotricuspídeo como zona crítica.',
      claves: ['Un frente gira por la AD alrededor del anillo tricuspídeo; el istmo cavotricuspídeo es la zona crítica.', 'Aurícula regular y muy rápida: en general 250 a 350 por minuto, más en lactantes.', 'En el ECG, ondas F en dientes de sierra, negativas en II, III y aVF en el típico.', 'Suele conducir 2:1 al ventrículo (frecuencia fija y alta) o con conducción variable. Se trata con cardioversión y ablación del istmo.'] },
    { id: 'jet', c: 'JET', t: 'Taquicardia de la unión (JET)', circ: 'Un foco en la unión AV o el His activa los ventrículos por el sistema de conducción; la aurícula sigue en ritmo sinusal, disociada.',
      claves: ['Foco en la unión AV o el His: activa los ventrículos por el sistema de conducción.', 'QRS angosto, igual al sinusal (puede ser ancho si hay un bloqueo de rama previo), con el His antes de cada V.', 'Disociación AV: la aurícula sigue en ritmo sinusal y las P no conducen.', 'Típica del posoperatorio de cirugía cardíaca. Con adenosina no se corta.'] }
  ] },
  { grupo: 'Ventriculares', color: '#e0584f', items: [
    { id: 'tvf', c: 'TV fascicular', t: 'TV fascicular posterior', circ: 'Reentrada en el septum del VI: baja por P1 (miocardio septal de conducción lenta) y sube por el fascículo posterior (P2).',
      claves: ['Reentrada en el septum del VI: baja por P1 (miocardio septal lento) y sube por el fascículo posterior (P2).', 'QRS con patrón de BRD y hemibloqueo anterior izquierdo, relativamente angosto.', 'El His se activa después del inicio del QRS.', 'Responde al verapamilo.'] },
    { id: 'bbr', c: 'TV rama-rama', t: 'TV por reentrada rama-rama', circ: 'Baja por la rama derecha y sube por la rama izquierda.',
      claves: ['Baja por la rama derecha y sube por la izquierda.', 'QRS con patrón de BRI.', 'El His y la rama derecha preceden a cada V.', 'Se trata con ablación de la rama derecha.'] },
    { id: 'tsvd', c: 'TV del TSVD', t: 'TV del tracto de salida del VD', circ: 'Un foco en el tracto de salida del VD (anterior, debajo de la válvula pulmonar) activa los ventrículos.',
      claves: ['Foco en el tracto de salida del VD (anterior, debajo de la válvula pulmonar).', 'QRS con patrón de BRI y eje inferior.', 'Disociación AV (como acá) o retroconducción 1:1.', 'La aurícula sigue en ritmo sinusal.'] }
  ] },
  { grupo: 'Bloqueos AV', color: '#2aa198', items: [
    { id: 'bav1', c: 'BAV 1.er grado', t: 'Bloqueo AV de 1.er grado', circ: 'Todas las P conducen al ventrículo, pero el nodo AV las demora.',
      claves: ['Todas las P conducen, pero con retraso en el nodo AV.', 'PR prolongado para la edad y la frecuencia; cada P va seguida de un QRS (1:1).', 'El retraso casi siempre está en el nodo AV y el QRS es angosto.', 'Suele ser benigno y no requiere tratamiento: se hace seguimiento si hay síntomas o progresión.'] },
    { id: 'mob1', c: 'Mobitz I', t: 'Bloqueo AV de 2.º grado Mobitz I (Wenckebach)', circ: 'El PR se alarga latido a latido hasta que una P no conduce.',
      claves: ['El PR se alarga latido a latido hasta que una P no conduce; después el PR vuelve a ser corto.', 'El intervalo RR se acorta antes de la pausa (latidos agrupados).', 'El bloqueo suele estar en el nodo AV y el QRS es angosto.', 'Suele ser benigno (por ejemplo, con tono vagal) y rara vez necesita marcapasos.'] },
    { id: 'mob2', c: 'Mobitz II', t: 'Bloqueo AV de 2.º grado Mobitz II', circ: 'El PR no cambia y, de golpe, una P no conduce: el bloqueo está debajo del His.',
      claves: ['El PR no cambia y, de golpe, una P no conduce.', 'El bloqueo está debajo del nodo (sistema His-Purkinje): en el EEF se ve un His sin V.', 'Suele haber QRS ancho (bloqueo de rama asociado).', 'Puede progresar a BAV completo: suele requerir marcapasos.'] },
    { id: 'bav21', c: 'BAV 2:1', t: 'Bloqueo AV 2:1', circ: 'Una P conduce y la siguiente no, de forma alternante.',
      claves: ['Una P conduce y la siguiente no, de forma alternante.', 'Con el ECG solo no se puede decir si es Mobitz I o II, porque no hay dos PR seguidos.', 'PR largo y QRS angosto sugieren bloqueo en el nodo; QRS ancho sugiere bloqueo debajo del His.', 'Ayudan el Holter, la prueba de esfuerzo (mejora el bloqueo nodal y empeora el infranodal) y el estudio electrofisiológico.'] },
    { id: 'bavc', c: 'BAV completo', t: 'Bloqueo AV completo (3.er grado)', circ: 'Ninguna P conduce al ventrículo: aurículas y ventrículos se activan por separado y los ventrículos van a un ritmo de escape.',
      claves: ['Ninguna P conduce: aurículas y ventrículos se activan en forma independiente (disociación AV).', 'La aurícula sigue en ritmo sinusal y los ventrículos van a un escape más lento.', 'Escape de la unión: QRS angosto y más estable; escape ventricular: QRS ancho y más lento.', 'En pediatría puede ser congénito (por ejemplo, anticuerpos maternos anti-Ro/La) o posquirúrgico. Se indica marcapasos según síntomas y frecuencia.'] }
  ] }
];
