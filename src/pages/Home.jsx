import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  LineChart,
  Network,
  ShieldCheck,
  Workflow,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n/language'

const homeCopy = {
  es: {
    heroEyebrow: 'Identidad inteligente · decisiones seguras',
    heroTitle: 'Inteligencia aplicada para instituciones que necesitan decidir mejor.',
    heroLead:
      'Neural Network Initiative convierte datos, procesos y conocimiento experto en sistemas digitales, modelos de IA, tableros y productos capaces de ordenar la complejidad institucional.',
    primary: 'Solicitar diagnóstico',
    secondary: 'Ver experiencias',
    panelAria: 'Capacidades de Neural Network Initiative',
    panelStatus: 'NNI intelligence layer',
    signals: [
      ['IA aplicada', 'Modelos, asistentes y clasificación inteligente', BrainCircuit],
      ['Datos accionables', 'Indicadores, análisis y tableros ejecutivos', LineChart],
      ['Procesos conectados', 'Automatización, trazabilidad y operación', Network],
    ],
    introEyebrow: 'Qué hacemos',
    introTitle: 'Diseñamos inteligencia institucional, no solo herramientas digitales.',
    introText:
      'Acompañamos a organizaciones que necesitan transformar información dispersa en decisiones, servicios y productos verificables. Combinamos investigación aplicada, diseño de experiencia, ciencia de datos, desarrollo web e inteligencia artificial con una mirada sobria, práctica y responsable.',
    solutionsEyebrow: 'Soluciones principales',
    solutionsTitle: 'Capacidades para pasar del dato al criterio operativo.',
    solutions: [
      {
        icon: BrainCircuit,
        title: 'Modelos de IA aplicados',
        text: 'Diseñamos soluciones que clasifican, predicen, recomiendan y priorizan información institucional con criterios verificables.',
      },
      {
        icon: Workflow,
        title: 'Automatización de procesos',
        text: 'Convertimos flujos dispersos en procesos más claros, trazables y medibles para equipos que necesitan operar mejor.',
      },
      {
        icon: BarChart3,
        title: 'Dashboards estratégicos',
        text: 'Integramos datos, indicadores y visualizaciones para leer riesgos, desempeño y oportunidades en tiempo real.',
      },
      {
        icon: ShieldCheck,
        title: 'Seguridad y trazabilidad',
        text: 'Desarrollamos experiencias de acceso, identidad y control con capas de validación documental, biométrica y operativa.',
      },
    ],
    audiencesEyebrow: 'Para quién trabajamos',
    audiencesTitle: 'Equipos que necesitan reputación, precisión y ejecución.',
    audiences: [
      'Gobiernos y áreas públicas',
      'Empresas y unidades de innovación',
      'Universidades y centros de investigación',
      'Organizaciones sociales y proyectos con impacto',
    ],
    casesEyebrow: 'Casos de uso',
    cases: [
      'Tableros de incidencia delictiva y análisis territorial.',
      'Sistemas de inventario, ventas y administración cotidiana.',
      'Portafolios digitales para reputación artística y profesional.',
      'Prototipos de acceso seguro, QR e identidad institucional.',
    ],
    methodEyebrow: 'Metodología',
    methodTitle: 'Del diagnóstico al producto verificable.',
    method: [
      'Diagnóstico del problema y del flujo de datos.',
      'Prototipo funcional con narrativa visual clara.',
      'Validación técnica, editorial y operativa.',
      'Publicación, capacitación y mejora continua.',
    ],
    ctaEyebrow: 'Conversación inicial',
    ctaTitle: 'Cuéntanos qué decisión, proceso o producto necesita inteligencia aplicada.',
    cta: 'Agendar consulta',
  },
  en: {
    heroEyebrow: 'Intelligent identity · safer decisions',
    heroTitle: 'Applied intelligence for institutions that need to make better decisions.',
    heroLead:
      'Neural Network Initiative turns data, processes and expert knowledge into digital systems, AI models, dashboards and products capable of organizing institutional complexity.',
    primary: 'Request an assessment',
    secondary: 'View work',
    panelAria: 'Neural Network Initiative capabilities',
    panelStatus: 'NNI intelligence layer',
    signals: [
      ['Applied AI', 'Models, assistants and intelligent classification', BrainCircuit],
      ['Actionable data', 'Indicators, analysis and executive dashboards', LineChart],
      ['Connected processes', 'Automation, traceability and operations', Network],
    ],
    introEyebrow: 'What we do',
    introTitle: 'We design institutional intelligence, not just digital tools.',
    introText:
      'We support organizations that need to turn dispersed information into verifiable decisions, services and products. We combine applied research, experience design, data science, web development and artificial intelligence with a sober, practical and responsible approach.',
    solutionsEyebrow: 'Core solutions',
    solutionsTitle: 'Capabilities that turn data into operational judgment.',
    solutions: [
      {
        icon: BrainCircuit,
        title: 'Applied AI models',
        text: 'We design solutions that classify, predict, recommend and prioritize institutional information with verifiable criteria.',
      },
      {
        icon: Workflow,
        title: 'Process automation',
        text: 'We turn fragmented workflows into clearer, traceable and measurable processes for teams that need to operate better.',
      },
      {
        icon: BarChart3,
        title: 'Strategic dashboards',
        text: 'We integrate data, indicators and visualizations to read risks, performance and opportunities in real time.',
      },
      {
        icon: ShieldCheck,
        title: 'Security and traceability',
        text: 'We develop access, identity and control experiences with documentary, biometric and operational validation layers.',
      },
    ],
    audiencesEyebrow: 'Who we work with',
    audiencesTitle: 'Teams that need reputation, precision and execution.',
    audiences: [
      'Governments and public agencies',
      'Companies and innovation units',
      'Universities and research centers',
      'Social organizations and impact projects',
    ],
    casesEyebrow: 'Use cases',
    cases: [
      'Crime incidence dashboards and territorial analysis.',
      'Inventory, sales and daily administration systems.',
      'Digital portfolios for artistic and professional reputation.',
      'Secure access, QR and institutional identity prototypes.',
    ],
    methodEyebrow: 'Method',
    methodTitle: 'From diagnosis to verifiable product.',
    method: [
      'Problem and data-flow diagnosis.',
      'Functional prototype with a clear visual narrative.',
      'Technical, editorial and operational validation.',
      'Launch, training and continuous improvement.',
    ],
    ctaEyebrow: 'Initial conversation',
    ctaTitle: 'Tell us which decision, process or product needs applied intelligence.',
    cta: 'Schedule a consultation',
  },
}

