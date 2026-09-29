import { useEffect, useRef, useState } from 'react'
import { ExternalLink, Volume2, VolumeX } from 'lucide-react'
import { drawFaceMesh, initFp3d } from '../utils/fp3d'

const productVisuals = {
  EasyMeet: { slug: 'easymeet', accent: '#38bdf8', glow: 'rgba(56, 189, 248, 0.44)' },
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
    name: 'EasyMeet',
    category: 'Productividad institucional',
    problem: 'Reuniones, acuerdos y seguimiento dispersos entre mensajes, minutas y recordatorios.',
    solution: 'Experiencia para organizar reuniones, acuerdos, responsables y trazabilidad de tareas.',
    tech: ['IA asistida', 'Flujos de trabajo', 'Gestión de acuerdos'],
    users: 'Equipos directivos, consultorías, coordinación académica y grupos de proyecto.',
    status: 'Prototipo conceptual',
    value: 'Reduce pérdida de acuerdos y convierte reuniones en seguimiento accionable.',
    href: 'https://easymeet-admin.nni.ai/',
  },
  {
    name: 'Cash-ito',
    category: 'Finanzas ligeras',
    problem: 'Pequeños negocios que registran ingresos, egresos y metas sin lectura clara del flujo diario.',
    solution: 'Herramienta para registrar movimientos, visualizar saldos y estimar metas de operación.',
    tech: ['Dashboard', 'Registro financiero', 'Automatización'],
    users: 'Comercios, talleres, proyectos familiares y microempresas.',
    status: 'Demo funcional',
    value: 'Hace visible el dinero cotidiano y ayuda a decidir con información simple.',
    href: 'https://cashito2.web.app/home',
  },
  {
    name: 'InQilinos',
    category: 'Gestión inmobiliaria',
    problem: 'Rentas, pagos, incidencias y comunicación con inquilinos sin registro organizado.',
    solution: 'Sistema para ordenar inmuebles, contratos, pagos, reportes e incidencias.',
    tech: ['CRM ligero', 'Base de datos', 'Panel administrativo'],
    users: 'Propietarios, administradores y pequeños portafolios inmobiliarios.',
    status: 'Prototipo',
    value: 'Profesionaliza una operación que suele depender de mensajes informales.',
    href: 'https://inqilinos.nni.ai/introduccion',
  },
  {
    name: 'FaceR',
    category: 'Seguridad institucional',
    problem: 'Control de acceso sin validación suficiente de identidad, QR y trazabilidad.',
    solution: 'Producto para identidad documental, reconocimiento facial, QR seguro y registro de accesos.',
    tech: ['Identidad documental', 'Biometría facial', 'QR seguro', 'Trazabilidad'],
    users: 'Instituciones, edificios, eventos, escuelas y espacios con acceso controlado.',
    status: 'Landing publicada',
    value: 'Convierte la entrada institucional en una experiencia inteligente y verificable.',
    href: 'https://facer.nni.ai/',
  },
  {
    name: 'Delitos-SESNSP',
    category: 'Seguridad pública y datos',
    problem: 'Bases de incidencia delictiva difíciles de leer para comparación territorial y temporal.',
    solution: 'Dashboard para explorar delitos, tendencias, entidades y categorías de alto impacto.',
    tech: ['React', 'Visualización', 'Datos SESNSP', 'Análisis territorial'],
    users: 'Analistas, gobiernos, periodistas, investigadores y equipos de seguridad.',
    status: 'Sitio en desarrollo',
    value: 'Transforma datos públicos en inteligencia visual para seguimiento estratégico.',
    href: 'https://delitos-sesnsp.nni.ai/',
  },
  {
    name: 'Lukas Portfolio',
    category: 'Reputación artística',
    problem: 'Obra visual joven que requería una presentación digital fina, curada y memorable.',
    solution: 'Portafolio web con recorrido visual, jerarquía estética y navegación suave por piezas.',
    tech: ['React', 'Diseño visual', 'Curaduría digital'],
    users: 'Artistas, galerías, coleccionistas y proyectos culturales.',
    status: 'Sitio publicado',
    value: 'Convierte una trayectoria artística en una experiencia de reputación internacional.',
    href: 'https://lukas-beeckman-portfolio.web.app/',
  },
  {
    name: 'La Cantina Artesanal',
    category: 'Operación comercial',
    problem: 'Inventario, compras, ventas y utilidad diaria registrados sin sistema integrado.',
    solution: 'Aplicación administrativa para productos, precios, stock, compras, ventas y reportes.',
    tech: ['Firebase', 'Inventario', 'Ventas', 'Panel administrativo'],
    users: 'Bares, tiendas, comercios locales y proyectos gastronómicos.',
    status: 'App publicada',
    value: 'Ordena la operación diaria y permite saber qué se compra, vende y gana.',
    href: 'https://la-cantina-artesanal-adm-1d70f.web.app/',
  },
  {
    name: 'La Camionera',
    category: 'Turismo, renta y cotización de viajes',
    problem: 'Servicios de transporte turístico que necesitaban presentar paquetes, renta de unidades y contacto de forma clara.',
    solution: 'Webapp para cotizaciones, paquetes, renta de autobuses, comunicación comercial y consulta de líneas.',
    tech: ['React', 'Firebase', 'Diseño comercial', 'Experiencia responsive'],
    users: 'Agencias, grupos turísticos, familias, escuelas y personas que organizan viajes.',
    status: 'Sitio publicado',
    value: 'Convierte una operación de viajes en una experiencia digital clara, confiable y lista para venta.',
    href: 'https://la-camionera.nni.ai/',
  },
  {
    name: 'Z-Scooters',
    category: 'Ecommerce y reputación digital',
    problem: 'Sitio comercial con necesidad de diagnóstico SEO, contenidos, catálogo y posicionamiento.',
    solution: 'Auditoría, plan de mejora, contenidos, estructura comercial y seguimiento de pendientes.',
    tech: ['SEO', 'Wix ecommerce', 'Catálogo', 'Contenido comercial'],
    users: 'Comercio especializado en scooters eléctricos, refacciones y taller.',
    status: 'En proceso',
    value: 'Fortalece confianza, visibilidad y conversión para un negocio de movilidad premium.',
    href: 'https://www.zescootersmx.com/cart-page',
  },
]

