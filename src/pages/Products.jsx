import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Volume2, VolumeX } from 'lucide-react'
import { drawFaceMesh, initFp3d } from '../utils/fp3d'
import { useLanguage } from '../i18n/language'
import ProductFlipCard from '../components/products/ProductFlipCard'
import './ProductCards.css'

function statusTone(status) {
  const t = status.es.toLowerCase()
  if (t.includes('publicad')) return 'live'
  if (t.includes('anticipado') || t.includes('demo')) return 'access'
  if (t.includes('lanzamiento')) return 'launch'
  return 'build'
}

const productVisuals = {
  EasyMeet: { slug: 'easymeet', accent: '#38bdf8', glow: 'rgba(56, 189, 248, 0.44)' },
  AllAIs: { slug: 'allais', accent: '#94f2ff', glow: 'rgba(148, 242, 255, 0.4)' },
  'Cash-ito': { slug: 'cashito', accent: '#22c55e', glow: 'rgba(34, 197, 94, 0.42)' },
  InQilinos: { slug: 'inqilinos', accent: '#f59e0b', glow: 'rgba(245, 158, 11, 0.42)' },
  'Delitos-SESNSP': { slug: 'delitos-sesnsp', accent: '#3b82f6', glow: 'rgba(59, 130, 246, 0.48)' },
  'Lukas Portfolio': { slug: 'lukas-portfolio', accent: '#a78bfa', glow: 'rgba(167, 139, 250, 0.42)' },
  'La Cantina Artesanal': { slug: 'la-cantina-artesanal', accent: '#eab308', glow: 'rgba(234, 179, 8, 0.42)' },
  'La Camionera': { slug: 'la-camionera', accent: '#ef4444', glow: 'rgba(239, 68, 68, 0.42)' },
  'Z-Scooters': { slug: 'z-scooters', accent: '#06b6d4', glow: 'rgba(6, 182, 212, 0.46)' },
}