export default function Home() {
  const { language } = useLanguage()
  const copy = homeCopy[language]

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">{copy.heroEyebrow}</p>
          <h1>{copy.heroTitle}</h1>
          <p className="hero-lead">{copy.heroLead}</p>
          <div className="hero-actions">
            <Link className="primary-button" to="/contacto">
              {copy.primary} <ArrowRight size={18} />
            </Link>
            <Link className="secondary-button" to="/productos">
              {copy.secondary}
            </Link>
          </div>
        </div>

        <div className="hero-panel" aria-label={copy.panelAria}>
          <span className="panel-status">{copy.panelStatus}</span>
          <div className="signal-grid">
            {copy.signals.map(([title, text, Icon]) => (
              <article key={title}>
                <Icon />
                <strong>{title}</strong>
                <span>{text}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-grid intro-band">
        <div>
          <p className="eyebrow">{copy.introEyebrow}</p>
          <h2>{copy.introTitle}</h2>
        </div>
        <p>{copy.introText}</p>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">{copy.solutionsEyebrow}</p>
          <h2>{copy.solutionsTitle}</h2>
        </div>
        <div className="cards-grid four">
          {copy.solutions.map((solution) => {
            const Icon = solution.icon
            return (
              <article className="glass-card" key={solution.title}>
                <Icon />
                <h3>{solution.title}</h3>
                <p>{solution.text}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="content-section split-section">
        <div>
          <p className="eyebrow">{copy.audiencesEyebrow}</p>
          <h2>{copy.audiencesTitle}</h2>
          <div className="tag-list">
            {copy.audiences.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">{copy.casesEyebrow}</p>
          <ul className="check-list">
            {copy.cases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section split-section">
        <div>
          <p className="eyebrow">{copy.methodEyebrow}</p>
          <h2>{copy.methodTitle}</h2>
        </div>
        <ol className="method-list">
          {copy.method.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">{copy.ctaEyebrow}</p>
          <h2>{copy.ctaTitle}</h2>
        </div>
        <Link className="primary-button" to="/contacto">
          {copy.cta}
        </Link>
      </section>
    </div>
  )
}