const featuredProduct = products.find((product) => product.name === 'FaceR')
const productCards = products.filter((product) => product.name !== 'FaceR')

export default function Products() {
  const featuredPanelRef = useRef(null)
  const faceMeshRef = useRef(null)
  const productCardRefs = useRef([])
  const videoRef = useRef(null)
  const [soundEnabled, setSoundEnabled] = useState(false)

  useEffect(() => {
    const panel = initFp3d(featuredPanelRef.current, { maxTilt: 7, glareMax: 0.42 })
    const mesh = drawFaceMesh(faceMeshRef.current, { accent: '#94f2ff' })
    const cards = productCardRefs.current
      .filter(Boolean)
      .map((card) => initFp3d(card, { maxTilt: 12, glareMax: 0.36, gyro: false }))

    return () => {
      panel.destroy()
      mesh.destroy()
      cards.forEach((card) => card.destroy())
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
        <p className="eyebrow">Productos y experiencias</p>
        <h1>Proyectos que muestran cómo NNI convierte ideas en sistemas.</h1>
        <p>
          Esta sección reúne productos, prototipos, sitios y experiencias desarrolladas
          por NNI. No son piezas aisladas: muestran capacidades acumuladas en diseño,
          IA aplicada, datos, seguridad, comercio, reputación digital y operación.
        </p>
      </div>

      {featuredProduct && (
        <article className="featured-product-card">
          <div className="featured-product-copy">
            <div className="product-card-top">
              <span>Producto estrella</span>
              <strong>{featuredProduct.status}</strong>
            </div>
            <h2>{featuredProduct.name}</h2>
            <p>
              FaceR es la experiencia insignia de NNI para seguridad institucional:
              identidad documental, reconocimiento facial, QR seguro y trazabilidad de
              accesos en una narrativa visual clara, confiable y lista para demostración.
            </p>
            <div className="featured-product-metrics">
              <span>Identidad documental</span>
              <span>Biometría facial</span>
              <span>QR seguro</span>
              <span>Trazabilidad</span>
            </div>
            <a className="primary-button" href={featuredProduct.href} rel="noreferrer" target="_blank">
              Ver producto estrella <ExternalLink size={17} />
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
                <strong>Acceso seguro con identidad verificable</strong>
                <small>Video demostrativo integrado en la ficha de producto.</small>
                <button className="sound-toggle" type="button" onClick={toggleSound}>
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                  {soundEnabled ? 'Sonido activado' : 'Activar sonido'}
                </button>
              </div>
            </div>
          </div>
        </article>
      )}

      <div className="products-grid">
        {productCards.map((product, index) => {
          const visual = productVisuals[product.name] ?? productVisuals.EasyMeet

          return (
          <article
            className="product-card product-card-3d"
            data-product={visual.slug}
            key={product.name}
            ref={(node) => {
              productCardRefs.current[index] = node
            }}
            style={{
              '--accent': visual.accent,
              '--accentGlow': visual.glow,
              '--delay': `${index * 90}ms`,
            }}
            tabIndex={0}
          >
            <div className="product-card-glow" aria-hidden="true" />
            <div className="product-card-shine" aria-hidden="true" />
            <div className="product-depth-lines" aria-hidden="true" />
            <div className="product-card-top">
              <span>{product.category}</span>
              <strong>{product.status}</strong>
            </div>
            <h2>{product.name}</h2>
            <p>{product.problem}</p>
            <div className="product-detail">
              <b>Solución</b>
              <span>{product.solution}</span>
            </div>
            <div className="product-detail">
              <b>Usuarios</b>
              <span>{product.users}</span>
            </div>
            <div className="tag-list compact">
              {product.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <p className="product-value">{product.value}</p>
            <a className="text-link" href={product.href} rel="noreferrer" target="_blank">
              Ver experiencia <ExternalLink size={16} />
            </a>
          </article>
          )
        })}
      </div>
    </section>
  )
}
