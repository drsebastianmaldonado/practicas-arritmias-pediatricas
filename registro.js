// Registro de usuarios: formulario que aparece la primera vez que alguien entra al banco.
// Está APAGADO hasta que completes "endpoint" y pongas activo: true (ver registro\LEEME.md, paso a paso).
window.REGISTRO = {
  activo: true,
  // Dirección de la aplicación web de Google Apps Script que guarda los datos en tu planilla "Usuarios del banco de casos" (ver registro\LEEME.md).
  endpoint: "https://script.google.com/macros/s/AKfycbzq8w8q-bwMQO3-rfA4kCczBvr3uIS7QHq9rbFluhVft7KTIJAUQmByIbh_MvFTPW_y/exec",
  // Registra además, para cada persona ya registrada, cuántas veces entra y su progreso (casos repasados, % de aciertos).
  // Dejalo en false hasta actualizar el script de Google (registro\registro_apps_script.gs) con la versión nueva; si no, cada
  // visita agregaría una fila repetida en vez de sumar al conteo de esa persona. Ver registro\LEEME.md.
  trackVisitas: true,
  // Si cambiás el aviso de privacidad o los datos que se piden, subí este número: todos vuelven a ver el formulario.
  version: 2,
  // Mail de contacto que se muestra en el aviso de privacidad para pedir acceso, corrección o baja de los datos.
  contacto: "",
  titulo: "Bienvenido/a al Banco de casos de arritmias",
  intro: "Para acceder, completá estos datos una sola vez. Los usamos para conocer quiénes usan el banco y, si lo autorizás, para avisarte de novedades académicas.",
  // Aviso de privacidad (borrador: revisalo y adaptalo antes de activarlo; no es asesoramiento legal).
  aviso: "Responsable: Dr. Sebastián Maldonado. Datos que se recogen: nombre, apellido, ciudad, país, correo electrónico y, mientras uses el banco, la cantidad de veces que accedés y tu progreso (casos repasados, porcentaje de respuestas correctas). Finalidad: dar acceso al Banco de casos y conocer a sus usuarios. No se venden ni se ceden a terceros. Podés pedir en cualquier momento el acceso, la corrección o la eliminación de tus datos.",
  // Consentimiento APARTE para poder escribirle por mail (no es obligatorio para usar el banco). Borrador: revisalo, es
  // el texto que la persona lee y acepta con su propio tilde antes de autorizar el envío de mails.
  avisoMail: "Autorizo al Dr. Sebastián Maldonado a escribirme al correo que indiqué arriba para avisos de casos nuevos, fascículos, recordatorios de fechas de devolución y otras herramientas académicas del Banco de casos de arritmias (por ejemplo el simulador o los algoritmos). No es publicidad ni contenido comercial, y el correo no se comparte con terceros. Puedo retirar esta autorización cuando quiera, respondiendo \"BAJA\" a cualquiera de esos correos o escribiendo a la dirección de contacto de este aviso; dejar de recibirlos no me quita el acceso al banco."
};
