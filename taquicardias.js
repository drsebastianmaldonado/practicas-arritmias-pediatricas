// Sección "Taquicardias": una animación 3D (video corto) por taquicardia, con el circuito y las claves para reconocerla.
// Los videos y sus carátulas están en videos_taquicardias/<id>.mp4 y <id>.jpg.
window.TAQUICARDIAS = [
  { grupo: 'Supraventriculares', color: '#3d8bd9', items: [
    { id: 'trnav', t: 'TRNAV típica (lenta-rápida)', circ: 'Reentrada dentro del nodo AV: baja por la vía lenta y sube por la vía rápida.',
      claves: ['RP corto: la P cae dentro o al final del QRS (pseudo r′ en V1, pseudo S en las derivaciones inferiores).', 'La A y el V salen casi juntos.', 'Se corta con maniobras vagales o adenosina.'] },
    { id: 'trnavat', t: 'TRNAV atípica (rápida-lenta)', circ: 'Reentrada en el nodo AV al revés: baja por la vía rápida y sube por la vía lenta.',
      claves: ['RP largo: la P cae cerca del QRS siguiente.', 'P negativa en las derivaciones inferiores.', 'Suele ser más incesante que la típica.'] },
    { id: 'trav', t: 'TRAV ortodrómica', circ: 'Baja por el nodo AV y el His, y sube por una vía accesoria (acá, lateral izquierda).',
      claves: ['QRS fino, con la P retrógrada después del QRS (RP corto).', 'La vía puede ser manifiesta (WPW) u oculta.', 'La aurícula y el ventrículo son parte del circuito.'] },
    { id: 'anti', t: 'TRAV antidrómica', circ: 'El circuito al revés: baja por la vía accesoria y sube por la rama derecha, el His y el nodo AV.',
      claves: ['QRS ancho y preexcitado: se puede confundir con una TV.', 'Es poco frecuente.', 'Puede haber más de una vía accesoria.'] },
    { id: 'af', t: 'TRAV atriofascicular', circ: 'Baja por una vía atriofascicular, de la pared lateral de la AD a la rama derecha, y sube por la rama derecha, el His y el nodo AV.',
      claves: ['QRS ancho con patrón de BRI.', 'La vía conduce con decremento (como el nodo).', 'En ritmo sinusal el ECG suele ser normal.'] },
    { id: 'pjrt', t: 'PJRT', circ: 'Baja por el nodo AV y el His, y sube por una vía posteroseptal lenta y decremental.',
      claves: ['RP largo, con P negativa en II, III y aVF.', 'Es incesante: puede producir taquicardiomiopatía.', 'La A más precoz está en el ostium del seno coronario.'] },
    { id: 'ta', t: 'Taquicardia auricular focal', circ: 'Un foco auricular (acá, la vena pulmonar superior izquierda) dispara solo y la A conduce por el nodo AV.',
      claves: ['P de morfología distinta de la sinusal.', 'Puede seguir con bloqueo AV: la aurícula no necesita al nodo.', 'No depende del ventrículo.'] },
    { id: 'jet', t: 'Taquicardia de la unión (JET)', circ: 'Un foco en la unión AV o el His activa los ventrículos por el sistema de conducción y la aurícula por retroconducción.',
      claves: ['QRS fino, con disociación AV o conducción VA 1:1.', 'Típica del posoperatorio de cirugía cardíaca.', 'Con adenosina desaparecen las A y el V sigue igual.'] }
  ] },
  { grupo: 'Ventriculares', color: '#e0584f', items: [
    { id: 'tvf', t: 'TV fascicular posterior', circ: 'Reentrada en el septum del VI: baja por P1 (miocardio septal de conducción lenta) y sube por el fascículo posterior (P2).',
      claves: ['QRS con patrón de BRD y hemibloqueo anterior izquierdo.', 'QRS relativamente angosto.', 'Responde al verapamilo.'] },
    { id: 'bbr', t: 'TV por reentrada rama-rama', circ: 'Baja por la rama derecha y sube por la rama izquierda.',
      claves: ['QRS con patrón de BRI.', 'El His y la rama derecha preceden a cada V.', 'Se trata con ablación de la rama derecha.'] },
    { id: 'tsvd', t: 'TV del tracto de salida del VD', circ: 'Un foco en el tracto de salida del VD (anterior, debajo de la válvula pulmonar) activa los ventrículos.',
      claves: ['QRS con patrón de BRI y eje inferior.', 'Puede haber disociación AV (como en la animación) o retroconducción 1:1.', 'La aurícula sigue en ritmo sinusal.'] }
  ] }
];