const products = [
  {
    name: 'AllAIs',
    category: { es: 'IA multimodelo', en: 'Multi-model AI' },
    problem: { es: 'Equipos que usan varios modelos de IA por separado, sin control de uso ni comparación de resultados.', en: 'Teams using several AI models separately, with no usage control or way to compare results.' },
    solution: { es: 'Una sola interfaz para trabajar con los principales modelos de IA y comparar sus respuestas, con las claves protegidas en el servidor.', en: 'One interface to work with the leading AI models and compare their answers, with keys protected server-side.' },
    tech: { es: ['Multimodelo', 'Gateway seguro', 'Consola comparativa'], en: ['Multi-model', 'Secure gateway', 'Comparison console'] },
    users: { es: 'Investigadores, consultores, docentes y equipos institucionales.', en: 'Researchers, consultants, teachers and institutional teams.' },
    status: { es: 'Acceso anticipado', en: 'Early access' },
    interest: { origen: 'allais', es: 'Solicitar acceso', en: 'Request access' },
    value: { es: 'Reúne la mejor IA disponible en un espacio de trabajo profesional.', en: 'Brings the best available AI into one professional workspace.' },
  },
  {
    name: 'Delitos-SESNSP',
    category: { es: 'Seguridad pública y datos', en: 'Public security and data' },
    problem: { es: 'Bases de incidencia delictiva difíciles de leer para comparación territorial y temporal.', en: 'Crime incidence datasets that are difficult to read across territory and time.' },
    solution: { es: 'Dashboard para explorar delitos, tendencias, entidades y categorías de alto impacto.', en: 'A dashboard to explore crimes, trends, states and high-impact categories.' },
    tech: { es: ['React', 'Visualización', 'Datos SESNSP', 'Análisis territorial'], en: ['React', 'Visualization', 'SESNSP data', 'Territorial analysis'] },
    users: { es: 'Analistas, gobiernos, periodistas, investigadores y equipos de seguridad.', en: 'Analysts, governments, journalists, researchers and security teams.' },
    status: { es: 'Sitio en desarrollo', en: 'Site in development' },
    value: { es: 'Transforma datos públicos en inteligencia visual para seguimiento estratégico.', en: 'Turns public data into visual intelligence for strategic monitoring.' },
    href: 'https://delitos-sesnsp.nni.ai/',
  },
  {
    name: 'EasyMeet',
    category: { es: 'Productividad institucional', en: 'Institutional productivity' },
    problem: {
      es: 'Reuniones, acuerdos y seguimiento dispersos entre mensajes, minutas y recordatorios.',
      en: 'Meetings, agreements and follow-up dispersed across messages, minutes and reminders.',
    },
    solution: {
      es: 'Experiencia para organizar reuniones, acuerdos, responsables y trazabilidad de tareas.',
      en: 'An experience to organize meetings, agreements, owners and task traceability.',
    },
    tech: {
      es: ['IA asistida', 'Flujos de trabajo', 'Gestión de acuerdos'],
      en: ['AI assistance', 'Workflows', 'Agreement management'],
    },
    users: {
      es: 'Equipos directivos, consultorías, coordinación académica y grupos de proyecto.',
      en: 'Executive teams, consulting groups, academic coordination and project teams.',
    },
    status: { es: 'Prototipo conceptual', en: 'Concept prototype' },
    value: {
      es: 'Reduce pérdida de acuerdos y convierte reuniones en seguimiento accionable.',
      en: 'Reduces lost agreements and turns meetings into actionable follow-up.',
    },
    href: 'https://easymeet-admin.nni.ai/',
  },
  {
    name: 'Cash-ito',
    category: { es: 'Finanzas ligeras', en: 'Lightweight finance' },
    problem: {
      es: 'Pequeños negocios que registran ingresos, egresos y metas sin lectura clara del flujo diario.',
      en: 'Small businesses tracking income, expenses and goals without a clear view of daily cash flow.',
    },
    solution: {
      es: 'Herramienta para registrar movimientos, visualizar saldos y estimar metas de operación.',
      en: 'A tool to record movements, view balances and estimate operating goals.',
    },
    tech: { es: ['Dashboard', 'Registro financiero', 'Automatización'], en: ['Dashboard', 'Financial records', 'Automation'] },
    users: { es: 'Comercios, talleres, proyectos familiares y microempresas.', en: 'Shops, workshops, family projects and microbusinesses.' },
    status: { es: 'Lanzamiento · enero 2027', en: 'Launch · January 2027' },
    linkLabel: { es: 'Ver demostración', en: 'View demo' },
    interest: { origen: 'cashito', es: 'Avisarme del lanzamiento', en: 'Notify me at launch' },
    value: { es: 'Hace visible el dinero cotidiano y ayuda a decidir con información simple.', en: 'Makes everyday money visible and supports decisions with simple information.' },
    href: 'https://cashito2.web.app/home',
  },
  {
    name: 'InQilinos',
    category: { es: 'Gestión inmobiliaria', en: 'Property management' },
    problem: { es: 'Rentas, pagos, incidencias y comunicación con inquilinos sin registro organizado.', en: 'Rent, payments, incidents and tenant communication without organized records.' },
    solution: { es: 'Sistema para ordenar inmuebles, contratos, pagos, reportes e incidencias.', en: 'A system to organize properties, contracts, payments, reports and incidents.' },
    tech: { es: ['CRM ligero', 'Base de datos', 'Panel administrativo'], en: ['Light CRM', 'Database', 'Admin panel'] },
    users: { es: 'Propietarios, administradores y pequeños portafolios inmobiliarios.', en: 'Owners, administrators and small property portfolios.' },
    status: { es: 'Prototipo', en: 'Prototype' },
    value: { es: 'Profesionaliza una operación que suele depender de mensajes informales.', en: 'Professionalizes an operation that often depends on informal messages.' },
    href: 'https://inqilinos.nni.ai/introduccion',
  },
  {
    name: 'FaceR',
    category: { es: 'Seguridad institucional', en: 'Institutional security' },
    problem: { es: 'Control de acceso sin validación suficiente de identidad, QR y trazabilidad.', en: 'Access control without sufficient identity validation, QR security and traceability.' },
    solution: { es: 'Producto para identidad documental, reconocimiento facial, QR seguro y registro de accesos.', en: 'A product for document identity, facial recognition, secure QR and access records.' },
    tech: { es: ['Identidad documental', 'Biometría facial', 'QR seguro', 'Trazabilidad'], en: ['Document identity', 'Facial biometrics', 'Secure QR', 'Traceability'] },
    users: { es: 'Instituciones, edificios, eventos, escuelas y espacios con acceso controlado.', en: 'Institutions, buildings, events, schools and controlled-access spaces.' },
    status: { es: 'Landing publicada', en: 'Published landing page' },
    value: { es: 'Convierte la entrada institucional en una experiencia inteligente y verificable.', en: 'Turns institutional entry into an intelligent and verifiable experience.' },
    href: 'https://facer.nni.ai/',
  },
  {
    name: 'La Cantina Artesanal',
    category: { es: 'Operación comercial', en: 'Commercial operations' },
    problem: { es: 'Inventario, compras, ventas y utilidad diaria registrados sin sistema integrado.', en: 'Inventory, purchases, sales and daily profit tracked without an integrated system.' },
    solution: { es: 'Aplicación administrativa para productos, precios, stock, compras, ventas y reportes.', en: 'Administrative app for products, prices, stock, purchases, sales and reports.' },
    tech: { es: ['Firebase', 'Inventario', 'Ventas', 'Panel administrativo'], en: ['Firebase', 'Inventory', 'Sales', 'Admin panel'] },
    users: { es: 'Bares, tiendas, comercios locales y proyectos gastronómicos.', en: 'Bars, stores, local shops and food projects.' },
    status: { es: 'App publicada', en: 'Published app' },
    value: { es: 'Ordena la operación diaria y permite saber qué se compra, vende y gana.', en: 'Organizes daily operations and clarifies what is bought, sold and earned.' },
    href: 'https://la-cantina-artesanal-adm-1d70f.web.app/',
  },
  {
    name: 'La Camionera',
    category: { es: 'Turismo, renta y cotización de viajes', en: 'Tourism, rentals and trip quotes' },
    problem: { es: 'Servicios de transporte turístico que necesitaban presentar paquetes, renta de unidades y contacto de forma clara.', en: 'Tourism transportation services that needed clear presentation of packages, vehicle rentals and contact.' },
    solution: { es: 'Webapp para cotizaciones, paquetes, renta de autobuses, comunicación comercial y consulta de líneas.', en: 'Webapp for quotes, packages, bus rentals, commercial communication and route inquiries.' },
    tech: { es: ['React', 'Firebase', 'Diseño comercial', 'Experiencia responsive'], en: ['React', 'Firebase', 'Commercial design', 'Responsive experience'] },
    users: { es: 'Agencias, grupos turísticos, familias, escuelas y personas que organizan viajes.', en: 'Agencies, tour groups, families, schools and people organizing trips.' },
    status: { es: 'Sitio publicado', en: 'Published site' },
    value: { es: 'Convierte una operación de viajes en una experiencia digital clara, confiable y lista para venta.', en: 'Turns a travel operation into a clear, trustworthy and sales-ready digital experience.' },
    href: 'https://la-camionera.nni.ai/',
  },
  {
    name: 'Z-Scooters',
    category: { es: 'Ecommerce y reputación digital', en: 'Ecommerce and digital reputation' },
    problem: { es: 'Sitio comercial con necesidad de diagnóstico SEO, contenidos, catálogo y posicionamiento.', en: 'Commercial site requiring SEO diagnosis, content, catalog structure and positioning.' },
    solution: { es: 'Auditoría, plan de mejora, contenidos, estructura comercial y seguimiento de pendientes.', en: 'Audit, improvement plan, content, commercial structure and pending-item tracking.' },
    tech: { es: ['SEO', 'Wix ecommerce', 'Catálogo', 'Contenido comercial'], en: ['SEO', 'Wix ecommerce', 'Catalog', 'Commercial content'] },
    users: { es: 'Comercio especializado en scooters eléctricos, refacciones y taller.', en: 'Business specialized in electric scooters, parts and workshop services.' },
    status: { es: 'En construcción', en: 'Under construction' },
    value: { es: 'Fortalece confianza, visibilidad y conversión para un negocio de movilidad premium.', en: 'Strengthens trust, visibility and conversion for a premium mobility business.' },
    href: 'https://www.zescootersmx.com/',
  },
  {
    name: 'Lukas Portfolio',
    category: { es: 'Reputación artística', en: 'Artistic reputation' },
    problem: { es: 'Obra visual joven que requería una presentación digital fina, curada y memorable.', en: 'A young visual practice that needed a refined, curated and memorable digital presence.' },
    solution: { es: 'Portafolio web con recorrido visual, jerarquía estética y navegación suave por piezas.', en: 'A web portfolio with visual flow, aesthetic hierarchy and smooth navigation through pieces.' },
    tech: { es: ['React', 'Diseño visual', 'Curaduría digital'], en: ['React', 'Visual design', 'Digital curation'] },
    users: { es: 'Artistas, galerías, coleccionistas y proyectos culturales.', en: 'Artists, galleries, collectors and cultural projects.' },
    status: { es: 'Sitio publicado', en: 'Published site' },
    value: { es: 'Convierte una trayectoria artística en una experiencia de reputación internacional.', en: 'Turns an artistic trajectory into an international reputation experience.' },
    href: 'https://lukas-beeckman-portfolio.web.app/',
  },
]

