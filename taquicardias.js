// Sección "Taquicardias": una animación 3D (video corto) por taquicardia, con el circuito y las claves para reconocerla.
// Los videos y sus carátulas están en videos_taquicardias/<id>.mp4 y <id>.jpg.
window.TAQUICARDIAS = [
  { grupo: 'Supraventriculares', color: '#3d8bd9', items: [
    { id: 'trnav', t: 'TRNAV típica (lenta-rápida)', circ: 'Reentrada dentro del nodo AV: baja por la vía lenta y sube por la vía rápida.',
      claves: ['Reentrada en el nodo AV: baja por la vía lenta y sube por la vía rápida.', 'RP corto: la P cae dentro o al final del QRS (pseudo r′ en V1, pseudo S en las inferiores).', 'A y V casi simultáneos: la A más precoz está en el septum, cerca del His.', 'Se corta con maniobras vagales o adenosina.'] },
    { id: 'trnavat', t: 'TRNAV atípica (rápida-lenta)', circ: 'Reentrada en el nodo AV al revés: baja por la vía rápida y sube por la vía lenta.',
      claves: ['Reentrada en el nodo AV al revés: baja por la vía rápida y sube por la lenta.', 'RP largo: la P cae cerca del QRS siguiente, negativa en las inferiores.', 'La A más precoz está cerca del ostium del seno coronario.', 'Suele ser más incesante que la típica.'] },
    { id: 'trav', t: 'TRAV ortodrómica', circ: 'Baja por el nodo AV y el His, y sube por una vía accesoria (acá, lateral izquierda).',
      claves: ['Baja por el nodo AV y el His, y sube por una vía accesoria (acá, lateral izquierda).', 'QRS fino; la P retrógrada cae después del QRS (RP corto).', 'La A más precoz está en la pared lateral izquierda.', 'La vía puede ser manifiesta (WPW) u oculta.'] },
    { id: 'anti', t: 'TRAV antidrómica', circ: 'El circuito al revés: baja por la vía accesoria y sube por la rama derecha, el His y el nodo AV.',
      claves: ['Baja por la vía accesoria y sube por la rama derecha, el His y el nodo AV.', 'QRS ancho y preexcitado: se puede confundir con una TV.', 'Es poco frecuente; puede haber más de una vía.', 'En ritmo sinusal hay preexcitación (WPW).'] },
    { id: 'af', t: 'TRAV atriofascicular', circ: 'Baja por una vía atriofascicular, de la pared lateral de la AD a la rama derecha, y sube por la rama derecha, el His y el nodo AV.',
      claves: ['Vía atriofascicular: de la pared lateral de la AD a la rama derecha; conduce con decremento.', 'QRS ancho con patrón de BRI.', 'Sube por la rama derecha, el His y el nodo AV.', 'En ritmo sinusal el ECG suele ser normal.'] },
    { id: 'pjrt', t: 'PJRT', circ: 'Baja por el nodo AV y el His, y sube por una vía posteroseptal lenta y decremental.',
      claves: ['Baja por el nodo AV y sube por una vía posteroseptal lenta y decremental.', 'RP largo, con P negativa en II, III y aVF.', 'La A más precoz está en el ostium del seno coronario.', 'Es incesante: puede producir taquicardiomiopatía.'] },
    { id: 'ta', t: 'Taquicardia auricular focal', circ: 'Un foco auricular (acá, la vena pulmonar superior izquierda) dispara solo y la A conduce por el nodo AV.',
      claves: ['Un foco auricular (acá, la vena pulmonar superior izquierda) dispara solo.', 'P de morfología distinta de la sinusal.', 'Puede seguir con bloqueo AV: la aurícula no necesita al nodo.', 'No depende del ventrículo.'] },
    { id: 'jet', t: 'Taquicardia de la unión (JET)', circ: 'Un foco en la unión AV o el His activa los ventrículos por el sistema de conducción; la aurícula sigue en ritmo sinusal, disociada.',
      claves: ['Foco en la unión AV o el His: activa los ventrículos por el sistema de conducción.', 'QRS fino y regular, con el His antes de cada V.', 'Disociación AV: la aurícula sigue en ritmo sinusal y las P no conducen.', 'Típica del posoperatorio de cirugía cardíaca. Con adenosina no se corta.'] }
  ] },
  { grupo: 'Ventriculares', color: '#e0584f', items: [
    { id: 'tvf', t: 'TV fascicular posterior', circ: 'Reentrada en el septum del VI: baja por P1 (miocardio septal de conducción lenta) y sube por el fascículo posterior (P2).',
      claves: ['Reentrada en el septum del VI: baja por P1 (miocardio septal lento) y sube por el fascículo posterior (P2).', 'QRS con patrón de BRD y hemibloqueo anterior izquierdo, relativamente angosto.', 'El His se activa después del inicio del QRS.', 'Responde al verapamilo.'] },
    { id: 'bbr', t: 'TV por reentrada rama-rama', circ: 'Baja por la rama derecha y sube por la rama izquierda.',
      claves: ['Baja por la rama derecha y sube por la izquierda.', 'QRS con patrón de BRI.', 'El His y la rama derecha preceden a cada V.', 'Se trata con ablación de la rama derecha.'] },
    { id: 'tsvd', t: 'TV del tracto de salida del VD', circ: 'Un foco en el tracto de salida del VD (anterior, debajo de la válvula pulmonar) activa los ventrículos.',
      claves: ['Foco en el tracto de salida del VD (anterior, debajo de la válvula pulmonar).', 'QRS con patrón de BRI y eje inferior.', 'Disociación AV (como acá) o retroconducción 1:1.', 'La aurícula sigue en ritmo sinusal.'] }
  ] }
];
