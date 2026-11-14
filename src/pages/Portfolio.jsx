import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Download, ExternalLink, FileCheck2, QrCode, ScanFace } from 'lucide-react'
import { useLanguage } from '../i18n/language'
import { productVisuals, products, statusTone } from '../data/products'
import badge from '../assets/nni-badge.webp'
import './Portfolio.css'

// Portafolio de presentación en tres láminas 16:9, listas para pantalla y para PDF (Ctrl + P).

const flagshipNames = ['FaceR', 'AllAIs', 'Cash-ito']
const flagshipVisuals = {
  FaceR: { accent: '#94f2ff', glow: 'rgba(148, 242, 255, 0.42)' },
  ...productVisuals,
}

const byName = (name) => products.find((product) => product.name === name)
const layerIcons = [QrCode, FileCheck2, ScanFace]
const domainOf = (href) => (href ? href.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'www.nni.ai')

const portfolioCopy = {
  es: {
    toolbarBack: 'Volver a productos',
    toolbarPrint: 'Descargar PDF',
    toolbarHint: 'Tres láminas 16:9 · se imprimen una por página',
    sheetLabel: 'Portafolio de productos',
    edition: 'Edición 2026',
    coverEyebrow: 'Neural Network Initiative',
    coverTitle: 'Inteligencia aplicada convertida en productos que operan.',
    coverLead:
      'NNI diseña y desarrolla sistemas digitales, modelos de IA, tableros y plataformas que ordenan la complejidad institucional y comercial. Este portafolio reúne los productos y experiencias que hoy forman nuestra cartera.',
    capabilitiesTitle: 'Capacidades',
    capabilities: [
      ['Modelos de IA aplicados', 'Clasificar, predecir, recomendar y priorizar con criterios verificables.'],
      ['Automatización de procesos', 'Flujos dispersos convertidos en procesos claros, trazables y medibles.'],
      ['Dashboards estratégicos', 'Datos e indicadores para leer riesgos, desempeño y oportunidades.'],
      ['Seguridad y trazabilidad', 'Acceso e identidad con validación documental, biométrica y operativa.'],
    ],
    metrics: { total: 'productos y experiencias', live: 'publicados en línea', capabilities: 'áreas de capacidad' },
    flagshipEyebrow: 'Productos insignia',
    flagshipTitle: 'Tres plataformas que muestran el núcleo tecnológico de NNI.',
    facerLayers: ['QR seguro', 'Documento', 'Rostro'],
    facerLayersLabel: 'Tres capas de verificación',
    problem: 'Problema',
    solution: 'Solución',
    users: 'Usuarios',
    value: 'Valor',
    catalogEyebrow: 'Cartera completa',
    catalogTitle: 'Experiencias desarrolladas para sectores distintos, con un mismo estándar.',
    closingTitle: '¿Conversamos sobre su proyecto?',
    closingText: 'Diagnóstico, prototipo y puesta en marcha con un equipo de investigación aplicada y desarrollo.',
    location: 'Ciudad de México',
    page: 'Lámina',
  },
  en: {
    toolbarBack: 'Back to products',
    toolbarPrint: 'Download PDF',
    toolbarHint: 'Three 16:9 sheets · one per printed page',
    sheetLabel: 'Product portfolio',
    edition: '2026 Edition',
    coverEyebrow: 'Neural Network Initiative',
    coverTitle: 'Applied intelligence turned into products that operate.',
    coverLead:
      'NNI designs and builds digital systems, AI models, dashboards and platforms that bring order to institutional and commercial complexity. This portfolio brings together the products and experiences in our current lineup.',
    capabilitiesTitle: 'Capabilities',
    capabilities: [
      ['Applied AI models', 'Classify, predict, recommend and prioritize with verifiable criteria.'],
      ['Process automation', 'Scattered workflows turned into clear, traceable, measurable processes.'],
      ['Strategic dashboards', 'Data and indicators to read risk, performance and opportunity.'],
      ['Security and traceability', 'Access and identity with document, biometric and operational checks.'],
    ],
    metrics: { total: 'products and experiences', live: 'published online', capabilities: 'capability areas' },
    flagshipEyebrow: 'Flagship products',
    flagshipTitle: 'Three platforms that show the technological core of NNI.',
    facerLayers: ['Secure QR', 'Document', 'Face'],
    facerLayersLabel: 'Three verification layers',
    problem: 'Problem',
    solution: 'Solution',
    users: 'Users',
    value: 'Value',
    catalogEyebrow: 'Full portfolio',
    catalogTitle: 'Experiences built for different sectors, to one standard.',
    closingTitle: 'Shall we talk about your project?',
    closingText: 'Diagnosis, prototype and launch with an applied research and development team.',
    location: 'Mexico City',
    page: 'Sheet',
  },
}

