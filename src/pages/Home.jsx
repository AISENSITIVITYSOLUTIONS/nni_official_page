import {
  ArrowRight,
  BrainCircuit,
  CheckCircle2,
  FileCheck2,
  Network,
  QrCode,
  ScanFace,
  ShieldCheck,
} from 'lucide-react'
import { Link } from 'react-router-dom'

const stats = [
  { value: '01', label: 'IA aplicada' },
  { value: '02', label: 'Datos accionables' },
  { value: '03', label: 'Impacto medible' },
]

const capabilities = [
  'Inteligencia Artificial para empresas y organizaciones',
  'Analisis de datos para mejores decisiones',
  'Innovacion, originalidad y reingenieria de procesos',
]

const accessLayers = [
  {
    icon: FileCheck2,
    title: 'Datos institucionales',
    text: 'Informacion verificada',
  },
  {
    icon: ScanFace,
    title: 'Analisis inteligente',
    text: 'Procesos validados',
  },
  {
    icon: QrCode,
    title: 'Trazabilidad segura',
    text: 'Flujos aprobados',
  },
]

const cards = [
  {
    icon: BrainCircuit,
    title: 'Modelos inteligentes',
    text: 'Soluciones entrenadas para convertir informacion compleja en rutas de accion claras.',
  },
  {
    icon: Network,
    title: 'Ecosistemas de datos',
    text: 'Integramos fuentes, flujos y tableros para entender procesos con precision operativa.',
  },
  {
    icon: ShieldCheck,
    title: 'Estrategia responsable',
    text: 'Acompanamos proyectos con enfoque institucional, social y ambiental.',
  },
]

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="hero-glow hero-glow-one" aria-hidden="true"></div>
        <div className="hero-glow hero-glow-two" aria-hidden="true"></div>

        <div className="network-field" aria-hidden="true">
          <span className="node node-one"></span>
          <span className="node node-two"></span>
          <span className="node node-three"></span>
          <span className="node node-four"></span>
        </div>

        <div className="home-hero-inner">
          <div className="hero-copy">
            <p className="hero-kicker">
              <span></span>
              Identidad inteligente - decisiones seguras
            </p>
            <h1>IA institucional para convertir datos en decisiones inteligentes.</h1>
            <p className="hero-lead">
              Convertimos datos, procesos y conocimiento institucional en
              soluciones inteligentes para innovar, automatizar y decidir mejor.
            </p>

            <div className="hero-actions">
              <Link className="primary-button" to="/contacto">
                Agendar consulta gratis
                <ArrowRight size={18} strokeWidth={2.4} />
              </Link>
              <Link className="secondary-button" to="/servicios">
                Ver servicios
              </Link>
            </div>

            <div className="hero-checks" aria-label="Capacidades principales">
              {capabilities.map((item) => (
                <span key={item}>
                  <CheckCircle2 size={18} />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-visual" aria-label="Vista conceptual de seguridad y datos">
            <div className="access-device floating-panel">
              <div className="access-screen">
                <div className="access-topline">
                  <span>Live access</span>
                  <ShieldCheck size={20} />
                </div>

                <div className="access-list">
                  {accessLayers.map((item) => {
                    const Icon = item.icon

                    return (
                      <article className="access-card" key={item.title}>
                        <Icon size={26} />
                        <div>
                          <strong>{item.title}</strong>
                          <span>{item.text}</span>
                        </div>
                      </article>
                    )
                  })}
                </div>

                <div className="access-cta">Seguridad por capas</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="home-section intro-section">
        <div className="section-media floating-panel">
          <div className="data-window">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        <div className="section-copy">
          <p className="eyebrow">Introduccion</p>
          <h2>Neural Network Initiative</h2>
          <p>
            Somos una consultora con herramientas innovadoras que utiliza la
            Inteligencia Artificial para tratar flujos, procesos y datos de
            organizaciones con una mirada practica, estrategica y responsable.
          </p>
        </div>
      </section>

      <section className="home-section stats-section">
        {stats.map((item) => (
          <article className="stat-card glass-card" key={item.value}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </section>

      <section className="home-section cards-section">
        {cards.map((card) => {
          const Icon = card.icon

          return (
            <article className="feature-card glass-card" key={card.title}>
              <Icon size={26} />
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          )
        })}
      </section>
    </div>
  )
}
