/**
 * NNI · Receptor del formulario de interés de www.nni.ai
 * Pegar en: Hoja "NNI · Solicitudes de interés (sitio web)" → Extensiones → Apps Script.
 * Implementar → Nueva implementación → Aplicación web
 *   Ejecutar como: Yo · Quién tiene acceso: Cualquier persona.
 * Copiar la URL /exec en VITE_INTEREST_FORM_ENDPOINT (archivo .env del sitio).
 */
const ORIGENES = ['allais', 'cashito', 'cursos'];
const AVISAR_A = 'fdealbam@nni.ai'; // dejar '' para no recibir correo por cada solicitud

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents || '{}');
    if (d.website) return json_({ ok: true }); // trampa anti-spam (campo oculto)
    const correo = String(d.correo || '').trim().slice(0, 200);
    const nombre = String(d.nombre || '').trim().slice(0, 200);
    const origen = ORIGENES.indexOf(d.origen) >= 0 ? d.origen : 'otro';
    if (!nombre || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo) || d.acepta !== true) {
      return json_({ ok: false, error: 'datos_invalidos' });
    }
    const fila = [
      new Date(), origen, nombre, correo,
      String(d.institucion || '').trim().slice(0, 200),
      'sí', String(d.pagina || '').slice(0, 300), String(d.idioma || 'es').slice(0, 5)
    ];
    SpreadsheetApp.getActive().getSheets()[0].appendRow(fila);
    if (AVISAR_A) {
      MailApp.sendEmail(AVISAR_A, 'Nueva solicitud · ' + origen + ' · ' + nombre,
        'Origen: ' + origen + '\nNombre: ' + nombre + '\nCorreo: ' + correo + '\nInstitución: ' + fila[4]);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: 'error_interno' });
  } finally {
    lock.releaseLock();
  }
}

function json_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
