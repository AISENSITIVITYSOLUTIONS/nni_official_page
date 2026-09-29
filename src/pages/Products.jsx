import { useEffect, useRef } from 'react'
import { ExternalLink } from 'lucide-react'
import { drawFaceMesh, initFp3d } from '../utils/fp3d'

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

  useEffect(() => {
    const panel = initFp3d(featuredPanelRef.current, { maxTilt: 7, glareMax: 0.42 })
    const mesh = drawFaceMesh(faceMeshRef.current, { accent: '#94f2ff' })

    return () => {
      panel.destroy()
      mesh.destroy()
    }
  }, [])

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
            <div className="facer-video-shell">
              <video
                src="/videos/facer-product-demo.mp4"
                poster="/favicon.svg"
                muted
                loop
                playsInline
                autoPlay
                preload="metadata"
              />
              <canvas ref={faceMeshRef} aria-hidden="true" />
              <div className="facer-video-shade" />
              <div className="facer-video-label">
                <span>FaceR</span>
                <strong>Acceso inteligente</strong>
              </div>
            </div>
            <div className="orbital-card one">Documento</div>
            <div className="orbital-card two">Rostro</div>
            <div className="orbital-card three">QR</div>
          </div>
        </article>
      )}

      <div className="products-grid">
        {productCards.map((product) => (
          <article className="product-card" key={product.name}>
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
        ))}
      </div>

      <section className="product-note">
        <p className="eyebrow">Integración recomendada</p>
        <h2>FaceR debe permanecer visible como producto propio de NNI.</h2>
        <p>
          La landing externa de FaceR funciona como demostración inicial. La ruta
          recomendada es integrarla después como <strong>www.nni.ai/productos/facer</strong>
          o publicarla en <strong>facer.nni.ai</strong>, para conservar la fuerza del
          producto sin sacar al visitante del ecosistema institucional.
        </p>
      </section>
    </section>
  )
}
