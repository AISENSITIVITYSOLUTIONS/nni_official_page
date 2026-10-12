import { useLanguage } from '../i18n/language'

// Aviso de privacidad integral conforme a la LFPDPPP (México).
const UPDATED = '11 de octubre de 2026'
const CONTACT = 'fdealbam@nni.ai'

const content = {
  es: {
    eyebrow: 'Aviso de privacidad',
    title: 'Aviso de privacidad integral',
    updated: `Última actualización: ${UPDATED}`,
    sections: [
      ['Responsable', `Neural Network Initiative (AI Sensitivity Solutions), con domicilio en Tapachula 57, colonia Roma Norte, Ciudad de México, C.P. 06700, es responsable del tratamiento de sus datos personales. Contacto de privacidad: ${CONTACT}.`],
      ['Datos que recabamos', 'A través de los formularios de este sitio recabamos: nombre completo, correo electrónico, institución u organización (opcional) y el producto o servicio de su interés. También registramos la página desde la que envía el formulario y el idioma del sitio. No recabamos datos personales sensibles.'],
      ['Finalidades primarias', 'Atender su solicitud de acceso anticipado, aviso de lanzamiento, lista de espera o información; enviarle códigos de invitación, convocatorias de inscripción y respuestas a su consulta.'],
      ['Finalidades secundarias', 'Enviarle información sobre productos, cursos y servicios de NNI, y elaborar estadísticas internas de interés por producto. Si no desea que sus datos se usen para estas finalidades, escríbanos a ' + CONTACT + '; su negativa no afectará la atención de su solicitud.'],
      ['Transferencias y encargados', 'No vendemos ni transferimos sus datos a terceros. Para almacenarlos utilizamos servicios de Google (Google Workspace y Google Sheets) como encargados del tratamiento, bajo sus propias medidas de seguridad.'],
      ['Derechos ARCO y revocación', `Usted puede acceder, rectificar, cancelar u oponerse al tratamiento de sus datos, así como revocar su consentimiento, enviando un correo a ${CONTACT} con su nombre, el derecho que desea ejercer y una copia de identificación. Responderemos en un plazo máximo de 20 días hábiles.`],
      ['Conservación', 'Conservamos sus datos mientras sean necesarios para las finalidades descritas o hasta que solicite su cancelación.'],
      ['Cookies y analítica', 'Este sitio puede utilizar herramientas de analítica web para conocer de forma agregada cómo se usa. Puede desactivar las cookies desde la configuración de su navegador.'],
      ['Cambios a este aviso', 'Cualquier modificación se publicará en esta misma página, con la fecha de actualización.'],
    ],
  },
  en: {
    eyebrow: 'Privacy notice',
    title: 'Privacy notice',
    updated: 'Last updated: October 11, 2026',
    sections: [
      ['Data controller', `Neural Network Initiative (AI Sensitivity Solutions), Tapachula 57, Roma Norte, Mexico City, 06700, is responsible for processing your personal data. Privacy contact: ${CONTACT}.`],
      ['Data we collect', 'Through this site’s forms we collect your full name, email, institution or organization (optional) and the product or service you are interested in, as well as the page and site language. We do not collect sensitive personal data.'],
      ['Purposes', 'To handle your early-access, launch-notification, waitlist or information request and send invitation codes, enrollment calls and replies. Secondarily, to send information about NNI products and services and produce internal statistics; you may opt out at any time.'],
      ['Sharing', 'We do not sell or transfer your data. We store it using Google services (Google Workspace and Google Sheets) as data processors.'],
      ['Your rights', `You may access, correct, delete or object to the processing of your data, or withdraw consent, by writing to ${CONTACT}. We will reply within 20 business days.`],
      ['Changes', 'Any change to this notice will be published on this page with its update date.'],
    ],
  },
}

export default function Privacy() {
  const { language } = useLanguage()
  const c = content[language] ?? content.es
  return (
    <div className="page privacy-page">
      <section className="page-hero">
        <p className="eyebrow">{c.eyebrow}</p>
        <h1>{c.title}</h1>
        <p>{c.updated}</p>
      </section>
      <div className="privacy-body">
        {c.sections.map(([heading, text]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{text}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
