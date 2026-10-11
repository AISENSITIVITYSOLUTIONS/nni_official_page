import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useLanguage } from '../../i18n/language'
import './InterestForm.css'

const ENDPOINT = import.meta.env.VITE_INTEREST_FORM_ENDPOINT

const COPY = {
  es: {
    kicker: 'Neural Network Initiative',
    legend: 'Me interesa',
    name: 'Nombre completo',
    email: 'Correo electrónico',
    org: 'Institución u organización',
    optional: '(opcional)',
    consentA: 'Acepto el ',
    consentLink: 'aviso de privacidad',
    consentB: ' y recibir información de NNI.',
    status: 'Estado',
    reply: 'Respuesta',
    replyValue: 'Un día hábil',
    sending: 'Enviando…',
    error: 'No pudimos registrar su solicitud. Intente de nuevo o escríbanos a fdealbam@nni.ai.',
    doneTitle: 'Recibimos su solicitud.',
    again: 'Enviar otra solicitud',
    products: {
      allais: { label: 'AllAIs', sub: 'Acceso anticipado', title: 'Solicite acceso anticipado a AllAIs.', lead: 'Una sola interfaz para trabajar con los principales modelos de IA. Le enviaremos su código de invitación por correo.', status: 'Acceso anticipado', cta: 'Solicitar acceso', done: 'Le enviaremos su código de invitación de AllAIs al correo registrado.' },
      cashito: { label: 'Cash-ito', sub: 'Enero 2027', title: 'Sea de los primeros en usar Cash-ito.', lead: 'El dinero cotidiano de su negocio, visible y claro. Le avisaremos el día del lanzamiento.', status: 'Lanzamiento · enero 2027', cta: 'Avisarme del lanzamiento', done: 'Le escribiremos en cuanto Cash-ito esté disponible.' },
      cursos: { label: 'Cursos', sub: '28 de noviembre', title: 'Reserve su lugar en la próxima generación.', lead: 'La generación actual tiene cupo completo. La siguiente inicia el 28 de noviembre; la lista de espera tiene prioridad de inscripción.', status: 'Próxima generación: 28 nov', cta: 'Unirme a la lista de espera', done: 'Quedó en la lista de espera. Recibirá la invitación de inscripción antes que el público general.' },
    },
  },
  en: {
    kicker: 'Neural Network Initiative',
    legend: 'I am interested in',
    name: 'Full name',
    email: 'Email',
    org: 'Institution or organization',
    optional: '(optional)',
    consentA: 'I accept the ',
    consentLink: 'privacy notice',
    consentB: ' and agree to receive information from NNI.',
    status: 'Status',
    reply: 'Reply',
    replyValue: 'One business day',
    sending: 'Sending…',
    error: 'We could not register your request. Please try again or write to fdealbam@nni.ai.',
    doneTitle: 'We received your request.',
    again: 'Send another request',
    products: {
      allais: { label: 'AllAIs', sub: 'Early access', title: 'Request early access to AllAIs.', lead: 'One interface to work with the leading AI models. We will email you an invitation code.', status: 'Early access', cta: 'Request access', done: 'We will send your AllAIs invitation code to the email you provided.' },
      cashito: { label: 'Cash-ito', sub: 'January 2027', title: 'Be among the first to use Cash-ito.', lead: 'Your business’s everyday money, visible and clear. We will let you know on launch day.', status: 'Launch · January 2027', cta: 'Notify me at launch', done: 'We will write to you as soon as Cash-ito is available.' },
      cursos: { label: 'Training', sub: 'November 28', title: 'Save your place in the next cohort.', lead: 'The current cohort is full. The next one starts on November 28; the waitlist gets priority enrollment.', status: 'Next cohort: Nov 28', cta: 'Join the waitlist', done: 'You are on the waitlist and will be invited to enroll before the general public.' },
    },
  },
}

const KEYS = ['allais', 'cashito', 'cursos']

export default function InterestForm() {
  const { language } = useLanguage()
  const t = COPY[language] ?? COPY.es
  const [params] = useSearchParams()
  const initial = KEYS.includes(params.get('origen')) ? params.get('origen') : 'allais'
  const [origen, setOrigen] = useState(initial)
  const [state, setState] = useState('idle') // idle | sending | done | error
  const p = t.products[origen]

  async function onSubmit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const payload = {
      origen,
      nombre: form.get('nombre'),
      correo: form.get('correo'),
      institucion: form.get('institucion'),
      acepta: form.get('acepta') === 'on',
      website: form.get('website'),
      pagina: window.location.href,
      idioma: language,
    }
    setState('sending')
    try {
      if (!ENDPOINT) throw new Error('VITE_INTEREST_FORM_ENDPOINT no configurado')
      // text/plain evita la verificación CORS previa que Apps Script no responde
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(payload) })
      const data = await res.json()
      if (!data.ok) throw new Error(data.error)
      setState('done')
      window.gtag?.('event', 'generate_lead', { origen })
    } catch {
      setState('error')
    }
  }

  return (
    <section className="interest" aria-labelledby="interest-title">
      <div className="interest-card">
        <aside className="interest-aside">
          <span className="interest-kicker">{t.kicker}</span>
          <h1 id="interest-title">{p.title}</h1>
          <p>{p.lead}</p>
          <dl className="interest-facts">
            <div><dt>{t.status}</dt><dd>{p.status}</dd></div>
            <div><dt>{t.reply}</dt><dd>{t.replyValue}</dd></div>
          </dl>
        </aside>

        <div className="interest-body">
          {state === 'done' ? (
            <div className="interest-done" role="status">
              <svg width="48" height="48" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" /><path d="M7.5 12.5l3 3 6-6.5" /></svg>
              <h2>{t.doneTitle}</h2>
              <p>{p.done}</p>
              <button type="button" className="interest-ghost" onClick={() => setState('idle')}>{t.again}</button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate={false}>
              <fieldset>
                <legend>{t.legend}</legend>
                <div className="interest-options" role="radiogroup">
                  {KEYS.map((key) => (
                    <button key={key} type="button" role="radio" aria-checked={origen === key}
                      className={origen === key ? 'interest-option is-on' : 'interest-option'}
                      onClick={() => setOrigen(key)}>
                      <strong>{t.products[key].label}</strong>
                      <span>{t.products[key].sub}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="interest-row">
                <label>{t.name}<input required name="nombre" autoComplete="name" maxLength={200} /></label>
                <label>{t.email}<input required type="email" name="correo" autoComplete="email" maxLength={200} /></label>
              </div>
              <label><span>{t.org} <span className="interest-muted">{t.optional}</span></span><input name="institucion" autoComplete="organization" maxLength={200} /></label>
              <input className="interest-trap" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
              <label className="interest-consent">
                <input required type="checkbox" name="acepta" />
                <span>{t.consentA}<a href="/privacidad">{t.consentLink}</a>{t.consentB}</span>
              </label>

              {state === 'error' && <p className="interest-error" role="alert">{t.error}</p>}

              <button type="submit" className="interest-submit" disabled={state === 'sending'}>
                {state === 'sending' ? t.sending : p.cta}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