function SheetFrame({ index, copy, children, className = '' }) {
  return (
    <section className={`pf-sheet ${className}`} aria-label={`${copy.page} ${index}`}>
      <div className="pf-sheet-bg" aria-hidden="true" />
      <header className="pf-sheet-head">
        <span className="pf-brand">
          <img src={badge} alt="" />
          <strong>Neural Network Initiative</strong>
        </span>
        <span className="pf-head-meta">
          {copy.sheetLabel} · {copy.edition}
        </span>
      </header>
      <div className="pf-sheet-body">{children}</div>
      <footer className="pf-sheet-foot">
        <span>www.nni.ai</span>
        <span>
          {copy.page} {index} / 3
        </span>
      </footer>
    </section>
  )
}

function StatusPill({ product, language }) {
  return <span className={`pf-status is-${statusTone(product.status)}`}>{product.status[language]}</span>
}

export default function Portfolio() {
  const { language } = useLanguage()
  const copy = portfolioCopy[language]

  useEffect(() => {
    const previous = document.title
    document.title = `NNI · ${copy.sheetLabel}`
    // Formato de página 16:9 solo mientras esta ruta está montada.
    const pageStyle = document.createElement('style')
    pageStyle.textContent = '@page { size: 16in 9in; margin: 0; }'
    document.head.appendChild(pageStyle)
    return () => {
      document.title = previous
      pageStyle.remove()
    }
  }, [copy.sheetLabel])

  const flagships = flagshipNames.map(byName).filter(Boolean)
  const catalog = products.filter((product) => !flagshipNames.includes(product.name))
  const liveCount = products.filter((product) => statusTone(product.status) === 'live').length
  const [facer, ...secondary] = flagships

  return (
    <div className="pf-page">
      <div className="pf-toolbar">
        <Link className="pf-tool" to="/productos">
          <ArrowLeft size={15} /> {copy.toolbarBack}
        </Link>
        <span className="pf-toolbar-hint">{copy.toolbarHint}</span>
        <button className="pf-tool is-primary" type="button" onClick={() => window.print()}>
          <Download size={15} /> {copy.toolbarPrint}
        </button>
      </div>

      {/* Lámina 1 · Portada y capacidades */}
      <SheetFrame index={1} copy={copy} className="pf-cover">
        <div className="pf-cover-main">
          <p className="pf-eyebrow">{copy.coverEyebrow}</p>
          <h1>{copy.coverTitle}</h1>
          <p className="pf-lead">{copy.coverLead}</p>
          <div className="pf-metrics">
            <div>
              <strong>{products.length}</strong>
              <span>{copy.metrics.total}</span>
            </div>
            <div>
              <strong>{liveCount}</strong>
              <span>{copy.metrics.live}</span>
            </div>
            <div>
              <strong>{copy.capabilities.length}</strong>
              <span>{copy.metrics.capabilities}</span>
            </div>
          </div>
        </div>
        <div className="pf-cover-side">
          <div className="pf-orb" aria-hidden="true">
            <img src={badge} alt="" />
            <span className="pf-ring r1" />
            <span className="pf-ring r2" />
            <span className="pf-ring r3" />
          </div>
          <div className="pf-capabilities">
            <p className="pf-eyebrow">{copy.capabilitiesTitle}</p>
            {copy.capabilities.map(([title, text], i) => (
              <div className="pf-cap" key={title}>
                <span className="pf-cap-index">0{i + 1}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{text}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </SheetFrame>

      {/* Lámina 2 · Productos insignia */}
      <SheetFrame index={2} copy={copy} className="pf-flagship">
        <div className="pf-section-head">
          <p className="pf-eyebrow">{copy.flagshipEyebrow}</p>
          <h2>{copy.flagshipTitle}</h2>
        </div>
        <div className="pf-flagship-grid">
          {facer && (
            <article className="pf-hero-card" style={{ '--accent': flagshipVisuals.FaceR.accent, '--glow': flagshipVisuals.FaceR.glow }}>
              <div className="pf-card-top">
                <span>{facer.category[language]}</span>
                <StatusPill product={facer} language={language} />
              </div>
              <h3>{facer.name}</h3>
              <p className="pf-card-value">{facer.value[language]}</p>
              <div className="pf-layers" aria-label={copy.facerLayersLabel}>
                {copy.facerLayers.map((layer, i) => {
                  const Icon = layerIcons[i]
                  return (
                    <span className="pf-layer" key={layer} style={{ '--i': i }}>
                      <Icon className="pf-layer-icon" strokeWidth={1.6} />
                      <em>0{i + 1}</em>
                      {layer}
                    </span>
                  )
                })}
              </div>
              <dl className="pf-facts">
                <div>
                  <dt>{copy.problem}</dt>
                  <dd>{facer.problem[language]}</dd>
                </div>
                <div>
                  <dt>{copy.solution}</dt>
                  <dd>{facer.solution[language]}</dd>
                </div>
                <div>
                  <dt>{copy.users}</dt>
                  <dd>{facer.users[language]}</dd>
                </div>
              </dl>
              <div className="pf-tags">
                {facer.tech[language].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <a className="pf-link" href={facer.href} target="_blank" rel="noreferrer">
                {domainOf(facer.href)} <ExternalLink size={12} />
              </a>
            </article>
          )}
          <div className="pf-side-stack">
            {secondary.map((product) => {
              const visual = flagshipVisuals[product.name]
              return (
                <article className="pf-side-card" key={product.name} style={{ '--accent': visual.accent, '--glow': visual.glow }}>
                  <div className="pf-card-top">
                    <span>{product.category[language]}</span>
                    <StatusPill product={product} language={language} />
                  </div>
                  <h3>{product.name}</h3>
                  <p className="pf-card-value">{product.value[language]}</p>
                  <dl className="pf-facts is-compact">
                    <div>
                      <dt>{copy.solution}</dt>
                      <dd>{product.solution[language]}</dd>
                    </div>
                    <div>
                      <dt>{copy.users}</dt>
                      <dd>{product.users[language]}</dd>
                    </div>
                  </dl>
                  <div className="pf-tags">
                    {product.tech[language].map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                  {(() => {
                    const href = product.href ?? `https://www.nni.ai/interes?origen=${product.interest?.origen ?? ''}`
                    const label = product.href ? domainOf(product.href) : `www.nni.ai · ${product.interest?.[language] ?? ''}`
                    return (
                      <a className="pf-link" href={href} target="_blank" rel="noreferrer">
                        {label} <ExternalLink size={12} />
                      </a>
                    )
                  })()}
                </article>
              )
            })}
          </div>
        </div>
      </SheetFrame>

      {/* Lámina 3 · Cartera completa y contacto */}
      <SheetFrame index={3} copy={copy} className="pf-catalog">
        <div className="pf-section-head">
          <p className="pf-eyebrow">{copy.catalogEyebrow}</p>
          <h2>{copy.catalogTitle}</h2>
        </div>
        <div className="pf-catalog-grid">
          {catalog.map((product) => {
            const visual = productVisuals[product.name] ?? productVisuals.EasyMeet
            return (
              <article className="pf-mini" key={product.name} style={{ '--accent': visual.accent, '--glow': visual.glow }}>
                <div className="pf-card-top">
                  <span>{product.category[language]}</span>
                </div>
                <h3>{product.name}</h3>
                <p>{product.value[language]}</p>
                <p className="pf-mini-users">
                  <b>{copy.users}</b> {product.users[language]}
                </p>
                <div className="pf-tags">
                  {product.tech[language].slice(0, 3).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div className="pf-mini-foot">
                  <StatusPill product={product} language={language} />
                  {product.href && (
                    <a href={product.href} target="_blank" rel="noreferrer">
                      {domainOf(product.href)}
                    </a>
                  )}
                </div>
              </article>
            )
          })}
          <article className="pf-closing">
            <img src={badge} alt="" />
            <h3>{copy.closingTitle}</h3>
            <p>{copy.closingText}</p>
            <ul>
              <li>
                <a href="https://www.nni.ai/contacto">www.nni.ai/contacto</a>
              </li>
              <li>
                <a href="mailto:fdealbam@nni.ai">fdealbam@nni.ai</a>
              </li>
              <li>{copy.location}</li>
            </ul>
          </article>
        </div>
      </SheetFrame>
    </div>
  )
}