const featuredProduct = products.find((product) => product.name === 'FaceR')
const productCards = products.filter((product) => product.name !== 'FaceR')

const productCopy = {
  es: {
    eyebrow: 'Productos y experiencias',
    title: 'Proyectos que muestran cómo NNI convierte ideas en sistemas.',
    lead:
      'Esta sección reúne productos, prototipos, sitios y experiencias desarrolladas por NNI. No son piezas aisladas: muestran capacidades acumuladas en diseño, IA aplicada, datos, seguridad, comercio, reputación digital y operación.',
    featuredLabel: 'Producto estrella',
    featuredText:
      'FaceR es la experiencia insignia de NNI para seguridad institucional: identidad documental, reconocimiento facial, QR seguro y trazabilidad de accesos en una narrativa visual clara, confiable y lista para demostración.',
    featuredMetrics: ['Identidad documental', 'Biometría facial', 'QR seguro', 'Trazabilidad'],
    featuredCta: 'Ver producto estrella',
    panelTitle: 'Acceso seguro con identidad verificable',
    panelSmall: 'Video demostrativo integrado en la ficha de producto.',
    soundOn: 'Sonido activado',
    soundOff: 'Activar sonido',
    solution: 'Solución',
    users: 'Usuarios',
    cardCta: 'Ver experiencia',
    stack: 'Tecnologías',
    backLabel: 'Ficha técnica',
    flipFront: 'Girar ficha',
    flipBack: 'Volver al anverso',
  },
  en: {
    eyebrow: 'Products and experience',
    title: 'Projects that show how NNI turns ideas into systems.',
    lead:
      'This section brings together products, prototypes, sites and experiences developed by NNI. They are not isolated pieces: they show accumulated capabilities in design, applied AI, data, security, commerce, digital reputation and operations.',
    featuredLabel: 'Featured product',
    featuredText:
      'FaceR is NNI’s flagship experience for institutional security: document identity, facial recognition, secure QR and access traceability in a clear, trustworthy and demo-ready visual narrative.',
    featuredMetrics: ['Document identity', 'Facial biometrics', 'Secure QR', 'Traceability'],
    featuredCta: 'View featured product',
    panelTitle: 'Secure access with verifiable identity',
    panelSmall: 'Demo video integrated into the product card.',
    soundOn: 'Sound on',
    soundOff: 'Turn sound on',
    solution: 'Solution',
    users: 'Users',
    cardCta: 'View experience',
    stack: 'Technologies',
    backLabel: 'Technical sheet',
    flipFront: 'Flip card',
    flipBack: 'Back to front',
  },
}

