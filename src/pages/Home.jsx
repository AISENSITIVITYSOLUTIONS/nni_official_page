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

const audiences = [
  'Gobiernos y áreas públicas',
  'Empresas y unidades de innovación',
  'Universidades y centros de investigación',
  'Organizaciones sociales y proyectos con impacto',
]

const solutions = [
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
]

const cases = [
  'Tableros de incidencia delictiva y análisis territorial.',
  'Sistemas de inventario, ventas y administración cotidiana.',
  'Portafolios digitales para reputación artística y profesional.',
  'Prototipos de acceso seguro, QR e identidad institucional.',
]

const method = [
  'Diagnóstico del problema y del flujo de datos.',
  'Prototipo funcional con narrativa visual clara.',
  'Validación técnica, editorial y operativa.',
  'Publicación, capacitación y mejora continua.',
]

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Identidad inteligente · decisiones seguras</p>
          <h1>Inteligencia aplicada para instituciones que necesitan decidir mejor.</h1>
          <p className="hero-lead">
            Neural Network Initiative convierte datos, procesos y conocimiento experto en
            sistemas digitales, modelos de IA, tableros y productos capaces de ordenar la
            complejidad institucional.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" to="/contacto">
              Solicitar diagnóstico <ArrowRight size={18} />
            </Link>
            <Link className="secondary-button" to="/productos">
              Ver experiencias
            </Link>
          </div>
        </div>

        <div className="hero-panel" aria-label="Capacidades de Neural Network Initiative">
          <span className="panel-status">NNI intelligence layer</span>
          <div className="signal-grid">
            <article>
              <BrainCircuit />
              <strong>IA aplicada</strong>
              <span>Modelos, asistentes y clasificación inteligente</span>
            </article>
            <article>
              <LineChart />
              <strong>Datos accionables</strong>
              <span>Indicadores, análisis y tableros ejecutivos</span>
            </article>
            <article>
              <Network />
              <strong>Procesos conectados</strong>
              <span>Automatización, trazabilidad y operación</span>
            </article>
          </div>
        </div>
      </section>

      <section className="section-grid intro-band">
        <div>
          <p className="eyebrow">Qué hacemos</p>
          <h2>Diseñamos inteligencia institucional, no solo herramientas digitales.</h2>
        </div>
        <p>
          Acompañamos a organizaciones que necesitan transformar información dispersa en
          decisiones, servicios y productos verificables. Combinamos investigación aplicada,
          diseño de experiencia, ciencia de datos, desarrollo web e inteligencia artificial
          con una mirada sobria, práctica y responsable.
        </p>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="eyebrow">Soluciones principales</p>
          <h2>Capacidades para pasar del dato al criterio operativo.</h2>
        </div>
        <div className="cards-grid four">
          {solutions.map((solution) => {
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
          <p className="eyebrow">Para quién trabajamos</p>
          <h2>Equipos que necesitan reputación, precisión y ejecución.</h2>
          <div className="tag-list">
            {audiences.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">Casos de uso</p>
          <ul className="check-list">
            {cases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="content-section split-section">
        <div>
          <p className="eyebrow">Metodología</p>
          <h2>Del diagnóstico al producto verificable.</h2>
        </div>
        <ol className="method-list">
          {method.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>

      <section className="cta-band">
        <div>
          <p className="eyebrow">Conversación inicial</p>
          <h2>Cuéntanos qué decisión, proceso o producto necesita inteligencia aplicada.</h2>
        </div>
        <Link className="primary-button" to="/contacto">
          Agendar consulta
        </Link>
      </section>
    </div>
  )
}
