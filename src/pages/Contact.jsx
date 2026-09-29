import { useLanguage } from '../i18n/language'

const contactCopy = {
  es: {
    projectTypes: [
      'Diagnóstico de IA y datos',
      'Dashboard o visualización',
      'Automatización de procesos',
      'Producto digital o app',
      'Seguridad institucional',
      'Capacitación para equipos',
    ],
    eyebrow: 'Contacto',
    title: 'Conversemos sobre el problema que necesita inteligencia aplicada.',
    lead:
      'Escríbenos si buscas ordenar datos, automatizar procesos, construir un producto digital, diseñar un tablero o formar equipos capaces de usar IA con criterio. Respondemos normalmente dentro de uno a dos días hábiles.',
    asideEyebrow: 'Podemos ayudarte con',
    aside:
      'Para acelerar la conversación, incluye contexto, objetivo, datos disponibles, usuarios esperados y fecha tentativa de implementación.',
    formEyebrow: 'Mensaje',
    formTitle: 'Cuéntanos sobre tu proyecto',
    name: 'Nombre',
    namePlaceholder: 'Tu nombre',
    emailPlaceholder: 'correo@empresa.com',
    message: 'Mensaje',
    messagePlaceholder: 'Describe la necesidad, el tipo de datos o proceso y el resultado que buscas.',
    submit: 'Enviar mensaje',
  },
  en: {
    projectTypes: [
      'AI and data diagnosis',
      'Dashboard or visualization',
      'Process automation',
      'Digital product or app',
      'Institutional security',
      'Team training',
    ],
    eyebrow: 'Contact',
    title: 'Let’s discuss the problem that needs applied intelligence.',
    lead:
      'Write to us if you need to organize data, automate processes, build a digital product, design a dashboard or train teams to use AI with judgment. We usually respond within one to two business days.',
    asideEyebrow: 'We can help with',
    aside:
      'To accelerate the conversation, include context, objective, available data, expected users and a tentative implementation date.',
    formEyebrow: 'Message',
    formTitle: 'Tell us about your project',
    name: 'Name',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'name@company.com',
    message: 'Message',
    messagePlaceholder: 'Describe the need, the type of data or process and the outcome you are looking for.',
    submit: 'Send message',
  },
}

export default function Contact() {
  const { language } = useLanguage()
  const copy = contactCopy[language]

  return (
    <section className="page contact-page">
      <div className="page-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
        <div className="contact-direct">
          <a href="tel:+525537141345">+52 (55) 3714 1345</a>
          <a href="mailto:fdealbam@nni.ai">fdealbam@nni.ai</a>
        </div>
      </div>

      <div className="contact-layout">
        <aside className="contact-aside">
          <p className="eyebrow">{copy.asideEyebrow}</p>
          <div className="tag-list">
            {copy.projectTypes.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <p>{copy.aside}</p>
        </aside>

        <form
          className="contact-form"
          action="mailto:fdealbam@nni.ai"
          method="post"
          encType="text/plain"
        >
          <div className="contact-form-header">
            <p className="eyebrow">{copy.formEyebrow}</p>
            <h2>{copy.formTitle}</h2>
          </div>

          <div className="form-row">
            <label>
              <span>{copy.name}</span>
              <input name="Nombre" placeholder={copy.namePlaceholder} required type="text" />
            </label>
            <label>
              <span>Email</span>
              <input name="Email" placeholder={copy.emailPlaceholder} required type="email" />
            </label>
          </div>

          <label>
            <span>{copy.message}</span>
            <textarea
              name="Mensaje"
              placeholder={copy.messagePlaceholder}
              required
              rows="7"
            />
          </label>

          <button className="primary-button" type="submit">
            {copy.submit}
          </button>
        </form>
      </div>
    </section>
  )
}