export default function Products() {
  const { language } = useLanguage()
  const copy = productCopy[language]
  const featuredPanelRef = useRef(null)
  const faceMeshRef = useRef(null)
  const videoRef = useRef(null)
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    const panel = initFp3d(featuredPanelRef.current, { maxTilt: 7, glareMax: 0.42 })
    const mesh = drawFaceMesh(faceMeshRef.current, { accent: '#94f2ff' })
    return () => {
      panel.destroy()
      mesh.destroy()
    }
  }, [])

  const toggleSound = () => {
    const video = videoRef.current
    if (!video) return

    const nextSoundState = !soundEnabled
    video.muted = !nextSoundState
    video.volume = nextSoundState ? 0.85 : 0
    setSoundEnabled(nextSoundState)

    if (nextSoundState) {
      video.play().catch(() => {
        video.muted = true
        setSoundEnabled(false)
      })
    }
  }

  return (
    <section className="page products-page">
      <div className="page-hero">
        <p className="eyebrow">{copy.eyebrow}</p>
        <h1>{copy.title}</h1>
        <p>{copy.lead}</p>
      </div>

      {featuredProduct && (
        <article className="featured-product-card">
          <div className="featured-product-copy">
            <div className="product-card-top">
              <span>{copy.featuredLabel}</span>
              <strong>{featuredProduct.status[language]}</strong>
            </div>
            <h2>{featuredProduct.name}</h2>
            <p>{copy.featuredText}</p>
            <div className="featured-product-metrics">
              {copy.featuredMetrics.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <a className="primary-button" href={featuredProduct.href} rel="noreferrer" target="_blank">
              {copy.featuredCta} <ExternalLink size={17} />
            </a>
          </div>
          <div className="featured-product-panel facer-motion-card" ref={featuredPanelRef} tabIndex={0}>
            <div className="fp3d-glare" aria-hidden="true" />
            <div className="facer-panel-inner">
              <div className="facer-video-shell">
                <video
                  ref={videoRef}
                  src="/videos/facer-product-demo.mp4"
                  poster="/favicon.svg"
                  muted={!soundEnabled}
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                />
                <canvas ref={faceMeshRef} aria-hidden="true" />
                <div className="facer-video-shade" />
              </div>
              <div className="facer-panel-copy">
                <span>FaceR</span>
                <strong>{copy.panelTitle}</strong>
                <small>{copy.panelSmall}</small>
                <button className="sound-toggle" type="button" onClick={toggleSound}>
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  {soundEnabled ? copy.soundOn : copy.soundOff}
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

      <div className="pcards">
        {productCards.map((product, index) => (
          <ProductFlipCard
            key={product.name}
            product={product}
            visual={productVisuals[product.name] ?? productVisuals.EasyMeet}
            index={index}
            tone={statusTone(product.status)}
            language={language}
            copy={copy}
          />
        ))}
      </div>
    </section>
  )
}
